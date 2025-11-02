import dynamic from "next/dynamic";
import React from "react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const LottieAnimation = ({
  animationData,
  loop = true,
  autoplay = true,
  style,
}) => {
  const defaultOption = {
    loop,
    autoplay,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className={style.className} >
      <Lottie animationData={animationData} loop={loop} autoplay={autoplay} />
    </div>
  );
};

export default LottieAnimation;
