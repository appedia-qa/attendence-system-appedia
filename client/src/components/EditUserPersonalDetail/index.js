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
import { updateRequest } from "../../redux/actions/authentication.action";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  outline:none;
  [class*="col-"] {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  ${({ theme, width }) => `
    // position: absolute;
    width: 70%;
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

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      shipping: {
        name: "",
        number: "",
      },
      errorStates: {
        nameTouched: false,
        numberTouched: false,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.state.shipping) {
      this.setState({
        ...this.state,
        shipping: {
          ...this.state.shipping,
          name:
            nextProps && nextProps.user && nextProps.user.name
              ? nextProps.user.name
              : "",
          number:
            nextProps && nextProps.user && nextProps.user.contact_number
              ? nextProps.user.contact_number
              : "",
        },
      });
    }
  }

  handleRadioChange = ({ target: { value } }) => {
    this.setState({
      ...this.state,
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
      ...this.state,
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

  CallUpdateAddress = async () => {
    const {
      shipping: { name, number },
    } = this.state;

    this.props.updateRequest({
      name: name,
      number: number,
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

  handleFormSubmit = () => {
    const {
      shipping: { name, number },
    } = this.state;
    this.setState({
      ...this.state,
      errorStates: {
        nameTouched: true,
        numberTouched: true,
      },
    });

    if (name.length < 1 || number === null || number.length < 7) {
      return;
    }

    this.CallUpdateAddress();
  };

  render() {
    const {
      loading,
      shipping: { name, number },
      errorStates: { nameTouched, numberTouched },
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
              <ColContainer lg={6}>
                <div>
                  <InputLabelTextFiled htmlFor="input-with-icon-adornment">
                  <Trans>  NAME  </Trans>*
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
                      (numberTouched && number === null) ||
                      (numberTouched && number.length < 7)
                        ? "Please Enter Contact Number"
                        : ""
                    }
                    placeholder="e.g 5555 5555"
                    variant="outlined"
                    onChange={this.handleInputChange("number")}
                    error={
                      (numberTouched && number === null) ||
                      (number != null && numberTouched && number.length < 7)
                        ? true
                        : false
                    }
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
                  <Loader type="Oval"/>
                ) : (
                  <Button
                    className="shop-btn shopping"
                    onClick={this.handleFormSubmit}
                  >
                   <Trans>Update</Trans>
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
)(UpdateUser);
