import { Composition, getInputProps } from "remotion";
import { Video } from "./Video.jsx";

export default function RemotionRoot() {
  const { durationInFrames, fps } = getInputProps();

  return (
    <>
      <Composition
        id="FinalVideo"
        component={Video}
        durationInFrames={durationInFrames ?? 3000}
        fps={fps ?? 30}
        width={1920}
        height={1080}
      />
    </>
  );
}
