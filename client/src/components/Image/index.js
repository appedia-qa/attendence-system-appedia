import React from 'react';
const { useRef } = require('react');

const Image = (props) => {
  const imageRef = useRef();

  return (
    <img {...props} 
      ref={imageRef}
      onError={() => {
        imageRef.current.src = require('../../assets/images/no-image.jpg')
      }}
      style={{ objectFit:'contain', width:props.width }}
    />
  );
}

export default Image;