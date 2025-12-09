import { Composition } from "remotion";
import { Video } from "./Video";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Video"
        component={Video}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};

export default RemotionRoot;
