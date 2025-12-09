export async function GET() {
  try {
    // --- 1. DEMO PAYLOAD (fake test data) ---
    const payload = {
      id: "demo-123",
      bgImage: "https://i.pinimg.com/1200x/38/99/00/389900dd859b26489093fb2df80cebf3.jpg",
      audio: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
      subtitles: "https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json",
      basicData: "https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json",
      thumbnail: "https://in.pinterest.com/pin/526850856430464001/"
    };

    // --- 2. SEND TO GITHUB ACTION (repository_dispatch) ---
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
