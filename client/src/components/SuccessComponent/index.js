import React, { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import styled from "styled-components";
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
import { ReactComponent as TickIcon } from "../../assets/icons/tick.svg";
import { withRouter } from "react-router";
import {
  decrementItemInCart,
  incrementItemInCart,
  deleteItemFromCart,
} from "../../redux/actions/cart.action";

const Container = styled.div`
  ${({ theme, width }) => `
    width: 50%;
    display: flex;
    outline: none;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background:white;
    margin: 0 auto;
    border-radius: 20px;
    .colorGrren {
        color:${theme.palette.secondary.main}
    }
    box-shadow: 0px 3px 40px #00000029;
    padding: 30px 50px;
    margin-top: 100px;
    svg {
        height: 88px;
        width: auto;
        
      }
      
      .a{
        opacity: 1; 
     }
    h3{
        margin:5px;
        text-align: center;
    }
    h5{
        margin:5px;
        text-align: center;
    }
    ${theme.breakpoints.down("sm")} {
     
      padding: 20px 20px;
      h2 {
        text-align: center !important;
        margin-top: 20px;
      }
    }
    position: relative;
    overflow-y: auto;
  `}
`;

const ProductDialog = (props) => {
  const { user } = useSelector((state) => state.authentication);

  return props.open ? (
    <Modal
      open={props.open}
      onClose={props.handleDialogClose}
      style={{ overflow: "scroll", border: "none", width: "100%", zIndex: "4" }}
    >
      <Container>
        <Row>
          <Col>
            <TickIcon />
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography variant="h3" component="h3" className="colorGrren">
              THANKS FOR YOUR ORDER
            </Typography>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography style={{ color: "green" }} variant="h5" component="h5">
              Your Order confirmation number is : {props.orderNumber}
            </Typography>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography variant="h5" component="h5">
              Your will receive an email confirmation shortly
            </Typography>
          </Col>
        </Row>
        <Button
          style={{
            background: "#00b517",
            fontWeight: "300",
            marginTop: "20px",
            textAlign: "center",
          }}
          component="h5"
          variant="h5"
          onClick={() => props.history.push("/")}
        >
          Continue Shoping
        </Button>
      </Container>
    </Modal>
  ) : null;
};

export default withRouter(ProductDialog);
