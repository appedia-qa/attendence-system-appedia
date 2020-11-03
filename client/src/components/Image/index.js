import React from "react";
const { useRef } = require("react");
const Image = (props) => {
  const imageRef = useRef();

  return (
    <img
      {...props}
      ref={imageRef}
      onError={() => {
        imageRef.current.src = require("../../assets/images/no-image.jpg");
      }}
      loading={"lazy"}
      
      style={{ objectFit: "contain", width: "425px" }}
    />
  );
};

export default Image;
