import axios from "axios";
import { compose } from "redux";
import * as Styles from "./styles";
import { I18n } from "@lingui/react";
import Theme from "../../theme/Theme";
import { connect } from "react-redux";
import styled from "styled-components";
import { t, Trans } from "@lingui/macro";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { apiUrl } from "../../constants/urls";
import { bindActionCreators } from "redux";
import { Typography } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { Grid, Row, Col } from "react-flexbox-grid";
import React, { Component, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Breakpoints from "../../constants/Breakpoints";
import ReviewPanel from "../../components/ReviewPanel";
import CategoryList from "../../components/CategoryList";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormHelperText from "@material-ui/core/FormHelperText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { addErrorItemInAlert } from "../../redux/actions/alert.action";
import { fetchAllShopsData } from "../../redux/actions/shop.action";
import { ReactComponent as Map } from "../../assets/icons/map-pin.svg";
import { ReactComponent as backImg } from "../../assets/images/backImg.png";
import { ReactComponent as Message } from "../../assets/icons/greenWeb/mail.svg";
import { ReactComponent as Phone } from "../../assets/icons/greenWeb/phone-call.svg";
import { ReactComponent as IconsBootom } from "../../assets/icons/greenWeb/iconsBootom.svg";
import { ReactComponent as IconsBootomOne } from "../../assets/icons/greenWeb/iconsBottom1.svg";
import {
  addItemIntoCart,
  decrementItemInCart,
  deleteItemFromCart,
  flipCart,
  incrementItemInCart,
} from "../../redux/actions/cart.action";
import {
  passwordValidator,
  emailValidator,
} from "../../utils/emailPasswordValidator";

export const StyledContainer = styled.div`
  margin-top: 10%;
  display: flex;
  align-items: center;
  flex-direction: column;
  [class*="col-"] {
    display: flex;
    justify-content: center;
  }
`;

export const InformationContainer = styled(Grid)`
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;

  .MuiFormHelperText-root {
    color: red;
  }
`;

export const InformationImageContainer = styled(Grid)`
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .MuiFormHelperText-root {
    color: red;
  }
`;
const imgMyimageexample = require("../../assets/images/backImg.png");

export const ImageItems = styled.div`
  display: flex;
  opacity: 100;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  svg {
    @media only screen and (max-width: 600px) {
      height: 40px;
      width: 40px;
    }
    margin-top: 10px;
    margin-bottom: 10px;

    width: 60px;
    height: 60px;
  }
`;
export const ImageHeading = styled.p`
  font-size: 18px !important;
  color: white !important;
  margin: 0;
  width: 100%;
  height: 100%;
`;
export const ImageHeadingTwo = styled.p`
  font-size: 14px !important;
  color: white !important;
  width: 100%;
  height: 100%;
`;
export const CheckoutButtonContainer = styled(Row)`
  ${({ theme, width }) => `
 
  ${width < 1199 ? `margin-top: 30px;` : `margin-top: 60px;`}  
    margin-bottom: 100px;
    .shop-btn {
      border-radius: 3px;
      ${width < 1199 ? `margin-left: 0;` : `margin-left: 0;`}  
      height: 50px;
      width: 285px;
      font-size: 16px;
    }
    .shopping {
      border: 1px solid ${theme.palette.primary.main};
      color: ${theme.palette.primary.main};
      // margin-right: 10px;
      margin-bottom: 10px;
    }
    .checkout {
      background-color: ${theme.palette.primary.main};
      color: ${theme.palette.white.main};
           
    }
  `}
`;
const ImageContainer = styled.div`
  ${({ theme }) => `
height: 100%;
width: 100%;
position: relative;
background: #3b5998;
`}
`;

const Banner = styled.img`
  width: 100%;
  max-height: 400px;
  ${({ theme, width }) => `
  
  ${theme.breakpoints.down("sm")} {
    min-height: 700px;
  }
  `}

  object-fit: cover;
  opacity: 0.3;
  z-index: 1;
`;

const ImageText = styled.div`
  ${({ theme, width }) => `
background: ${theme.palette.secondary.main};`}
`;
const DivContaoner = styled(Grid)`
  margin-bottom: 20px;
  svg {
    margin-top: 10px;
    width: 30px;
    height: 30px;
    g .a {
      fill: #58c747;
      stroke: white;
    }
  }
  svg path {
    fill: #58c747;
    stroke: white;
  }
  svg.selected {
    g .a {
      fill: #58c747;
      stroke: white;
    }
    path,
    text {
      fill: #58c747;
      stroke: #58c747;
    }
  }
`;
export const RowContainer = styled(Row)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 15px;
  h3 {
    font-size: 30px;
    font-weight: 500;
  }
  p {
    font-size: 20px;
    font-weight: 400;
    color: #002040;
  }
  h5 {
    font-size: 30px;
    color: white;
    font-weight: 400;
    margin-bottom: 0px;
  }
  h6 {
    margin-top: 10px;
    font-size: 20px;
    color: white;
    font-weight: 250;
    margin-bottom: 10px;
  }

  ${({ width }) => `
  #name,#email,#enquiry,
  #message{
    width: 280px;
  }
 
  h1 {
    font-size: 9px;
    font-weight: 400;
    margin-bottom:0;
  }
  h2 {
    margin-top:0;
    margin-bottom: 0;
    font-size: 11px;
    font-weight: 400;
    border: 1px solid;
    width: 30px;
    height: 15px;
    padding-left: 3px;
    display: inline-block;
  }
  .country-code {
    display: inline-block;
    margin-top: 10px;
    ${
      width < Breakpoints.XS_MAX ? `margin-right: 9px;` : `margin-right: 10px;`
    }  
  }
`}
`;

class ContactUS extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.loading === false && props.loading !== state.loading) {
      return {
        loading: false,
      };
    }

    return state;
  }
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: 0,
      email: "",
      name: "",
      message: "",
      enquiry: "",
      errorStates: {
        nameToched: false,
        emailToched: false,
        messageToched: false,
        enquiryToched: false,
      },
    };
  }

  handleCategoryChange = async (category) => {
    await this.setState({
      selectedCategory: category.id,
    });
  };

  handleInputEmail = (value) => {
    this.setState({
      email: value,
    });
  };

  handleInputName = (value) => {
    this.setState({
      name: value,
    });
  };

  handleEnquiryName = (value) => {
    this.setState({
      enquiry: value,
    });
  };

  varifyFileds = (value) => {
    return value.length >= 1 ? true : false;
  };

  varifyAndSendToApi = async () => {
    const emailVarify = emailValidator(this.state.email);
    const nameVarify = this.varifyFileds(this.state.name);
    const enquiryVarify = this.varifyFileds(this.state.enquiry);
    const messageVarify = this.varifyFileds(this.state.message);

    this.setState({
      errorStates: {
        nameToched: true,
        emailToched: true,
        messageToched: true,
        enquiryToched: true,
      },
    });
    let bodyParams = {};
    bodyParams = {
      ...bodyParams,
      name: this.state.name,
      email: this.state.email,
      enquiry: this.state.enquiry,
      message: this.state.message,
    };
    if (emailVarify && nameVarify && enquiryVarify && messageVarify) {
      let url = apiUrl + `/feedback/add`;
      if (!url) return;
      const responce = await axios.post(url, bodyParams);
      if (responce.status === 200 || responce.status === 201) {
        this.props.addErrorItemInAlert({
          message: "Thank you for your feed back",
        });
        return;
      } else {
        this.props.addErrorItemInAlert({
          message: "try again later",
        });
        return;
      }

      return true;
    }
    return;
  };
  handleMessageName = (value) => {
    this.setState({
      message: value,
    });
  };

  render() {
    const { email, message, name, enquiry, selectedCategory } = this.state;

    return (
      <I18n>
        {({ i18n }) => (
          <div>
            <Styles.StyledGrid>
              <StyledContainer>
                <InformationContainer width={this.props.windowWidth}>
                  <RowContainer width={this.props.windowWidth}>
                    <Col lg={9}>
                      <h3>{i18n._(t`FEEDBACK FORM`)}</h3>
                    </Col>
                  </RowContainer>
                  <RowContainer width={this.props.windowWidth}>
                    <Col xs={12} lg={6}>
                      <p>
                        {i18n._(t`We look forward to hearing from you. Email us to learn more about
                      our firm and capabilities.`)}
                      </p>
                    </Col>
                  </RowContainer>
                  <RowContainer width={this.props.windowWidth}>
                    <Col xs={12} lg={4}>
                      <TextField
                        id="name"
                        label={i18n._(t`Name *`)}
                        type="text"
                        helperText={"please enter name"}
                        onChange={(event) =>
                          this.handleInputName(event.target.value)
                        }
                        helperText={
                          this.state.errorStates.nameToched && name.length < 1
                            ? "Please Enter Valid Name"
                            : ""
                        }
                      />
                    </Col>
                    <Col xs={12} lg={4}>
                      <TextField
                        id="email"
                        label={i18n._(t`Email *`)}
                        type="text"
                        onChange={(event) =>
                          this.handleInputEmail(event.target.value)
                        }
                        helperText={
                          this.state.errorStates.emailToched &&
                          !emailValidator(email)
                            ? "Please Enter Valid Email"
                            : ""
                        }
                      />
                    </Col>
                  </RowContainer>
                  <RowContainer width={this.props.windowWidth}>
                    <Col xs={12} lg={4}>
                      <FormControl style={{ width: "280px" }}>
                        <InputLabel htmlFor="age-native-helper">
                          please Select Enquiry
                        </InputLabel>
                        <NativeSelect
                          id="enquiry"
                          value={enquiry}
                          onChange={(event) =>
                            this.handleEnquiryName(event.target.value)
                          }
                          inputProps={{
                            name: "age",
                            id: "age-native-helper",
                          }}
                        >
                          <option aria-label="None" value="" />
                          <option value={"Sell Agricultural Pots & Tools"}>
                            Sell Agricultural Pots & Tools
                          </option>
                          <option
                            value={"Design and implementation of gardens"}
                          >
                            Design and implementation of gardens
                          </option>
                          <option value={"Flowers Arrangement"}>
                            Flowers Arrangement
                          </option>

                          <option value={"Fertilizer Trading"}>
                            Fertilizer Trading
                          </option>
                          <option
                            value={
                              "Periodic maintenance of public and private agricultural gardens."
                            }
                          >
                            Periodic maintenance of public and private
                            agricultural gardens.
                          </option>
                          <option value={"Sell Agricultural Pots & Tools"}>
                            Sell Agricultural Pots & Tools
                          </option>
                          <option
                            value={
                              "Design and implementation of irrigation networks."
                            }
                          >
                            Sell Agricultural Pots & Tools
                          </option>
                        </NativeSelect>
                        <FormHelperText>
                          {this.state.errorStates.enquiryToched && enquiry == ""
                            ? i18n._(t`Please Enter Enquiry *`)
                            : ""}
                        </FormHelperText>
                      </FormControl>
                    </Col>
                    <Col xs={12} lg={4}>
                      <TextField
                        id="message"
                        helperText={"please Select Message"}
                        label={i18n._(t`Enter your message *`)}
                        type="text"
                        onChange={(event) =>
                          this.handleMessageName(event.target.value)
                        }
                        helperText={
                          this.state.errorStates.messageToched &&
                          message.length < 1
                            ? "please Enter Message "
                            : ""
                        }
                      />
                    </Col>
                  </RowContainer>
                  <CheckoutButtonContainer width={this.props.windowWidth}>
                    <Col lg={12}>
                      <Button
                        className="shop-btn checkout"
                        onClick={this.varifyAndSendToApi}
                      >
                        {i18n._(t`SEND ENQUIRY`)}
                      </Button>
                    </Col>
                  </CheckoutButtonContainer>
                </InformationContainer>
              </StyledContainer>
            </Styles.StyledGrid>
            <ImageContainer>
              <Banner src={imgMyimageexample} />
              <InformationImageContainer width={this.props.windowWidth}>
                <RowContainer width={this.props.windowWidth}>
                  <Col lg={12}>
                    <h5>{i18n._(t`WE WORK ON THE FOREFRONT`)}</h5>
                  </Col>
                </RowContainer>
                <RowContainer width={this.props.windowWidth}>
                  <Col xs={12} lg={8}>
                    <h6>
                      {i18n._(t`To learn more about our service offerings and industry
                    expertise or to have a Consulting professional contact you
                    directly, please fill out the form below or submit an email.`)}
                    </h6>
                  </Col>
                </RowContainer>
                <RowContainer width={this.props.windowWidth}>
                  <Col xs={12} md={12} lg={12}>
                    <DivContaoner>
                      <ImageText>
                        <Row>
                          <Col lg={4}>
                            <ImageItems>
                              <Map />
                              <ImageHeading>{i18n._(t`ADDRESS`)}</ImageHeading>
                              <ImageHeadingTwo>
                                Umm Al Amad street 189, Zone 71, Building 100
                              </ImageHeadingTwo>
                            </ImageItems>
                          </Col>
                          <Col lg={4}>
                            <ImageItems>
                              <Phone />
                              <ImageHeading>
                                {i18n._(t`CONTACT US`)}
                              </ImageHeading>
                              <ImageHeadingTwo>
                                Telephone: (+974) 4479 3231
                              </ImageHeadingTwo>
                            </ImageItems>
                          </Col>
                          <Col lg={4}>
                            <ImageItems>
                              <Message />
                              <ImageHeading>{i18n._(t`EMAIL`)}</ImageHeading>
                              <ImageHeadingTwo>
                                info@greentreenursery.qa
                              </ImageHeadingTwo>
                            </ImageItems>
                          </Col>
                        </Row>
                      </ImageText>
                    </DivContaoner>
                  </Col>
                </RowContainer>
              </InformationImageContainer>
            </ImageContainer>
            <StyledContainer style={{ marginTop: "5px" }}>
              <RowContainer
                style={{ marginTop: "5px", width: "90%" }}
                width={this.props.windowWidth}
              >
                <Col lg={4}>
                  <IconsBootom />
                </Col>
                <Col lg={8}>
                  <IconsBootomOne />
                </Col>
              </RowContainer>
            </StyledContainer>
          </div>
        )}
      </I18n>
    );
  }
}

const mapStateToProps = (state) => {
  // const { shops, loading, error } = state.shop;
  // const { cartItems, isOpen, totalPrice } = state.cart;
  // return {
  //   shops,
  //   loading,
  //   error,
  //   cartItems,
  //   isCartOpen: isOpen,
  //   totalPriceOfCart: totalPrice
  // };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      flipCart,
      addItemIntoCart,
      incrementItemInCart,
      decrementItemInCart,
      deleteItemFromCart,
      addErrorItemInAlert,
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ContactUS);
