import React from "react";
import { useCurrentFrame, useVideoConfig, staticFile, interpolate } from "remotion";
import { getBackground } from "../lib/syncUtils";
import timelineData from "../../timeline.json";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const timeSec = frame / fps;

  const currentBg = getBackground(timeSec);

  // Build cross-fade: find the transition that just fired and blend over 1 second
  let crossfadeProgress = 1; // default: fully settled
  const FADE_DUR = 1.0; // seconds

  const transitions = timelineData.background_transitions;
  for (let i = 1; i < transitions.length; i++) {
    const t = transitions[i];
    if (timeSec >= t.at_sec && timeSec < t.at_sec + FADE_DUR) {
      crossfadeProgress = (timeSec - t.at_sec) / FADE_DUR;
      break;
    }
  }

  const meadowOpacity =
    currentBg === "meadow"
      ? 1
      : crossfadeProgress >= 1
      ? 0
      : 1 - crossfadeProgress;
  const stageOpacity =
    currentBg === "stage"
      ? 1
      : crossfadeProgress >= 1
      ? 0
      : 1 - crossfadeProgress;

  return (
    <>
      <img
        src={staticFile("backgrounds/meadow.png")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: currentBg === "meadow" ? crossfadeProgress : 1 - crossfadeProgress,
        }}
        alt=""
      />
      <img
        src={staticFile("backgrounds/stage.png")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: currentBg === "stage" ? crossfadeProgress : 1 - crossfadeProgress,
        }}
        alt=""
      />
    </>
  );
};
