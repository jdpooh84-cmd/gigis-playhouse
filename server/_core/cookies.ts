import type { CookieOptions, Request } from "express";

function isSecureRequest(req: Request): boolean {
  // With 'trust proxy' enabled, req.protocol correctly reflects the original protocol
  if (req.protocol === "https") return true;

  // Fallback: check x-forwarded-proto header directly
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;

  const protoList = Array.isArray(forwardedProto)
    ? forwardedProto
    : forwardedProto.split(",");

  return protoList.some(proto => proto.trim().toLowerCase() === "https");
}

export function getSessionCookieOptions(
  req: Request
): Pick<CookieOptions, "domain" | "httpOnly" | "path" | "sameSite" | "secure"> {
  const secure = isSecureRequest(req);

  // Log cookie options for debugging in production
  console.log(`[Cookie] Setting cookie: secure=${secure}, protocol=${req.protocol}, x-forwarded-proto=${req.headers["x-forwarded-proto"] || "none"}`);

  return {
    httpOnly: true,
    path: "/",
    // Use "lax" for same-site requests (more compatible with mobile browsers)
    // "none" requires secure:true and can be blocked by some browsers
    sameSite: "lax",
    secure,
  };
}
