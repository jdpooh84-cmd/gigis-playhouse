import React from "react";
import { useCurrentFrame, useVideoConfig, staticFile } from "remotion";
import { getEventAtTime, isMouthOpen } from "../lib/syncUtils";
import { getMotionTransform, toTransformString } from "../lib/motionPresets";
import type { ActionLabel } from "../lib/motionPresets";

interface CharacterProps {
  /** "leo" or "zoe" */
  character: "leo" | "zoe";
  /** horizontal center position as a fraction of canvas width (0–1) */
  cx: number;
  /** vertical baseline as a fraction of canvas height (0–1) */
  cy: number;
  /** rendered height in px */
  height: number;
}

export const Character: React.FC<CharacterProps> = ({
  character,
  cx,
  cy,
  height,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height: canvasH } = useVideoConfig();
  const timeSec = frame / fps;

  const ev = getEventAtTime(timeSec);
  const action = (ev?.action ?? "bounce") as ActionLabel;
  const mouthOpen = ev ? isMouthOpen(ev, timeSec) : false;

  // Progress within the current event (0–1), clamped
  const dur = ev ? ev.end_sec - ev.start_sec : 1;
  const raw = ev ? (timeSec - ev.start_sec) / Math.max(dur, 0.001) : 0;
  const progress = Math.min(1, Math.max(0, raw));

  const motion = getMotionTransform(action, progress);
  const transformStr = toTransformString(motion);

  const imgBase = staticFile(`characters/${character}`);
  const bodyImg = `${imgBase}_body.png`;
  const mouthClosedImg = `${imgBase}_mouth_closed.png`;
  const mouthOpenImg = `${imgBase}_mouth_open.png`;
  const armsImg = `${imgBase}_arms_up.png`;

  const w = height * 0.55; // aspect ratio ~9:16 portrait figure
  const x = cx * width - w / 2;
  const y = cy * canvasH - height;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: height,
        transform: transformStr,
        transformOrigin: "50% 100%", // pivot at feet
        willChange: "transform",
      }}
    >
      {/* Base body sprite */}
      <img
        src={bodyImg}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        alt=""
      />

      {/* Arm overlay when lifted */}
      {motion.armLift > 0.1 && (
        <img
          src={armsImg}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: Math.min(1, motion.armLift),
          }}
          alt=""
        />
      )}

      {/* Mouth overlay */}
      <img
        src={mouthOpen ? mouthOpenImg : mouthClosedImg}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
        alt=""
      />
    </div>
  );
};
