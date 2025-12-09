// remotion-app/src/Root.jsx

import { Composition } from "remotion";
import Video from "./Video"; 

const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Video"       
        component={Video}
        fps={30}
        width={1080}
        height={1920}
        durationInFrames={1500}
      />
    </>
  );
};

export default RemotionRoot;
