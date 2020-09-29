import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography, Box, Button, Divider } from "@material-ui/core";
import { Grid, Row, Col } from "react-flexbox-grid";
import CartItem from "../../../components/CartItem";
import Breakpoints from "../../../constants/Breakpoints";
import CartItemMobile from "../../../components/CartItemMobile";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { apiUrl, baseUrl } from "../../../constants/urls";
import { cartData } from "../../../redux/actions/cart.action";
// import { ReactComponent as ErrorIcon } from "../../../assets/images/error.svg";
import GuestUserDialog from "../../../components/GuestUserDialog";
import { ReactComponent as ErrorIcon } from "../../../assets/icons/empty-cart.svg";
import { t } from "@lingui/macro";
import { I18n } from "@lingui/react";
import { addErrorItemInAlert } from "../../../redux/actions/alert.action";
import { ReactComponent as IconsBootomOne } from "../../../assets/icons/greenWeb/iconsBottom1.svg";
const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg {
    width: 100%;
  }
`;
const DesktopTotalRowContainer = styled(Row)`
  ${({ theme }) => `
   
    align-items:center;
    background:#EFEFF4;
    .total-title-container {
      display:flex;
      justify-content: flex-end;
      .total-title {
        padding:0;
      margin:0px;
        font-size: 14px;
        color: ${theme.palette.brown.main};
      }
    }
    .total-amount {
      padding:2px;
      margin:2px;
      font-size: 15px;
      color: ${theme.palette.primary.main};
      font-weight: bold;
    }
  `}
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 5%;
  flex-direction: column;
  align-items: center;
`;

export const DesktopCheckoutButtonContainer = styled.div`
  ${({ theme }) => `
    margin-top: 50px;
    margin-bottom: 100px;
    justify-content:flex-end;
    display:flex;
    .shop-btn {
      border-radius: 3px;
      height: 50px;
      width: 285px;
      font-size: 16px;
    }
    .shopping {
      border: 1px solid ${theme.palette.primary.main};
      background-color: ${theme.palette.primary.main};
      color: ${theme.palette.white.main};    
      margin-right: 10px;
      margin-left: 10px;
    }
    .checkout {
      background-color:${theme.palette.secondary.main}
      color: ${theme.palette.white.main};      
    }
  `}
`;

const MobileCheckoutContainer = styled.div`
  margin-top: 30px;
`;

const MainContainer = styled.div`
  padding: 50px;
`;

const MobileCheckoutRow = styled.div`
  p {
    margin: 0;
    padding: 0;
  }
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;
const MobileCheckoutButtonContainer = styled.div`
  ${({ theme }) => `
    button {
      // margin-top: 10px;
      height: 50px;
      width: 100%;
      background-color:${theme.palette.secondary.main}
      color: ${theme.palette.white.main};    
      margin-bottom: 20px;
    }

    button:hover {
      background-color: ${theme.palette.primary[900]};
    }
  `}
`;

