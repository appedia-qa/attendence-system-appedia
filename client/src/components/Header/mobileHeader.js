import React, { useState } from "react";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import { useSelector } from "react-redux";
import { Badge, IconButton, Input, Typography } from "@material-ui/core";
import { Row } from "react-flexbox-grid";
import { addErrorItemInAlert } from "../../redux/actions/alert.action";
import { emptyCartRequest } from "../../redux/actions/cart.action";
import { t } from "@lingui/macro";
import { I18n } from "@lingui/react";
import { ReactComponent as Sign } from "../../assets/icons/sign.svg";
import { emptyWishListRequest } from "../../redux/actions/wishList.action";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CancelIcon from "@material-ui/icons/Cancel";
import { useDispatch } from "react-redux";
import { logoutRequest } from "../../redux/actions/authentication.action";
import {
  ENGLISH_LANGUAGE,
  ARABIC_LANGUAGE,
  CURRENT_LANGUAGE_KEY,
} from "../../constants";

const HeaderMobileContainer = styled.div`
  box-shadow: 0px 3px 6px #00000029;
`;

const HeaderTopMenu = styled.div`
  ${({ theme }) => `
    height: 45px;
    flex:1;
    background-color: ${theme.palette.primary[900]};
    display: flex;
    align-items: center;
    flex-direction:row;
    justify-content: space-between;
    padding: 5px 10% 0 5%;

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
const SearchButton = styled.div`
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;

  border: 1px solid white;
  border-radius: 20px;
  color: black;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 8px;
  margin-right: 5px;
  margin-left: 5px;

  svg {
    height: 15px;
    width: auto;
    path {
      stroke: white;
      fill: white;
    }
  }
  .MuiInput-root {
    padding-right: 10px;
    padding-left: 10px;
  }
  input {
    font-size: 10px;
    padding-bottom: 4px;
    color: black;
    width: 100px;
    border-bottom: 2px solid white !important;
  }
  .cancel {
    display: flex;
    margin-left: 5px;
    margin-right: 5px;
  }
`;
const HeaderBottomMenu = styled(Row)`
  ${({ theme }) => `
    height: 50px;
    flex:1;
    flex-direction:row;
    background-color: ${theme.palette.primary.main};
    margin: 0;
    padding: 5px 10% 0 5%;
    align-items: center;
    justify-content: space-between;

    [class^="col-"], [class*=" col-"] {
      height: 100%;
    }

    .menu-icons-contaienr {
      height: 100%;
      align-items: center;
    }

    .logo {
      height: 70%;
      width: auto;
      cursor: pointer;
      margin-left: 10px;
      
      path {
        stroke: transparent;
        fill: white;
      }
    }

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

    padding-left: 14px;

    .actionButton {
      height: 30px;
      width: 30px;
      margin-right: 5px;
      border: 1px solid white;
      border-radius: 15px;
      svg {
        height: 12px;
        width: auto;
        path {
          stroke: white;
          fill: ${theme.palette.primary.main};
        }
      }

      
    .shop-badge {
      position: absolute;
      top:5px;
      right:0px;
      span {
        font-size: 8px;
        height: 20px;
        width: 20px;
        border-radius: 20px;
      }
    }
    }
  `}
`;

const MobileHeader = (props) => {
  const handleSearch = () => {
    props.history.push({
      pathname: "/search",
      search: `?query=${searchText}`,
    });
  };

  const [searchText, setSearchText] = useState();
  const [searchActivated, setSearchActivated] = useState(false);
  const dispatch = useDispatch();

  const cartReducer = useSelector((state) => state.cart);
  const totalQuantity = cartReducer.cartItems.length;

  const handleSearchButton = () => {
    if (!searchActivated) {
      setSearchActivated(true);
    } else {
      handleSearch(props, searchText);
      setSearchActivated(false);
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

  const { user } = useSelector((state) => state.authentication);
  return (
    <I18n>
      {({ i18n }) => (
         <div style={{ position: "sticky", top: "0", zIndex: "3" }}>
        <HeaderMobileContainer>
          <HeaderTopMenu>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Typography
                component="p"
                className={
                  props.language === ENGLISH_LANGUAGE ? `selected` : null
                }
                onClick={() => props.handleChangeLanguage(ENGLISH_LANGUAGE)}
              >
                ENG
              </Typography>
              <div className="verticalDivider"></div>
              <HeaderImg
                className={
                  props.language === ARABIC_LANGUAGE ? `selected` : null
                }
                onClick={() => props.handleChangeLanguage(ARABIC_LANGUAGE)}
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
            </div>
            <ActionButtonContainer>
              <IconButton className="actionButton">
                <ShoppingCartIcon onClick={() => checkUserOrGuest(user)} />
                <Badge
                  badgeContent={totalQuantity > 0 ? totalQuantity : ""}
                  className="shop-badge"
                  color="secondary"
                  invisible={totalQuantity > 0 ? false : true}
                />
              </IconButton>
            </ActionButtonContainer>
          </HeaderTopMenu>
          <HeaderBottomMenu>
            <Row className="menu-icons-contaienr">
              <MenuIcon onClick={props.onDrawerOpen} className="menu-icon" />
              <Logo className="logo" onClick={() => props.history.push("/")} />
            </Row>

            <ActionButtonContainer style={{ flex: searchActivated ? "1" : "" }}>
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
                      margin: "20px",
                    }}
                    placeholder="Enter Search Text"
                    disableUnderline={true}
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
                      color="primary"
                      className="cancel"
                      onClick={() => setSearchActivated(false)}
                    />
                  </CancelButton>
                ) : null}
              </SearchButton>
              {!searchActivated && (
                <IconButton className="actionButton">
                  <PersonIcon onClick={() => checkUserStatus(user)} />
                </IconButton>
              )}
            </ActionButtonContainer>
          </HeaderBottomMenu>
        </HeaderMobileContainer>
        </div>
      )}
    </I18n>
  );
};
export default MobileHeader;
