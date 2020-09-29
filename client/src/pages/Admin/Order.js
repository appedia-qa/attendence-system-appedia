import React, { Component, Fragment, useEffect } from "react";
import styled from "styled-components";
import { Row, Col, Grid } from "react-flexbox-grid";
import { useState } from "react";
import { t, Trans } from "@lingui/macro";
import { I18n } from "@lingui/react";
import { handleImageArray } from "../../utils/image";
import Image from "../../components/Image";
import Breakpoints from "../../constants/Breakpoints";
import { Button } from "@material-ui/core";
const OrderSectionWithOrders = styled.div`
  ${({ theme, width }) => `
  padding-top: 5px;
  padding-bottom: 20px;
  h1 {
    padding-left: 11%;
    font-size: 18px;
    font-weight: 500;
    color: #191919;
  }
  `}
`;

const OrderContainer = styled.div`
  .detail-close {
    display: none;
  }
  .detail-open {
    display: block;
  }
`;
const DivContainer = styled.div`
  display: flex;
  flex-dirention: row;
  justify-content: space-between;
  .bold {
    font-weight: bolder;
  }
`;
const OrderSummary = styled(Row)`
  ${({ theme, width, orderNumber, showDetail }) => ` 
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 11%;
    padding-right: 3%;
    width: 100%;
    margin-left: 0;
    margin-right: 0;
    display: flex;
    justify-content: space-between;
    ${
      orderNumber % 2 === 0
        ? `background-color: #97979723;`
        : `background-color: white;
      border: 1px solid #97979723;`
    }  
    button {
      ${width < 992 ? `margin-top: 22px;` : `margin-top: 7px;`}
        min-height: 28px;
        width: 120px;
        ${
          showDetail
            ? `background-color: #707070;
           color: white;
           border:none;`
            : `background-color: transparent;
           color: #191919;
           border: 1px solid #191919;`
        }
        font-weight: 300;
        cursor: pointer;
        &:focus {
          outline: none;
        }
    }
    .col-md-3 {
      padding-left: 0;
      padding-right: 0;
    }
    h3 {
     font-size: 11px;
     font-weight: 500;
     color: #191919;
     margin-top: 0px;
     margin-bottom: 0px;
     white-space: nowrap;
     width: 100%;
     line-break: anywhere;
    }
    h4 {
      font-size: 13px;
      font-weight: 300;
      color: #191919;
      margin-top: 10px;
      margin-bottom: 0px;
      width: 100%;
      line-break: anywhere;
    
    }
    .order-status {
      h3 {
        ${width < 992 ? `margin-top: 16px;` : `margin-top: 0;`}
      }
    }
  `}
`;
const OrderDetail = styled.div`
  padding-left: 11%;
  padding-right: 10%;
  ${({ theme, width }) => `
  .detail-header {
    font-size: 13px;
    font-weight: 400;
    color: #191919;
    margin-top: 20px;
    margin-bottom: 10px;
    padding-left: 0;
  }
  .items-header {
    padding-bottom: 3px;
    ${width < Breakpoints.SM_MAX ? `display:none;` : `display: flex;`}  
    justify-content: space-between;
    .col-md-3 {
      padding-left: 0;
      padding-right: 0;
    }
    h1 {
      margin-bottom: 0;
      font-size: 12px;
      padding-left: 0;
      font-weight: 300;
      color: #191919;
      white-space: nowrap;
      width: 100%;
     line-break: anywhere;
    }
  }
`}
`;
const ItemDetail = styled(Row)`
  border-top: 1px solid #97979724;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  h1 {
    font-size: 12px;
    padding-left: 0;
    font-weight: 400;
    color: #191919;
    white-space: nowrap;
  }
  .col-md-3 {
    padding-left: 0;
    padding-right: 0;
  }
  .item-section {
    display: flex;
    .item-image {
      img {
        width: 40px;
        height: 40px;
        background-color: #ebebed;
      }
    }
    .product-shop {
      margin-left: 5px;
      margin-right: 5px;
      display: flex;
      flex-direction: column;
      h3 {
        font-size: 11px;
        font-weight: 500;
        color: #191919;
        margin-top: -2px;
        margin-bottom: 0;
        width: 100%;
        line-break: anywhere;
      }
      h4 {
        font-size: 11px;
        font-weight: 300;
        color: #191919;
        margin-top: 15px;
        margin-bottom: 0;
        width: 100%;
        line-break: anywhere;
      }
    }
  }
`;

