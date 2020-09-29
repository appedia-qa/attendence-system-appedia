import React, { Component } from "react";
import styled from "styled-components";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { apiUrl } from "../../../constants/urls";
import { bindActionCreators } from "redux";
import {
  addErrorItemInAlert,
  addSuccessItemInAlert,
} from "../../../redux/actions/alert.action";
import { Typography, Box, Button } from "@material-ui/core";
import { Row, Col } from "react-flexbox-grid";
import MapContainer from "../../../components/GoogleMap";
import axios from "axios";
import { emptyCartRequest } from "../../../redux/actions/cart.action";
import {
  saveFormData,
  deleteFromData,
} from "../../../redux/actions/saveForm.action.js";
import { InformationContainer, RowContainer } from "./styles";
import InputLabel from "@material-ui/core/InputLabel";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import { emailValidator } from "../../../utils/emailPasswordValidator";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ExistingAddress, { RadioGroupIcon } from "../existingAddress";
import { t } from "@lingui/macro";
import { I18n } from "@lingui/react";
import Geocode from "react-geocode";
import { googleApiKey } from "../../../constants/urls";

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;

  flex-direction: column;
  [class*="col-"] {
    align-items: center;
    display: flex;
    justify-content: center;
  }
  ${({ theme }) => `
  padding: 0px;
  ${theme.breakpoints.up("md")} {
    padding: 40px;
  }
  .newAddressContainer {
    border: 1px solid #97979724;
    padding: 20px 13px;
    ${theme.breakpoints.up("sm")} {
      padding: 20px 40px;
    }
  }
 `}
`;
Geocode.setApiKey(googleApiKey);
Geocode.enableDebug();

export const ColContainer = styled(Col)`
  flex-direction: column;
  div {
    width: 100%;
  }
  .MuiOutlinedInput-input {
    padding: 18px;
  }
`;

export const Form = styled(FormControl)`
  flex-direction: column;
  div {
    width: 100%;
  }
