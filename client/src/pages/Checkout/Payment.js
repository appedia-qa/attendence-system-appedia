import React, { Component } from "react";
import styled from "styled-components";
import PaymentMobile from "./payment-mobile";
import Radio from "@material-ui/core/Radio";
import { Grid, Row, Col } from "react-flexbox-grid";
import Breakpoints from "../../constants/Breakpoints";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import ProductDialog from "../../components/SuccessComponent";
import { Typography, Box, Button } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { ReactComponent as Visa } from "../../assets/icons/visa.svg";
import { ReactComponent as Card } from "../../assets/icons/cash.svg";
import { ReactComponent as Paypal } from "../../assets/icons/paypal.svg";
import { ReactComponent as Mastercard } from "../../assets/icons/Mastercard.svg";
import { ReactComponent as CreditCard } from "../../assets/icons/creditCard.svg";
import {
  RadioContainer,
  InformationContainer,
  RowPaymentContainer,
} from "./styles";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SvgContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  justify-content: center;
  padding: 20px;
  @media (max-width: 786px) {
    padding: 10px;
  }
  width: 100px;
  height: 25px;
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
    width: 70px;
  }
  svg path {
    stroke: none;
    fill: black;
  }
`;

export const DesktopCheckoutButtonContainer = styled.div`
  ${({ theme }) => `
    margin-top: 50px;
    margin-bottom: 100px;
    justify-content:flex-start;
    display:flex;
    .shop-btn {
      border-radius: 3px;
      height: 50px;
      width: 285px;
      font-size: 16px;
    }
    .shopping {
      background-color: black;
      color: ${theme.palette.white.main};
      margin-right: 10px;
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
  width: 75%;
`;

export const RadioGroupIcon = styled(RadioGroup)`
  [class*="col-"] {
    display: flex;
    justify-content: center;
  }
`;

export const Info = styled.div`
  [class*="col-"] {
    padding-left: 10%;
    padding-right: 5%;
  }
`;

export const Line = styled.div`
  height: 8px;
  margin-top: 20px;
  background: #e0e0e0;
`;

export const BoldLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: #e0e0e0;
`;

export const DivBox = styled.div`
  width: 190px;
  height: auto;
  background: rgb(242, 128, 23);
`;

const LabelView = (props) => {
  return (
    <SvgContainer active={props.selectedScreen}>
      <Mastercard />
      <Visa />
    </SvgContainer>
  );
};
const PaypalCard = (props) => {
  return (
    <SvgContainer active={props.selectedScreen}>
      <Paypal />
    </SvgContainer>
  );
};
const PayCard = (props) => {
  return (
    <SvgContainer active={props.selectedScreen}>
      <Card />
    </SvgContainer>
  );
};
class ShippingAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      selectedScreen: {
        payPal: false,
        card: false,
        visa: true,
      },
    };
  }

  handleDialoughOpen = async (item) => {
    this.setState({
      dialogOpen: true,
    });
  };

  handleDialogClose = (props) => {
    this.setState({ dialogOpen: false });
  };

  handleRadioChange = ({ target: { value } }) => {
    if (value == "paypal") {
      this.setState({
        selectedScreen: {
          payPal: true,
          card: false,
          visa: false,
        },
      });
    } else if (value == "card") {
      this.setState({
        selectedScreen: {
          payPal: false,
          card: true,
          visa: false,
        },
      });
    } else if (value == "visa") {
      this.setState({
        selectedScreen: {
          payPal: false,
          card: false,
          visa: true,
        },
      });
    }
  };

  render() {
    return this.props.windowWidth > Breakpoints.XS_MAX ? (
      <StyledContainer>
        <Container>
          <RadioGroupIcon
            row
            style={{ margin: "0", justifyContent: "space-between" }}
          >
            <FormControlLabel
              id="radio-office"
              value="visa"
              control={<Radio />}
              label={
                <LabelView selectedScreen={this.state.selectedScreen.visa} />
              }
              labelPlacement="bottom"
              style={{ margin: "0" }}
              onChange={(event) => this.handleRadioChange(event)}
            />
            <FormControlLabel
              id="radio-card"
              value="card"
              control={<Radio />}
              label={
                <PayCard selectedScreen={this.state.selectedScreen.card} />
              }
              onChange={(event) => this.handleRadioChange(event)}
              labelPlacement="bottom"
            />
            <FormControlLabel
              id="radio-paypal"
              value="paypal"
              control={<Radio />}
              label={
                <PaypalCard selectedScreen={this.state.selectedScreen.payPal} />
              }
              onChange={(event) => this.handleRadioChange(event)}
              style={{ margin: "0" }}
              labelPlacement="bottom"
            />
          </RadioGroupIcon>
          <Info
            style={{
              border: "1px solid",
              marginTop: "0px",
              marginBottom: "20px",
            }}
          >
            <Grid style={{ marginTop: "20px", marginBottom: "40px" }}>
              <RowPaymentContainer width={this.props.windowWidth}>
                <Col
                  lg={12}
                  style={{
                    padding: "0",
                    justifyContent: "start",
                    marginLeft: "15px",
                    marginBottom: "0px",
                  }}
                >
                  <h1>Credit/Debit Card</h1>
                </Col>
                <Col
                  lg={12}
                  style={{
                    padding: "0",
                    justifyContent: "start",
                    marginLeft: "15px",
                    marginTop: "0px",
                  }}
                >
                  <h3>We Accept Visa and Mastercard</h3>
                </Col>
              </RowPaymentContainer>
              <RowPaymentContainer width={this.props.windowWidth}>
                <Col lg={6}>
                  <Row lg={6} style={{ flexDirection: "column" }}>
                    <Col>
                      <h2>CARD HOLDER NAME *</h2>
                    </Col>
                    <Col width={this.props.windowWidth}>
                      <TextField
                        id="name"
                        placeholder="Name on card"
                        variant="outlined"
                        type="text"
                      />
                    </Col>
                  </Row>
                </Col>
                <Col lg={6}>
                  <Row
                    style={{
                      flexDirection: "column",
                      marginTop:
                        this.props.windowWidth < Breakpoints.MD_MAX
                          ? "15px"
                          : "",
                    }}
                  >
                    <Col>
                      <h2>CARD NUMBER *</h2>
                    </Col>
                    <Col style={{ display: "flex", alignItems: "center" }}>
                      <CreditCard style={{ marginRight: "5px" }} />
                      <TextField
                        id="number"
                        placeholder="0000 - 0000 - 0000 - 0000"
                        variant="outlined"
                        type="text"
                      />
                    </Col>
                  </Row>
                </Col>
              </RowPaymentContainer>
              <RowPaymentContainer width={this.props.windowWidth}>
                <Col lg={3}>
                  <Row style={{ flexDirection: "column" }}>
                    <Col>
                      <h2>EXPIRY DATE *</h2>
                    </Col>
                    <Col>
                      <TextField
                        id="date"
                        placeholder="MM/YY"
                        variant="outlined"
                        type="text"
                      />
                    </Col>
                  </Row>
                </Col>
                <Col lg={3}>
                  <Row style={{ flexDirection: "column" }}>
                    <Col>
                      <h2>Cvc</h2>
                    </Col>
                    <Col style={{ display: "flex", alignItems: "center" }}>
                      <TextField
                        id="cvc"
                        placeholder="000"
                        variant="outlined"
                        type="text"
                      />
                    </Col>
                  </Row>
                </Col>
              </RowPaymentContainer>
            </Grid>
          </Info>
          <DesktopCheckoutButtonContainer>
            <Button className="shop-btn shopping">CONTINUE SHOPPING</Button>
            <Button
              className="shop-btn checkout"
              onClick={this.handleDialoughOpen}
            >
              BUY NOW
            </Button>
          </DesktopCheckoutButtonContainer>
          <ProductDialog
            open={this.state.dialogOpen}
            handleDialogClose={this.handleDialogClose}
          />
        </Container>
      </StyledContainer>
    ) : (
      <PaymentMobile
        handleDialoughOpen={this.handleDialoughOpen}
        dialogOpen={this.state.dialogOpen}
        handleDialogClose={this.handleDialogClose}
      />
    );
  }
}

export default ShippingAddress;
