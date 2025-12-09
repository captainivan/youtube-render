export async function GET() {
  try {
    // --- 1. DEMO PAYLOAD (fake test data) ---
    const payload = {
      id: "demo-123",
      bgImage: "https://shunyasongs.vercel.app/tmp/bgImage.png",
      audio: "https://shunyasongs.vercel.app/tmp/audio.mp4",
      subtitles: "https://shunyasongs.vercel.app/tmp/subtitles.json",
      basicData: "https://shunyasongs.vercel.app/tmp/basicData.json",
      thumbnail: "https://shunyasongs.vercel.app/tmp/thumbnail.png"
    };

    // --- 2. SEND TO GITHUB ACTION ---
    const res = await fetch(
      "https://api.github.com/repos/captainivan/youtube-render/dispatches",
      {
        method: "POST",
        headers: {
          "Accept": "application/vnd.github+json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`
        },
        body: JSON.stringify({
          event_type: "run_video_render",
          client_payload: {
            props: payload   // 🔥 THIS FIXES EVERYTHING
          }
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      return Response.json({ error: errText }, { status: 500 });
    }

    return Response.json({
      status: "GitHub Action started!",
      sentPayload: payload
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