`;

export const CheckoutButtonContainer = styled(Row)`
  ${({ theme, width }) => `
 
  ${width < 1199 ? `margin-top: 30px;` : `margin-top: 50px;`}  
    margin-bottom: 50px;
    .shop-btn {
      border-radius: 3px;
      ${width < 1199 ? `margin-left: 0;` : `margin-left: 0;`}  
      height: 50px;
      width: 285px;
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

const InputLabelTextFiled = styled(InputLabel)`
  margin-bottom: 5px;
`;

const AddAddressContainer = styled.div`
  ${({ newAddress }) => `
 
  display: ${newAddress === -1 ? "block" : "none"}; 
 `}
`;
const AddAddressGuestContainer = styled.div`
  ${({ newAddress }) => `
  
 `}
`;
class ShippingAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userAddress: "",
      selectedAddress: "",
      addressSelect: "",
      shipping: {
        addressType: "",
        name: this.props.name ? this.props.name : "",
        message: this.props.message ? this.props.message : "",
        number: this.props.number ? this.props.number : "",
        city: this.props.city ? this.props.city : "",
        zone: "",
        email: this.props.email ? this.props.email : "",
        buliding: this.props.buliding ? this.props.buliding : "",
        lastName: this.props.lastName ? this.props.lastName : "",
        area: this.props.area ? this.props.area : "",
        streetAddress: this.props.streetAddress ? this.props.streetAddress : "",
        officeNumber: "",
        latitude: this.props.latitude ? this.props.latitude : null,
        longitude: this.props.longitude ? this.props.longitude : null,
        address: this.props.address ? this.props.address : null,
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
  emptyInpuptfields = () => {
    this.props.deleteFromData();
    this.setState(
      {
        ...this.state,
        loading: false,
        shipping: {
          addressType: "",
          name: "",
          message: "",
          number: "",
          city: "",
          zone: "",
          email: "",
          buliding: "",
          lastName: "",
          area: "",
          streetAddress: "",
          officeNumber: "",
          latitude: null,
          longitude: null,
          address: null,
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
      },
      () => {
        this.liveLocation();
      }
    );
  };
  handleRadioChange = (value, id, preAddress) => {
    this.setState(
      {
        addressSelect: value,
        selectedAddress: id,
        previousAddress: preAddress,
      },
      () => {}
    );
  };

  handleGuestRadioChange = (value) => {
    this.setState(
      {
        addressSelect: value,
      },
      () => {}
    );
  };

  fetchALLUser = async () => {
    let url = apiUrl + `/address/all`;
    if (!url) return;
    let bodyParams = {};

    bodyParams = { ...bodyParams, user_id: this.props.user.id };
    const responce = await axios.get(url, { params: bodyParams });
    if (responce && responce.data) {
      this.setState({
        userAddress: responce.data.user_addresses,
      });
    }
  };

  CallLocation = async (lat, lng) => {
    if (
      this.state.shipping.latitude == null ||
      this.state.shipping.longitude == null
    ) {
      await this.setState({
        shipping: {
          ...this.state.shipping,
          latitude: lat,
          longitude: lng,
        },
      });
      this.props.saveFormData({
        payload: { filedName: "latitude", value: lat },
      });
      this.props.saveFormData({
        payload: { filedName: "longitude", value: lng },
      });
    }
  };

  setLatLndAdd = () => {
    this.props.saveFormData({
      payload: { filedName: "latitude", value: this.state.shipping.latitude },
    });
    this.props.saveFormData({
      payload: { filedName: "longitude", value: this.state.shipping.longitude },
    });
    this.props.saveFormData({
      payload: { filedName: "address", value: this.state.shipping.address },
    });
  };

  liveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState(
          {
            shipping: {
              ...this.state.shipping,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          },
          () => {
            Geocode.fromLatLng(
              position.coords.latitude,
              position.coords.longitude
            ).then(
              (response) => {
                const address = response.results[0].formatted_address;
                this.setState(
                  {
                    shipping: {
                      ...this.state.shipping,
                      address: address ? address : "",
                    },
                  },
                  () => {
                    this.setLatLndAdd();
                  }
                );
              },
              (error) => {
                console.error(error);
              }
            );
          }
        );
      });
    } else {
      console.error("Geolocation is not supported by this browser!");
    }
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.user && this.props.user.id) {
      this.fetchALLUser();
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState(
          {
            shipping: {
              ...this.state.shipping,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          },
          () => {
            Geocode.fromLatLng(
              position.coords.latitude,
              position.coords.longitude
            ).then(
              (response) => {
                const address = response.results[0].formatted_address;
                this.setState(
                  {
                    shipping: {
                      ...this.state.shipping,
                      address: address ? address : "",
                    },
                  },
                  () => {
                    this.setLatLndAdd();
                  }
                );
              },
              (error) => {
                console.error(error);
              }
            );
          }
        );
      });
    } else {
      console.error("Geolocation is not supported by this browser!");
    }
  }

  handleInputChange = (input) => ({ target: { value } }) => {
    this.setState({
      selectedAddress: "",
      shipping: {
        ...this.state.shipping,
        [input]: value,
      },
      errorStates: {
        ...this.state.errorStates,
        [`${input}Touched`]: true,
      },
    });
    this.props.saveFormData({
      payload: { filedName: input, value: value },
    });
  };

  Normlilize = (cart) => {
    return {
      product_id: cart && cart.id ? cart.id : "",
      quantity: cart && cart.qty ? cart.qty : 1,
      price: cart && cart.price,
    };
  };
  addGuestAddress = () => {
    this.setState({
      addressSelect: -1,
      selectedAddress: "guest",
    });
    this.props.addSuccessItemInAlert({
      message: "Your address is added plz proceed to checkout",
    });
  };

  CallAddNewAddress = async () => {
    const {
      shipping: {
        message,
        lastName,
        name,
        number,
        city,
        buliding,
        area,
        streetAddress,
        latitude,
        longitude,
        address,
      },
    } = this.state;

    let url = apiUrl + `/address/add`;
    if (!url) return;
    this.setState({ loading: true });
    if (this.props.user == null) {
      this.setState({ loading: false });
      this.props.addErrorItemInAlert({
        message: "Please Login First",
      });
      return;
    } else {
      try {
        const responce = await axios.post(url, {
          user_id: this.props.user.id,
          shipping_fullname: name + lastName,
          address_type: "home",
          house_number: buliding,
          shipping_city: city,
          notes: message,
          shipping_state: streetAddress,
          shipping_zipcode: area,
          latitude: latitude,
          logitude: longitude,
          shipping_google_address: address,
          shipping_phone: number,
          shipping_address: `${buliding},${streetAddress},${area},${city}`,
        });
        if (responce.status == 200 || responce.status == 201) {
          this.setState({
            addressSelect: -2,
            selectedAddress: "",
            previousAddress: responce.data.user_address,
          });
          this.props.addSuccessItemInAlert({
            message: "Your address is added plz proceed to checkout",
          });
          this.emptyInpuptfields();
          this.fetchALLUser();
        } else {
          this.setState({ loading: false });
          this.props.addErrorItemInAlert({
            message: "Please try again later",
          });
        }
      } catch (error) {
        this.setState({ loading: false });
        this.props.addErrorItemInAlert({
          message: "Please try again later",
        });
        return;
      }
    }
  };

  handelGuestCheckout = async () => {
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
        latitude,
        longitude,
        message,
        address,
      },
    } = this.state;
    if (this.props.cartItems.length <= 0) {
      this.props.addErrorItemInAlert({
        message: "Please Add items in to your cart before proceed to checkout",
      });
      return;
    }
    const cartItems = this.props.cartItems.map((cart) => {
      return this.Normlilize(cart);
    });
    const SHIPIING_COST = 30;

    const item = {
      currencyCode: "QAR",
      customerEmail: email,
      customerName: name + lastName,
      amount: parseFloat(this.props.totalPriceOfCart) + SHIPIING_COST,
      lang: this.props.language == "ENGLISH" ? "eng" : "ar",
      customerPhone: number,

      order: {
        email: email,
        name: name + lastName,
        shipping_cost: SHIPIING_COST,
        payment_method: "3",
        grand_total: parseFloat(this.props.totalPriceOfCart) + SHIPIING_COST,
        shipping_address: `${buliding},${streetAddress},${area},${city}`,
        contact: number,
        shipping_city: city,
        shipping_state: streetAddress,
        shipping_zipcode: area,
        notes: message,
        latitude: latitude,
        logitude: longitude,
        shipping_google_address: address,
      },
      orderitem: cartItems,
    };
    this.props.disable(false);
    this.props.handleTabChange(1, item);
  };

  handelCheckout = async () => {
    if (this.props.cartItems.length <= 0) {
      this.props.addErrorItemInAlert({
        message: "Please Add items in to your cart before proceed to checkout",
      });
      return;
    }
    const cartItems = this.props.cartItems.map((cart) => {
      return this.Normlilize(cart);
    });
    const SHIPIING_COST = 30;
    const item = {
      currencyCode: "QAR",
      customerEmail: this.props.user.email,
      customerName: this.state.previousAddress.shipping_fullname,
      amount: parseFloat(this.props.totalPriceOfCart) + SHIPIING_COST,
      lang: this.props.language == "ENGLISH" ? "eng" : "ar",
      customerPhone: this.state.previousAddress.shipping_phone,
      cart_id: this.props.id,
      user_id: this.props.user.id,
      order: {
        user_id: this.props.user.id,
        email: this.props.user.email,
        name: this.state.previousAddress.shipping_fullname,
        shipping_cost: SHIPIING_COST,
        payment_method: "3",
        grand_total: parseFloat(this.props.totalPriceOfCart) + SHIPIING_COST,
        shipping_address: this.state.previousAddress.shipping_address,
        contact: this.state.previousAddress.shipping_phone,
        shipping_city: this.state.previousAddress.shipping_city,
        shipping_state: this.state.previousAddress.shipping_state,
        shipping_zipcode: this.state.previousAddress.shipping_zipcode,
        latitude: this.state.previousAddress.latitude,
        logitude: this.state.previousAddress.logitude,
        shipping_google_address: this.state.previousAddress
          .shipping_google_address,
      },
      orderitem: cartItems,
    };
    this.props.disable(false);
    this.props.handleTabChange(1, item);
  };

  handleFormSubmit = () => {
    const {
      shipping: {
        lastName,
        name,
        number,
        city,
        email,
        buliding,
        area,
        streetAddress,
        address,
        latitude,
        longitude,
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
      buliding == "" ||
      area.length < 1 ||
      lastName.length < 1 ||
      name.length < 1 ||
      number.length < 7 ||
      city.length < 1 ||
      streetAddress.length < 1
    ) {
      this.props.addErrorItemInAlert({
        message:
          "Please ADD address and make sure you have entered correct infromation",
      });
      return;
    }
    if (this.props.user && this.props.user.id) {
      if (latitude != null && longitude != null && address != null) {
        this.CallAddNewAddress();
      } else {
        this.props.addErrorItemInAlert({
          message: "Please mark your on map",
        });
      }
    } else {
      if (emailValidator(email)) {
        if (latitude != null && longitude != null && address != null) {
          this.addGuestAddress();
        } else {
          this.props.addErrorItemInAlert({
            message: "Please mark your on map",
          });
        }
      } else {
        this.props.addErrorItemInAlert({
          message:
            "Please ADD address and make sure you have entered correct infromation",
        });
        return;
      }
    }
  };

  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        this.setState(
          {
            shipping: {
              ...this.state.shipping,
              address: address ? address : "",
              latitude: newLat,
              longitude: newLng,
            },
          },
          () => {
            this.setLatLndAdd();
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  };

  onPlaceSelected = async (place) => {
    if (!place.address_components) {
      this.props.addErrorItemInAlert({
        message: "Please select your location from dropdown",
      });
      return;
    }
    const address = place.formatted_address,
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();

    // Set these values in the state.
    this.setState(
      {
        shipping: {
          ...this.state.shipping,
          address: address ? address : "",
          latitude: latValue,
          longitude: lngValue,
        },
      },
      () => {
        this.setLatLndAdd();
      }
    );
  };

  render() {
    const {
      shipping: {
        name,
        number,
        city,
        lastName,
        email,
        area,
        buliding,
        message,
        streetAddress,
        latitude,
        longitude,
        address,
      },
      errorStates: {
        nameTouched,
        numberTouched,
        cityTouched,
        emailTouched,
        lastNameTouched,
        bulidingTouched,
        areaTouched,
        streetAddressTouched,
      },
    } = this.state;
    return (
      <I18n>
        {({ i18n }) => (
          <StyledContainer>
            {this.props.user && this.props.user.id ? (
              <InformationContainer width={this.props.windowWidth}>
                <div className="newAddressContainer">
                  <RadioGroupIcon row>
                    <FormControlLabel
                      id="radio-paypal"
                      value="new-address"
                      checked={this.state.addressSelect === -1 ? true : false}
                      control={<Radio />}
                      label={i18n._(t`Add New Address`)}
                      labelPlacement="right"
                      onChange={() => this.handleRadioChange(-1)}
                      className="newAddressGroup"
                    />
                  </RadioGroupIcon>
                  <AddAddressContainer newAddress={this.state.addressSelect}>
                    <RowContainer width={this.props.windowWidth}>
                      <ColContainer lg={6}>
                        <div>
                          <InputLabelTextFiled htmlFor="input-with-icon-adornment">
                            {i18n._(t`FIRST NAME`)} *
                          </InputLabelTextFiled>
                          <TextField
                            id="name"
                            value={name}
                            className="input-box"
                            placeholder="Full Name *"
                            variant="outlined"
                            type="text"
                            onChange={this.handleInputChange("name")}
                            error={
                              nameTouched && name.length < 1 ? true : false
                            }
                            style={{ marginBottom: "10px" }}
                          />
                        </div>
                      </ColContainer>
                      <ColContainer lg={6}>
                        <div>
                          <InputLabelTextFiled htmlFor="input-with-icon-adornment">
                            {i18n._(t`LAST NAME`)} *
                          </InputLabelTextFiled>
                          <TextField
                            className="input-box"
                            value={lastName}
                            placeholder="As they appear in your QID or PPT"
                            variant="outlined"
                            type="text"
                            onChange={this.handleInputChange("lastName")}
                            error={
                              lastNameTouched && lastName.length < 1
                                ? true
                                : false
                            }
                            style={{ marginBottom: "10px" }}
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
                            {i18n._(t`CITY`)} *
                          </InputLabelTextFiled>
                          <TextField
                            value={city}
                            className="input-box"
                            placeholder="City Name"
                            variant="outlined"
                            error={cityTouched && city == "" ? true : false}
                            onChange={this.handleInputChange("city")}
                          ></TextField>
                        </div>
                      </ColContainer>
                      <ColContainer lg={6}>
                        <div>
                          <InputLabelTextFiled htmlFor="input-with-icon-adornment">
                            {i18n._(t`STREET`)} *
                          </InputLabelTextFiled>
                          <TextField
                            className="input-box"
                            value={streetAddress}
                            placeholder="Street Name"
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
                            {i18n._(t`BULIDING NUMBER`)} *
                          </InputLabelTextFiled>
                          <TextField
                            id="city"
                            value={buliding}
                            className="input-box"
                            placeholder="Buliding / office / home "
                            variant="outlined"
                            onChange={this.handleInputChange("buliding")}
                            error={
                              bulidingTouched && buliding == "" ? true : false
                            }
                            style={{ marginBottom: "10px" }}
                          />
                        </div>
                      </ColContainer>
                      <ColContainer lg={6}>
                        <div>
                          <InputLabelTextFiled htmlFor="input-with-icon-adornment">
                            {i18n._(t`AREA NUMBER`)} *
                          </InputLabelTextFiled>
                          <TextField
                            id="zone"
                            value={area}
                            className="input-box"
                            placeholder="Street Name"
                            variant="outlined"
                            onChange={this.handleInputChange("area")}
                            error={
                              areaTouched && area.length < 1 ? true : false
                            }
                            style={{ marginBottom: "10px" }}
                          />
                        </div>
                      </ColContainer>
                    </RowContainer>
                    <RowContainer>
                      <ColContainer lg={12}>
                        <div>
                          <InputLabelTextFiled htmlFor="input-with-icon-adornment">
                            {i18n._(t`CONTACT NUMBER`)} *
                          </InputLabelTextFiled>
                          <TextField
                            id="city"
                            value={number}
                            className="input-box"
                            placeholder="e.g 5555 5555"
                            variant="outlined"
                            onChange={this.handleInputChange("number")}
                            error={
                              numberTouched && number.length < 7 ? true : false
                            }
                            style={{ marginBottom: "10px" }}
                          />
                        </div>
                      </ColContainer>
                      {/* <ColContainer lg={6}>
                      <div>
                        <InputLabelTextFiled htmlFor="input-with-icon-adornment">
                          {i18n._(t`EMAIL ADDRESS`)} *
                        </InputLabelTextFiled>
                        <TextField
                          id="zone"
                          className="input-box"
                          placeholder="Email address"
                          variant="outlined"
                          type="Email"
                          onChange={this.handleInputChange("email")}
                          error={
                            emailTouched && !emailValidator(email)
                              ? true
                              : false
                          }
                          style={{ marginBottom: "10px" }}
                        />
                      </div>
                    </ColContainer> */}
                    </RowContainer>
                    <RowContainer>
                      <ColContainer lg={12}>
                        <div>
                          <InputLabelTextFiled htmlFor="input-with-icon-adornment">
                            {i18n._(t`MESSAGE`)}
                          </InputLabelTextFiled>
                          <TextareaAutosize
                            aria-label="minimum height"
                            rowsMin={5}
                            value={message}
                            style={{
                              borderRadius: "5px",
                              border: "1px solid #C8C8C8",
                              width: "99%",
                              resize: "none",
                            }}
                            onChange={this.handleInputChange("message")}
                            placeholder="e.g name of a landmark close by or next to your office"
                          />
                        </div>
                      </ColContainer>
                    </RowContainer>
                    <RowContainer>
                      <InputLabelTextFiled htmlFor="input-with-icon-adornment">
                        {i18n._(t`Map`)}
                      </InputLabelTextFiled>
                      <MapContainer
                        onMarkerDragEnd={this.onMarkerDragEnd}
                        onPlaceSelected={this.onPlaceSelected}
                        address={address ? address : "Doha, Qatar"}
                        lat={latitude != null ? latitude : 25.2854}
                        lng={longitude != null ? longitude : 51.531}
                      />
                    </RowContainer>
                  </AddAddressContainer>
                </div>
                {this.state.userAddress &&
                  this.state.userAddress.map((user, index) => (
                    <ExistingAddress
                      addressSelect={this.state.addressSelect}
                      user={user}
                      addressNumber={index}
                      changeAddress={this.handleRadioChange}
                    />
                  ))}
                <CheckoutButtonContainer width={this.props.windowWidth}>
                  <Col lg={6}>
                    <Button
                      className="shop-btn shopping"
                      onClick={() => this.props.history.push("/")}
                    >
                      {i18n._(t`CONTINUE SHOPPING`)}
                    </Button>
                  </Col>
                  <Col lg={6}>
                    {this.state.selectedAddress ? (
                      <div>
                        <Button
                          className="shop-btn payment"
                          onClick={() => this.handelCheckout()}
                        >
                          {i18n._(t`PROCEED TO CHECKOUT`)}
                        </Button>
                      </div>
                    ) : (
                      <div>
                        {this.props.disable(true)}
                        <Button
                          className="shop-btn payment"
                          onClick={this.handleFormSubmit}
                        >
                          {i18n._(t`ADD NEW ADDRESS`)}
                        </Button>
                      </div>
                    )}
                  </Col>
                </CheckoutButtonContainer>
              </InformationContainer>
            ) : (
              <InformationContainer width={this.props.windowWidth}>
                <div className="newAddressContainer">
                  <Typography variant="h4" component="h4">
                    {i18n._(t`Add New Address`)}
                  </Typography>
                  <AddAddressGuestContainer>
                    <RowContainer>
                      <ColContainer lg={6}>
                        <div>
                          <InputLabelTextFiled htmlFor="input-with-icon-adornment">
                            {i18n._(t`FIRST NAME`)} *
                          </InputLabelTextFiled>
                          <TextField
                            id="name"
                            value={name}
                            className="input-box"
                            placeholder="Full Name *"
                            variant="outlined"
                            type="text"
                            onChange={this.handleInputChange("name")}
                            error={
                              nameTouched && name.length < 1 ? true : false
                            }
                            style={{ marginBottom: "10px" }}
                          />
                        </div>
                      </ColContainer>
                      <ColContainer lg={6}>
                        <div>
                          <InputLabelTextFiled htmlFor="input-with-icon-adornment">
                            {i18n._(t`LAST NAME`)} *
                          </InputLabelTextFiled>
                          <TextField
                            className="input-box"
                            value={lastName}
                            placeholder="As they appear in your QID or PPT"
                            variant="outlined"
                            type="text"
                            onChange={this.handleInputChange("lastName")}
                            error={
                              lastNameTouched && lastName.length < 1
                                ? true
                                : false
                            }
                            style={{ marginBottom: "10px" }}
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
                            {i18n._(t`CITY`)} *
                          </InputLabelTextFiled>
                          <TextField
                            value={city}
                            className="input-box"
                            placeholder="City Name"
                            variant="outlined"
                            error={cityTouched && city == "" ? true : false}
                            onChange={this.handleInputChange("city")}
                          ></TextField>
                        </div>
                      </ColContainer>
                      <ColContainer lg={6}>
                        <div>
                          <InputLabelTextFiled htmlFor="input-with-icon-adornment">
                            {i18n._(t`STREET`)} *
                          </InputLabelTextFiled>
                          <TextField
                            className="input-box"
                            value={streetAddress}
                            placeholder="Street Name"
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
                            {i18n._(t`BULIDING NUMBER`)} *
                          </InputLabelTextFiled>
                          <TextField
                            id="city"
                            value={buliding}
                            className="input-box"
                            placeholder="Buliding / office / home "
                            variant="outlined"
                            onChange={this.handleInputChange("buliding")}
                            error={
                              bulidingTouched && buliding == "" ? true : false
                            }
                            style={{ marginBottom: "10px" }}
                          />
                        </div>
                      </ColContainer>
                      <ColContainer lg={6}>
                        <div>
                          <InputLabelTextFiled htmlFor="input-with-icon-adornment">
                            {i18n._(t`AREA NUMBER`)} *
                          </InputLabelTextFiled>
                          <TextField
                            id="zone"
                            value={area}
                            className="input-box"
                            placeholder="Street Name"
                            variant="outlined"
                            onChange={this.handleInputChange("area")}
                            error={
                              areaTouched && area.length < 1 ? true : false
                            }
                            style={{ marginBottom: "10px" }}
                          />
                        </div>
                      </ColContainer>
                    </RowContainer>
                    <RowContainer>
                      <ColContainer lg={6}>
                        <div>
                          <InputLabelTextFiled htmlFor="input-with-icon-adornment">
                            {i18n._(t`CONTACT NUMBER`)} *
                          </InputLabelTextFiled>
                          <TextField
                            id="city"
                            value={number}
                            className="input-box"
                            placeholder="e.g 5555 5555"
                            variant="outlined"
                            onChange={this.handleInputChange("number")}
                            error={
                              numberTouched && number.length < 7 ? true : false
                            }
                            style={{ marginBottom: "10px" }}
                          />
                        </div>
                      </ColContainer>
                      <ColContainer lg={6}>
                        <div>
                          <InputLabelTextFiled htmlFor="input-with-icon-adornment">
                            {i18n._(t`EMAIL ADDRESS`)} *
                          </InputLabelTextFiled>
                          <TextField
                            id="zone"
                            value={email}
                            className="input-box"
                            placeholder="Email address"
                            variant="outlined"
                            type="Email"
                            onChange={this.handleInputChange("email")}
                            error={
                              emailTouched && !emailValidator(email)
                                ? true
                                : false
                            }
                            style={{ marginBottom: "10px" }}
                          />
                        </div>
                      </ColContainer>
                    </RowContainer>
                    <RowContainer>
                      <ColContainer lg={12}>
                        <div>
                          <InputLabelTextFiled htmlFor="input-with-icon-adornment">
                            {i18n._(t`MESSAGE`)}
                          </InputLabelTextFiled>
                          <TextareaAutosize
                            aria-label="minimum height"
                            rowsMin={5}
                            value={message}
                            style={{ width: "99%", resize: "none" }}
                            onChange={this.handleInputChange("message")}
                            placeholder="e.g name of a landmark close by or next to your office"
                          />
                        </div>
                      </ColContainer>
                    </RowContainer>
                    <RowContainer>
                      <InputLabelTextFiled htmlFor="input-with-icon-adornment">
                        {i18n._(t`Map`)}
                      </InputLabelTextFiled>
                      <MapContainer
                        onMarkerDragEnd={this.onMarkerDragEnd}
                        onPlaceSelected={this.onPlaceSelected}
                        address={address ? address : "Doha, Qatar"}
                        lat={latitude != null ? latitude : 25.2854}
                        lng={longitude != null ? longitude : 51.531}
                      />
                    </RowContainer>
                  </AddAddressGuestContainer>
                </div>

                <CheckoutButtonContainer width={this.props.windowWidth}>
                  <Col lg={6}>
                    <Button
                      className="shop-btn shopping"
                      onClick={() => this.props.history.push("/")}
                    >
                      {i18n._(t`CONTINUE SHOPPING`)}
                    </Button>
                  </Col>
                  <Col lg={6}>
                    {this.state.selectedAddress ? (
                      <div>
                        <Button
                          className="shop-btn payment"
                          style={{ background: "green" }}
                          onClick={() => this.handelGuestCheckout()}
                        >
                          {i18n._(t`PROCEED TO CHECKOUT`)}
                        </Button>
                      </div>
                    ) : (
                      <div>
                        {this.props.disable(true)}
                        <Button
                          className="shop-btn payment"
                          onClick={this.handleFormSubmit}
                        >
                          {i18n._(t`ADD NEW ADDRESS`)}
                        </Button>
                      </div>
                    )}
                  </Col>
                </CheckoutButtonContainer>
              </InformationContainer>
            )}
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
      emptyCartRequest,
      addSuccessItemInAlert,
      saveFormData,
      deleteFromData,
    },
    dispatch
  );

const mapStateToProps = (state) => {
  const { products, loading, error } = state.product;
  const { id, cartItems, isOpen, totalPrice } = state.cart;
  const {
    streetAddress,
    name,
    lastName,
    city,
    buliding,
    area,
    number,
    message,
    latitude,
    address,
    longitude,
    email,
  } = state.FormData;
  const { user } = state.authentication;

  return {
    products,
    loading,
    id,
    error,
    user,
    cartItems,
    email,
    isCartOpen: isOpen,
    totalPriceOfCart: totalPrice,
    streetAddress,
    name,
    address,
    lastName,
    city,
    buliding,
    area,
    number,
    message,
    latitude,
    longitude,
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ShippingAddress);
