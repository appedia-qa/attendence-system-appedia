import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Row, Col } from "react-flexbox-grid";
import { ReactComponent as ProfileIcon } from "../../assets/icons/bxs-user-circle.svg";
import { useSelector } from "react-redux";
import LoaderComponent from "../../components/LoaderComponent";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { useState } from "react";
import { t } from "@lingui/macro";
import { I18n } from "@lingui/react";

const AccountSection = styled.div`
  margin-top: 25px;
  ${({ theme, width }) => `
  SVG {
    margin-top: 17px;
    margin-left: 20px;
    height: 55px;
    width: 55px;
  }
  .add-address {
    margin-top: 30px;
    height: 49px;
    width: 174px;
    background-color: ${theme.palette.secondary.main};
    color: white;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    border: none;
  }
`}
`;

const AddressSection = styled(Col)`
  padding-top: 15px;
  ${({ theme, width }) => `
  border: 1px solid #97979724;
  padding-bottom: 15px;
  .profile-icon {
    ${width < 576 ? `display: none;` : `display: block;`}
  }   
 }
`}
`;

const NameSection = styled.div`
  margin-left: 1.5%;
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 2px;
    font-size: 14px;
    font-weight: 400;
    color: #2b2835;
  }
  h2 {
    margin-top: 0px;
    font-size: 12px;
    font-weight: 300;
    color: #2b2835;
  }
`;

const PhoneSection = styled.div`
  margin-left: 33%;
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 2px;
    font-size: 14px;
    font-weight: 400;
    color: #2b2835;
  }
  h2 {
    margin-top: 0px;
    font-size: 12px;
    font-weight: 300;
    color: #2b2835;
  }
`;
const EmailSection = styled.div`
  margin-left: 1.5%;
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 2px;
    font-size: 14px;
    font-weight: 400;
    color: #2b2835;
  }
  h2 {
    margin-top: 0px;
    font-size: 12px;
    font-weight: 300;
    color: #2b2835;
  }
`;
const CitySection = styled(Col)`
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 2px;
    font-size: 14px;
    font-weight: 400;
    color: #2b2835;
  }
  h2 {
    margin-top: 0px;
    font-size: 12px;
    font-weight: 300;
    color: #2b2835;
  }
`;

const StreetSection = styled(Col)`
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 2px;
    font-size: 14px;
    font-weight: 400;
    color: #2b2835;
  }
  h2 {
    margin-top: 0px;
    font-size: 12px;
    font-weight: 300;
    color: #2b2835;
  }
`;
const AddressUserSection = styled(Col)`
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 2px;
    font-size: 14px;
    font-weight: 400;
    color: #2b2835;
  }
  h2 {
    margin-top: 0px;
    font-size: 12px;
    font-weight: 300;
    color: #2b2835;
  }
`;
const BuildingSection = styled(Col)`
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 2px;
    font-size: 14px;
    font-weight: 400;
    color: #2b2835;
  }
  h2 {
    margin-top: 0px;
    font-size: 12px;
    font-weight: 300;
    color: #2b2835;
  }
`;
const AreaSection = styled(Col)`
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 2px;
    font-size: 14px;
    font-weight: 400;
    color: #2b2835;
  }
  h2 {
    margin-top: 0px;
    font-size: 12px;
    font-weight: 300;
    color: #2b2835;
  }
`;
const DetailTop = styled(Col)`
  ${({ theme, width }) => `
  border-bottom: 1px solid #97979724; 
  margin-left: 15%;
  margin-right: 5%;
  padding-bottom: 5px;
  ${width < 576 ? `margin-top: 0px;` : `margin-top: -74px;`}
  .top-heading {
      display: flex;
      justify-content: space-between;
  h1 {
    margin-bottom: 0px;
    font-size: 22px;
    font-weight: 500;
    color: #002040;
  }
  h2 {
      font-size: 14px;
      font-weight: 400;
      color: #0355F9;
      text-decoration: underline;
      cursor: pointer;
    }
  } 
`}
`;

const DetailBottom = styled(Col)`
  padding-left: 0%;
  padding-right: 5%;
  padding-bottom: 5px;
  display: flex;

  flex-direction: column;
  .top-heading {
    display: flex;
    justify-content: space-between;
    h1 {
      margin-bottom: 0px;
      font-size: 22px;
      font-weight: 500;
      color: #002040;
    }
    h2 {
      font-size: 14px;
      font-weight: 400;
      color: #0355f9;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const RowContainer = styled(Row)`
  justify-content: space-between;
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
    margin-top: 0px;
  }
  svg path {
    stroke: none;
    fill: black;
  }
  .MuiTypography-body1 {
    font-size: 18px;
    font-weight: bold;
  }
`;

const ExistingAddress = (props) => {
  return (
    <I18n>
      {({ i18n }) => (
        <AccountSection>
          <AddressSection width={props.width}>
            <DetailBottom>
              <RadioGroupIcon row>
                <FormControlLabel
                  id="radio-paypal"
                  value={props.value}
                  checked={
                    props.addressSelect === props.addressNumber ? true : false
                  }
                  control={<Radio />}
                  label={i18n._(t`Shipping Address`)}
                  labelPlacement="right"
                  onChange={() =>
                    props.changeAddress(
                      props.addressNumber,
                      props.user.id,
                      props.user
                    )
                  }
                />
              </RadioGroupIcon>
              <RowContainer>
                <CitySection lg={6}>
                  <h1>{i18n._(t`Name`)}</h1>
                  <h2>{props.user ? props.user.shipping_fullname : "name"}</h2>
                </CitySection>
                <StreetSection lg={6}>
                  <h1>{i18n._(t`Street`)}</h1>
                  <h2>{props.user ? props.user.shipping_state : "Address"}</h2>
                </StreetSection>
              </RowContainer>
              <RowContainer>
                <BuildingSection lg={6}>
                  <h1>{i18n._(t`Building Number`)}</h1>
                  <h2>
                    {props.user ? props.user.house_number : "Address"}
                  </h2>
                </BuildingSection>
                <AreaSection lg={6}>
                  <h1>{i18n._(t`Area Number`)}</h1>
                  <h2>
                    {props.user ? props.user.shipping_zipcode : "Area Code"}
                  </h2>
                </AreaSection>
              </RowContainer>
              <RowContainer>
                <CitySection lg={6}>
                  <h1>{i18n._(t`Phone Number`)}</h1>
                  <h2>{props.user ? props.user.shipping_phone : "Address"}</h2>
                </CitySection>
                <AddressUserSection lg={6}>
                  <h1>{i18n._(t`City`)}</h1>
                  <h2>{props.user ? props.user.shipping_city : "City"}</h2>
                </AddressUserSection>
              </RowContainer>
            </DetailBottom>
          </AddressSection>
        </AccountSection>
      )}
    </I18n>
  );
};

export default ExistingAddress;
