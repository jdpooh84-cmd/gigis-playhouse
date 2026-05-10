/**
 * Curated Videos tRPC router.
 * Server-side YouTube curation with admin moderation.
 * Replaces client-side YouTube API calls — key stays server-side.
 */
import { z } from "zod";
import { router, protectedProcedure, adminProcedure } from "../_core/trpc";
import * as db from "../db";
import axios from "axios";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY || "";

interface YouTubeSearchResult {
  id: { videoId: string };
  snippet: {
    title: string;
    channelId: string;
    channelTitle: string;
    thumbnails: { medium?: { url: string }; high?: { url: string } };
    publishedAt: string;
  };
}

interface YouTubeVideoDetail {
  id: string;
  contentDetails: { duration: string };
  snippet: {
    title: string;
    channelId: string;
    channelTitle: string;
    thumbnails: { medium?: { url: string }; high?: { url: string } };
    publishedAt: string;
  };
}

/**
 * Parse ISO 8601 duration (PT4M13S) to seconds.
 */
function parseDuration(iso: string): number {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || "0");
  const minutes = parseInt(match[2] || "0");
  const seconds = parseInt(match[3] || "0");
  return hours * 3600 + minutes * 60 + seconds;
}

export const curatedVideosRouter = router({
  /**
   * Get curated videos for the client (approved only).
   * This replaces direct YouTube API calls from the browser.
   */
  list: protectedProcedure
    .input(z.object({
      ageBand: z.string().optional(),
      domain: z.string().optional(),
      limit: z.number().default(20),
    }))
    .query(async ({ input }) => {
      const videos = await db.getCuratedVideos({
        ageBand: input.ageBand,
        domain: input.domain,
        approvedOnly: true,
      });
      return videos.slice(0, input.limit);
    }),

  /**
   * Get all videos (including pending moderation) — admin only.
   */
  listAll: adminProcedure
    .input(z.object({
      status: z.enum(["pending", "approved", "rejected", "all"]).default("all"),
    }))
    .query(async ({ input }) => {
      if (input.status === "pending") {
        return db.getPendingModerationVideos();
      }
      return db.getCuratedVideos({
        approvedOnly: input.status === "approved",
      });
    }),

  /**
   * Admin: Approve or reject a video.
   */
  moderate: adminProcedure
    .input(z.object({
      youtubeId: z.string(),
      approved: z.boolean(),
    }))
    .mutation(async ({ ctx, input }) => {
      await db.moderateVideo(input.youtubeId, input.approved, ctx.user.id);
      return { success: true };
    }),

  /**
   * Admin: Trigger a fetch of videos from YouTube for a specific channel/query.
   * This is the server-side replacement for client-side YouTube API calls.
   * The YouTube API key stays on the server — never exposed to the client.
   */
  fetchFromYouTube: adminProcedure
    .input(z.object({
      channelId: z.string().optional(),
      query: z.string().optional(),
      ageBand: z.string().default("grade-1"),
      domain: z.string().optional(),
      maxResults: z.number().default(10),
    }))
    .mutation(async ({ input }) => {
      if (!YOUTUBE_API_KEY) {
        throw new Error("YouTube API key not configured on server");
      }

      try {
        // Search YouTube
        const searchParams: Record<string, string> = {
          part: "snippet",
          type: "video",
          maxResults: input.maxResults.toString(),
          key: YOUTUBE_API_KEY,
          safeSearch: "strict",
          videoCategoryId: "27", // Education
        };

        if (input.channelId) searchParams.channelId = input.channelId;
        if (input.query) searchParams.q = input.query;

        const searchResponse = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          { params: searchParams }
        );

        const items: YouTubeSearchResult[] = searchResponse.data.items || [];
        if (items.length === 0) return { fetched: 0 };

        // Get video details (duration)
        const videoIds = items.map(i => i.id.videoId).join(",");
        const detailsResponse = await axios.get(
          "https://www.googleapis.com/youtube/v3/videos",
          {
            params: {
              part: "contentDetails,snippet",
              id: videoIds,
              key: YOUTUBE_API_KEY,
            },
          }
        );

        const details: YouTubeVideoDetail[] = detailsResponse.data.items || [];
        let fetched = 0;

        for (const video of details) {
          const duration = parseDuration(video.contentDetails.duration);

          // Skip videos longer than 30 minutes (not suitable for young children)
          if (duration > 1800) continue;

          await db.upsertCuratedVideo({
            youtubeId: video.id,
            title: video.snippet.title,
            channelId: video.snippet.channelId,
            channelName: video.snippet.channelTitle,
            thumbnailUrl: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium?.url || null,
            duration,
            ageBand: input.ageBand,
            domain: input.domain || null,
            approvedByAdmin: false,
            rejectedByAdmin: false,
            publishedAt: new Date(video.snippet.publishedAt),
          });
          fetched++;
        }

        return { fetched };
      } catch (error: any) {
        console.error("[CuratedVideos] YouTube fetch error:", error.message);
        throw new Error(`YouTube fetch failed: ${error.message}`);
      }
    }),

  /**
   * Record a video watch event for a child.
   */
  recordWatch: protectedProcedure
    .input(z.object({
      childId: z.number(),
      youtubeId: z.string(),
      title: z.string().optional(),
      channelId: z.string().optional(),
      durationWatched: z.number().default(0),
      totalDuration: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      await db.addWatchHistory({
        childId: input.childId,
        youtubeId: input.youtubeId,
        title: input.title,
        channelId: input.channelId,
        durationWatched: input.durationWatched,
        totalDuration: input.totalDuration,
      });
      return { success: true };
    }),

  /**
   * Get watch history for a child.
   */
  watchHistory: protectedProcedure
    .input(z.object({ childId: z.number() }))
    .query(async ({ input }) => {
      return db.getWatchHistoryByChild(input.childId);
    }),
});
