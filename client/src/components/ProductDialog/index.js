import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import styled from "styled-components";
import { withRouter } from "react-router";
import { Typography, Button, IconButton } from "@material-ui/core";
import ProductCarousel from "../../components/ProductCarousel";
import { Col, Row } from "react-flexbox-grid";
import NumericInput from "../NumericInput";
import { useDispatch, useSelector } from "react-redux";
import { addItemIntoCart } from "../../redux/actions/cart.action";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { ReactComponent as MinimizeIcon } from "../../assets/icons/minimize-2.svg";
import LoaderComponent from "../LoaderComponent";
import { t } from "@lingui/macro";
import { I18n } from "@lingui/react";
import {
  decrementItemInCart,
  incrementItemInCart,
  deleteItemFromCart,
} from "../../redux/actions/cart.action";
import {
  addItemIntoWishList,
  deleteItemFromWishList,
} from "../../redux/actions/wishList.action";
import { closeProductDialog } from "../../redux/actions/productDialog.action";
import { useEffect } from "react";

const Container = styled.div`
  ${({ theme, width }) => `
    // position: absolute;
    width: 80%;
    outline: none;
    max-width: 1000px;
    background:white;
    margin: 0 auto;
    box-shadow: 0px 3px 40px #00000029;
    padding: 30px 50px;
    margin-top: 65px;
    max-height: 70%;

    ${theme.breakpoints.down("sm")} {
      margin-top: 50px;
      padding: 20px 20px;
      h2 {
        text-align: center !important;
        margin-top: 20px;
        
      }
    }
    position: relative;
    border-radius: 20px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
    width: 0px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
::-webkit-scrollbar-thumb {
    background: #FF0000;
}
   
  `}
`;

const CloseButton = styled.div`
  ${({ theme }) => `
    background-color: ${theme.palette.red.main};
    position: absolute;
    right: 0;
    top: 0;
    height: 46px;
    width: 52px;
    border-radius: 0 20px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg {
      height: 20px;
      width: auto;
    }
  `}
`;

const Header = styled.div`
  ${({ theme }) => `
    margin: 10px 23px 20px;
    padding-bottom: 10px;
    border-bottom: 1px ${theme.palette.lightGray[300]} solid;
  `}
`;

const DetailContainer = styled.div`
  ${({ theme }) => `
    h2 {
      font-size: 29px;
      color: ${theme.palette.primaryTextColor.main}; 
      margin-bottom: 30px;
    }

    p {
      font-size: 16px;
      font-weight: 300;
      color: ${theme.palette.disabledText.main};
      margin-bottom: 40px;
    }

    .textBox {
      padding: 5% 2%;
      flex: 1;
    }
  `}
`;

const AdditionalInfoContainer = styled.div`
  ${({ theme }) => `

    h2 {
      font-size: 29px;
      color: ${theme.palette.primary[800]};
      text-align:right;
    }
    button:not(.MuiIconButton-root) {
      margin: 10px 0;
      border-radius: 0;
      font-size: 17px;
      ${theme.breakpoints.down("sm")} {
        font-size: 13px;
      }
      height: 47px;
      width: 100%;
    }

    .goToShopping {
      border: 2px solid ${theme.palette.blue[500]};
      border-radius: 0;
    }

    .addToCart {
      color: white;
      svg {
        margin-left: 15px;
      }
    }
  `}
`;

const ActionContainer = styled.div`
  margin-top: 50px;
`;

const TransparentButton = styled.div`
  ${({ theme }) => `
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    margin-top: 10px;
    
    button {
      padding: 0;
    }
    svg {
      height: 18px;
      width: auto;
      fill: ${theme.palette.secondary.main}
    }

    p {
      font-size: 12px;
      margin-left: 20px;
    }

    svg.unfilled path{
      fill: ${theme.palette.disabledText.main}
    }
  `}
`;

const DivContainer = styled.div`
  ${({ theme }) => `

  `}
`;

