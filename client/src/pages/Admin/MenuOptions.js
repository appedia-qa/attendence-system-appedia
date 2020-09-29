import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Row, Col, Grid } from "react-flexbox-grid";
import { ReactComponent as UserLogo } from "../../assets/icons/user.svg";
import { ReactComponent as RightAngle } from "../../assets/icons/chevron-right.svg";
import { ReactComponent as Database } from "../../assets/icons/database.svg";
import { ReactComponent as Favorite } from "../../assets/icons/heart.svg";
import { ReactComponent as Cards } from "../../assets/icons/credit-card.svg";
import { t, Trans } from "@lingui/macro";
import { I18n } from "@lingui/react";

const MenuSection = styled.div`
  ${({ theme, width }) => `
    .tab-item {
   
      height: 52px;
      display:flex;
      justify-content: space-between;
      align-items: center;
      ${width > 767 && width < 815 ? `padding: 0px 5px;` : `padding: 0px 20px;`}
      border: 0.5px solid #97979723;
      background-color: white;
      cursor: default;
      &:hover {
        background: ${theme.palette.white[600]};
      }
      h1 {
        font-size: 16px;
        font-weight: 400;
      }
      #orders-heading {
        margin-left: -42px;
      }
  
      #favorites-heading {
        margin-left: -29px;
      }
  
      #points-heading {
        margin-left: -42px;
      }
  
      #cards-heading {
        margin-left: -50px;
      }
    }

    .tab-item.selected {
      background: ${theme.palette.secondary.main};
    }
    
    .points-logo {
      padding-left: 3px;
    }
      
    .a {
      fill: none;
    }
`}
`;

const MenuOptions = (props) => {
  return (
    <I18n>
      {({ i18n }) => (
        <div>
          <MenuSection width={props.width}>
            <div
              className={
                props.selected === 0 ? `tab-item selected` : "tab-item"
              }
              onClick={() => props.handleChangeTab(0)}
            >
              <UserLogo />
              <h1 id="account-heading"> {i18n._(t`Account Details`)}</h1>
              <RightAngle />
            </div>
            <div
              className={
                props.selected === 1 ? `tab-item selected` : "tab-item"
              }
              onClick={() => props.handleChangeTab(1)}
            >
              <Database />
              <h1 id="orders-heading"> {i18n._(t`My Orders`)}</h1>
              <RightAngle />
            </div>
            <div
              className={
                props.selected === 2 ? `tab-item selected` : "tab-item"
              }
              onClick={() => props.handleChangeTab(2)}
            >
              <Favorite />
              <h1 id="favorites-heading"> {i18n._(t`My Favorites`)}</h1>
              <RightAngle />
            </div>
            {/* <div
              className={
                props.selected === 3 ? `tab-item selected` : "tab-item"
              }
              onClick={() => props.handleChangeTab(3)}
            >
              <Cards />
              <h1 id="cards-heading"> {i18n._(t`My Cards`)}</h1>
              <RightAngle />
            </div> */}
            <div
              className={
                props.selected === 4 ? `tab-item selected` : "tab-item"
              }
              onClick={() => props.handleChangeTab(4)}
            >
              <UserLogo />
              <h1  id="account-heading"> {i18n._(t`Reset Password`)}</h1>
              <RightAngle />
            </div>
          </MenuSection>
        </div>
      )}
    </I18n>
  );
};

export default MenuOptions;
