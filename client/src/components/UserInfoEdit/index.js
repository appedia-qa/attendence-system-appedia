import React, { Component } from "react";
import styled from "styled-components";
import { Trans } from "@lingui/macro";
import { Button } from "@material-ui/core";
import { Row, Col } from "react-flexbox-grid";
import Modal from "@material-ui/core/Modal";
import Loader from "react-loader-spinner";
import { compose } from "redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { apiUrl } from "../../constants/urls";
import { googleApiKey } from "../../constants/urls";
import { InformationContainer, RowContainer } from "./styles";
import InputLabel from "@material-ui/core/InputLabel";
import { withRouter } from "react-router";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import MapContainer from "../GoogleMap";
import Geocode from "react-geocode";
import { ReactComponent as MinimizeIcon } from "../../assets/icons/minimize-2.svg";
import { addErrorItemInAlert } from "../../redux/actions/alert.action";
import FormControl from "@material-ui/core/FormControl";

export const StyledContainer = styled.div`
  display: flex;

  align-items: center;
  outline: none;
  flex-direction: column;
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
    margin-top: 25px;
    max-height: 80%;
    outline:none;

    ${theme.breakpoints.down("sm")} {
      margin-top: 50px;
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
    };
  }

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
                this.setState({
                  shipping: {
                    ...this.state.shipping,
                    address: address ? address : "",
                  },
                });
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
          latitude:
            nextProps && nextProps.user && nextProps.user.latitude
              ? nextProps.user.latitude
              : this.state.shipping.latitude,
          longitude:
            nextProps && nextProps.user && nextProps.user.logitude
              ? nextProps.user.logitude
              : this.state.shipping.longitude,
          address:
            nextProps &&
            nextProps.user &&
            nextProps.user.shipping_google_address
              ? nextProps.user.shipping_google_address
              : this.state.shipping.shipping_google_address,
        },
      });
    }

    if (nextProps.addNewAddress) {
      this.liveLocation();
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

  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        this.setState({
          shipping: {
            ...this.state.shipping,
            address: address ? address : "",
            latitude: newLat,
            longitude: newLng,
          },
        });
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
    this.setState({
      shipping: {
        ...this.state.shipping,
        address: address ? address : "",
        latitude: latValue,
        longitude: lngValue,
      },
    });
  };

  CallUpdateAddress = async () => {
    const {
      shipping: {
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

    let url = apiUrl + `/address/update`;
    if (!url) return;
    let bodyParams = {};
    bodyParams = {
      ...bodyParams,
      user_id: this.props.userId,
      shipping_fullname: name,
      address_type: "house",
      house_number: buliding,
      shipping_address: `${buliding},${streetAddress},${area},${city}`,
      shipping_city: city,
      shipping_state: streetAddress,
      shipping_zipcode: area,
      shipping_phone: number,
      address_id: this.props.user.id,
      latitude: latitude,
      logitude: longitude,
      shipping_google_address: address,
    };
    this.setState({ loading: true });
    try {
      const responce = await axios.put(url, bodyParams);
      if (responce.status === 200 || responce.status === 201) {
        this.setState({ loading: false });
        this.props.handleDialogClose();
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
      this.props.addErrorItemInAlert({
        message: "Please try again later",
      });
      return;
    }
  };

  CallAddNewAddress = async () => {
    const {
      shipping: {
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
    try {
      const responce = await axios.post(url, {
        user_id: this.props.userId,
        shipping_fullname: name,
        address_type: "house",
        house_number: buliding,
        shipping_address: `${buliding},${streetAddress},${area},${city}`,
        shipping_city: city,
        shipping_state: streetAddress,
        shipping_zipcode: area,
        shipping_phone: number,
        latitude: latitude,
        logitude: longitude,
        shipping_google_address: address,
      });

      if (responce.status == 200 || responce.status == 201) {
        this.setState({ loading: false });
        this.props.handleDialogClose(false);
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
  };

  handleFormSubmit = () => {
    const {
      shipping: {
        name,
        number,
        city,
        buliding,
        area,
        streetAddress,
        longitude,
        latitude,
        address,
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
      area.length < 1 ||
      name.length < 1 ||
      number.length < 7 ||
      city.length < 1 ||
      streetAddress.length < 1
    ) {
      return;
    } else {
      if (latitude != null && longitude != null && address != null) {
        this.props.addNewAddress
          ? this.CallAddNewAddress()
          : this.CallUpdateAddress();
      } else {
        this.props.addErrorItemInAlert({
          message: "Please mark your location using google map",
        });
      }
    }
  };

  render() {
    const {
      loading,
      shipping: {
        name,
        number,
        city,
        area,
        buliding,
        streetAddress,
        longitude,
        latitude,
        address,
      },
      errorStates: {
        nameTouched,
        numberTouched,
        cityTouched,
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
          <CloseButton onClick={() => this.props.handleDialogClose()}>
            <MinimizeIcon />
          </CloseButton>
          <InformationContainer width={this.props.windowWidth}>
            <RowContainer width={this.props.windowWidth}>
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
                      numberTouched && number.length < 7
                        ? "Please Enter Contact Number"
                        : ""
                    }
                    placeholder="e.g 5555 5555"
                    variant="outlined"
                    onChange={this.handleInputChange("number")}
                    error={numberTouched && number.length < 7 ? true : false}
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

            <MapContainer
              onMarkerDragEnd={this.onMarkerDragEnd}
              onPlaceSelected={this.onPlaceSelected}
              address={address ? address : "Doha, Qatar"}
              lat={latitude != null ? parseFloat(latitude) : 25.2854}
              lng={longitude != null ? parseFloat(longitude) : 51.531}
            />

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
                  <Loader type="Oval" height={50} />
                ) : (
                  <Button
                    className="shop-btn shopping"
                    onClick={this.handleFormSubmit}
                  >
                    {this.props.addNewAddress ? (
                      <Trans>Save New Address</Trans>
                    ) : (
                      <Trans>Update</Trans>
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
