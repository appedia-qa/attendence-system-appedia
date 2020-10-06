import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Breakpoints from "../../constants/Breakpoints";
import { withRouter } from "react-router";
import PersonIcon from "@material-ui/icons/Person";
import {
  Typography,
  IconButton,
  Input,
  Badge,
  Button,
} from "@material-ui/core";
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
  
  
`}
`;

const StyleButton = styled(Button)`
  ${({ theme }) => `
  
  border-radius: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px 12px;
  margin:0px;
  
  
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
    border: 1px solid ${theme.palette.primary.main};
    border-radius: 5px;
    margin:0px;
   
    }
  `}
`;
const ActionBottomButtonContainer = styled(Col)`
  ${({ theme }) => `
    justify-content: flex-end;
    align-items: center;
    border: 1px solid #F36D12;
    color:#F36D12;
    border-radius: 5px;
    margin:0px;
    svg{
        path{
            stroke:#F36D12;
            fill:#F36D12;
        }
    }
   
    }
  `}
`;

const Header = (props) => {
  return (
    <I18n>
      <HeaderBottomMenu>
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
              // onKeyUp={(event) => {
              //   handleSearch(props, searchText);
              // }}
            />
          </SearchButton>
        </ActionButtonContainer>
        <ActionBottomButtonContainer
          style={{ width: "100%" }}
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
          >
            <Typography
              style={{ color: "#F36D12" }}
              component="p"
              variant="caption"
            >
              Log out
            </Typography>
            <PersonIcon />
          </StyleButton>
        </ActionBottomButtonContainer>
      </HeaderBottomMenu>
    </I18n>
  );
};

export default withRouter(Header);
