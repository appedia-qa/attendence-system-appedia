import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Breakpoints from "../../constants/Breakpoints";
import { withRouter } from "react-router";
import { useDispatch } from "react-redux";
import { logoutRequest } from "../../redux/actions/authentication.action";
import PersonIcon from "@material-ui/icons/AccountCircle";
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
  
  border-radius: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin:0px;
  border-radius: 5px;
  margin:0px;
      border: 1px solid #6E9F21;
  
  
`}
`;
const HeaderBottomMenu = styled(Row)`
  ${({ theme }) => `
    dispaly:flex;
    align-items: center;
    justify-content:space-between;
    width: 100%;

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
  ${({ theme }) => `
    justify-content: flex-end;
    align-items: center;
    border: 1px solid #BAB8B8;
    border-radius: 5px;
    margin:0px;
   
    }
  `}
`;
const ActionBottomButtonContainer = styled(Col)`
  ${({ theme, width }) => `
    justify-content: flex-end;
    align-items: center;
    max-width: ${width > Breakpoints.SM_MAX ? "130px" : ""};
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
   
    }
  `}
`;

const ActionHomeButtonContainer = styled(Col)`
  ${({ theme, width }) => `
    justify-content: flex-end;
    align-items: center;
    max-width: ${width > Breakpoints.SM_MAX ? "130px" : ""};
        color:#6E9F21;
        svg{
            path{
                stroke:#6E9F21;
                fill:#6E9F21;
            }
        }

    
    
   
    }
  `}
`;

const Container = styled(Grid)`
  ${({ theme }) => `
  width:90%;
  display:flex;
  flex-direction:column;
  align-items:center;
`}
`;

const handleSearch = (key, props, searchText) => {

  // console.log('Key Entered', key);
  if (key === 'Enter') {
    props.history.push({
      pathname: "/",
      search: `query=${searchText}`,
    });
  }
}

const HeaderSearch = (props) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutRequest());
    props.history.push("/login");
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
          <Container>
            <HeaderBottomMenu className="home">
              <ActionHomeButtonContainer
                width={props.width}
                style={{
                  padding: "0",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
                lg={2}
                md={2}
                sm={2}
              >
                <StyleButton
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  onClick={() => handleHomeCilck()}
                >
                  <Typography
                    style={{
                      color: "#6E9F21",
                      fontSize: "12px",
                      fontWeight: "800",
                    }}
                    component="p"
                  >
                    {i18n._(t`Home`)}
                  </Typography>
                  <HomeIcon style={{ width: "15px" }} />
                </StyleButton>
              </ActionHomeButtonContainer>

              <ActionButtonContainer lg={7} md={7} sm={7}>
                <SearchButton>
                  <SearchIcon />
                  <Input
                    style={{
                      width: "100%",
                      margin: "10px",
                    }}
                    disableUnderline={true}
                    placeholder="Enter Search Text"
                    // onChange={(event) => setSearchText(event.target.value)}
                    onKeyUp={(event) => {
                      handleSearch(event.key, props, 'hello');
                    }}
                  />
                </SearchButton>
              </ActionButtonContainer>
              <ActionBottomButtonContainer
                style={{
                  padding: "0",
                  marginTop: "10px",
                  marginBottom: "10px",
                  width: "100%",
                }}
                width={props.width}
                lg={2}
                md={2}
                sm={2}
              >
                <StyleButton
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    border: "1px solid #F36D12",
                  }}
                  onClick={() => handleLogout()}
                >
                  <Typography
                    style={{
                      color: "#F36D12",
                      fontSize: "12px",
                      fontWeight: "800",
                    }}
                    component="p"
                  >
                    {i18n._(t`Log out`)}
                  </Typography>
                  <PersonIcon style={{ width: "15px" }} />
                </StyleButton>
              </ActionBottomButtonContainer>
            </HeaderBottomMenu>
          </Container>
        </div>
      )}
    </I18n>
  );
};

export default withRouter(HeaderSearch);
