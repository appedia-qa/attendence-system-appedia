import React, { Component, Fragment, useEffect } from "react";
import styled from "styled-components";
import { Row, Col } from "react-flexbox-grid";
import { ReactComponent as ProfileIcon } from "../../assets/icons/bxs-user-circle.svg";
import { useSelector } from "react-redux";
import LoaderComponent from "../../components/LoaderComponent";
import { t, Trans } from "@lingui/macro";
import { I18n } from "@lingui/react";

const AccountSection = styled.div`
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
  ${({ theme, width }) => `
  border: 1px solid #97979724;
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
  padding-left: 15%;
  padding-right: 15%;
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

const AccountDetails = (props) => {
  //   if (!props.user) {
  //     return <LoaderComponent />;
  //   }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <I18n>
      {({ i18n }) => (
        <div>
          <AccountSection>
            <AddressSection width={props.width}>
              <DetailBottom>
                <div class="top-heading">
                  <h1>{i18n._(t`Shipping Address`)}</h1>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <h2
                      style={{ marginRight: "10px", marginLeft: "10px" }}
                      onClick={() => props.handleEditClick(props.user.id)}
                    >
                      {i18n._(t`Edit`)}
                    </h2>
                    <h2 onClick={() => props.handleDeleteClick(props.user.id)}>
                      {i18n._(t`Delete`)}
                    </h2>
                  </div>
                </div>
                <RowContainer>
                  <CitySection xs={8}>
                    <h1>{i18n._(t`Name`)}</h1>
                    <h2>
                      {props.user ? props.user.shipping_fullname : "name"}
                    </h2>
                  </CitySection>
                  <StreetSection xs={4}>
                    <h1>{i18n._(t`Street`)}</h1>
                    <h2>
                      {props.user ? props.user.shipping_state : "Address"}
                    </h2>
                  </StreetSection>
                </RowContainer>
                <RowContainer>
                  <BuildingSection xs={8}>
                    <h1>{i18n._(t`Building Number`)}</h1>
                    <h2>{props.user ? props.user.house_number : "Address"}</h2>
                  </BuildingSection>
                  <AreaSection xs={4}>
                    <h1>{i18n._(t`Area Number`)}</h1>
                    <h2>
                      {props.user ? props.user.shipping_zipcode : "Area Code"}
                    </h2>
                  </AreaSection>
                </RowContainer>
                <RowContainer>
                  <CitySection xs={8}>
                    <h1>{i18n._(t`Phone Number  `)}</h1>
                    <h2>
                      {props.user ? props.user.shipping_phone : "Address"}
                    </h2>
                  </CitySection>
                  <AddressUserSection xs={4}>
                    <h1>{i18n._(t`City`)}</h1>
                    <h2>{props.user ? props.user.shipping_city : "City"}</h2>
                  </AddressUserSection>
                </RowContainer>
              </DetailBottom>
            </AddressSection>
          </AccountSection>
        </div>
      )}
    </I18n>
  );
};

export default AccountDetails;
