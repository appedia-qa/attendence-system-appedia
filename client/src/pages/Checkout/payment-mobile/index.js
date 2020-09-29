import React, { Component } from "react";
import styled from "styled-components";
import InputMask from "react-input-mask";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import { Grid, Row, Col } from "react-flexbox-grid";
import Breakpoints from "../../../constants/Breakpoints";
import { Typography, Box, Button } from "@material-ui/core";
import ProductDialog from "../../../components/SuccessComponent";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import { ReactComponent as Mastercard } from "../../../assets/icons/Mastercard.svg";
import { ReactComponent as Visa } from "../../../assets/icons/visa.svg";
import { ReactComponent as Card } from "../../../assets/icons/cash.svg";
import { ReactComponent as Paypal } from "../../../assets/icons/paypal.svg";
import { ReactComponent as CreditCard } from "../../../assets/icons/creditCard.svg";
import { emptyCartRequest } from "../../../redux/actions/cart.action";
import { t } from "@lingui/macro";
import { I18n } from "@lingui/react";
import axios from "axios";
import { apiUrl, baseUrl } from "../../../constants/urls";
import {
  addErrorItemInAlert,
  addSuccessItemInAlert,
} from "../../../redux/actions/alert.action";
import { bindActionCreators } from "redux";
import {
  RadioContainer,
  InformationContainer,
  RowPaymentContainer,
} from "./styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Loader from "../../../components/LoaderComponent";
var valid = require("card-validator");

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  padding: 8px;
`;
export const textFiledContainer = styled.div`
  .MuiInputBase-input {
    padding: 6px 7px 7px;
  }
`;

export const SvgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
    width: 55px;
  }
  svg path {
    stroke: none;
    fill: black;
  }
`;

