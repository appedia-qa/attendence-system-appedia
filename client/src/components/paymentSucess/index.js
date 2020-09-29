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
import queryString from "query-string";
import {
  RadioContainer,
  InformationContainer,
  RowContainer,
  Line,
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
import { ReactComponent as Ok } from "../../assets/icons/ok.svg";
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
    width: 50%;
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
      width: 70%;
      h2 {
        text-align: center !important;
        margin-top: 20px;
      }
    }
    position: relative;
    border-radius: 20px;
    margin-bottom:50px;
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
  .a {
    fill: #00b517;
  }
`;
const CloseButton = styled.div`
  ${({ theme }) => `
    background-color: ${theme.palette.primary.main};
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
      .a {
        fill: #fff;
    }
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
  justify-content:space-around;
  ${width < 1199 ? `margin-top: 30px;` : `margin-top: 30px;`}  
    margin-bottom: 30px;
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

class PaymentDialouge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transid: "",
      orderId: "",
      emailID: "",
      temp: 0,
    };
    this.forceChange = this.forceChange.bind(this);
  }
  componentDidMount() {
    const value = queryString.parse(this.props.location.search);
    const orderId = value.orderId.toString();
    const transid = value.transid.toString();
    const emailID = value.emailID.toString();

    this.setState(
      {
        orderId: orderId,
        transid: transid,
        emailID: emailID,
      },
      () => {
        this.paymentSuccess();
      }
    );
  }

  forceChange() {
    this.setState((temp) => ({
      temp: temp.temp++,
    }));
  }

  paymentSuccess = async () => {
    try {
      const item = {
        email: this.state.emailID,
        orderId: this.state.orderId,
        transid: this.state.transid,
      };
      const url = apiUrl + "/payment/verify";
      const responce = await axios.post(url, item);
      this.forceChange();
      return;
    } catch (error) {
      return;
    }
  };

  render() {
    return (
      <StyledContainer>
        <InformationContainer width={this.props.windowWidth}>
          <RowContainer width={this.props.windowWidth}>
            <ColContainer xs={12}>
              <Ok />
            </ColContainer>
            <ColContainer lg={12}>
              <Typography
                style={{
                  color: "#00b517",
                  fontWeight: "600",
                  marginTop: "20px",
                  textAlign: "center",
                }}
                component="h5"
                variant="h5"
              >
                <Trans>PAYMENT IS SUCCESSFUL</Trans>
              </Typography>
            </ColContainer>
            <ColContainer lg={12}>
              <Typography
                style={{
                  fontWeight: "300",
                  textAlign: "center",
                  marginTop: "20px",
                  lineBreak: "anywhere",
                }}
                component="h5"
                variant="h5"
              >
                <Trans>Your Order confirmation number is</Trans>:
                {" " + this.state.orderId + " "}
              </Typography>
            </ColContainer>
            <ColContainer lg={12}>
              <Typography
                style={{
                  fontWeight: "300",
                  textAlign: "center",
                  marginTop: "20px",
                  lineBreak: "anywhere",
                }}
                component="h5"
                variant="h5"
              >
                <Trans>Your Transection confirmation number is :</Trans>
                {" " + this.state.transid + " "}
              </Typography>
            </ColContainer>
            <ColContainer lg={12}>
              <Button
                style={{
                  background: "#00b517",
                  fontWeight: "300",
                  marginTop: "20px",
                  textAlign: "center",
                }}
                component="h5"
                variant="h5"
                onClick={() => this.props.history.push("/")}
              >
                <Trans>CONTINUE SHOPPING</Trans>
              </Button>
            </ColContainer>
          </RowContainer>
        </InformationContainer>
      </StyledContainer>
    );
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
)(PaymentDialouge);
