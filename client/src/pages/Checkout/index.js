import React, { Component, Fragment } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Grid, Row, Col } from "react-flexbox-grid";
import { Typography } from "@material-ui/core";
import styled from "styled-components";
import * as StyledComponent from "./styles";
import Cart from "./Cart/Cart";
import Payment from "./payment-mobile";
import ShippingAddress from "./Address";
import CartItemsList from "./CartCard";
import { cartData } from "../../redux/actions/cart.action";
import { t } from "@lingui/macro";
import { I18n } from "@lingui/react";
import {
  addErrorItemInAlert,
  addSuccessItemInAlert,
} from "../../redux/actions/alert.action";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0,
      disable: true,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.cartItems.length == 0) {
      this.props.addErrorItemInAlert({
        message: "Please add items in cart",
      });
      this.props.history.push("/cart");
    }
    if (this.props.totalPriceOfCart < 50) {
      this.props.addErrorItemInAlert({
        message: "cart must have minimum buy of qr 50.00",
      });
      this.props.history.push("/");
    }
  }

  handleTabChange = (index, item) => {
    this.setState({ tabValue: index, item: item });
  };
  disable = (value) => {
    this.setState({ disable: value });
  };

  renderTabBox(index) {
    switch (index) {
      case 0:
        return (
          <ShippingAddress
            {...this.props}
            handleTabChange={this.handleTabChange}
            disable={this.disable}
          />
        );
        break;
      case 1:
        return (
          <Payment
            {...this.props}
            item={this.state.item}
            handleTabChange={this.handleTabChange}
          />
        );
        break;

      default:
        break;
    }
  }

  render() {
    const { tabValue } = this.state;
    return (
      <I18n>
        {({ i18n }) => (
          <Row style={{ width: "100%", margin: "0" }}>
            <Col md={8} sm={12} xs={12}>
              <Grid>
                <StyledComponent.MainContainer>
                  <Typography
                    component="h3"
                    class="navPath"
                    onClick={() => this.props.history.push("/cart")}
                  >
                    {i18n._(t`< Return to Cart`)}
                  </Typography>
                </StyledComponent.MainContainer>
                <StyledComponent.StyledTabs
                  value={tabValue}
                  onChange={(event, newValue) =>
                    this.setState({ tabValue: newValue })
                  }
                  aria-label="styled tabs example"
                >
                  <StyledComponent.StyledTab
                    label={i18n._(t`DELIVERY ADDRESS`)}
                    value={0}
                  />
                  <StyledComponent.StyledTab
                    label={i18n._(t`PAYMENT`)}
                    value={1}
                    disabled={this.state.disable}
                  />
                </StyledComponent.StyledTabs>
                <StyledComponent.StyledTabBox>
                  {this.renderTabBox(tabValue)}
                </StyledComponent.StyledTabBox>
              </Grid>
            </Col>
            <Col style={{ padding: "30px" }} md={4} sm={12} xs={12}>
              <Grid>
                <StyledComponent.MainContainer>
                  <CartItemsList
                    items={this.props.cartItems ? this.props.cartItems : []}
                    totalPriceOfCart={this.props.totalPriceOfCart}
                  />
                </StyledComponent.MainContainer>
              </Grid>
            </Col>
          </Row>
        )}
      </I18n>
    );
  }
}

const mapStateToProps = (state) => {
  const { products, loading, error } = state.product;
  const { user } = state.authentication;
  const { cartItems, isOpen, totalPrice } = state.cart;

  return {
    products,
    loading,
    error,
    user,
    cartItems,
    isCartOpen: isOpen,
    totalPriceOfCart: totalPrice,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      cartData,
      addErrorItemInAlert,
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Checkout);