const ShippingStatus = styled.div`
  margin-top: 20px;
  padding-left: 7%;
  padding-right: 7%;
  ${({ theme, width }) => `
  .status-visual {
    display: flex;
  }
  .status-heading {
    display: flex;
    justify-content: space-between;
    h1 {
      font-size: 11px;
      font-weight: 400;
      color: #191919;
      padding-left: 0;
      margin-left: -12px;
    }
    h2 {
      font-size: 11px;
      font-weight: 400;
      color: #191919;
      width: 100%;
     line-break: anywhere;
    }
    h3 {
      font-size: 11px;
      font-weight: 400;
      color: #191919;
      width: 100%;
     line-break: anywhere;
    }
  }
  .placed-outer {
    height: 24px;
    width: 24px;
    border-radius: 50%;
    border: 1px solid #EBEBED;
    background-color: transparent;
    .placed-inner {
      margin-top: 3px;
      margin-bottom: 2px;
      margin-left: 3px;
      margin-right: 3px;
      height: 18px;
      width: 18px;
      border-radius: 50%;
      background-color: #A9EF21;
    }
  }
  .transit-outer {
    height: 24px;
    width: 24px;
    border-radius: 50%;
    border: 1px solid #EBEBED;
    background-color: transparent;
    .transit-inner {
      margin-top: 3px;
      margin-bottom: 2px;
      margin-left: 3px;
      margin-right: 3px;
      height: 18px;
      width: 18px;
      border-radius: 50%;
      background-color: #EBEBED;
    }
  }
  .delivered-outer {
    height: 24px;
    width: 24px;
    border-radius: 50%;
    border: 1px solid #EBEBED;
    background-color: transparent;
    .delivered-inner {
      margin-top: 3px;
      margin-bottom: 2px;
      margin-left: 3px;
      margin-right: 3px;
      height: 18px;
      width: 18px;
      border-radius: 50%;
      background-color: #EBEBED;
    }
  }
  .horizontal-line {
    border-bottom: 1.5px solid #97979724;
    width: 42%;
    margin-bottom: 10px;
  }

  `}
`;

const ShippingContainer = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;
  padding-top: 14px;
  background-color: #97979723;
  width: 100%;
  height: auto;
`;
const ShippingInformation = styled(Row)`
  display: flex;
  justify-content: space-between;
  padding-left: 8%;
  padding-right: 3%;
  .city {
    margin-bottom: 6px;
    display: flex;
    h1 {
      padding-left: 0;
      font-size: 12px;
      font-weight: 500;
      color: #191919;
      white-space: nowrap;
      margin-top: 0;
      margin-bottom: 0;
    }
    h2 {
      margin-left: 6px;
      font-size: 12px;
      font-weight: 500;
      color: #707070;
      margin-top: 0;
      margin-bottom: 0;
      width: 100%;
      line-break: anywhere;
    }
  }
  .zone {
    margin-bottom: 6px;
    display: flex;
    h1 {
      padding-left: 0;
      font-size: 12px;
      font-weight: 500;
      color: #191919;
      white-space: nowrap;
      margin-top: 0;
      margin-bottom: 0;
    }
    h2 {
      margin-left: 6px;
      font-size: 12px;
      font-weight: 500;
      color: #707070;
      margin-top: 0;
      margin-bottom: 0;
      width: 100%;
      line-break: anywhere;
    }
  }
  .street-address {
    margin-bottom: 6px;
    display: flex;
    h1 {
      padding-left: 0;
      font-size: 12px;
      font-weight: 500;
      color: #191919;
      white-space: nowrap;
      margin-top: 0;
      margin-bottom: 0;
      width: 100%;
      line-break: anywhere;
    }
    h2 {
      margin-left: 6px;
      font-size: 12px;
      font-weight: 500;
      color: #707070;
      margin-top: 0;
      margin-bottom: 0;
      width: 100%;
      line-break: anywhere;
    }
  }
  .building-number {
    display: flex;
    h1 {
      padding-left: 0;
      font-size: 12px;
      font-weight: 500;
      color: #191919;
      white-space: nowrap;
      margin-top: 0;
      margin-bottom: 0;
      width: 100%;
      line-break: anywhere;
    }
    h2 {
      margin-left: 6px;
      font-size: 12px;
      font-weight: 500;
      color: #707070;
      margin-top: 0;
      margin-bottom: 0;
      white-space: nowrap;
      width: 100%;
      line-break: anywhere;
    }
  }
  .shipping-address {
    font-size: 13px;
    font-weight: 500;
    color: #191919;
    margin-top: 0;
    margin-bottom: 8px;
    padding-left: 0;
  }
  .payment-method {
    h1 {
      font-size: 13px;
      font-weight: 500;
      color: #191919;
      margin-top: 0;
      margin-bottom: 0;
      padding-left: 0;
      white-space: nowrap;
      width: 100%;
      line-break: anywhere;
    }
    h2 {
      font-size: 12px;
      font-weight: 400;
      color: #191919;
      margin-top: 8px;
      margin-bottom: 0;
      width: 100%;
      line-break: anywhere;
    }
  }
