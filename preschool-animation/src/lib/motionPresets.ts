import { interpolate } from "remotion";
import { smoothstep } from "./syncUtils";

export type ActionLabel =
  | "bounce"
  | "bounce_wave"
  | "zoom_run"
  | "freeze"
  | "wiggle"
  | "wiggle_fingers_toes"
  | "arm_pump"
  | "full_body_shake"
  | "slow_motion"
  | "spin"
  | "jump"
  | "point_camera";

export interface MotionTransform {
  translateX: number;
  translateY: number;
  rotate: number;
  scaleX: number;
  scaleY: number;
  /** 0–1, drives arm / limb overlay opacity */
  armLift: number;
  /** 0–1, drives leg spread overlay */
  legSpread: number;
}

const IDENTITY: MotionTransform = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  scaleX: 1,
  scaleY: 1,
  armLift: 0,
  legSpread: 0,
};

/**
 * Given an action label and a 0–1 progress within that event window,
 * return the CSS-transform-equivalent motion values.
 * All values are child-exaggerated: visible at a glance, readable on small screens.
 */
export function getMotionTransform(
  action: ActionLabel,
  progress: number
): MotionTransform {
  const t = progress;
  const sin = Math.sin;
  const PI = Math.PI;

  switch (action) {
    case "bounce": {
      // Two-beat bounce: body arcs up then snaps back down
      const bounce = Math.abs(sin(t * PI * 2));
      return {
        ...IDENTITY,
        translateY: -bounce * 60,
        scaleY: 1 + bounce * 0.08,
        legSpread: bounce * 0.5,
      };
    }

    case "bounce_wave": {
      // Intro wave: whole body sways side-to-side with a small bounce
      const sway = sin(t * PI * 4) * 18;
      const bob = Math.abs(sin(t * PI * 4)) * 20;
      return {
        ...IDENTITY,
        translateX: sway,
        translateY: -bob,
        rotate: sway * 0.4,
        armLift: Math.abs(sin(t * PI * 4)) * 0.7,
      };
    }

    case "zoom_run": {
      // Forward zoom-run: body leans forward, legs pump, scale grows slightly
      const lean = interpolate(t, [0, 0.3, 1], [0, -12, -10]);
      const legPump = sin(t * PI * 8) * 0.6;
      const scale = interpolate(t, [0, 1], [1, 1.12]);
      return {
        ...IDENTITY,
        rotate: lean,
        scaleX: scale,
        scaleY: scale,
        legSpread: Math.abs(legPump),
        translateY: -Math.abs(sin(t * PI * 8)) * 15,
      };
    }

    case "freeze": {
      // Immediate stop — zero motion on frame 1.
      // progress is irrelevant; always return identity (frozen pose)
      return { ...IDENTITY };
    }

    case "wiggle": {
      // Hip wiggle: fast lateral body oscillation
      const hip = sin(t * PI * 10) * 22;
      return {
        ...IDENTITY,
        translateX: hip,
        rotate: hip * 0.3,
        armLift: Math.abs(sin(t * PI * 10)) * 0.4,
      };
    }

    case "wiggle_fingers_toes": {
      // Fingers-and-toes jazz-hands: rapid small shake, arms raised
      const shake = sin(t * PI * 14) * 10;
      return {
        ...IDENTITY,
        translateX: shake * 0.5,
        translateY: shake * 0.3,
        rotate: shake * 0.6,
        armLift: 0.9 + sin(t * PI * 14) * 0.1,
        legSpread: 0.6,
      };
    }

    case "arm_pump": {
      // Alternating overhead arm pumps — victory move
      const pump = sin(t * PI * 6);
      return {
        ...IDENTITY,
        translateY: pump > 0 ? -pump * 25 : 0,
        armLift: Math.abs(pump) * 0.95,
        rotate: pump * 4,
      };
    }

    case "full_body_shake": {
      // Whole-body rapid shake — high energy
      const shakeX = sin(t * PI * 16) * 18;
      const shakeY = sin(t * PI * 16 + 0.8) * 10;
      return {
        ...IDENTITY,
        translateX: shakeX,
        translateY: shakeY,
        rotate: shakeX * 0.5,
        scaleX: 1 + Math.abs(sin(t * PI * 16)) * 0.06,
        scaleY: 1 - Math.abs(sin(t * PI * 16)) * 0.06,
        armLift: Math.abs(sin(t * PI * 16)) * 0.8,
      };
    }

    case "slow_motion": {
      // Exaggerated slo-mo strut: very slow swinging motion
      const swing = sin(t * PI * 1.5) * 14;
      const liftSlow = smoothstep(sin(t * PI) > 0 ? sin(t * PI) : 0) * 30;
      return {
        ...IDENTITY,
        translateX: swing,
        translateY: -liftSlow,
        rotate: swing * 0.5,
        legSpread: smoothstep(t) * 0.4,
      };
    }

    case "spin": {
      // Full 360° spin: one rotation over the event window
      const degrees = interpolate(t, [0, 1], [0, 360]);
      return {
        ...IDENTITY,
        rotate: degrees,
        scaleX: 1 + sin(t * PI) * 0.1,
        scaleY: 1 + sin(t * PI) * 0.1,
      };
    }

    case "jump": {
      // Big jump: arc up and land
      const arc = smoothstep(sin(t * PI));
      return {
        ...IDENTITY,
        translateY: -arc * 110,
        scaleX: 1 - arc * 0.05,
        scaleY: 1 + arc * 0.12,
        legSpread: arc * 0.8,
        armLift: arc * 0.9,
      };
    }

    case "point_camera": {
      // Lean forward and point directly at the viewer
      const lean = smoothstep(t) * 10;
      return {
        ...IDENTITY,
        rotate: -lean,
        scaleX: 1 + smoothstep(t) * 0.08,
        scaleY: 1 + smoothstep(t) * 0.08,
        armLift: smoothstep(t) * 0.85,
      };
    }

    default:
      return { ...IDENTITY };
  }
}

/** Convert a MotionTransform to a CSS transform string for inline styles. */
export function toTransformString(m: MotionTransform): string {
  return [
    `translateX(${m.translateX.toFixed(2)}px)`,
    `translateY(${m.translateY.toFixed(2)}px)`,
    `rotate(${m.rotate.toFixed(2)}deg)`,
    `scaleX(${m.scaleX.toFixed(4)})`,
    `scaleY(${m.scaleY.toFixed(4)})`,
  ].join(" ");
}
