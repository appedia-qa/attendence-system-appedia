import React, { useRef } from "react";
import * as StyledComponent from "./styles";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { handleImageArray } from "../../utils/image";
import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION,
} from "react-image-magnifiers";

const fetchImageURL = (props) => {
  return handleImageArray(props);
};

const ProductCarousel = (props) => {
  const imageRef = useRef();
  return (
    <div>
      <StyledComponent.Container>
        <Carousel>
          {props.items &&
            props.items.length > 0 &&
            props.items.map((item) => {
              return (
                <Magnifier
                  imageSrc={fetchImageURL(item)[0]}
                  className="carousel-image"
                  ref={imageRef}
                />
              );
            })}
        </Carousel>
      </StyledComponent.Container>
    </div>
  );
};

export default ProductCarousel;