`;

const OrderCost = styled(Row)`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 13px;
  padding-left: 9%;
  padding-right: 3%;
  margin: 0px;
  margin-top: 15px;
  width: 100%;
  margin-left: 0;
  background-color: #09aeff;
  .vat {
    display: flex;
    h1 {
      font-size: 14px;
      font-weight: 500;
      color: white;
      margin-right: 4px;
      margin-top: 0;
      margin-bottom: 0;
      white-space: nowrap;
      padding-left: 0;
      width: 100%;
      line-break: anywhere;
    }
    h2 {
      font-size: 14px;
      font-weight: 500;
      color: #191919;
      margin-top: 0;
      margin-bottom: 0;
      width: 100%;
      line-break: anywhere;
    }
  }
  .shipping-cost {
    display: flex;
    h1 {
      font-size: 14px;
      font-weight: 500;
      color: white;
      margin-right: 4px;
      margin-top: 0;
      margin-bottom: 0;
      white-space: nowrap;
      padding-left: 0;
      width: 100%;
      line-break: anywhere;
    }
    h2 {
      font-size: 14px;
      font-weight: 500;
      color: #191919;
      margin-top: 0;
      margin-bottom: 0;
      width: 100%;
      line-break: anywhere;
    }
  }
  .sub-total {
    display: flex;
    h1 {
      font-size: 14px;
      font-weight: 500;
      color: white;
      margin-right: 4px;
      margin-top: 0;
      margin-bottom: 0;
      white-space: nowrap;
      padding-left: 0;
    }
    h2 {
      font-size: 14px;
      font-weight: 500;
      color: #191919;
      margin-top: 0;
      margin-bottom: 0;
      width: 100%;
      line-break: anywhere;
    }
  }
