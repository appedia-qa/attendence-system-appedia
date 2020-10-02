import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Breakpoints from "../../constants/Breakpoints";
import { withRouter } from "react-router";
import { ReactComponent as HeaderArb } from "../../assets/images/headerArb.svg";
import { ReactComponent as HeaderEng } from "../../assets/images/headerEng.svg";
import { I18n } from "@lingui/react";
import {
  ENGLISH_LANGUAGE,
  ARABIC_LANGUAGE,
  CURRENT_LANGUAGE_KEY,
} from "../../constants";

const HeaderTopMenu = styled.div`
  ${({ theme, width }) => `
    min-height: 50px;
    background-color: ${theme.palette.primary[900]}; 
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

const Header = (props) => {
  return (
    <I18n>
      {({ i18n }) => (
        <div style={{ position: "sticky", top: "0", zIndex: "3" }}>
          <HeaderTopMenu width={props.width}>
            <HeaderArb />
            <HeaderEng />
          </HeaderTopMenu>
        </div>
      )}
    </I18n>
  );
};

export default withRouter(Header);
