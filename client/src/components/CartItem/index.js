import React, { useState } from "react";
import * as Styles from "./styles";
import { Typography, Box, Button, Divider } from "@material-ui/core";
import { Grid, Row, Col } from "react-flexbox-grid";
import NumericInput from "../../components/NumericInput";
import DeleteDialouge from "../../components/DeletePopUp";
import { useDispatch } from "react-redux";
import {
  decrementItemInCart,
  incrementItemInCart,
  deleteItemFromCart,
} from "../../redux/actions/cart.action";
import { handleImageArray } from "../../utils/image";
import Image from "../Image";
import { ReactComponent as DeleteIcon } from "../../assets/icons/greenWeb/delete.svg";
import { t } from "@lingui/macro";
import { I18n } from "@lingui/react";

const CartItem = (props) => {
  const dispatch = useDispatch();

  const [deleteFromCart, setDeleteFromCart] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(props.product.qty);

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
    // let images = items.cover_img_arr;
    // if (images && typeof images === "string" && images.length > 0) {
    //   images = JSON.parse(items.cover_img_arr);
    //   if (images && typeof images === "object" && images.length > 0) {
    //     return images[0];
    //   }
    // }
    // if (images && typeof images === "object" && images.length > 0) {
    //   return images[0];
    // }
  };
  if (!(props && props.product)) return null;
  return (
    <I18n>
      {({ i18n }) => (
        <div>
          <Styles.ContainerRow>
            <Col sm={4}>
              <Typography component="p" variant="subtitle1" className="header">
                {i18n._(t`Product`)}
              </Typography>
              <Styles.ProductDescription>
                <Image src={handleImageArray(varifyImages(props.product))} />
                <div className="product-description">
                  <Typography
                    component="p"
                    variant="body2"
                    className="product-name"
                  >
                    {props.product.name}
                  </Typography>
                </div>
              </Styles.ProductDescription>
            </Col>
            <Col sm={3}>
              <Typography component="p" variant="subtitle1" className="header">
                {i18n._(t`Quantity`)}
              </Typography>
              <Styles.FlexContainer>
                <NumericInput
                  label="Quantity"
                  defaultValue={1}
                  handleChange={handleQuantityChange}
                  value={selectedQuantity}
                  handleIncrease={handleIncrease}
                  handleDecrease={handleDecrease}
                />
              </Styles.FlexContainer>
            </Col>
            <Col sm={3}>
              <Typography component="p" variant="subtitle1" className="header">
                {i18n._(t`Price`)}
              </Typography>
              <Styles.FlexContainer>
                <Typography component="p" class="price" variant="body1">
                  QR {props.product.price * props.product.qty}
                </Typography>
              </Styles.FlexContainer>
            </Col>
            <Col sm={2}>
              <Typography
                component="p"
                variant="subtitle1"
                className="header"
              ></Typography>

              <Styles.RemoveButtonContainer>
                <DeleteIcon onClick={() => handleUserDialogOpen()} />
              </Styles.RemoveButtonContainer>
            </Col>
            <DeleteDialouge
              delete={deleteItem}
              open={deleteFromCart}
              handleUserDialogClose={handleUserDialogClose}
            />
          </Styles.ContainerRow>
          <Divider />
        </div>
      )}
    </I18n>
  );
};

export default CartItem;
