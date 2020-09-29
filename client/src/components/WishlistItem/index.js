import React from "react";
import * as Styles from "./styles";
import { Typography, Box, Button, Divider } from "@material-ui/core";
import { Grid, Row, Col } from "react-flexbox-grid";
import NumericInput from "../../components/NumericInput";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import {
  addItemIntoWishList,
  deleteItemFromWishList,
} from "../../redux/actions/wishList.action";
import { handleImageArray } from "../../utils/image";
import Image from "../Image";
import { t, Trans } from "@lingui/macro";
import { I18n } from "@lingui/react";

const WishlistItem = (props) => {
  const dispatch = useDispatch();

  if (!(props && props.product)) return null;
  return (
    <I18n>
      {({ i18n }) => (
    <div>
      <Styles.ContainerRow>
        <Col sm={4} xs={12}>
          <Typography component="p" variant="subtitle1" className="header">
          {i18n._(t`Product`)}  
          </Typography>
          <Styles.ProductDescription>
            <Image src={handleImageArray(props.product.cover_img_arr)[0]} />
            <div className="product-description">
              <Typography
                component="p"
                variant="body2"
                className="product-name"
              >
                {props.product.name}
              </Typography>
              {/* <Typography
                component="p"
                variant="subtitle2"
                className="product-size"
              >
                Size:
                {props.product.product_attributes &&
                props.product.product_attributes.size
                  ? props.product.product_attributes.size
                  : ""}
              </Typography>
              <Typography
                component="p"
                variant="subtitle2"
                className="product-color"
              >
                Color:
                {props.product.product_attributes &&
                props.product.product_attributes.color
                  ? props.product.product_attributes.color
                  : ""}
              </Typography> */}
            </div>
          </Styles.ProductDescription>
        </Col>
        <Col sm={3} xs={12}>
          <Typography component="p" variant="subtitle1" className="header">
          {i18n._(t`Price`)} 
          </Typography>
          <Styles.FlexContainer>
            <Typography component="p" class="price" variant="body1">
              QR {props.product.price}
            </Typography>
          </Styles.FlexContainer>
        </Col>
        <Col sm={3} xs={12}>
          <Styles.RemoveButtonContainer>
            <Button
              onClick={() => dispatch(deleteItemFromWishList(props.product.id))}
            >
              <DeleteIcon />
              <p>{i18n._(t`Remove`)} </p>
            </Button>
          </Styles.RemoveButtonContainer>
        </Col>
      </Styles.ContainerRow>
      <Divider />
    
      </div>
      )}
    </I18n>
  );
};

export default WishlistItem;
