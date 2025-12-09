import { Composition } from "remotion";
import Video from "./Video";

export default function RemotionRoot() {
  return (
    <>
      <Composition
        id="FinalVideo"
        component={Video}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
}
