import React from "react";
import noDataFound from "../assets/animations/Animation - 1707588915048.json";
import joinViaCode from "../assets/animations/Animation - 1706051811675.json";
import successMark from "../assets/animations/Animation - 1706044037262.json";
import Lottie from "react-lottie";

const NoDataFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: noDataFound,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={400} width={400} />;
};

const JoinViaCode = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: joinViaCode,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={400} width={400} />;
};

const SuccessMark = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: successMark,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={400} width={400} />;
};

const Animations = {
  NoDataFound,
  JoinViaCode,
  SuccessMark,
};

export default Animations;
