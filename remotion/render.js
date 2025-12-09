import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import url from "url";

const payload = JSON.parse(process.argv[2]);

// Get absolute path of this directory
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// Path to Root.jsx
const entry = path.join(__dirname, "Root.jsx");

console.log("Rendering with payload:", payload);

(async () => {
  // 1. Load compositions from Root.jsx
  const comps = await selectComposition({
    serveUrl: entry,
    id: "Video",
    inputProps: payload,
  });

  if (!comps) {
    throw new Error("❌ Composition 'Video' not found!");
  }

  // 2. Render to video
  await renderMedia({
    composition: comps,
    serveUrl: entry,
    codec: "h264",
    outputLocation: "final.mp4",
    inputProps: payload,
  });

  console.log("✅ Render complete: final.mp4");
})();
