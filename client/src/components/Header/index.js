import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Breakpoints from "../../constants/Breakpoints";
import { withRouter } from "react-router";
import { Typography, IconButton, Input, Badge } from "@material-ui/core";
import MobileHeader from "./mobileHeader";
import { Row, Col, Grid } from "react-flexbox-grid";
import { useState } from "react";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { ReactComponent as Sign } from "../../assets/icons/sign.svg";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CancelIcon from "@material-ui/icons/Cancel";
import ServiceDropdownMenu from "./Components/ServiceDropdownMenu";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../../redux/actions/authentication.action";
import { emptyWishListRequest } from "../../redux/actions/wishList.action";
import { addErrorItemInAlert } from "../../redux/actions/alert.action";
import { t } from "@lingui/macro";
import { I18n } from "@lingui/react";
import {
  ENGLISH_LANGUAGE,
  ARABIC_LANGUAGE,
  CURRENT_LANGUAGE_KEY,
} from "../../constants";
import { emptyCartRequest } from "../../redux/actions/cart.action";

const HeaderTopMenu = styled.div`
  ${({ theme }) => `
    height: 30px;
    background-color: ${theme.palette.primary[900]}; 
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 5px 10%;

    p {
      font-size: 12px;
      color: white;
      cursor: pointer;
    }
    p.selected {
      text-decoration: underline;
      color: ${theme.palette.secondary[700]};
    }

    .verticalDivider {
      margin: 0 10px;
      width: 1px;
      height: 14px;
      background-color: white;
    }

  `}
`;

const SearchButton = styled.div`
  ${({ theme }) => `
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
  border: 1px solid white;
  border-radius: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px 12px;
  margin-right: 5px;
  margin-left: 15px;
  svg {
    height: 15px;
    width: auto;
  }
  svg path {
    stroke: ${theme.palette.primary.main};
    fill: white;
  }
  .MuiInput-root {
    margin-right: 10px;
    margin-left: 10px;
  }
  input {
    font-size: 10px;
    padding-bottom: 4px;
    color: black;
    width: 100%;
    border:none;
  }

  .cancel {
    margin-left: 5px;
    margin-right: 5px;
    
  }
`}
`;
const HeaderBottomMenu = styled(Row)`
  ${({ theme }) => `
    background-color: ${theme.palette.primary.main};
    padding-top: 10px;
    padding-bottom: 10px;
    dispaly:flex;
    padding-top:10
    align-items: center;
    justify-content: space-between;

    [class^="col-"], [class*=" col-"] {
      height: 100%;
    }

    .logo {
      height: 100%;
      width: auto;
      cursor: pointer;
      path {
        stroke: transparent;
        fill: white;
      }
    }
margin:0;
  `}
`;

const HeaderImg = styled.div`
  ${({ theme }) => `
  cursor:pointer;

    svg{
      width:15px;
      height:15px;
      path {
        stroke: white;
        fill: white;
      }
    }

  `}
`;

const ActionButtonContainer = styled(Row)`
  ${({ theme }) => `
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    position: relative;
    .actionButton {
      height: 40px;
      width: 40px;
      margin-right: 5px;
      margin-left: 15px;
      border: 1px solid white;
      border-radius: 20px;
      svg {
        height: 15px;
        width: auto;
        path {
          stroke: ${theme.palette.primary.main};
          fill: white;
        }
      }

      
    .shop-badge {
      position: absolute;
      top:5px;
      right:1px;
      span {
        font-size: 12px;
        height: 25px;
        width: 25px;
        border-radius: 20px;
      }
    }
    }
  `}
`;

const MenuTabs = styled(Row)`
  ${({ theme }) => `
  .actionButton {
    height: 40px;
    width: 40px;
    border: 1px solid white;
    border-radius: 20px;
    svg {
      height: 15px;
      width: auto;
     
    }
    svg path{
      stroke: white;
      fill:white;
    }
   

    
  .shop-badge {
    position: absolute;
    top:5px;
    right:2px;
    span {
      font-size: 12px;
      height: 20px;
      width: 20px;
      border-radius: 20px;
    }
  }
  }
  height: 100%;
  flex: 1;
  margin: 0 10px;
  padding-left:50px;
  padding-right:50px;
  align-items:center;
  justify-content: space-between;
  h4 {
    color: white;
    font-size: 14px;
    flex: 1;
    text-align: center;
    cursor: pointer;
    &:hover {
      // border-bottom:  2px solid ${theme.palette.secondary.main};
    }
  }
  `}
`;

