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
import { apiUrl } from "../../constants/urls";
import { useDispatch, useSelector } from "react-redux";
import {
  InformationContainer,
  RowContainer,
  RowPaymentContainer,
} from "./styles";
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
import { updateRequest } from "../../redux/actions/authentication.action";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { ReactComponent as MasterCard } from "../../assets/icons/master-card.svg";
import { ReactComponent as VisaCard } from "../../assets/icons/visa-card1.svg";
import InputMask from "react-input-mask";
import InputAdornment from "@material-ui/core/InputAdornment";
import { ReactComponent as CreditCard } from "../../assets/icons/creditCard.svg";
var valid = require("card-validator");

export const StyledContainer = styled.div`
  // display: flex;
  // align-items: center;
  // flex-direction: column;
  padding: 10% 20%;
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

class UpdateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      cardNumber: "",
      cardHolderName: "",
      date: "",
      cvc: "",
      errorStates: {
        cardNumberTouched: false,
        cardHolderNameToched: false,
        dateToched: false,
        cvcToched: false,
      },
    };
  }

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
    this.CallUpdateAddress();
  };

  handleDialogClose = (props) => {
    this.setState({ dialogOpen: false });
  };

  handleFormSubmit = () => {
    const {
      cardNumber,
      cardHolderName,
      date,
      cvc,
      errorStates: {
        cardNumberToched,
        cardHolderNameToched,
        dateToched,
        cvcToched,
      },
    } = this.state;
    let name = false;
    let num = false;
    let dt = false;
    let cv = false;

    if (
      !this.cvcValidation(cvc) &&
      !this.dateValidation(date) &&
      !this.cardValidation(cardNumber) &&
      cardHolderName.length > 1
    ) {
      this.handleDialoughOpen();
    } else {
      if (cardHolderName.length <= 3) {
        name = true;
      }
      if (this.cardValidation(cardNumber)) {
        num = true;
      }
      if (this.dateValidation(date)) {
        dt = true;
      }
      if (this.cvcValidation(cvc)) {
        cv = true;
      }
    }

    this.setState({
      errorStates: {
        cardNumberToched: num,
        cardHolderNameToched: name,
        dateToched: dt,
        cvcToched: cv,
      },
    });

 
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.state.shipping) {
      this.setState({
        ...this.state,
        name:
          nextProps && nextProps.user && nextProps.user.name
            ? nextProps.user.name
            : "",
        number:
          nextProps && nextProps.user && nextProps.user.contact_number
            ? nextProps.user.contact_number
            : "",
        cardNumber:
          nextProps && nextProps.user && nextProps.user.card_number
            ? nextProps.user.card_number
            : "",
        cvc:
          nextProps && nextProps.user && nextProps.user.cvv_code
            ? nextProps.user.cvv_code
            : "",
        cardHolderName:
          nextProps && nextProps.user && nextProps.user.name_on_card
            ? nextProps.user.name_on_card
            : "",
        date:
          nextProps && nextProps.user && nextProps.user.expiry_date
            ? nextProps.user.expiry_date
            : "",
      });
    }
  }

  CallUpdateAddress = async () => {
    const { name, number, cardNumber, cardHolderName, date, cvc } = this.state;

   
    this.props.updateRequest({
      name: this.props.user.name,
      number: this.props.user.contect_number,
      cardNumber:cardNumber,
      cardHolderName:cardHolderName,
      date:date,
      cvc:cvc,
    });

    if (this.props.updateError == null) {
      this.props.addSuccessItemInAlert({
        message: "Your infornation is updated",
      });
      this.props.handleUserDialogClose();
    } else {
      this.props.addErrorItemInAlert({
        message: "Please try again later",
      });
      this.props.handleUserDialogClose();
    }
  };

  

  render() {
    const {
      cardNumber,
      cardHolderName,
      date,
      cvc,
      loading,
      errorStates: {
        cardNumberTouched,
        cardHolderNameToched,
        dateToched,
        cvcToched,
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
              <div class="card-container visa-card">
                <VisaCard />
              </div>
              <div class="card-container master-card">
                <MasterCard />
              </div>
            </RowContainer>
            <RowPaymentContainer>
              <h2>
                <Trans>CARD NUMBER</Trans> *
              </h2>
              <Col
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "2",
                  marginTop: "0",
                }}
              >
                <InputMask
                  mask="9999 - 9999 - 9999 - 9999"
                  maskChar=" "
                  value={cardNumber}
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
                  error={cardNumberTouched && this.cardValidation(cardNumber)}
                >
                  <TextField disableUnderline />
                </InputMask>
              </Col>
            </RowPaymentContainer>
            <RowPaymentContainer
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
                <Row  style={{ flexDirection: "column" , width: "100%",margin:'0'}}>
                  <Col >
                    <h2>
                      <Trans>NAME ON CARD</Trans>
                    </h2>
                  </Col>
                  <Col>
                    <TextField
                      style={{ width: "100%" }}
                      value={cardHolderName}
                      variant="outlined"
                      placeholder="Name on card"
                      type="text"
                      onChange={this.handleInputChange("cardHolderName")}
                      error={
                        cardHolderNameToched && cardHolderName.length <= 1
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
                <Row style={{ flexDirection: "column",  width: "100%",margin:'0' }}>
                  <Col>
                    <h2>
                      <Trans>EXPIRY DATE</Trans>
                    </h2>
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
                      value={date}
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
                <Row style={{ flexDirection: "column" , width: "100%",margin:'0'}}>
                  <Col>
                    <h2>
                      <Trans>CVV CODE</Trans>
                    </h2>
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
                      value={cvc}
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
            </RowPaymentContainer>
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
                  <Loader type="Oval" />
                ) : (
                  <Button
                    className="shop-btn shopping"
                    onClick={this.handleFormSubmit}
                  >
                    <Trans>
                      <Trans>UPDATE CARD</Trans>
                    </Trans>
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

const mapStateToProps = (state) => {
  const { updateError } = state.authentication;
  return {
    updateError,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addItemIntoCart,
      updateRequest,
      addErrorItemInAlert,
      addSuccessItemInAlert,
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(UpdateCard);