`;

const Order = (props) => {
  const [showDetail, setShowDetail] = useState(false);

  const hideOrShow = () => {
    setShowDetail(!showDetail);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentstatus = (value) => {
    if (value == "0") {
      return " Not Paid";
    } else if (value == "1") {
      return "Paid";
    } else if (value == "2") {
      return "Cash On Delivery";
    } else if (value == "3") {
      return "Refund";
    } else if (value == "4") {
      return "Cancelled";
    }
  };

  const varifyImages = (items) => {
    
    if (items && items.cover_img) {
      return items.cover_img;
    } else {
      return [""];
    }
  };
  return (
    <I18n>
      {({ i18n }) => (
        <div>
          <OrderSectionWithOrders>
            <OrderContainer>
              <OrderSummary
                orderNumber={props.orderNumber}
                showDetail={showDetail}
                width={props.width}
              >
                <Col xs={6} lg={3}>
                  <h3>{i18n._(t`Order Number`)}</h3>
                  <h4>
                    {props.order.order_number
                      ? props.order.order_number
                      : "#0000 0000 0000"}
                  </h4>
                </Col>
                <Col xs={6} lg={4}>
                  <h3>{i18n._(t`Date/Time`)} </h3>
                  <h4>
                    {props.order.created_at
                      ? props.order.created_at
                      : " MM/DD/YY , 00:00"}
                  </h4>
                </Col>
                <Col className="order-status" xs={6} lg={2}>
                  <h3>{i18n._(t`Payment Status`)} </h3>
                  <h4
                    style={{
                      color: props.order.is_paid != "0" ? "green" : "red",
                    }}
                  >
                    {paymentstatus(props.order.is_paid)}
                  </h4>
                </Col>
                <Col xs={6} lg={3}>
                  <button onClick={hideOrShow}>
                    {i18n._(t`View Details`)}
                  </button>
                </Col>
              </OrderSummary>
              <OrderDetail
                width={props.width}
                className={showDetail ? "detail-open" : "detail-close"}
              >
                {/* <ShippingStatus>
                  <div class="status-visual">
                    <div class="placed-outer">
                      <div
                        class="placed-inner"
                        style={{
                          backgroundColor:
                            props.order.status == "placed"
                              ? "#A9EF21"
                              : "#EBEBED",
                        }}
                      ></div>
                    </div>
                    <div class="horizontal-line"></div>
                    <div class="transit-outer">
                      <div
                        class="transit-inner"
                        style={{
                          backgroundColor:
                            props.order.status == "in progress"
                              ? "#A9EF21"
                              : "#EBEBED",
                        }}
                      ></div>
                    </div>
                    <div class="horizontal-line"></div>
                    <div class="delivered-outer">
                      <div
                        class="delivered-inner"
                        style={{
                          backgroundColor:
                            props.order.status == "pending"
                              ? "#A9EF21"
                              : "#EBEBED",
                        }}
                      ></div>
                    </div>
                  </div>
                  <div class="status-heading">
                    <h1>{i18n._(t`Order Placed`)} </h1>
                    <h2>{i18n._(t`In Transit ( Est date: DD/MM/YY)`)} </h2>
                    <h3>
                      {props.order.status ? props.order.status : "Pending"}
                    </h3>
                  </div>
                </ShippingStatus> */}
                <h1 class="detail-header">
                  {i18n._(t`Order Overview`)}(
                  {props.order && props.order.order_items
                    ? props.order.order_items.length
                    : "0"}
                  )
                </h1>
                <div class="items-header">
                  <Col xs={1} md={3}>
                    <h1>{i18n._(t`Items(s)`)} </h1>
                  </Col>
                  <Col xs={1} md={3}>
                    <h1>{i18n._(t`Item Price`)} </h1>
                  </Col>
                  <Col xs={1} md={3}>
                    <h1>{i18n._(t`Quantity`)} </h1>
                  </Col>
                  <Col xs={1} md={3}>
                    <h1>{i18n._(t`Total Price`)} </h1>
                  </Col>
                </div>
                {props.order.order_items.length ? (
                  props.order.order_items.map((item) =>
                    props.width > Breakpoints.SM_MAX ? (
                      <ItemDetail>
                        <Col md={3}>
                          <div class="item-section">
                            <div class="item-image">
                              <img
                                src={handleImageArray(
                                  varifyImages(item.products)
                                )}
                              />
                            </div>
                            <div class="product-shop">
                              <h3>{item.products.name}</h3>
                              {/* <h4>
                                {item.products.shop
                                  ? item.products.shop
                                  : "shop Name"}
                              </h4> */}
                            </div>
                          </div>
                        </Col>
                        <Col md={3}>
                          <h1>QR {item.price}</h1>
                        </Col>
                        <Col md={3}>
                          <h1>{item.quantity}</h1>
                        </Col>
                        <Col md={3}>
                          <h1>{item.quantity * item.price}</h1>
                        </Col>
                      </ItemDetail>
                    ) : (
                      <ItemDetail>
                        <Col md={12}>
                          <div class="item-section">
                            <div class="item-image">
                              <img
                                src={
                                  handleImageArray(
                                    item.products.cover_img_arr
                                  )[0]
                                }
                              />
                            </div>
                            <div class="product-shop">
                              <h3>{item.products.name}</h3>
                              {/* <h4>
                                {item.products.shop
                                  ? item.products.shop
                                  : "shop Name"}
                              </h4> */}
                            </div>
                          </div>
                        </Col>
                        <Col md={12}>
                          <DivContainer>
                            <h1 className="bold"> {i18n._(t`Price`)} </h1>
                            <h1>QR {item.price}</h1>
                          </DivContainer>
                        </Col>
                        <Col md={12}>
                          <DivContainer>
                            <h1 className="bold"> {i18n._(t`Quantity`)} </h1>
                            <h1>{item.quantity}</h1>
                          </DivContainer>
                        </Col>
                        <Col md={12}>
                          <DivContainer>
                            <h1 className="bold">
                              {" "}
                              {i18n._(t` Total Price`)}{" "}
                            </h1>
                            <h1>{item.quantity * item.price}</h1>
                          </DivContainer>
                        </Col>
                      </ItemDetail>
                    )
                  )
                ) : (
                  <ItemDetail>
                    <Col md={3}>
                      <div class="item-section">
                        <div class="item-image">
                          <img></img>
                        </div>
                        <div class="product-shop">
                          <h3>{i18n._(t`Product Name`)} </h3>
                          <h4>{i18n._(t`Shop Name`)}</h4>
                        </div>
                      </div>
                    </Col>
                    <Col md={3}>
                      <h1>QR 1,000</h1>
                    </Col>
                    <Col md={3}>
                      <h1>X1</h1>
                    </Col>
                    <Col md={3}>
                      <h1>QR 1,000</h1>
                    </Col>
                  </ItemDetail>
                )}
                <ShippingContainer>
                  <ShippingInformation>
                    <Col md={6}>
                      <div class="city">
                        <h1 class="shipping-address">
                          {i18n._(t`Shipping Address`)}
                        </h1>
                        <h2>
                          {props.order.shipping_address
                            ? props.order.shipping_address
                            : "Shipping Address"}
                        </h2>
                      </div>
                      <div class="city">
                        <h1>{i18n._(t`City`)}</h1>
                        <h2>
                          {props.order.shipping_city
                            ? props.order.shipping_city
                            : "City"}
                        </h2>
                      </div>
                      <div class="zone">
                        <h1>{i18n._(t`Zone`)}</h1>
                        <h2>
                          {props.order.shipping_zipcode
                            ? props.order.shipping_zipcode
                            : "Zone"}
                        </h2>
                      </div>
                      <div class="zone">
                        <h1>{i18n._(t`Street Address`)}</h1>
                        <h2>
                          {props.order.shipping_state
                            ? props.order.shipping_state
                            : ""}
                        </h2>
                      </div>
                      <div class="building-number">
                        <h1>{i18n._(t`Building/Office Number`)}</h1>
                        <h2>
                          {props.order.house_number
                            ? props.order.house_number
                            : ""}
                        </h2>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div class="payment-method">
                        <h1>{i18n._(t`Payment Method`)} </h1>
                        <h2>
                          {props.order.payment_method
                            ? props.order.payment_method
                            : "etc"}
                        </h2>
                      </div>
                    </Col>
                    {props.order.is_paid == "0" ? (
                      <Col md={12}>
                        <Row
                          style={{
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: "10px",
                          }}
                        >
                          <div>
                            <Button
                              style={{
                                color: "white",
                                marginTop: "10px",
                                width: "120px",
                                background: "gray",
                              }}
                              onClick={() =>
                                props.cancelOrder(
                                  props.order.id,
                                  props.order.order_number
                                )
                              }
                            >
                              {i18n._(t`Cancel Order`)}
                            </Button>
                          </div>
                          <div>
                            <Button
                              style={{
                                color: "white",
                                marginTop: "10px",
                                width: "120px",
                                background: "gray",
                              }}
                              onClick={() =>
                                props.payNow(
                                  props.order.email,
                                  props.order.grand_total,
                                  props.order.order_number
                                )
                              }
                            >
                              {i18n._(t`Pay Now`)}
                            </Button>
                          </div>
                        </Row>
                      </Col>
                    ) : (
                      ""
                    )}
                  </ShippingInformation>
                  <OrderCost>
                    {/* <div class="vat" style={{ margin: "0px" }}>
                      <h1>{i18n._(t`VAT`)} :</h1>
                      <h2>0</h2>
                    </div> */}
                    <div class="shipping-cost">
                      <h1>{i18n._(t`Shipping Cost`)}:</h1>
                      <h2>
                        {props.order.shipping_cost
                          ? props.order.shipping_cost
                          : ""}
                      </h2>
                    </div>
                    <div class="sub-total">
                      <h1>{i18n._(t`Sub Total`)}:</h1>
                      <h2>
                        {props.order.grand_total
                          ? props.order.grand_total
                          : "QR 4,000"}
                      </h2>
                    </div>
                  </OrderCost>
                </ShippingContainer>
              </OrderDetail>
            </OrderContainer>
          </OrderSectionWithOrders>
        </div>
      )}
    </I18n>
  );
};

export default Order;
