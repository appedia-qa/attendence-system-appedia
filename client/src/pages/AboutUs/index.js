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
import categoryList from "./categoryList";
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
import CategoryList from "../../components/AboutUsList";
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
  display: flex;
  align-items: center;
  flex-direction: column;
  [class*="col-"] {
    display: flex;
    justify-content: center;
  }
`;

export const InformationContainer = styled(Grid)`
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;

  .MuiFormHelperText-root {
    color: red;
  }
`;

export const InformationImageContainer = styled(Grid)`
  z-index: 3;
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

class AboutUs extends Component {
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
              <Styles.CategoryContainer>
                <Typography
                  component="h2"
                  variant="h2"
                  className="category-title"
                >
                  {i18n._(t`Who we are`)}
                </Typography>
                <div className="innertext">
                  <Typography
                    component="p"
                    variant="p"
                    className="category-title"
                  >
                    {i18n._(
                      t`Green Tree Nursery is the place designated for the propagation and cultivation process, and for the production of several seedlings of plants; Where seeds or some varieties are grown for the purpose of producing seedlings, ornamental plants, vegetable fences, climbers, flowering herbaceous plants, and others; To meet the needs of afforestation, beautification and coordination projects. We provide the best services and expertise in the field of maintenance, beautification and designing gardens and green spaces. We have skilled technical personnel who perform maintenance work with high quality craftsmanship. Working with engineers specializing in agriculture and horticulture, they monitor closely the work. We also work with in construction of irrigation networks with the latest technologies. We provide high quality raw materials and agricultural soil. Our work is well known by accuracy and speed in carrying out business, and of course we provide our services at reasonable prices for everyone`
                    )}
                  </Typography>
                </div>
              </Styles.CategoryContainer>
              <StyledContainer></StyledContainer>
            </Styles.StyledGrid>
            <Styles.StyledGrid>
              <Styles.CategoryContainer>
                <Typography
                  component="h2"
                  variant="h2"
                  className="category-title"
                  style={{ marginTop: "0px" }}
                >
                  {i18n._(t`Our Audience`)}
                </Typography>
                <div>
                  <Typography
                    component="h5"
                    variant="h5"
                    style={{ fontWeight: "300" }}
                  >
                    {i18n._(
                      t`Green Tree Nursery targets many Audiences, including`
                    )}
                  </Typography>
                  <CategoryList
                    list={categoryList}
                    selectedCategory={selectedCategory}
                    handleCategoryChange={this.handleCategoryChange}
                  />
                </div>
              </Styles.CategoryContainer>
              <StyledContainer></StyledContainer>
            </Styles.StyledGrid>
            <StyledContainer>
              <RowContainer style={{marginTop:'5px',width:'90%'}}>
                <Col lg={12} style={{margin: "20px" }}>
                  <IconsBootomOne style={{marginTop:'5px',width:'90%'}} />
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
)(AboutUs);
