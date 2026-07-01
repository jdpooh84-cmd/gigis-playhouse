import React from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
  useVideoConfig,
} from "remotion";
import { Background } from "./components/Background";
import { Character } from "./components/Character";
import { LyricBanner } from "./components/LyricBanner";

export const ZoomyZoomFreeze: React.FC = () => {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {/* Full-bleed background with cross-fade */}
      <Background />

      {/* Leo — left side */}
      <Character
        character="leo"
        cx={0.3}
        cy={0.92}
        height={height * 0.72}
      />

      {/* Zoe — right side */}
      <Character
        character="zoe"
        cx={0.7}
        cy={0.92}
        height={height * 0.72}
      />

      {/* Lyric subtitle bar */}
      <LyricBanner />

      {/* Song audio — the ONLY audio source */}
      <Audio src={staticFile("audio/Zoomy_Zoom_Freeze.mp3")} />
    </AbsoluteFill>
  );
};
