/**
 * Progress Email Router
 * 
 * Sends weekly progress summary emails to parents via Resend.
 * Can be triggered manually or via scheduled task.
 * 
 * Env: RESEND_API_KEY
 */
import { z } from "zod";
import { router, protectedProcedure, adminProcedure } from "../_core/trpc";
import * as db from "../db";
import axios from "axios";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const FROM_EMAIL = process.env.FROM_EMAIL || "Gigi's Playhouse <noreply@gigisplayhouse.app>";

interface ChildProgressSummary {
  childName: string;
  lessonsCompleted: number;
  quizzesPassed: number;
  flashcardsMastered: number;
  streakDays: number;
  topDomain: string;
}

/**
 * Generate HTML email content for weekly progress.
 */
function generateProgressEmailHtml(
  parentName: string,
  children: ChildProgressSummary[],
  weekOf: string
): string {
  const childSections = children.map(child => `
    <div style="background: #f8f4ff; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
      <h3 style="color: #7C3AED; margin: 0 0 12px 0;">${child.childName}</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 4px 0; color: #666;">Activities Completed</td>
          <td style="padding: 4px 0; text-align: right; font-weight: bold; color: #333;">${child.lessonsCompleted}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #666;">Knowledge Checks Passed</td>
          <td style="padding: 4px 0; text-align: right; font-weight: bold; color: #333;">${child.quizzesPassed}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #666;">Flashcards Mastered</td>
          <td style="padding: 4px 0; text-align: right; font-weight: bold; color: #333;">${child.flashcardsMastered}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #666;">Learning Streak</td>
          <td style="padding: 4px 0; text-align: right; font-weight: bold; color: #333;">${child.streakDays} days</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #666;">Strongest Area</td>
          <td style="padding: 4px 0; text-align: right; font-weight: bold; color: #7C3AED;">${child.topDomain}</td>
        </tr>
      </table>
    </div>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: 'Nunito', -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #fff;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #7C3AED; font-family: 'Baloo 2', cursive, sans-serif; margin: 0;">Gigi's Playhouse</h1>
        <p style="color: #666; margin: 4px 0;">Weekly Progress Report</p>
        <p style="color: #999; font-size: 14px;">Week of ${weekOf}</p>
      </div>
      
      <p style="color: #333; font-size: 16px;">Hi ${parentName},</p>
      <p style="color: #555;">Here's how your family did this week in their learning adventures!</p>
      
      ${childSections}
      
      <div style="text-align: center; margin-top: 24px;">
        <a href="https://gigisplayhouse.app/dashboard" 
           style="background: #7C3AED; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
          View Full Progress
        </a>
      </div>
      
      <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">
      <p style="color: #999; font-size: 12px; text-align: center;">
        Gigi's Playhouse is a supplemental learning tool designed to support your child's educational journey.
        <br>
        <a href="https://gigisplayhouse.app/settings" style="color: #7C3AED;">Manage email preferences</a>
      </p>
    </body>
    </html>
  `;
}

export const progressEmailRouter = router({
  /**
   * Send a weekly progress email to the current user.
   */
  sendMyProgress: protectedProcedure
    .mutation(async ({ ctx }) => {
      const user = ctx.user;
      if (!user.email) {
        throw new Error("No email address on file");
      }

      const children = await db.getChildrenByUser(user.id);
      if (children.length === 0) {
        throw new Error("No children to report on");
      }

      const summaries: ChildProgressSummary[] = [];
      for (const child of children) {
        const progress = await db.getLessonProgressByChild(child.id);
        const quizzes = await db.getQuizResultsByChild(child.id);
        const flashcards = await db.getFlashcardProgressByChild(child.id);

        const lessonsCompleted = progress.filter(p => p.completionStatus === 'done').length;
        const quizzesPassed = quizzes.filter(q => q.passed).length;
        const flashcardsMastered = flashcards.filter(f => f.bucket >= 4).length;

        summaries.push({
          childName: child.displayName,
          lessonsCompleted,
          quizzesPassed,
          flashcardsMastered,
          streakDays: 0, // TODO: Calculate from daily plans
          topDomain: 'literacy', // TODO: Calculate from progress data
        });
      }

      const weekOf = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      const html = generateProgressEmailHtml(user.name || 'Parent', summaries, weekOf);

      if (!RESEND_API_KEY) {
        console.log('[Email] Resend API key not configured, email would be sent to:', user.email);
        return { success: true, preview: true };
      }

      try {
        await axios.post('https://api.resend.com/emails', {
          from: FROM_EMAIL,
          to: user.email,
          subject: `Weekly Progress Report — ${weekOf}`,
          html,
        }, {
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
        });

        return { success: true, preview: false };
      } catch (error: any) {
        console.error('[Email] Failed to send progress email:', error.message);
        throw new Error('Failed to send email');
      }
    }),

  /**
   * Admin: Send progress emails to all users (batch weekly send).
   */
  sendBatch: adminProcedure
    .mutation(async () => {
      if (!RESEND_API_KEY) {
        return { sent: 0, message: 'Resend API key not configured' };
      }

      const allUsers = await db.listAllUsers();
      let sent = 0;

      for (const user of allUsers) {
        if (!user.email) continue;

        try {
          const children = await db.getChildrenByUser(user.id);
          if (children.length === 0) continue;

          const summaries: ChildProgressSummary[] = [];
          for (const child of children) {
            const progress = await db.getLessonProgressByChild(child.id);
            const quizzes = await db.getQuizResultsByChild(child.id);
            const flashcards = await db.getFlashcardProgressByChild(child.id);

            summaries.push({
              childName: child.displayName,
              lessonsCompleted: progress.filter(p => p.completionStatus === 'done').length,
              quizzesPassed: quizzes.filter(q => q.passed).length,
              flashcardsMastered: flashcards.filter(f => f.bucket >= 4).length,
              streakDays: 0,
              topDomain: 'literacy',
            });
          }

          const weekOf = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
          const html = generateProgressEmailHtml(user.name || 'Parent', summaries, weekOf);

          await axios.post('https://api.resend.com/emails', {
            from: FROM_EMAIL,
            to: user.email,
            subject: `Weekly Progress Report — ${weekOf}`,
            html,
          }, {
            headers: {
              'Authorization': `Bearer ${RESEND_API_KEY}`,
              'Content-Type': 'application/json',
            },
          });

          sent++;
        } catch (error: any) {
          console.error(`[Email] Failed for user ${user.id}:`, error.message);
        }
      }

      return { sent, total: allUsers.length };
    }),
});