const ServiceMenu = styled.div`
  position: relative;
  ${({ theme }) => `
  &:hover {
    .bottomMarker {
      position: absolute;
      -webkit-transition: all 0.4s; 
     -moz-transition: all 0.4s; 
      transition: all 0.4s;
      background: ${theme.palette.secondary.main};
      width: 25%;
      height:3px;  
    }
  }
  .bottomMarker.selected {
    -webkit-transition: all 0.4s; 
    -moz-transition: all 0.4s; 
     transition: all 0.4s;
    position: absolute;
    background: ${theme.palette.secondary.main};
    height:3px;  
    width:100%;
  
  }
  `}
`;

const handleSearch = (props, searchText) => {
  props.history.push({
    pathname: "/search",
    search: `?query=${searchText}`,
  });
};

const Header = (props) => {
  const [searchText, setSearchText] = useState();
  const [searchActivated, setSearchActivated] = useState(false);
  const [showServicesMenu, setShowServicesMenu] = useState(false);
  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();

  const cartReducer = useSelector((state) => state.cart);
  const totalQuantity = cartReducer.cartItems.length;

  useEffect(() => {
    const categories = window.location.pathname;

    if (categories == "/categories/1") {
      setSelected("Indoor Plants");
    } else if (categories == "/categories/2") {
      setSelected("Outdoor Plants");
    } else if (categories == "/categories/3") {
      setSelected("Accessories");
    } else if (categories == "/categories/4") {
      setSelected("Gardening Needs");
    } else if (categories == "/contact-us") {
      setSelected("Contact Us");
    } else if (categories == "/about-us") {
      setSelected("About Us");
    } else if (categories == "/our-services") {
      setSelected("Our Services");
    } else {
      setSelected("");
    }
  });

  const handleSearchButton = () => {
    if (!searchActivated) {
      setSearchActivated(true);
    } else {
      handleSearch(props, searchText);
      setSearchActivated(false);
    }
  };

  const CancelButton = styled.div`
    svg {
      height: 15px;
      width: auto;
      path {
        stroke: gray !important;
        fill: gray !important;
      }
    }
  `;

  const handleServicesMenu = () => {
    if (!showServicesMenu) {
      setShowServicesMenu(true);
    }
  };

  const checkUserStatus = (user) => {
    if (user && user.id) {
      props.history.push("/admin");
    } else {
      props.history.push("/login");
    }
  };

  const checkUserOrGuest = (user) => {
    props.history.push("/cart");
  };

  const logOut = () => {
    dispatch(logoutRequest());
    dispatch(emptyCartRequest());
    dispatch(emptyWishListRequest());

    props.history.push("/");
  };

  const handleChangeLanguage = (language) => {
    if (props.language !== language) {
      localStorage.setItem(CURRENT_LANGUAGE_KEY, language);
      window.location.reload(false);
    }
  };

  const handleTabsClick = (page, value) => {
    props.history.push(page);
  };

  const { user } = useSelector((state) => state.authentication);
  return props.width > Breakpoints.SM_MAX ? (
    <I18n>
      {({ i18n }) => (
        <div style={{ position: "sticky", top: "0", zIndex: "3" }}>
          <HeaderTopMenu>
            <Typography component="p">
              {user && user.name ? user.name : "GUEST"}
            </Typography>
            <div className="verticalDivider"></div>
            <Typography
              component="p"
              className={
                props.language === ENGLISH_LANGUAGE ? `selected` : null
              }
              onClick={() => handleChangeLanguage(ENGLISH_LANGUAGE)}
            >
              ENG
            </Typography>
            <div className="verticalDivider"></div>
            <HeaderImg
              className={props.language === ARABIC_LANGUAGE ? `selected` : null}
              onClick={() => handleChangeLanguage(ARABIC_LANGUAGE)}
            >
              <Sign />
            </HeaderImg>
            <div className="verticalDivider"></div>
            {user && user.id ? (
              <Typography
                component="p"
                onClick={() => logOut()}
                className={false ? "selected" : null}
              >
                {i18n._(t`LOGOUT`)}
              </Typography>
            ) : (
              <Typography
                component="p"
                onClick={() => props.history.push("/login")}
                className={false ? "selected" : null}
              >
                {i18n._(t`LOGIN`)}
              </Typography>
            )}
          </HeaderTopMenu>

          <HeaderBottomMenu>
            <Grid
              style={{ display: "flex", height: "40px", alignItems: "center" }}
            >
              <Logo className="logo" onClick={() => props.history.push("/")} />
              <MenuTabs style={{ display: searchActivated ? "none" : "" }}>
                <ServiceMenu>
                  <Typography
                    component="h4"
                    onClick={() =>
                      handleTabsClick("/categories/1", "Indoor Plants")
                    }
                  >
                    {i18n._(t`Indoor Plants`)}
                  </Typography>
                  <div
                    className={
                      selected == "Indoor Plants"
                        ? "bottomMarker selected"
                        : "bottomMarker"
                    }
                  ></div>
                </ServiceMenu>
                <ServiceMenu>
                  <Typography
                    component="h4"
                    onClick={() =>
                      handleTabsClick("/categories/2", "Outdoor Plants")
                    }
                  >
                    {i18n._(t`Outdoor Plants`)}
                  </Typography>
                  <div
                    className={
                      selected == "Outdoor Plants"
                        ? "bottomMarker selected"
                        : "bottomMarker"
                    }
                  ></div>
                </ServiceMenu>
                <ServiceMenu>
                  <Typography
                    component="h4"
                    onClick={() =>
                      handleTabsClick("/categories/3", "Accessories")
                    }
                  >
                    {i18n._(t`Accessories`)}
                  </Typography>
                  <div
                    className={
                      selected == "Accessories"
                        ? "bottomMarker selected"
                        : "bottomMarker"
                    }
                  ></div>
                </ServiceMenu>
                <ServiceMenu>
                  <Typography
                    component="h4"
                    onClick={() =>
                      handleTabsClick("/categories/4", "Gardening Needs")
                    }
                  >
                    {i18n._(t`Gardening Needs`)}
                  </Typography>
                  <div
                    className={
                      selected == "Gardening Needs"
                        ? "bottomMarker selected"
                        : "bottomMarker"
                    }
                  ></div>
                </ServiceMenu>
                <ServiceMenu>
                  <Typography
                    component="h4"
                    onClick={() =>
                      handleTabsClick("/our-services", "Our Services")
                    }
                  >
                    {i18n._(t`Our Services`)}
                  </Typography>
                  <div
                    className={
                      selected == "Our Services"
                        ? "bottomMarker selected"
                        : "bottomMarker"
                    }
                  ></div>
                </ServiceMenu>
                <ServiceMenu>
                  <Typography
                    component="h4"
                    onClick={() => handleTabsClick("/about-us", "About Us")}
                  >
                    {i18n._(t`About Us`)}
                  </Typography>
                  <div
                    className={
                      selected == "About Us"
                        ? "bottomMarker selected"
                        : "bottomMarker"
                    }
                  ></div>
                </ServiceMenu>
                <ServiceMenu>
                  <Typography
                    component="h4"
                    onClick={() => handleTabsClick("/contact-us", "Contact Us")}
                  >
                    {i18n._(t`Contact Us`)}
                  </Typography>
                  <div
                    className={
                      selected == "Contact Us"
                        ? "bottomMarker selected"
                        : "bottomMarker"
                    }
                  ></div>
                </ServiceMenu>
                {showServicesMenu ? (
                  <ServiceDropdownMenu
                    handleServicesMenu={setShowServicesMenu}
                  />
                ) : null}
              </MenuTabs>
              <ActionButtonContainer
                style={{ flex: searchActivated ? "1" : "" }}
              >
                <SearchButton
                  style={{
                    flex: searchActivated ? "1" : "",
                    backgroundColor: searchActivated ? "white" : "",
                  }}
                >
                  {searchActivated ? (
                    <Input
                      style={{
                        width: searchActivated ? "100%" : "",
                        margin: "10px",
                      }}
                      disableUnderline={true}
                      placeholder="Enter Search Text"
                      onChange={(event) => setSearchText(event.target.value)}
                      onKeyUp={(event) => {
                        handleSearch(props, searchText);
                      }}
                    />
                  ) : null}
                  {searchActivated ? (
                    ""
                  ) : (
                    <SearchIcon onClick={handleSearchButton} />
                  )}
                  {searchActivated ? (
                    <CancelButton>
                      <CancelIcon
                        className="cancel"
                        onClick={() => setSearchActivated(false)}
                      />
                    </CancelButton>
                  ) : null}
                </SearchButton>
                <IconButton
                  onClick={() => checkUserStatus(user)}
                  className="actionButton"
                >
                  <PersonIcon />
                </IconButton>
                <IconButton
                  onClick={() => checkUserOrGuest(user)}
                  className="actionButton"
                >
                  <ShoppingCartIcon />
                  <Badge
                    badgeContent={totalQuantity > 0 ? totalQuantity : ""}
                    className="shop-badge"
                    color="secondary"
                    invisible={totalQuantity > 0 ? false : true}
                  />
                </IconButton>
              </ActionButtonContainer>
            </Grid>
          </HeaderBottomMenu>
        </div>
      )}
    </I18n>
  ) : (
    <MobileHeader {...props} handleChangeLanguage={handleChangeLanguage} />
  );
};

export default withRouter(Header);
