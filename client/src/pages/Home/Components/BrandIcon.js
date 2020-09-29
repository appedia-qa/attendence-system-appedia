import React, { Component } from "react";
import { useRef } from "react";
import { handleImageArray } from "../../../utils/image";
import Image from "../../../components/Image";
import styled from "styled-components";

export const BrandIconContainer = styled.div`
  ${({theme}) => `
    width:267px;
    height: 172px;
    margin-bottom: 33px;
    background-color: white;
    display:flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${theme.palette.gray[300]};
    padding: 1px;
    cursor: pointer;
  `}
`

export const BrandIconImage = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  img {
    height: 172px;
    width: auto;
  }
`


export const BrandIcon = props => {
  const imageRef = useRef();

  return (
    <BrandIconContainer onClick={() => props.history.push(`shops/${props.item.id}`)}>
      <BrandIconImage>
        <Image
          src={ handleImageArray(props.item.image_url)[0]}
          onError={() => {
            
            imageRef.current.src = require('../../../assets/images/no-image.jpg')
          }}
        />
      </BrandIconImage>
    </BrandIconContainer>
  );
};