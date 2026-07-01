import React from "react";
import { Composition } from "remotion";
import { ZoomyZoomFreeze } from "./ZoomyZoomFreeze";
import timelineData from "../timeline.json";

export const RemotionRoot: React.FC = () => {
  const fps = timelineData._meta.fps;
  const durationInFrames = timelineData._meta.total_frames;

  return (
    <>
      <Composition
        id="ZoomyZoomFreeze"
        component={ZoomyZoomFreeze}
        durationInFrames={durationInFrames}
        fps={fps}
        width={1920}
        height={1080}
      />
    </>
  );
};