export const DesktopCheckoutButtonContainer = styled(Row)`
  ${({ theme }) => `
    margin-top: 30px;
    margin-bottom: 100px;
    justify-content: center;
    ${theme.breakpoints.up("lg")} {
      justify-content: start;
    }
    display:flex;
    .shop-btn {
      border-radius: 3px;
      height: 50px;
      width: 285px;
      font-size: 16px;
       margin-top: 20px;
    }
    .shopping {
      margin-top: 20px;
      background-color: black;
      color: ${theme.palette.white.main};
      ${theme.breakpoints.up("md")} {
        margin-right: 10px;
        margin-left: 10px;
      }
     
     
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
  width: 100%;
`;

export const RadioGroupIcon = styled(RadioGroup)`
  margin: 0;
  align-items: center;
  [class*="col-"] {
    display: flex;
    justify-content: center;
  }
  svg {
    height: 20px;
  }
  svg path {
    stroke: none;
    fill: black;
  }
`;

export const Info = styled.div`
  [class*="col-"] {
    padding-left: 10%;
    padding-right: 5%;
  }
`;

export const Border = styled.div`
  border: 2px solid;
  margin-top: 20px;
  border-color: #e0e0e0;
`;

export const BoldLine = styled.div`
  margin-top: 17px;
  margin-bottom: 17px;
  display: flex;
  height: 10px;
  align-items: center;
  justify-content: flex-end;
  background: #e0e0e0;
`;

export const DivBox = styled.div`
  width: 190px;
  height: auto;
  background: rgb(242, 128, 23);
`;

const MobileCheckoutButtonContainer = styled.div`
  margin-top: 17.5px;
  ${({ theme }) => `
    button {
      height: 50px;
      width: 110%;
      background-color: ${theme.palette.primary.main};
      color: ${theme.palette.white.main};
      margin-left: -5%;
      margin-bottom: 2.5px;
      &:hover {
        background-color: ${theme.palette.secondary.main};
      }

    }

    button:hover {
      background-color: ${theme.palette.primary[900]};
    }
  `}
`;

const LabelView = (props) => {
  return (
    <I18n>
      {({ i18n }) => (
        <RowPaymentContainer width={props.windowWidth}>
          <Col
            style={{
              padding: "0",
              justifyContent: "start",
              marginLeft: "15px",
              marginBottom: "0px",
              textAlign: "center",
            }}
          >
            <h1>{i18n._(t`Credit/Debit Card`)}</h1>
            {/* <h3>{i18n._(t`Safe money transfer using your bank account.`)}</h3> */}
          </Col>
        </RowPaymentContainer>
      )}
    </I18n>
  );
};

const PaypalCard = (props) => {
  return (
    <I18n>
      {({ i18n }) => (
        <RowPaymentContainer width={props.windowWidth}>
          <Col
            style={{
              padding: "0",
              justifyContent: "start",
              marginLeft: "15px",
              marginBottom: "0px",
            }}
          >
            <h1>{i18n._(t`PayPal`)}</h1>
          </Col>
        </RowPaymentContainer>
      )}
    </I18n>
  );
};

const PayCard = (props) => {
  return (
    <I18n>
      {({ i18n }) => (
        <RowPaymentContainer width={props.windowWidth}>
          <Col
            style={{
              padding: "0",
              justifyContent: "start",
              marginLeft: "15px",
              marginBottom: "0px",
            }}
          >
            <h1>{i18n._(t`Cash On Delivery`)}</h1>
          </Col>
        </RowPaymentContainer>
      )}
    </I18n>
  );
};

class PaymentMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: "",
      cardHolderName: "",
      date: "",
      cvc: "",
      isLoading: false,
      dialogOpen: false,
      addressType: "visa",
      selectedScreen: {
        payPal: false,
        card: false,
        visa: true,
      },
      errorStates: {
        cardNumberToched: false,
        addressTypeTouched: false,
        cardHolderNameToched: false,
        dateToched: false,
        cvcToched: false,
      },
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  handleRadioChange = ({ target: { value } }) => {
    this.setState({
      addressType: value,
    });
  };

  dateValidation = (value) => {
    var numberValidation = valid.expirationDate(value);
    if (!numberValidation.isValid) {
      return true;
    } else {
      return false;
    }
  };

  cvcValidation = (value) => {
    var numberValidation = valid.cvv(value);
    if (!numberValidation.isValid) {
      return true;
    } else {
      return false;
    }
  };
  handleDialoughOpen = async (item) => {
    this.setState({
      dialogOpen: true,
    });
  };

  handleDialogClose = (props) => {
    this.setState({ dialogOpen: false });
  };

  handlePayment = async (responce) => {
    this.props.emptyCartRequest();
    window.location = responce.data.success;
    this.setState({
      isLoading: false,
    });
  };

  handelCheckout = async () => {
    let url = apiUrl + `/payment/checkout`;
    if (!url) return;
    this.setState({
      isLoading: true,
    });
    const item = {
      ...this.props.item,
      payment_type: this.state.addressType == "visa" ? "0" : "1",
      user_type: this.props.item.user_id ? "loggedin" : "guest",
    };
    try {
      const responce = await axios.post(url, item);
      if (responce.status == 200 || responce.status == 201) {
        if (responce.data.status == "0") {
          this.handlePayment(responce);
        } else {
          this.props.emptyCartRequest();
          this.setState({
            dialogOpen: true,
            orderNumber: responce.data.success.order_number,
            isLoading: false,
          });
        }
      } else {
        this.setState({ isLoading: false });
        this.props.addErrorItemInAlert({
          message: "Please empty your cart and try again",
        });
      }
    } catch (error) {
      this.setState({ isLoading: false });
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
    // const {
    //   cardNumber,
    //   cardHolderName,
    //   date,
    //   cvc,
    //   errorStates: {
    //     cardNumberToched,
    //     cardHolderNameToched,
    //     dateToched,
    //     cvcToched,
    //   },
    // } = this.state;
    // let name = false;
    // let num = false;
    // let dt = false;
    // let cv = false;
    // if (
    //   !this.cvcValidation(cvc) &&
    //   !this.dateValidation(date) &&
    //   !this.cardValidation(cardNumber) &&
    //   cardHolderName.length > 3
    // ) {
    //   this.handleDialoughOpen();
    // } else {
    //   if (cardHolderName.length <= 3) {
    //     name = true;
    //   }
    //   if (this.cardValidation(cardNumber)) {
    //     num = true;
    //   }
    //   if (this.dateValidation(date)) {
    //     dt = true;
    //   }
    //   if (this.cvcValidation(cvc)) {
    //     cv = true;
    //   }
    // }
    // this.setState({
    //   errorStates: {
    //     cardNumberToched: num,
    //     cardHolderNameToched: name,
    //     dateToched: dt,
    //     cvcToched: cv,
    //   },
    // });
    this.handelCheckout();
  };

  cardValidation = (value) => {
    var numberValidation = valid.number(value);
    if (!numberValidation.isValid) {
      return true;
    } else {
      return false;
    }
  };

  handleInputChange = (input) => ({ target: { value } }) => {
    this.setState({
      [input]: value,
      errorStates: {
        ...this.state.errorStates,
        [`${input}Toched`]: true,
      },
    });

    if (input == "cardNumber") {
      this.cardValidation(value);
    } else if (input == "date") {
      this.dateValidation(value);
    } else if (input == "cvc") {
      this.cvcValidation(value);
    }
  };

  render() {
    const {
      cardNumber,
      cardHolderName,
      date,
      cvc,
      addressType,
      isLoading,
      errorStates: {
        cardNumberToched,
        cardHolderNameToched,
        dateToched,
        cvcToched,
      },
    } = this.state;

    return (
      <I18n>
        {({ i18n }) => (
          <StyledContainer>
            <Grid style={{ width: "100%" }}>
              <Border>
                <Row style={{ justifyContent: "space-between" }}>
                  <Col xs={9}>
                    <RadioGroupIcon row>
                      <FormControlLabel
                        id="radio-office"
                        value="visa"
                        checked={addressType == "visa" ? true : false}
                        control={<Radio />}
                        onChange={(event) => this.handleRadioChange(event)}
                        label={<LabelView width={this.props.windowWidth} />}
                        labelPlacement="right"
                        style={{
                          margin: "0",
                          display: "flex",
                          alignItems: "center",
                        }}
                        onChange={(event) => this.handleRadioChange(event)}
                      />
                    </RadioGroupIcon>
                  </Col>
                  <Col xs={3} style={{ alignItems: "center", display: "flex" }}>
                    <SvgContainer>
                      <Visa />
                    </SvgContainer>
                  </Col>
                </Row>
                {/* <RowPaymentContainer>
                <Col
                  xs={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0",
                    marginTop: "60px",
                  }}
                >
                  <InputMask
                    mask="9999 - 9999 - 9999 - 9999"
                    maskChar=" "
                    maskPlaceholder={null}
                    placeholder="0000 - 0000 - 0000 - 0000"
                    type="text"
                    maskChar=" "
                    type="text"
                    style={{ width: "100%" }}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CreditCard />
                        </InputAdornment>
                      ),
                    }}
                    onChange={this.handleInputChange("cardNumber")}
                    error={cardNumberToched && this.cardValidation(cardNumber)}
                  >
                    <TextField disableUnderline />
                  </InputMask>
                </Col>
              </RowPaymentContainer> */}
                {/* <RowPaymentContainer
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Col
                  style={{
                    marginTop: "20px",
                  }}
                  md={5}
                  xs={12}
                  sm={12}
                >
                  <Row style={{ flexDirection: "column" }}>
                    <Col>
                      <h2>{i18n._(t`NAME ON CARD`)}</h2>
                    </Col>
                    <Col>
                      <TextField
                        style={{ width: "100%" }}
                        variant="outlined"
                        placeholder="Name on card"
                        type="text"
                        onChange={this.handleInputChange("cardHolderName")}
                        error={
                          cardHolderNameToched && cardHolderName.length <= 3
                            ? true
                            : false
                        }
                      />
                    </Col>
                  </Row>
                </Col>
                <Col
                  style={{
                    marginTop: "20px",
                  }}
                  md={4}
                  xs={12}
                  sm={12}
                >
                  <Row style={{ flexDirection: "column" }}>
                    <Col>
                      <h2>{i18n._(t`EXPIRY DATE`)}</h2>
                    </Col>
                    <Col
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "0",
                        padding: "0",
                      }}
                    >
                      <InputMask
                        id="date"
                        placeholder="MM/YY"
                        type="text"
                        mask="** / **"
                        style={{ width: "100%" }}
                        variant="outlined"
                        maskPlaceholder={null}
                        onChange={this.handleInputChange("date")}
                        error={dateToched && this.dateValidation(date)}
                      >
                        <TextField />
                      </InputMask>
                    </Col>
                  </Row>
                </Col>
                <Col
                  md={2}
                  xs={12}
                  sm={12}
                  style={{
                    marginTop: "20px",
                  }}
                >
                  <Row style={{ flexDirection: "column" }}>
                    <Col>
                      <h2>Cvc</h2>
                    </Col>
                    <Col
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "0",
                        padding: "0",
                      }}
                    >
                      <InputMask
                        mask="***"
                        maskPlaceholder={null}
                        placeholder="000"
                        type="text"
                        style={{ width: "100%" }}
                        variant="outlined"
                        onChange={this.handleInputChange("cvc")}
                        error={cvcToched && this.cvcValidation(cvc)}
                      >
                        <TextField />
                      </InputMask>
                    </Col>
                  </Row>
                </Col>
              </RowPaymentContainer> */}
              </Border>
              <Border>
                <Row style={{ justifyContent: "space-between" }}>
                  <Col xs={8}>
                    <RadioGroupIcon row>
                      <FormControlLabel
                        id="radio-cash"
                        value="cash"
                        checked={addressType == "cash" ? true : false}
                        onChange={(event) => this.handleRadioChange(event)}
                        control={<Radio />}
                        label={<PayCard width={this.props.windowWidth} />}
                        labelPlacement="right"
                        style={{
                          margin: "0",
                          display: "flex",
                          alignItems: "start",
                          justifyContent: "start",
                        }}
                        onChange={(event) => this.handleRadioChange(event)}
                      />
                    </RadioGroupIcon>
                  </Col>
                  <Col xs={3} style={{ alignItems: "center", display: "flex" }}>
                    <SvgContainer>
                      <Card />
                    </SvgContainer>
                  </Col>
                </Row>
              </Border>
              {/* <Border>
              <Row style={{ justifyContent: "space-between" }}>
                <Col xs={8}>
                  <RadioGroupIcon row>
                    <FormControlLabel
                      id="radio-paypal"
                      value="paypal"
                      checked={addressType == "paypal" ? true : false}
                      onChange={(event) => this.handleRadioChange(event)}
                      control={<Radio />}
                      label={<PaypalCard width={this.props.windowWidth} />}
                      labelPlacement="right"
                      style={{
                        margin: "0",
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "start",
                      }}
                      onChange={(event) => this.handleRadioChange(event)}
                    />
                  </RadioGroupIcon>
                </Col>
                <Col xs={3} style={{ alignItems: "center", display: "flex" }}>
                  <SvgContainer>
                    <Paypal />
                  </SvgContainer>
                </Col>
              </Row>
            </Border> */}
              {isLoading ? (
                <div>
                  <Loader height={"30vh"} />
                </div>
              ) : (
                <DesktopCheckoutButtonContainer>
                  <Button className="shop-btn shopping">
                    {i18n._(t`CONTINUE SHOPPING`)}
                  </Button>
                  <Button
                    className="shop-btn checkout"
                    onClick={this.handleFormSubmit}
                  >
                    {i18n._(t`BUY NOW`)}
                  </Button>
                </DesktopCheckoutButtonContainer>
              )}

              <ProductDialog
                open={this.state.dialogOpen}
                orderNumber={
                  this.state.orderNumber ? this.state.orderNumber : ""
                }
                // handleDialogClose={this.handleDialogClose}
              />
            </Grid>
          </StyledContainer>
        )}
      </I18n>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addErrorItemInAlert,
      addSuccessItemInAlert,
      emptyCartRequest,
    },
    dispatch
  );

const mapStateToProps = (state) => {
  const { products, loading, error } = state.product;
  const { id, cartItems, isOpen, totalPrice } = state.cart;
  const { user } = state.authentication;

  return {
    products,
    loading,
    id,
    error,
    user,
    cartItems,
    isCartOpen: isOpen,
    totalPriceOfCart: totalPrice,
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(PaymentMobile);
