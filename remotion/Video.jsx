import React from "react";
import { AbsoluteFill, Audio, Img, Sequence } from "remotion";

export const Video = ({ bgImage, audio, subtitles, basicData, thumbnail }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* Background image */}
      <Img src={bgImage} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

      {/* Audio */}
      <Audio src={audio} />

      {/* Example text */}
      <Sequence from={10} durationInFrames={150}>
        <h1 style={{
          color: "white",
          fontSize: "50px",
          textAlign: "center"
        }}>
          {basicData?.title || "Your AI Title"}
        </h1>
      </Sequence>
    </AbsoluteFill>
  );
};
