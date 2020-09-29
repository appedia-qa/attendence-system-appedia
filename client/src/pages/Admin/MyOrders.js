import React, { Component, Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as NoOrder } from "../../assets/icons/no-orders.svg";
import Order from "./Order";
import { useDispatch, useSelector } from "react-redux";
import { t, Trans } from "@lingui/macro";
import { I18n } from "@lingui/react";
import { apiUrl } from "../../constants/urls";
import Loader from "../../components/LoaderComponent";
import axios from "axios";
import { withRouter } from "react-router-dom";
import {
  addErrorItemInAlert,
  addSuccessItemInAlert,
} from "../../redux/actions/alert.action";
import { emptyCartRequest } from "../../redux/actions/cart.action";

const OrderSectionWithoutOrders = styled.div`
  ${({ theme, width }) => `
  border: 1px solid #97979724;
    align-items: center;
    padding: 40%;
    padding-top: 7%;
    padding-bottom: 30px;
    display: flex;
    flex-direction: column;
  h1 {
    margin-top: 26px;
    margin-left: 25px;
    margin-bottom: 24px;
    font-size: 18px;
    font-weight: 500;
    color: #191919
  }
  .start-shopping {
    height: 49px;
    width: 162px;
    background-color: ${theme.palette.secondary.main};
    color: white;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    border: none;
    margin-left: -13px;
  }
`}
`;

const SectionWithOrders = styled.div`
  border: 1px solid #97979724;
  h5 {
    padding-left: 11%;
    padding-right: 3%;
    margin-top: 8px;
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: 500;
    color: #191919;
  }
`;

const MyOrders = (props) => {
  const dispatch = useDispatch();
  const [ordersList, setOrderList] = useState([]);
  const totalOrders = ordersList.length;
  const { user } = useSelector((state) => state.authentication);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user && user.id) {
      orderApiCallMethod();
    }
  }, []);

  const cancelOrder = async (orderId, orderNumber) => {
    try {
      const url = apiUrl + "/payment/cancel";
      const responce = await axios.post(url, {
        order_id: orderId,
        order_number: orderNumber,
      });
      if (responce.status == 200 || responce.status == 201) {
        orderApiCallMethod();
        return;
      } else {
        addErrorItemInAlert({
          message: "Please Try Again Latter",
        });
      }
    } catch (error) {
      addErrorItemInAlert({
        message: "Please Try Again Latter",
      });
      return;
    }
  };

  const handlePayment = async (responce) => {
    if (user && user.id) {
      dispatch(emptyCartRequest());
      window.location = responce.data.success;
    } else {
      addErrorItemInAlert({
        message: "Please Try Again Latter",
      });
    }
  };

  const payNow = async (email, amount, orderId) => {
    setLoading(true);
    try {
      const url = apiUrl + "/payment/pay_now";
      const responce = await axios.post(url, {
        orderId: orderId,
        amount: amount,
        customerEmail: email,
      });

      if (responce.status == 200 || responce.status == 201) {
        if (responce.data.status == "0") {
          handlePayment(responce);
        } else {
          this.props.history.push("/admin/my-order");
        }
        setLoading(false);
      } else {
        addErrorItemInAlert({
          message: "Please Add items in to your cart",
        });
        setLoading(false);
      }
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        addErrorItemInAlert({
          message: `Please Delete ${JSON.stringify(
            error.response.data.error
          )} from your cart it is not available for now`,
        });
        setLoading(false);
      } else {
        addErrorItemInAlert({
          message: "Please empty your cart and try again",
        });
        setLoading(false);
      }
      return;
    }
  };

  const orderApiCallMethod = async (e) => {
    let url = apiUrl + `/cart/order`;
    if (!url) return;
    setLoading(true);
    const responce = await axios.post(url, { user_id: user.id });
    if (responce && responce.data) {
      setOrderList(responce.data.data.order);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (totalOrders > 0) {
    return (
      <I18n>
        {({ i18n }) => (
          <div>
            <SectionWithOrders>
              <h5>{i18n._(t`My Orders`)}</h5>
              {ordersList.map((item, i) => (
                <Order
                  orderNumber={i}
                  width={props.width}
                  order={item}
                  cancelOrder={cancelOrder}
                  payNow={payNow}
                />
              ))}
            </SectionWithOrders>
          </div>
        )}
      </I18n>
    );
  } else {
    return (
      <I18n>
        {({ i18n }) => (
          <div>
            <OrderSectionWithoutOrders>
              <NoOrder />
              <h1>{i18n._(t`No Orders`)}</h1>
              <button
                onClick={() => props.history.push("/")}
                className="start-shopping"
              >
                {i18n._(t`start shopping`)}
              </button>
            </OrderSectionWithoutOrders>
          </div>
        )}
      </I18n>
    );
  }
};

export default withRouter(MyOrders);
