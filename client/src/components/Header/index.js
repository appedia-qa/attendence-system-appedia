import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Breakpoints from "../../constants/Breakpoints";
import { withRouter } from "react-router";
import { ReactComponent as HeaderArb } from "../../assets/images/headerArb.svg";
import { ReactComponent as HeaderEng } from "../../assets/images/headerEng.svg";
import { Typography, IconButton, Input, Badge } from "@material-ui/core";
import { ReactComponent as Sign } from "../../assets/icons/sign.svg";
import { I18n } from "@lingui/react";
import {
  ENGLISH_LANGUAGE,
  ARABIC_LANGUAGE,
  FRECH_LANGUAGE,
  CURRENT_LANGUAGE_KEY,
} from "../../constants";

const HeaderTopMenu = styled.div`
  ${({ theme, width }) => `
    min-height: ${width > Breakpoints.SM_MAX ? "50px":"100px"};
    background: rgb(29,15,15);
    background: linear-gradient(17deg, rgba(29,15,15,1) 18%, rgba(77,59,59,1) 70%);
    display: flex;
    align-items: center;
    flex-direction:${width > Breakpoints.SM_MAX ? "row" : "row"};
    justify-content: space-between;
    padding: 5px 10%;

    svg {
      height: 35px;
      width: auto;
    }

   

  `}
`;
const HeaderDiv = styled.div`
  ${({ theme }) => `
  cursor:pointer;
  justify-content: flex-end;
  background-color:#DCDCDC; 
  padding:5px;
    display:flex;
    flex-direction:row;
    .verticalDivider {
      margin: 0 10px;
      width: 1px;
      background-color: gray;
    }

  `}
`;
const HeaderImg = styled.div`
  ${({ theme }) => `
  cursor:pointer;
    svg{
      width:15px;
      height:15px;
      margin-top:5px;
      path {
        stroke: gray;
        fill: gray;
      }
    }

  `}
`;
const Header = (props) => {
  const handleChangeLanguage = (language) => {
    if (props.language !== language) {
      localStorage.setItem(CURRENT_LANGUAGE_KEY, language);
      window.location.reload(false);
    }
  };

  return (
    <I18n>
      {({ i18n }) => (
        <div style={{ position: "sticky", top: "0", zIndex: "3" }}>
          <HeaderTopMenu width={props.width}>
            <HeaderEng />
            <HeaderArb />
          </HeaderTopMenu>
          {!props.location.pathname.includes("/view/") && (
            <HeaderDiv>
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
            </HeaderDiv>
          )}
        </div>
      )}
    </I18n>
  );
};

export default withRouter(Header);
