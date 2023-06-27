import React from "react";
import LoaderImg from "../../assets/loader.gif"

const Loader = () => {
 
  return (
    <div className="w-full min-h-full flex items-center justify-center">
      <img src={LoaderImg} alt="" />
    </div>
  );
};

export default Loader;