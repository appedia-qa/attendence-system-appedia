import React, { Component, useRef, useEffect } from "react";
import styled from "styled-components";
import Radio from "@material-ui/core/Radio";
import { Grid, Row, Col } from "react-flexbox-grid";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import { Typography, Box, Button } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Image from "../../../components/Image";
import { handleImageArray } from "../../../utils/image";
import { t } from "@lingui/macro";
import { I18n } from "@lingui/react";
import { withRouter } from "react-router";
import { ReactComponent as ErrorIcon } from "../../../assets/icons/empty-cart.svg";
export const StyledContainer = styled.div``;

export const SvgContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  justify-content: center;
  padding: 20px;
  @media (max-width: 786px) {
    padding: 10px;
  }
  width: 100px;
  height: 25px;
  ${({ active }) => `
  ${
    active == true
      ? `border-left : 1px solid;
       border-top: 1px solid;
       border-right:1px solid;`
      : ""
  }  
 
`}
  svg {
    height: 30px;
    width: 70px;
  }
  svg path {
    stroke: none;
    fill: black;
  }
`;

export const DesktopCheckoutButtonContainer = styled.div`
  ${({ theme }) => `
    margin-top: 50px;
    margin-bottom: 100px;
    justify-content:flex-start;
    display:flex;
    .shop-btn {
      border-radius: 3px;
      height: 50px;
      width: 285px;
      font-size: 16px;
    }
    .shopping {
      background-color: black;
      color: ${theme.palette.white.main};
      margin-right: 10px;
      &:hover {
        background-color: ${theme.palette.secondary.main}; 
      }
    }
    .checkout {
      background-color: ${theme.palette.secondary.main};
      color: ${theme.palette.white.main};      
    }
  `}
`;

export const Container = styled.div`
  padding: 30px;
  overflow-y: scroll;
  height: 400px;
  background: #f5f8fc;
`;

export const RadioGroupIcon = styled(RadioGroup)`
  [class*="col-"] {
    display: flex;
    justify-content: center;
  }
`;

export const Info = styled.div`
  [class*="col-"] {
    padding-left: 10%;
    padding-right: 5%;
  }
`;

export const Line = styled.div`
  height: 2px;
  margin-top: 20px;
  background: #e0e0e0;
`;

export const BoldLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: #e0e0e0;
`;

export const RowContainer = styled.div`
  margin-top: 40px;
  img {
    height: 92px;
    width: 92px;
  }
  p {
    margin-bottom: 8px;
  }
`;
export const RowContainerTwo = styled(Row)`
  display: flex;
  margin: 0px;
  margin-top: 10px;
  width: 100%;
  justify-content: space-around;
  flex-dorection: row;
  p {
  }
`;
const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg {
    width: 100%;
  }
`;

const ShippingAddress = (props) => {
  const imageRef = useRef();

  const varifyImages = (items) => {
    if (items && items.cover_img) {
      return items.cover_img;
    } else {
      return [""];
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <I18n>
      {({ i18n }) => (
        <StyledContainer>
          {props.items && props.items.length > 0 ? (
            <div>
              <Container>
                <Typography variant="h5" component="h5">
                  {i18n._(t`Shopping Cart Overview`)}
                </Typography>
                <Line />
                <RowContainer>
                  {props.items &&
                    props.items.map((item, index) => {
                      return (
                        <Row style={{ marginTop: "20px" }}>
                          <Col xs={6} md={12} lg={6}>
                            <Image src={handleImageArray(varifyImages(item))} />
                          </Col>
                          <Col xs={6} md={12} lg={6}>
                            <Typography
                              variant="body2"
                              component="p"
                              className="description"
                            >
                              {item.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              component="p"
                              className="description"
                            >
                              Goes here
                            </Typography>
                            <Typography
                              variant="body1"
                              component="p"
                              className="description"
                            >
                              QR {item.price * item.qty}
                            </Typography>
                          </Col>
                        </Row>
                      );
                    })}
                </RowContainer>
              </Container>
              <RowContainerTwo>
                <Col xs={8}>
                  <Typography
                    variant="body1"
                    component="p"
                    className="description"
                  >
                    {i18n._(t`Subtotal`)}
                  </Typography>
                </Col>
                <Col xs={4}>
                  <Typography
                    style={{ fontWeight: "600" }}
                    variant="body1"
                    component="p"
                    className="description"
                  >
                    Qr {props.totalPriceOfCart && props.totalPriceOfCart}
                  </Typography>
                </Col>
              </RowContainerTwo>
              <RowContainerTwo>
                <Col xs={8}>
                  <Typography
                    variant="body1"
                    component="p"
                    className="description"
                  >
                    {i18n._(t`Delivery Charge`)}
                  </Typography>
                </Col>
                <Col xs={4}>
                  <Typography
                    style={{ fontWeight: "600" }}
                    variant="body1"
                    component="p"
                    className="description"
                  >
                    Qr {i18n._(t`30`)}
                  </Typography>
                </Col>
              </RowContainerTwo>
              <RowContainerTwo
                style={{ height: "50px", background: "#1362B1" }}
              >
                <Col style={{ display: "flex", alignItems: "center" }} xs={8}>
                  <Typography
                    style={{ color: "white" }}
                    variant="body1"
                    component="p"
                    className="description"
                  >
                    {i18n._(t`Total`)}
                  </Typography>
                </Col>
                <Col style={{ display: "flex", alignItems: "center" }} xs={4}>
                  <Typography
                    style={{ color: "white", fontWeight: "600" }}
                    variant="body1"
                    component="p"
                    className="description"
                  >
                    Qr{" "}
                    {props.totalPriceOfCart &&
                      parseInt(props.totalPriceOfCart) + 30}
                  </Typography>
                </Col>
              </RowContainerTwo>
            </div>
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
        </StyledContainer>
      )}
    </I18n>
  );
};

export default withRouter(ShippingAddress);
