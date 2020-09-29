import React from "react";
import * as StyledComponent from "./styles";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import { Chip } from "@material-ui/core";
import { ReactComponent as ShopSVG } from "../../assets/icons/shop.svg";

const imageURL =
  "https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";

const ProductItemDouble = props => {
  return (
    <StyledComponent.DoubleContainer width={props.width}>
      <StyledComponent.StyledCard>
        <StyledComponent.Header>
          <StyledComponent.RatingContainer>
            <Rating size="small" />
            <Typography variant="subtitle2" color="textSecondary" component="p">
              {props && props.reviews && props.reviews.length
                ? props.reviews.length === 1
                  ? "1 review"
                  : `${props.reviews.length} reviews`
                : "No reviews"}
            </Typography>
          </StyledComponent.RatingContainer>
          <Chip size="small" label="Most Popular"></Chip>
        </StyledComponent.Header>
        <StyledComponent.StyledCardMedia
          image={
            props.product && props.product.image
              ? props.product.image
              : imageURL
          }
          title="Paella dish"
        />

        <StyledComponent.StyledCardContent>
          <Typography variant="h5" component="p" className="title">
            {props.product && props.product.name
              ? props.product.name
              : "Product Name"}
          </Typography>
        </StyledComponent.StyledCardContent>
        <Typography variant="subtitle1" component="p" className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </Typography>
        <StyledComponent.ActionBar>
          <div className="left">
            <Typography variant="body2">QR 0,000</Typography>
          </div>
          <div
            className="right"
            onClick={() => {
              alert("click");
            }}
          >
            <Typography variant="body2">Shop Now</Typography>
            <ShopSVG />
          </div>
        </StyledComponent.ActionBar>
      </StyledComponent.StyledCard>
    </StyledComponent.DoubleContainer>
  );
};

export default ProductItemDouble;
