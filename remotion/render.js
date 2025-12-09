import { bundle, renderMedia } from "@remotion/renderer";
import path from "path";
import fs from "fs";

const payload = JSON.parse(process.argv[2]);

(async () => {
  console.log("Payload received:", payload);

  // 1. Bundle your Remotion project
  const bundleLocation = await bundle({
    entryPoint: path.join(process.cwd(), "remotion", "Root.jsx"),
    webpackOverride: (config) => config,
  });

  console.log("Bundled at:", bundleLocation);

  // 2. Render video
  const output = "final.mp4";

  await renderMedia({
    composition: "Video",
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation: output,
    inputProps: payload, // ⭐ Sending your Firebase URLs and metadata into Remotion
  });

  console.log("Render done:", output);
})();
