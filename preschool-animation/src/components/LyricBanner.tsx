import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { getEventAtTime } from "../lib/syncUtils";

export const LyricBanner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const timeSec = frame / fps;

  const ev = getEventAtTime(timeSec);
  if (!ev || !ev.lyric) return null;

  // Fade in over first 0.2s of event, fade out over last 0.15s
  const elapsed = timeSec - ev.start_sec;
  const dur = ev.end_sec - ev.start_sec;
  const remaining = ev.end_sec - timeSec;

  const opacity = Math.min(
    interpolate(elapsed, [0, 0.2], [0, 1], { extrapolateRight: "clamp" }),
    interpolate(remaining, [0, 0.15], [0, 1], { extrapolateRight: "clamp" })
  );

  const isFreezeEvent = ev.action === "freeze";

  return (
    <div
      style={{
        position: "absolute",
        bottom: 60,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: isFreezeEvent
            ? "rgba(220, 50, 50, 0.88)"
            : "rgba(20, 20, 60, 0.78)",
          borderRadius: 18,
          padding: "14px 40px",
          maxWidth: "80%",
        }}
      >
        <span
          style={{
            fontFamily: "'Fredoka One', 'Comic Sans MS', cursive",
            fontSize: isFreezeEvent ? 72 : 52,
            fontWeight: 900,
            color: "#ffffff",
            textShadow: "3px 3px 0 rgba(0,0,0,0.5)",
            letterSpacing: isFreezeEvent ? 6 : 2,
            textTransform: "uppercase",
          }}
        >
          {ev.lyric}
        </span>
      </div>
    </div>
  );
};
