import React, { Component } from "react";
import styled from "styled-components";
import { Typography, Box, Button } from "@material-ui/core";
import { Grid, Row, Col } from "react-flexbox-grid";
import { RadioContainer, InformationContainer, RowContainer } from "./styles";
import Breakpoints from "../../constants/Breakpoints";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';


export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  [class*="col-"] {
    display:flex;
    justify-content:center;
  }
`;

export const CheckoutButtonContainer = styled(Row)`
  ${({ theme, width }) => `
 
  ${width < 1199 ? `margin-top: 30px;` : `margin-top: 100px;`}  
    margin-bottom: 100px;
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
      margin-bottom: 10px;
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
      shipping: {
        addressType: "",
        name: "",
        number: 0,
        city: "",
        zone: "",
        streetAddress: "",
        officeNumber: 0
      },
      errorStates: {
        streetAddressTouched: false,
        cityTouched: false,
        nameTouched: false,
        numberTouched: false,
        zoneTouched: false,
        officeNumberTouched: false,
        addressTypeTouched: false
      }
    };
  }
  handleRadioChange = ({ target: { value } }) => {
    this.setState({
      shipping: {
        ...this.state.shipping,
        addressType: value
      },
      errorStates: {
        ...this.state.errorStates,
        addressTypeTouched: false
      }
    });
  };
  handleInputChange = input => ({ target: { value } }) => {
    this.setState({
      shipping: {
        ...this.state.shipping,
        [input]: value
      },
      errorStates: {
        ...this.state.errorStates,
        [`${input}Touched`]: true
      }
    });
  };

  handleFormSubmit = () => {
    const { shipping: { addressType, name, number, city, zone, streetAddress, officeNumber },
      errorStates: { nameTouched, addressTypeTouched, numberTouched, cityTouched, zoneTouched, streetAddressTouched, officeNumberTouched }
    } = this.state;

    this.setState({
      errorStates: {
        streetAddressTouched: true,
        addressTypeTouched: true,
        cityTouched: true,
        nameTouched: true,
        numberTouched: true,
        zoneTouched: true,
        officeNumberTouched: true,
      }
    })

    if ((addressTypeTouched && addressType.length < 3) || (nameTouched && name.length < 3) || (numberTouched && number.length < 10)
      || (cityTouched && city.length < 3) || (zoneTouched && zone.length < 3) ||
      (streetAddressTouched && streetAddress.length < 10) || (officeNumberTouched && officeNumber.length < 10)
    ) {

      return;
    }

    this.props.handleTabChange(2)
  }

  render() {

    const { shipping: { addressType, name, number, city, zone, streetAddress, officeNumber },
      errorStates: { nameTouched, addressTypeTouched, numberTouched, cityTouched, zoneTouched, streetAddressTouched, officeNumberTouched }
    } = this.state;
    const radioError = (addressTypeTouched && addressType.length > 0) ? false : true
    return (
      <StyledContainer>
        <FormControl component="fieldset" error={radioError}>
          <RadioContainer width={this.props.windowWidth}>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top"
              onChange={event => this.handleRadioChange(event)}
            >
              <FormControlLabel
                id="radio-house"
                value="house"
                control={<Radio />}
                label="House"
                labelPlacement="start"
              />
              <FormControlLabel
                id="radio-office"
                value="office"
                control={<Radio />}
                label="Office"
                labelPlacement="start"
              />
            </RadioGroup>
          </RadioContainer>
        </FormControl>
        {radioError ? <FormHelperText>You must select one option</FormHelperText> : null}

        <InformationContainer width={this.props.windowWidth}>
          <RowContainer width={this.props.windowWidth}>
            <Col lg={6}>
              <TextField
                id="name"
                className="input-box"
                placeholder="Full Name *"
                variant="outlined"
                type="text"
                onChange={this.handleInputChange("name")}
                error={(nameTouched && name.length < 3) ? true : false}
                style={{ marginBottom: '10px' }}
              />
            </Col>
            <Col lg={6}>
              <TextField
                id="number"
                className="input-box"
                placeholder="Number *"
                variant="outlined"
                type="number"
                onChange={this.handleInputChange("number")}
                error={(numberTouched && number.length < 10) ? true : false}
                style={{ marginBottom: '10px' }}
              />
            </Col>
          </RowContainer>
          <RowContainer>
            <Col lg={6}>
              <TextField
                id="city"
                className="input-box"
                placeholder="City *"
                variant="outlined"
                type="text"
                onChange={this.handleInputChange("city")}
                error={(cityTouched && city.length < 3) ? true : false}
                style={{ marginBottom: '10px' }}
              />
            </Col>
            <Col lg={6}>
              <TextField
                id="zone"
                className="input-box"
                placeholder="Zone *"
                variant="outlined"
                type="text"
                onChange={this.handleInputChange("zone")}
                error={(zoneTouched && zone.length < 3) ? true : false}
                style={{ marginBottom: '10px' }}
              />
            </Col>
          </RowContainer>
          <RowContainer>
            <Col lg={6}>
              <TextField
                id="street-address"
                className="input-box"
                placeholder="Street Address *"
                variant="outlined"
                type="text"
                onChange={this.handleInputChange("streetAddress")}
                error={(streetAddressTouched && streetAddress.length < 10) ? true : false}
              />
            </Col>
            <Col lg={6}>
              <TextField
                id="office-number"
                className="input-box"
                placeholder="Office No *"
                variant="outlined"
                type="number"
                onChange={this.handleInputChange("officeNumber")}
                error={(officeNumberTouched && officeNumber.length < 10) ? true : false}
              />
            </Col>
          </RowContainer>
          <CheckoutButtonContainer width={this.props.windowWidth}>
            <Col lg={6}>
              <Button className="shop-btn shopping" onClick={() => this.props.history.push("")}>CONTINUE SHOPPING</Button>
            </Col>
            <Col lg={6}>
              <Button className="shop-btn payment" onClick={this.handleFormSubmit} >PROCEED TO PAYMENT</Button>
            </Col>
          </CheckoutButtonContainer>
        </InformationContainer>
      </StyledContainer>
    );
  }
}

export default ShippingAddress;
