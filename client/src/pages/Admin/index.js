import React, { Component } from "react";
import { Row, Col, Grid } from "react-flexbox-grid";
import { AdminContainer } from "./styles";
import MenuOptions from "./MenuOptions";
import AccountDetails from "./AccountDetails";
import MyOrders from "./MyOrders";
import MyFavorites from "./MyFavorites";
import MyCards from "./MyCards";
import { compose } from "redux";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter, Redirect } from "react-router-dom";
import LoaderComponent from "../../components/LoaderComponent";
import Breakpoints from "../../constants/Breakpoints";
import {
  addErrorItemInAlert,
  addSuccessItemInAlert,
} from "../../redux/actions/alert.action";

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.user === null) {
      setTimeout(() => {
        this.props.history.push("/login");
      }, 3000);
      this.props.addErrorItemInAlert({ message: "Please Login First" });
    } else {
      this.chkParamsIfExits();
    }
  }

  chkParamsIfExits = () => {
    // const myCards = window.location.href.indexOf("my-cards");
    // if (myCards != -1) {
    //   this.setState({ selected: 3 });
    //   return;
    // }
    const myFavorites = window.location.href.indexOf("my-favorites");
    if (myFavorites != -1) {
      this.setState({ selected: 2 });
      return;
    }
    const myOrder = window.location.href.indexOf("my-order");
    if (myOrder != -1) {
      this.setState({ selected: 1 });
      return;
    }
    const accountDetails = window.location.href.indexOf("account-details");
    if (accountDetails != -1) {
      this.setState({ selected: 0 });
      return;
    }
  };

  handleTheTabChangeInParent = (index) => {
    this.setState({ selected: index });
  };

  getSelectedView = (windowWidth) => {
    switch (this.state.selected) {
      case 0:
        return <AccountDetails width={windowWidth}  />;
      case 1:
        return <MyOrders width={windowWidth} />;
      case 2:
        return <MyFavorites width={windowWidth} {...this.props} />;
      // case 3:
      //   return <MyCards width={windowWidth} />;
      case 4:
        return this.props.history.push("/ResetPassword");
      default:
        return <AccountDetails width={windowWidth} />;
    }
  };

  render() {
    return this.props.user ? (
      this.props.windowWidth > Breakpoints.XS_MAX ? (
        <AdminContainer>
          <Col md={12}  lg={3}>
            <MenuOptions
              width={this.props.windowWidth}
              selected={this.state.selected}
              handleChangeTab={this.handleTheTabChangeInParent}
            />
          </Col>
          <Col md={12}  lg={8}>{this.getSelectedView(this.props.windowWidth)}</Col>
        </AdminContainer>
      ) : (
        <AdminContainer>
          <Col md={12}  lg={8}>{this.getSelectedView(this.props.windowWidth)}</Col>
        </AdminContainer>
      )
    ) : (
      <LoaderComponent />
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.authentication;

  return {
    user,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addErrorItemInAlert,
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AdminPanel);
