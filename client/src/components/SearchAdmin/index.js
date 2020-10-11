import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Breakpoints from "../../constants/Breakpoints";
import { withRouter } from "react-router";
import { useDispatch } from "react-redux";
import { logoutRequest } from "../../redux/actions/authentication.action";
import PersonIcon from "@material-ui/icons/AccountCircle";
import CloseIcon from "@material-ui/icons/Close";
import { getSearchParameters } from "../../utils/url";
import {
  Typography,
  IconButton,
  Input,
  Badge,
  Button,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { Row, Col, Grid } from "react-flexbox-grid";
import { useState } from "react";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { ReactComponent as Sign } from "../../assets/icons/sign.svg";
import SearchIcon from "@material-ui/icons/Search";
import { t } from "@lingui/macro";
import { I18n } from "@lingui/react";
import {
  ENGLISH_LANGUAGE,
  ARABIC_LANGUAGE,
  CURRENT_LANGUAGE_KEY,
  FRECH_LANGUAGE,
} from "../../constants";
import { emptyCartRequest } from "../../redux/actions/cart.action";

const SearchButton = styled.div`
  ${({ theme }) => `
  
  border-radius: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px 12px;
  margin:0px;
  input {
    line-break:anywhere;
    font: revert;
  }
  
  
`}
`;

const StyleButton = styled(Button)`
  ${({ theme }) => `
  background-color:red;
  border-radius: 20px;
  height: 40px;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin:0px;
  border-radius: 5px;
  margin:0px;
  border: 1px solid #F36D12;
  background: #fff;
  p {
    margin-right: 10px;
    font-size: 16px !important;
    letter-spacing: 0;
  }

  svg {
    height: 18px;
    width: auto;
  }
`}
`;
const HeaderBottomMenu = styled(Row)`
  ${({ theme }) => `
    dispaly:flex;
    align-items: center;
    justify-content:space-between;
    width: 100%;
    padding-top: 2px;
    padding-bottom: 10px;
    margin: 0;
    
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

const ActionButtonContainer = styled(Col)`
  ${({ theme, active }) => `
    justify-content: flex-end;
    align-items: center;
    border: 1.5px solid #BAB8B8;
    border-radius: 5px;
    margin:0px;
    svg {
      path{
        fill:${active ? "#F36D12" : ""};
        stroke:${active ? "#F36D12" : ""};
      }
    }
    }
  `}
`;
const ActionBottomButtonContainer = styled(Col)`
  ${({ theme, width }) => `
    justify-content: flex-end;
    align-items: center;
    // max-width: ${width > Breakpoints.SM_MAX ? "130px" : ""};
    border-radius: 5px;
    margin:0px;
    .home {
        border: 1px solid #6E9F21;
        color:#6E9F21;
        svg{
            path{
                stroke:#6E9F21;
                fill:#6E9F21;
            }
        }

    },
    svg{
        path{
            stroke:#F36D12;
            fill:#F36D12;
        }
    }

    &.right {
      background: red;
     justify-content: flex-end;
     display: flex;
     padding: 0;
    }
       
    }
  `}
`;