const ProductDialog = (props) => {
  let product = {};
  const dispatch = useDispatch();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [prevProductId, setPrevProductId] = useState(-1);
  const handleQuantityChange = (event) => {
    let value = 0;
    try {
      value = parseInt(event.target.value);
      if (value < 0) {
        value = 1;
      } else if (value > product.quantity) {
        value = product.quantity;
      }
    } catch (e) {}
    setSelectedQuantity(value);
  };

  const handleDecrease = () => {
    if (selectedQuantity - 1 < 1) return;
    dispatch(decrementItemInCart({ id: product.id }));
    setSelectedQuantity(selectedQuantity - 1);
  };

  const handleIncrease = () => {
    if (selectedQuantity === product.quantity) return;
    dispatch(incrementItemInCart({ id: product.id }));
    setSelectedQuantity(selectedQuantity + 1);
  };

  const handleAddToCart = () => {
    const qty = selectedQuantity ? selectedQuantity : 1;
    const variable = {
      ...product,
      qty: qty,
    };
    dispatch(addItemIntoCart(variable));
  };

  const handleFavorite = () => {
    if (product.addedToWishlist) {
      dispatch(deleteItemFromWishList(product.id));
    } else {
      dispatch(addItemIntoWishList(product));
    }
  };

  const handleShare = () => {};

  const productDialog = useSelector((state) => state.productDialog);

  product = productDialog.product;

  useEffect(() => {
    if (productDialog && productDialog.product) {
      setSelectedQuantity(productDialog.product.qty);
    }
  }, [productDialog.product]);

  const checksForImages = (product) => {
    if (
      product &&
      product.cover_img_arr &&
      typeof product.cover_img_arr == "string" &&
      product.cover_img_arr.length > 0
    ) {
      product.cover_img_arr = JSON.parse(product.cover_img_arr);
      if (
        typeof product.cover_img_arr == "object" &&
        product.cover_img_arr.length > 0
      ) {
        return product.cover_img_arr;
      }
    }
    if (
      product &&
      product.cover_img_arr &&
      typeof product.cover_img_arr == "object" &&
      product.cover_img_arr.length > 0
    ) {
      return product.cover_img_arr;
    }
    if (product && product.cover_img) {
      let arr = [];
      arr.push(product.cover_img);

      return arr;
    } else {
      return [""];
    }
  };

  return productDialog.isDialogOpen ? (
    <I18n>
      {({ i18n }) => (
        <Modal
          open={productDialog.isDialogOpen}
          onClose={() => dispatch(closeProductDialog())}
          style={{ overflow: "scroll", zIndex: "4", border: "none" }}
        >
          {!productDialog.loading &&
          productDialog &&
          productDialog.product != null ? (
            <Container>
              <DivContainer>
                <CloseButton onClick={() => dispatch(closeProductDialog())}>
                  <MinimizeIcon />
                </CloseButton>
                <Header>
                  <Typography> {i18n._(t`Product Detail`)} </Typography>
                </Header>
                <Row>
                  <Col xs={12} md={3}>
                    <ProductCarousel items={checksForImages(product)} />
                  </Col>
                  <Col xs={12} md={5}>
                    <DetailContainer>
                      <Typography variant="h2" component="h2">
                        {product.name}
                      </Typography>
                      <Typography variant="body1" component="p">
                        {product.detail}
                      </Typography>
                      {product.quantity > 0 ? (
                        <NumericInput
                          label="Quantity"
                          defaultValue={1}
                          handleChange={handleQuantityChange}
                          value={selectedQuantity}
                          handleIncrease={handleIncrease}
                          handleDecrease={handleDecrease}
                          style={{ marginTop: "10px" }}
                        />
                      ) : (
                        <Typography component="p">
                          {i18n._(t`Out of stock`)}{" "}
                        </Typography>
                      )}
                      <div
                        className="textBox"
                        dangerouslySetInnerHTML={{
                          __html:
                            props.language == "ENGLISH"
                              ? product.description
                              : product.arabic_description,
                        }}
                      ></div>{" "}
                    </DetailContainer>
                  </Col>
                  <Col xs={12} md={4}>
                    <AdditionalInfoContainer>
                      <Typography component="h2" variant="h2">
                        QR {product.price * selectedQuantity}
                      </Typography>
                      <ActionContainer>
                        <TransparentButton onClick={handleFavorite}>
                          <IconButton>
                            <FavoriteIcon
                              className={
                                product.addedToWishlist ? null : `unfilled`
                              }
                            />
                          </IconButton>
                          <Typography component="p">
                            {product.addedToWishlist
                              ? `${i18n._(t`ADDED`)}`
                              : `${i18n._(t`ADD`)}`}
                            {i18n._(t`TO FAVORITES`)}
                          </Typography>
                        </TransparentButton>
                        <Button
                          variant="outlined"
                          className="goToShopping"
                          onClick={() => dispatch(closeProductDialog())}
                        >
                          {i18n._(t`CONTINUE SHOPPING`)}
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          className="addToCart"
                          onClick={handleAddToCart}
                          disabled={product.outOfStock || product.addedToCart}
                        >
                          {product.outOfStock ? (
                            <span> {i18n._(t`NOT AVAILABLE`)} </span>
                          ) : (
                            <span>
                              {product.addedToCart
                                ? `${i18n._(t`ADDED`)}`
                                : `${i18n._(t`ADD`)}`}{" "}
                              {i18n._(t`TO CART`)}
                            </span>
                          )}
                          <ShoppingCartIcon />
                        </Button>
                      </ActionContainer>
                    </AdditionalInfoContainer>
                  </Col>
                </Row>
              </DivContainer>
            </Container>
          ) : (
            <LoaderComponent />
          )}
        </Modal>
      )}
    </I18n>
  ) : null;
};

export default withRouter(ProductDialog);
