import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setConcurrency(4);
// Chromium flags for CI headless rendering
Config.setChromiumDisableWebSecurity(false);
