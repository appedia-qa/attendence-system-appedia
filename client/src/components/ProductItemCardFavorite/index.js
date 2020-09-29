import React, { useRef, useState } from "react";
import * as StyledComponent from "./styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import { Chip, IconButton } from "@material-ui/core";
import { parseImageURL, makeFirstLetterUpperCase } from "../../utils/strings";
import { useDispatch, useSelector } from "react-redux";
import { addItemIntoCart } from "../../redux/actions/cart.action";
import { handleImageArray } from "../../utils/image";
import Button from '@material-ui/core/Button';

const imageURL =
  "https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";

const fetchImageURL = (props) => {
  if (props.product && props.product && props.product.images) {
    return handleImageArray(props.product.images)[0];
  }
  return require("../../assets/images/no-image.jpg");
};

const ProductItem = (props) => {
  const imageRef = useRef();
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(true);
  const handleCartItemAdd = () => {
    if (props && props.product) {
      dispatch(addItemIntoCart(props.product));
    }
  };
  return (
    <StyledComponent.StyledCard className="product-item-card">
      <div onClick={props.handleOnCardClick}>
        <StyledComponent.StyledCardMediaContainer>
          <StyledComponent.StyledCardMedia
            src={fetchImageURL(props)}
            ref={imageRef}
            onError={() => {
              imageRef.current.src = require("../../assets/images/no-image.jpg");
            }}
          />
          <StyledComponent.FavoriteButton selected={true} className="favorite-button" onClick={(event) => { alert('a'); event.stopPropagation() }}>
            <FavoriteIcon />
          </StyledComponent.FavoriteButton>
        </StyledComponent.StyledCardMediaContainer>
        <StyledComponent.StyledCardContentContainer>
          <StyledComponent.StyledCardContent>
            <Typography variant="h4" component="p" className="title">
              {props.product && props.product.name
                ? makeFirstLetterUpperCase(props.product.name)
                : "Product Name"}
            </Typography>
          </StyledComponent.StyledCardContent>
          <Typography variant="body2" component="p" className="description">
            {props.product && props.product.description
              ? `${props.product.description.slice(0, 30)}...`
              : "write persuasive copy here or brief description"}
          </Typography>
          <StyledComponent.ActionBar>
            <Typography
              variant="h4"
              component="p"
            >
              {props.product && props.product.price
                ? `QR ${props.product.price}`
                : "No Price"}
            </Typography>
            <Button variant="contained">
              <Typography component="p" variant="h4">
                Buy now
                </Typography>
            </Button>

          </StyledComponent.ActionBar>
        </StyledComponent.StyledCardContentContainer>
      </div>
    </StyledComponent.StyledCard>
  );
};

export default ProductItem;