const Cart = (props) => {
  const cartReducer = useSelector((state) => state.cart);
  const [openGusetUser, setOpenGusetUser] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authentication);

  useEffect(() => {
    if (user && user.id) {
      dispatch(cartData({ id: user.id }));
    }
  }, []);

  const handleUserDialogClose = () => {
    // fetchALLUser();
    setOpenGusetUser(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handelChkout = async () => {
    if (cartReducer.totalPrice >= 50) {
      props.history.push("/checkout");
    } else {
      dispatch(
        addErrorItemInAlert({
          message: "cart must have minimum buy of qr 50.00",
        })
      );
    }
  };

  return props.windowWidth > Breakpoints.XS_MAX ? (
    <I18n>
      {({ i18n }) => (
        <MainContainer>
          {cartReducer &&
          cartReducer.cartItems &&
          cartReducer.cartItems.length > 0 ? (
            cartReducer &&
            cartReducer.cartItems &&
            cartReducer.cartItems.map((cart) => {
              return <CartItem product={cart} userId={user && user.id} />;
            })
          ) : (
            <EmptyCartContainer>
              <ErrorIcon class="imageError" />
              <h1>{i18n._(t`Your cart’s looking pretty empty there!`)}</h1>
              <Button
                style={{
                  color: "white",
                  padding: "10px",
                  background: "gray",
                  marginBottom: "30px",
                }}
                onClick={() => props.history.push("/")}
              >
                {i18n._(t`CONTINUE SHOPPING`)}
              </Button>
            </EmptyCartContainer>
          )}
          {cartReducer &&
            cartReducer.cartItems &&
            cartReducer.cartItems.length > 0 && (
              <div style={{ marginTop: "10px" }}>
                <DesktopTotalRowContainer>
                  <Col sm={10} className="total-title-container">
                    <p className="total-title">{i18n._(t`Subtotal`)}</p>
                  </Col>
                  <Col sm={2}>
                    <p className="total-amount">
                      Qr {cartReducer.totalPrice && cartReducer.totalPrice}
                    </p>
                  </Col>
                </DesktopTotalRowContainer>
                <DesktopTotalRowContainer>
                  <Col sm={10} className="total-title-container">
                    <p className="total-title">{i18n._(t`Delivery Charge`)}</p>
                  </Col>
                  <Col sm={2}>
                    <p className="total-amount">Qr 30</p>
                  </Col>
                </DesktopTotalRowContainer>
                <DesktopTotalRowContainer>
                  <Col sm={10} className="total-title-container">
                    <p className="total-title">{i18n._(t`Total`)}</p>
                  </Col>
                  <Col sm={2}>
                    <p className="total-amount">
                      Qr{" "}
                      {cartReducer.totalPrice &&
                        parseFloat(cartReducer.totalPrice) + 30}
                    </p>
                  </Col>
                </DesktopTotalRowContainer>
              </div>
            )}
          {cartReducer &&
            cartReducer.cartItems &&
            cartReducer.cartItems.length > 0 && (
              <DesktopCheckoutButtonContainer>
                <Button
                  className="shop-btn shopping"
                  onClick={() => props.history.push("/")}
                >
                  {i18n._(t`CONTINUE SHOPPING`)}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className="shop-btn checkout"
                  onClick={() => handelChkout()}
                >
                  {i18n._(t`CHECKOUT`)}
                </Button>
              </DesktopCheckoutButtonContainer>
            )}

          <Col
            lg={12}
            style={{
              width: "100%",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <IconsBootomOne />
          </Col>

          <GuestUserDialog
            handleUserDialogClose={handleUserDialogClose}
            open={openGusetUser}
          />
        </MainContainer>
      )}
    </I18n>
  ) : (
    <I18n>
      {({ i18n }) => (
        <MainContainer style={{ padding: "20px" }}>
          {cartReducer &&
          cartReducer.cartItems &&
          cartReducer.cartItems.length > 0 ? (
            cartReducer &&
            cartReducer.cartItems.map((cart) => (
              <CartItemMobile product={cart} userId={user && user.id} />
            ))
          ) : (
            <EmptyCartContainer>
              <ErrorIcon class="imageError" />
              <h1>{i18n._(t`Your cart’s looking pretty empty there!`)}</h1>
              <Button
                style={{
                  color: "white",
                  padding: "10px",
                  background: "#4AB43A",
                  marginBottom: "30px",
                }}
                onClick={() => props.history.push("/")}
              >
                {i18n._(t`CONTINUE SHOPPING`)}
              </Button>
            </EmptyCartContainer>
          )}
          {cartReducer &&
            cartReducer.cartItems &&
            cartReducer.cartItems.length > 0 && (
              <MobileCheckoutContainer>
                <Divider />
                <MobileCheckoutRow>
                  <p>{i18n._(t`Subtotal`)}</p>
                  <p> {cartReducer.totalPrice && cartReducer.totalPrice}</p>
                </MobileCheckoutRow>
                <MobileCheckoutRow>
                  <p>{i18n._(t`Delivery Charge`)}</p>
                  <p> QR 30</p>
                </MobileCheckoutRow>
                <MobileCheckoutRow>
                  <p>{i18n._(t`TOTAL`)}</p>
                  <p>
                    {cartReducer.totalPrice &&
                      parseFloat(cartReducer.totalPrice) + 30}
                  </p>
                </MobileCheckoutRow>
                <MobileCheckoutButtonContainer>
                  <Button
                    className="shop-btn shopping"
                    onClick={() => props.history.push("/")}
                    style={{ color: "white", background: "gray" }}
                  >
                    {i18n._(t`CONTINUE SHOPPING`)}
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handelChkout}
                  >
                    {i18n._(t`CHECKOUT`)}
                  </Button>
                </MobileCheckoutButtonContainer>
              </MobileCheckoutContainer>
            )}
          <Col
            lg={12}
            style={{
              width: "100%",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <IconsBootomOne />
          </Col>

          <GuestUserDialog
            handleUserDialogClose={handleUserDialogClose}
            open={openGusetUser}
          />
        </MainContainer>
      )}
    </I18n>
  );
};

export default Cart;
