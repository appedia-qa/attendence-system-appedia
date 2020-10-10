import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Breakpoints from "../../constants/Breakpoints";
import { withRouter } from "react-router";
import { ReactComponent as HeaderArb } from "../../assets/images/headerArb.svg";
import { ReactComponent as HeaderEng } from "../../assets/images/headerEng.svg";
import { Typography, IconButton, Input, Badge } from "@material-ui/core";
import { ReactComponent as Sign } from "../../assets/icons/sign.svg";
import { I18n } from "@lingui/react";
import { Grid, Row } from "react-flexbox-grid";

const HeaderTopMenu = styled.div`
  ${({ theme, width }) => `
    background: rgb(29,15,15);
    background: linear-gradient(17deg, rgba(29,15,15,1) 18%, rgba(77,59,59,1) 70%);
    padding-top: ${width > Breakpoints.SM_MAX ? "26px":"20px"};
    padding-bottom: ${width > Breakpoints.SM_MAX ? "26px":"20px"};
    .container {
      // min-height: ${width > Breakpoints.SM_MAX ? "50px":"100px"};
      display: flex;
      align-items: center;
      flex-direction:${width > Breakpoints.SM_MAX ? "row" : "row"};
      justify-content: space-between;
      // padding: 5px 10%;

      svg {
        height: 35px;
        width: auto;
      }
    }
   

  `}
`;
const Header = (props) => {

  return (
    <I18n>
      {({ i18n }) => (
        <div style={{ position: "sticky", top: "0", zIndex: "3" }}>
          <HeaderTopMenu width={props.width}>
            <Grid>
              <HeaderEng />
              <HeaderArb />
            </Grid>
          </HeaderTopMenu>
        </div>
      )}
    </I18n>
  );
};

export default withRouter(Header);
