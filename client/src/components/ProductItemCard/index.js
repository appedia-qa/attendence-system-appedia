import React, { useRef } from "react";
import * as StyledComponent from "./styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Typography from "@material-ui/core/Typography";
import { makeFirstLetterUpperCase } from "../../utils/strings";
import { useDispatch } from "react-redux";
import {
  addItemIntoWishList,
  deleteItemFromWishList,
} from "../../redux/actions/wishList.action";
import { handleImageArray } from "../../utils/image";
import Button from "@material-ui/core/Button";
import {
  addItemIntoCart,
  deleteItemFromCart,
} from "../../redux/actions/cart.action";
import { openProductDialog } from "../../redux/actions/productDialog.action";

const fetchImageURL = (props) => {
  if (props.product && props.product && props.product.cover_img) {
    return handleImageArray(props.product.cover_img);
  }
  return require("../../assets/images/no-image.jpg");
};

const ProductItem = (props) => {
  const imageRef = useRef();
  const dispatch = useDispatch();

  const handleCartItemAdd = (e) => {
    e.stopPropagation();
    if (props && props.product) {
      dispatch(addItemIntoCart({ ...props.product, qty: 1 }));
    }
  };

  const handleWishLst = (e) => {
    e.stopPropagation();
    if (props.product.addedToWishlist) {
      dispatch(deleteItemFromWishList(props.product.id));
    } else {
      dispatch(addItemIntoWishList(props.product));
    }
  };
  return (
    <StyledComponent.StyledCard
      className="product-item-card"
      onClick={() => {
        dispatch(openProductDialog(props.product.id));
      }}
    >
      <StyledComponent.StyledCardMediaContainer>
        <StyledComponent.StyledCardMedia
          src={fetchImageURL(props)}
          ref={imageRef}
          onError={() => {
            imageRef.current.src = require("../../assets/images/no-image.jpg");
          }}
        />
        <StyledComponent.FavoriteButton
          selected={props.product.addedToWishlist ? true : false}
          class="favorite-button"
          onClick={(e) => handleWishLst(e)}
        >
          <FavoriteIcon />
        </StyledComponent.FavoriteButton>
      </StyledComponent.StyledCardMediaContainer>
      <div>
        <StyledComponent.StyledCardContentContainer>
          <div>
            <StyledComponent.StyledCardContent>
              <Typography variant="h4" component="p" className="title">
                {props.product && props.product.name
                  ? makeFirstLetterUpperCase(props.product.name)
                  : "Product Name"}
              </Typography>
            </StyledComponent.StyledCardContent>
            <Typography
              variant="body2"
              component="p"
              className="description"
              dangerouslySetInnerHTML={{
                __html:
                  props.language == "ENGLISH"
                    ? props.product && props.product.description
                      ? `${props.product.description}`
                      : "No Description"
                    : props.product && props.product.arabic_description
                    ? props.product.arabic_description
                    : "No Description",
              }}
            ></Typography>
          </div>
          <StyledComponent.ActionBar>
            <Typography variant="h4" component="p">
              {props.product && props.product.price
                ? `QR ${props.product.price}`
                : "No Price"}
            </Typography>
            <p>{props.product.addedToCart}</p>
            <Button
              disabled={
                props.product.quantity === 0
                  ? true
                  : false || props.product.addedToCart
                  ? true
                  : false
              }
              variant="contained"
              onClick={(e) => handleCartItemAdd(e)}
            >
              {props.product.quantity === 0 ? (
                <Typography component="p" variant="h4">
                  Not Available
                </Typography>
              ) : (
                <Typography component="p" variant="h4">
                  {props.product.addedToCart ? "Added to Cart" : "Add to Cart"}
                </Typography>
              )}
            </Button>
          </StyledComponent.ActionBar>
        </StyledComponent.StyledCardContentContainer>
      </div>
    </StyledComponent.StyledCard>
  );
};

export default ProductItem;
