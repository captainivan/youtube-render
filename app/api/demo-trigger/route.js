export async function GET() {
    try {
      // --- 1. DEMO PAYLOAD (fake test data) ---
      const payload = {
        id: "demo-123",
        bgImage: "https://example.com/demo-bg.png",
        audio: "https://example.com/demo-audio.mp3",
        subtitles: "https://example.com/demo-subs.json",
        basicData: "https://example.com/demo-basic.json",
        thumbnail: "https://example.com/demo-thumb.png"
      };
  
      // --- 2. SEND TO GITHUB ACTION (repository_dispatch) ---
      const res = await fetch(
        "https://api.github.com/repos/YOUR_GITHUB_USERNAME/YOUR_REPO/dispatches",
        {
          method: "POST",
          headers: {
            "Accept": "application/vnd.github+json",
            "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
          },
          body: JSON.stringify({
            event_type: "render-video",
            client_payload: payload,
          }),
        }
      );
  
      if (!res.ok) {
        const errText = await res.text();
        return Response.json({ error: errText }, { status: 500 });
      }
  
      return Response.json({
        status: "GitHub Action started!",
        sentPayload: payload,
      });
  
    } catch (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }
  