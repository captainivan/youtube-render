export async function GET() {
  try {
    const payload = {
      id: "demo-123",
      bgImage: `https://ik.imagekit.io/lunarivanfiles/bgImage.jpg?updatedAt=${Date.now()}`,
      audio: `https://ik.imagekit.io/lunarivanfiles/audio.mp3?updatedAt=${Date.now()}`,
      subtitles: `https://ik.imagekit.io/lunarivanfiles/subtitles.json?updatedAt=${Date.now()}`,
      basicData: `https://ik.imagekit.io/lunarivanfiles/basicData.json?updatedAt=${Date.now()}`,
      thumbnail: `https://ik.imagekit.io/lunarivanfiles/thumbnail.jpg?updatedAt=${Date.now()}`
    };

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
          client_payload: payload
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
