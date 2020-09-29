import React from "react";
import * as Styles from "./styles";
import { Typography, Box, Button, Divider } from "@material-ui/core";
import { Grid, Row, Col } from "react-flexbox-grid";
import NumericInput from "../../components/NumericInput";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import {
  deleteItemFromWishList
} from "../../redux/actions/wishList.action";

const WishlistItemMobile = (props) => {
  const dispatch = useDispatch();

  if (!(props && props.product)) return null;

  return (
    <Styles.ContainerRow>
      <Col xs={8}>
        <Row>
          <Styles.ProductIcon src="https://i.ya-webdesign.com/images/visa-card-png-10.png" />
          <Styles.ProductDescription>
            <div className="product-container">
              <Typography
                component="p"
                variant="body1"
                className="product-name"
              >
                {props.product.name}
              </Typography>
            </div>
          </Styles.ProductDescription>
        </Row>
      </Col>
      <Col xs={4}>
        <div className="row-right">
          <DeleteIcon
            onClick={() =>
              dispatch(
                deleteItemFromWishList(props.product.id)
              )
            }
          />
          <Typography component="p" class="price" variant="body1">
            QR {props.product.price * props.product.qty}
          </Typography>
        </div>
      </Col>
    </Styles.ContainerRow>
  );
};

export default WishlistItemMobile;
