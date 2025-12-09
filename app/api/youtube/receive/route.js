export async function POST(req) {
    const secret = req.headers.get("x-secret-key");
    if (secret !== process.env.RENDER_UPLOAD_KEY)
      return new Response("Unauthorized", { status: 401 });
  
    const jobId = req.nextUrl.searchParams.get("jobId");
  
    const arrayBuffer = await req.arrayBuffer();
    const videoBuffer = Buffer.from(arrayBuffer);
  
    console.log("Received video for job:", jobId);
  
  
    return Response.json({ status: "done", result: videoBuffer });
  }
  