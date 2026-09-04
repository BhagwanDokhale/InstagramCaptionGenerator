import child_process from "child_process";

/**
 * Reusable capability detector for FFmpeg availability in the execution environment.
 * Caches the detection result to prevent redundant process spawns while handling
 * ENOENT gracefully without unhandled exceptions or noisy logs.
 */

let isFfmpegAvailableCached: boolean | null = null;
let ffmpegDetectionPromise: Promise<boolean> | null = null;

/**
 * Checks whether the `ffmpeg` executable is installed, available in PATH,
 * and executable in the current Node.js runtime environment.
 * 
 * Specifically handles `ENOENT` so environments like Hostinger managed hosting
 * do not crash or log repeated red errors.
 * 
 * Supports overriding via `process.env.DISABLE_FFMPEG = "true"` for controlled testing.
 */
export async function checkFfmpegAvailability(forceRecheck = false): Promise<boolean> {
  // Allow programmatic or environmental override for testing & maintenance
  if (process.env.DISABLE_FFMPEG === "true" || process.env.ENABLE_FFMPEG === "false") {
    return false;
  }

  if (!forceRecheck && isFfmpegAvailableCached !== null) {
    return isFfmpegAvailableCached;
  }

  if (!forceRecheck && ffmpegDetectionPromise) {
    return ffmpegDetectionPromise;
  }

  ffmpegDetectionPromise = new Promise<boolean>((resolve) => {
    try {
      const proc = child_process.spawn("ffmpeg", ["-version"], {
        stdio: ["ignore", "ignore", "ignore"]
      });

      let settled = false;
      const finalize = (isAvailable: boolean, reason?: string) => {
        if (!settled) {
          settled = true;
          isFfmpegAvailableCached = isAvailable;
          ffmpegDetectionPromise = null;
          if (isAvailable) {
            console.log("[MediaCapability] FFmpeg executable detected and available for media transcoding.");
          } else {
            console.log(`[MediaCapability] FFmpeg executable not found in this environment (${reason || "ENOENT"}). Graceful media streaming fallbacks active.`);
          }
          resolve(isAvailable);
        }
      };

      proc.on("error", (err: any) => {
        if (err?.code === "ENOENT") {
          finalize(false, "executable not found in PATH (ENOENT)");
        } else {
          console.warn("[MediaCapability] FFmpeg check encountered error:", err?.message || err);
          finalize(false, err?.code || "spawn error");
        }
      });

      proc.on("close", (code) => {
        finalize(code === 0, `process exited with code ${code}`);
      });

      // Safety guard timeout (1.5 seconds)
      setTimeout(() => {
        if (!settled) {
          try {
            proc.kill();
          } catch (_) {}
          finalize(false, "detection timeout");
        }
      }, 1500);
    } catch (e: any) {
      isFfmpegAvailableCached = false;
      ffmpegDetectionPromise = null;
      resolve(false);
    }
  });

  return ffmpegDetectionPromise;
}

/**
 * Manually set the cached FFmpeg availability status (primarily useful for automated testing).
 */
export function setFfmpegAvailableCached(status: boolean | null) {
  isFfmpegAvailableCached = status;
  ffmpegDetectionPromise = null;
}
