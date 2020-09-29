import React, { Component } from "react";
import styled from "styled-components";
import { t, Trans } from "@lingui/macro";
import { I18n } from "@lingui/react";
import { Typography, Box, Button } from "@material-ui/core";
import { Grid, Row, Col } from "react-flexbox-grid";
import Modal from "@material-ui/core/Modal";
import Loader from "react-loader-spinner";
import { compose } from "redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { apiUrl, baseUrl } from "../../constants/urls";
import { useDispatch, useSelector } from "react-redux";
import { emptyCartRequest } from "../../redux/actions/cart.action";
import { RadioContainer, InformationContainer, RowContainer } from "./styles";
import InputLabel from "@material-ui/core/InputLabel";
import { withRouter } from "react-router";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import { addItemIntoCart } from "../../redux/actions/cart.action";
import TextField from "@material-ui/core/TextField";
import { ReactComponent as MinimizeIcon } from "../../assets/icons/minimize-2.svg";
import {
  passwordValidator,
  emailValidator,
} from "../../utils/emailPasswordValidator";
import FormLabel from "@material-ui/core/FormLabel";
import {
  addErrorItemInAlert,
  addSuccessItemInAlert,
} from "../../redux/actions/alert.action";

import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  [class*="col-"] {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  ${({ theme, width }) => `
    // position: absolute;
    width: 60%;
    max-width: 1000px;
    background:white;
    margin: 0 auto;
    box-shadow: 0px 3px 40px #00000029;
    padding: 30px 50px;
    margin-top: 50px;
    max-height: 80%;

    ${theme.breakpoints.down("sm")} {
      margin-top: 100px;
      padding: 20px 20px;
      h2 {
        text-align: center !important;
        margin-top: 20px;
      }
    }
    position: relative;
    border-radius: 20px;
    overflow-y: auto;
  `}
`;
const InputLabelTextFiled = styled(InputLabel)`
  margin-bottom: 5px;
`;
export const ColContainer = styled(Col)`
  flex-direction: column;
  div {
    width: 100%;
  }
  .MuiOutlinedInput-input {
    padding: 18px;
  }
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
export const Form = styled(FormControl)`
  flex-direction: column;
  div {
    width: 100%;
  }
`;

export const CheckoutButtonContainer = styled(Row)`
  ${({ theme, width }) => `
 
  ${width < 1199 ? `margin-top: 30px;` : `margin-top: 30px;`}  
    margin-bottom: 100px;
    .shop-btn {
      border-radius: 3px;
      ${width < 1199 ? `margin-left: 0;` : `margin-left: 0;`}  
      height: 50px;
      width: 100%;
      font-size: 16px;
    }
    .shopping {
      background-color: black;
      color: ${theme.palette.white.main};
     
      &:hover {
        background-color: ${theme.palette.secondary.main};
        color: ${theme.palette.white.main};
      }
    }
    .payment {
      background-color: ${theme.palette.secondary.main};
      color: ${theme.palette.white.main};
      ${width < 990 ? `margin-top: 10px;` : `margin-top: 0;`}        
    }
  `}
`;

class ShippingAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      shipping: {
        addressType: "",
        name: "",
        number: "",
        city: "",
        zone: "",
        email: "",
        buliding: "",
        lastName: "",
        area: "",
        streetAddress: "",
        officeNumber: "",
      },
      errorStates: {
        lastNameTouched: false,
        streetAddressTouched: false,
        cityTouched: false,
        areaTouched: false,
        nameTouched: false,
        numberTouched: false,
        emailTouched: false,
        zoneTouched: false,
        officeNumberTouched: false,
        addressTypeTouched: false,
        bulidingTouched: false,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.state.shipping) {
      this.setState({
        ...this.state,
        shipping: {
          ...this.state.shipping,
          addressType:
            nextProps && nextProps.user && nextProps.user.shipping_state
              ? nextProps.user.shipping_state
              : "",
          name:
            nextProps && nextProps.user && nextProps.user.shipping_fullname
              ? nextProps.user.shipping_fullname
              : "",
          number:
            nextProps && nextProps.user && nextProps.user.shipping_phone
              ? nextProps.user.shipping_phone
              : "",
          city:
            nextProps && nextProps.user && nextProps.user.shipping_city
              ? nextProps.user.shipping_city
              : "",
          buliding:
            nextProps && nextProps.user && nextProps.user.house_number
              ? nextProps.user.house_number
              : "",
          area:
            nextProps && nextProps.user && nextProps.user.shipping_zipcode
              ? nextProps.user.shipping_zipcode
              : "",
          streetAddress:
            nextProps && nextProps.user && nextProps.user.shipping_state
              ? nextProps.user.shipping_state
              : "",
        },
      });
    }
  }

  handleRadioChange = ({ target: { value } }) => {
    this.setState({
      shipping: {
        ...this.state.shipping,
        addressType: value,
      },
      errorStates: {
        ...this.state.errorStates,
        addressTypeTouched: false,
      },
    });
  };
  handleInputChange = (input) => ({ target: { value } }) => {
    this.setState({
      shipping: {
        ...this.state.shipping,
        [input]: value,
      },
      errorStates: {
        ...this.state.errorStates,
        [`${input}Touched`]: true,
      },
    });
  };
  Normlilize = (cart) => {
    return {
      product_id: cart && cart.id ? cart.id : "",
      quantity: cart && cart.qty ? cart.qty : 1,
      price: cart && cart.price,
    };
  };

  checkOutGuestUser = async () => {
    const {
      shipping: {
        addressType,
        lastName,
        name,
        number,
        city,
        email,
        buliding,
        area,
        zone,
        streetAddress,
        officeNumber,
      },
    } = this.state;

    const cartItems = this.props.cartItems.map((cart) => {
      return this.Normlilize(cart);
    });
    let url = apiUrl + `/cart/checkout`;
    if (!url) return;

    this.setState({ loading: true });

    try {
      const item = {
        order: {
          email: email,
          name: name,
          shipping_cost: "0",
          payment_method: "3",
          grand_total: this.props.totalPriceOfCart,
          shipping_address: `${buliding},${streetAddress},${area},${city}`,
          contact: number,
        },
        orderitem: cartItems,
      };
      const responce = await axios.post(url, item);
      if (
        responce.status == "200" ||
        responce.status == "201" ||
        responce.status == "204"
      ) {
        this.setState({ loading: false });
        this.props.handleUserDialogClose();
        // this.props.emptyCartRequest();
        this.props.history.push("/");
        return;
      } else {
        this.setState({ loading: false });
        this.props.addErrorItemInAlert({
          message: "Please try again later",
        });
        return;
      }
    } catch (error) {
      this.setState({ loading: false });
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        this.props.addErrorItemInAlert({
          message: `Please Delete ${JSON.stringify(
            error.response.data.error
          )} from your cart it is not available for now`,
        });
      } else {
        this.props.addErrorItemInAlert({
          message: "Please empty your cart and try again",
        });
      }
      return;
    }
  };

  handleFormSubmit = () => {
    const {
      shipping: {
        addressType,
        lastName,
        name,
        number,
        city,
        email,
        buliding,
        area,
        zone,
        streetAddress,
        officeNumber,
      },
    } = this.state;
    this.setState({
      errorStates: {
        lastNameTouched: true,
        streetAddressTouched: true,
        addressTypeTouched: true,
        cityTouched: true,
        emailTouched: true,
        nameTouched: true,
        areaTouched: true,
        numberTouched: true,
        bulidingTouched: true,
      },
    });

    if (
      buliding.length < 1 ||
      !emailValidator(email) ||
      area.length < 1 ||
      name.length < 1 ||
      number.length < 1 ||
      city.length < 1 ||
      streetAddress.length < 1
    ) {
      return;
    }

    this.checkOutGuestUser();
  };

  render() {
    const {
      loading,
      shipping: {
        addressType,
        name,
        number,
        city,
        lastName,
        email,
        area,
        buliding,
        streetAddress,
      },
      errorStates: {
        nameTouched,
        addressTypeTouched,
        numberTouched,
        cityTouched,
        emailTouched,
        lastNameTouched,
        bulidingTouched,
        areaTouched,
        streetAddressTouched,
      },
    } = this.state;

    return this.props.open ? (
      <Modal
        open={this.props.open}
        onClose={this.props.handleDialogClose}
        style={{ overflow: "scroll", zIndex: "4" }}
      >
        <StyledContainer>
          <CloseButton onClick={() => this.props.handleUserDialogClose()}>
            <MinimizeIcon />
          </CloseButton>
          <InformationContainer width={this.props.windowWidth}>
            <RowContainer width={this.props.windowWidth}>
              <ColContainer lg={12}>
                <div>
                  <InputLabelTextFiled htmlFor="input-with-icon-adornment">
                    <Trans>Email </Trans> *
                  </InputLabelTextFiled>
                  <TextField
                    id="Email"
                    value={email}
                    helperText={
                      emailTouched && !emailValidator(email)
                        ? "Please Enter Email Address"
                        : false
                    }
                    className="input-box"
                    placeholder="Please Enter Email Address *"
                    variant="outlined"
                    type="email"
                    onChange={this.handleInputChange("email")}
                    error={
                      emailTouched && !emailValidator(email) ? true : false
                    }
                  />
                </div>
              </ColContainer>
              <ColContainer lg={6}>
                <div>
                  <InputLabelTextFiled htmlFor="input-with-icon-adornment">
                    <Trans>NAME </Trans> *
                  </InputLabelTextFiled>
                  <TextField
                    id="name"
                    value={name}
                    helperText={
                      nameTouched && name.length < 1
                        ? "Please Enter Name"
                        : false
                    }
                    className="input-box"
                    placeholder="Full Name *"
                    variant="outlined"
                    type="text"
                    onChange={this.handleInputChange("name")}
                    error={nameTouched && name.length < 1 ? true : false}
                  />
                </div>
              </ColContainer>
              <ColContainer lg={6}>
                <div>
                  <InputLabelTextFiled htmlFor="input-with-icon-adornment">
                    <Trans>CONTACT NUMBER</Trans> *
                  </InputLabelTextFiled>
                  <TextField
                    value={number}
                    className="input-box"
                    helperText={
                      numberTouched && number.length < 1
                        ? "Please Enter Contact Number"
                        : ""
                    }
                    placeholder="e.g 5555 5555"
                    variant="outlined"
                    onChange={this.handleInputChange("number")}
                    error={numberTouched && number.length < 1 ? true : false}
                  />
                </div>
              </ColContainer>
            </RowContainer>
            <RowContainer>
              <ColContainer
                lg={6}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div>
                  <InputLabelTextFiled htmlFor="input-with-icon-adornment">
                    <Trans>CITY</Trans>*
                  </InputLabelTextFiled>
                  <TextField
                    value={city}
                    className="input-box"
                    placeholder={"please enter your city"}
                    variant="outlined"
                    helperText={
                      cityTouched && city.length < 1
                        ? "Please Enter Valid City"
                        : false
                    }
                    error={cityTouched && city.length < 1 ? true : false}
                    onChange={this.handleInputChange("city")}
                  ></TextField>
                </div>
              </ColContainer>
              <ColContainer lg={6}>
                <div>
                  <InputLabelTextFiled htmlFor="input-with-icon-adornment">
                    <Trans>STREET</Trans>
                  </InputLabelTextFiled>
                  <TextField
                    value={streetAddress}
                    className="input-box"
                    placeholder="Street Name"
                    helperText={
                      streetAddressTouched && streetAddress.length < 1
                        ? "Please Enter Street Address"
                        : ""
                    }
                    variant="outlined"
                    type="text"
                    onChange={this.handleInputChange("streetAddress")}
                    error={
                      streetAddressTouched && streetAddress.length < 1
                        ? true
                        : false
                    }
                  />
                </div>
              </ColContainer>
            </RowContainer>
            <RowContainer>
              <ColContainer lg={6}>
                <div>
                  <InputLabelTextFiled htmlFor="input-with-icon-adornment">
                    <Trans>BULIDING NUMBER</Trans>*
                  </InputLabelTextFiled>
                  <TextField
                    id="city"
                    value={buliding}
                    className="input-box"
                    placeholder="buliding / office / home"
                    helperText={
                      bulidingTouched && buliding.length < 1
                        ? "please Enter Buliding / Office / Home Number"
                        : false
                    }
                    variant="outlined"
                    onChange={this.handleInputChange("buliding")}
                    error={
                      bulidingTouched && buliding.length < 1 ? true : false
                    }
                    style={{ marginBottom: "10px" }}
                  />
                </div>
              </ColContainer>
              <ColContainer lg={6}>
                <div>
                  <InputLabelTextFiled htmlFor="input-with-icon-adornment">
                    <Trans>AREA ZONE</Trans>
                  </InputLabelTextFiled>
                  <TextField
                    id="zone"
                    value={area}
                    className="input-box"
                    placeholder="Area Zone"
                    helperText={
                      areaTouched && area.length < 1
                        ? "Please Enter Your Area Number"
                        : ""
                    }
                    variant="outlined"
                    onChange={this.handleInputChange("area")}
                    error={areaTouched && area.length < 1 ? true : false}
                    style={{ marginBottom: "10px" }}
                  />
                </div>
              </ColContainer>
            </RowContainer>

            <CheckoutButtonContainer width={this.props.windowWidth}>
              <Col
                lg={12}
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {loading ? (
                  <Loader type="Oval" height={80} />
                ) : (
                  <Button
                    className="shop-btn shopping"
                    onClick={this.handleFormSubmit}
                  >
                    {this.props.addNewAddress ? (
                      <Trans>Save New Address</Trans>
                    ) : (
                      <Trans>Proceed To Payment </Trans>
                    )}
                  </Button>
                )}
              </Col>
            </CheckoutButtonContainer>
          </InformationContainer>
        </StyledContainer>
      </Modal>
    ) : null;
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addErrorItemInAlert,
      emptyCartRequest,
    },
    dispatch
  );

const mapStateToProps = (state) => {
  const { products, loading, error } = state.product;

  const { cartItems, isOpen, totalPrice } = state.cart;

  return {
    products,
    loading,
    error,
    cartItems,
    isCartOpen: isOpen,
    totalPriceOfCart: totalPrice,
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ShippingAddress);