const ActionHomeButtonContainer = styled(Col)`
  ${({ theme, width }) => `
    justify-content: flex-end;
    align-items: center;
    // max-width: ${width > Breakpoints.SM_MAX ? "130px" : ""};
    //     color:#6E9F21;
    //     svg{
    //         path{
    //             stroke:#6E9F21;
    //             fill:#6E9F21;
    //         }
    //     }
    // }
  `}
`;
const HeaderDiv = styled.div`
  ${({ theme }) => `
  cursor:pointer;
  background-color:#fff; 
  .container {
    justify-content: flex-end;
    display:flex;
    flex-direction:row;
    padding-top: 10px;
    padding-bottom: 10px;
    // margin-right:8px;
    
    .verticalDivider {
      margin: 0 10px;
      width: 1px;
      background-color: gray;
    }

  `}
  }
`;

const handleSearch = (key, props, searchText) => {
  // console.log('Key Entered', key);
  if (key === "Enter") {
    props.history.push({
      pathname: "/",
      search: `?query=${searchText}`,
    });
  }
};

const HeaderSearch = (props) => {
  const dispatch = useDispatch();
  const params = getSearchParameters();
  const [active, setActive] = useState(null);
  const [searchText, setSearchText] = useState(
    params.query ? params.query.replace(/%20/g, " ") : ""
  );
  const handleLogout = () => {
    dispatch(logoutRequest());
    props.history.push("/login");
  };

  const activeSearch = () => {
    setActive(true);
  };

  const unActiveSearch = () => {
    setActive(false);
  };

  const handleHomeCilck = () => {
    props.history.push("/");
  };
  if (
    props.location.pathname === "/login" ||
    props.location.pathname.includes("/view/")
  ) {
    return false;
  }
  const handleChangeLanguage = (language) => {
    if (props.language !== language) {
      localStorage.setItem(CURRENT_LANGUAGE_KEY, language);
      window.location.reload(false);
    }
  };


  return (
    <I18n>
      {({ i18n }) => (
        <div
          style={{
            width: "100%",
            background: "#FFFFFF",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid>
            <Row>
              <HeaderDiv>
                <Grid>
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
                    className={
                      props.language === ARABIC_LANGUAGE ? `selected` : null
                    }
                    onClick={() => handleChangeLanguage(ARABIC_LANGUAGE)}
                  >
                    <Sign />
                  </HeaderImg>
                  <div className="verticalDivider"></div>
                  <Typography
                    component="p"
                    className={
                      props.language === FRECH_LANGUAGE ? `selected` : null
                    }
                    onClick={() => handleChangeLanguage(FRECH_LANGUAGE)}
                  >
                    FR
                  </Typography>
                </Grid>
              </HeaderDiv>
            </Row>
              <HeaderBottomMenu className="home">
                <ActionHomeButtonContainer
                  width={props.width}
                  style={{
                    padding: "0",
                    // marginTop: "10px",
                    // marginBottom: "10px",
                  }}
                  lg={2}
                  md={2}
                  sm={2}
                >
                  <StyleButton
                    onClick={() => handleHomeCilck()}
                  >
                    <Typography
                      component="p"
                    >
                      {i18n._(t`Home`)}
                    </Typography>
                    <HomeIcon/>
                  </StyleButton>
                </ActionHomeButtonContainer>
                <ActionButtonContainer
                  active={active}
                  style={{ border: active ? "1px solid #F36D12" : "" }}
                  lg={7}
                  md={7}
                  sm={7}
                >
                  <SearchButton>
                    {!active && <SearchIcon />}
                    <Input
                      style={{
                        width: "100%",
                        margin: "10px",
                      }}
                      onClick={() => activeSearch()}
                      value={searchText}
                      disableUnderline={true}
                      placeholder="Enter Search Text"
                      onChange={(event) => setSearchText(event.target.value)}
                      onKeyUp={(event) => {
                        handleSearch(event.key, props, searchText);
                      }}
                    />

                    {active && <CloseIcon onClick={() => unActiveSearch()} />}
                  </SearchButton>
                </ActionButtonContainer>
                <ActionBottomButtonContainer
                  style={{
                    // padding: "0",
                    // marginTop: "10px",
                    // marginBottom: "10px",
                    // width: "100%",
                  }}
                  width={props.width}
                  lg={2}
                  md={2}
                  sm={2}
                  className="right"
                >
                  <StyleButton
                    onClick={() => handleLogout()}
                  >
                    <Typography
                      component="p"
                    >
                      {i18n._(t`Log out`)}
                    </Typography>
                    <PersonIcon />
                  </StyleButton>
                </ActionBottomButtonContainer>
              </HeaderBottomMenu>
          </Grid>
        </div>
      )}
    </I18n>
  );
};

export default withRouter(HeaderSearch);
