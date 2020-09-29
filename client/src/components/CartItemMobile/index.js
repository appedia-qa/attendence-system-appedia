import React, { useState } from "react";
import * as Styles from "./styles";
import { Typography, Box, Button, Divider } from "@material-ui/core";
import { Grid, Row, Col } from "react-flexbox-grid";
import NumericInput from "../../components/NumericInput";
import { ReactComponent as DeleteIcon } from "../../assets/icons/greenWeb/delete.svg";
import DeleteDialouge from "../../components/DeletePopUp";
import { useDispatch } from "react-redux";
import {
  decrementItemInCart,
  incrementItemInCart,
  deleteItemFromCart,
} from "../../redux/actions/cart.action";
import { handleImageArray } from "../../utils/image";
import Image from "../Image";

const CartItemMobile = (props) => {
  const dispatch = useDispatch();

  const [deleteFromCart, setDeleteFromCart] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(props.product.qty);
  if (!(props && props.product)) return null;

  const handleUserDialogClose = () => {
    // fetchALLUser();
    setDeleteFromCart(false);
  };

  const handleUserDialogOpen = () => {
    // fetchALLUser();
    setDeleteFromCart(true);
  };
  const deleteItem = () => {
    dispatch(deleteItemFromCart(props.product));
    setDeleteFromCart(false);
  };

  const handleQuantityChange = (event) => {
    let value = 0;
    try {
      value = parseInt(event.target.value);
      if (value < 0) {
        value = 1;
      } else if (value > props.product.quantity) {
        value = props.product.quantity;
      }
    } catch (e) {}
    setSelectedQuantity(value);
  };

  const handleDecrease = () => {
    if (selectedQuantity - 1 < 1) return;
    dispatch(decrementItemInCart({ id: props.product.id }));
    setSelectedQuantity(selectedQuantity - 1);
  };

  const handleIncrease = () => {
    if (selectedQuantity === props.product.quantity) return;
    dispatch(incrementItemInCart({ id: props.product.id }));
    setSelectedQuantity(selectedQuantity + 1);
  };

  const varifyImages = (items) => {
    
    if (items && items.cover_img) {
      return items.cover_img;
    } else {
      return [""];
    }
  };
  if (!(props && props.product)) return null;

  return (
    <Styles.ContainerRow>
      <Col xs={8}>
        <Row style={{ flexDirection: "column" }}>
          <Styles.ProductIcon
            src={handleImageArray(varifyImages(props.product))}
          />
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
            <NumericInput
              label="Quantity"
              defaultValue={1}
              handleChange={handleQuantityChange}
              value={selectedQuantity}
              handleIncrease={handleIncrease}
              handleDecrease={handleDecrease}
            />
          </Styles.ProductDescription>
        </Row>
      </Col>
      <Col xs={4}>
        <div className="row-right">
          <DeleteIcon onClick={() => handleUserDialogOpen()} />
          <Typography component="p" class="price" variant="body1">
            QR {props.product.price * props.product.qty}
          </Typography>
        </div>
      </Col>
      <Styles.Line />
      <DeleteDialouge
        delete={deleteItem}
        open={deleteFromCart}
        handleUserDialogClose={handleUserDialogClose}
      />
    </Styles.ContainerRow>
  );
};

export default CartItemMobile;
