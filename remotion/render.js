// remotion/render.js

import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";

// Payload from GitHub Action
const payload = JSON.parse(process.argv[2]);

// 🔥 Replace this with your deployed Remotion app URL
const serveUrl = "https://youtube-render.vercel.app";

console.log("Rendering with payload:", payload);
console.log("Using serveUrl:", serveUrl);

(async () => {
  // 1. Select composition from deployed URL
  const composition = await selectComposition({
    serveUrl,
    id: "Video",          // ← must match Composition ID in Root.jsx
    inputProps: payload,
  });

  if (!composition) {
    throw new Error("❌ Composition 'Video' not found in deployed Remotion app");
  }

  // 2. Render the video remotely
  await renderMedia({
    serveUrl,
    composition,
    codec: "h264",
    outputLocation: "final.mp4",
    inputProps: payload,
  });

  console.log("✅ Render complete → final.mp4");
})();
