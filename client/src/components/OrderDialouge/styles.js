import styled from 'styled-components';
import { Typography, Box, Button } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Grid, Row, Col } from "react-flexbox-grid";
import Breakpoints from '../../constants/Breakpoints';

export const MainContainer = styled.div`
${({ theme }) => `
  margin: ${theme.spacing(4)}px 0 ${theme.spacing(5)}px;
  h3 {
    color: ${theme.palette.brown.main};
  }
`}
`;


export const StyledTabs = styled(Tabs)`
  ${({ theme }) => `
    margin-top: ${theme.spacing(1)}px;

    .MuiTab-root .MuiTab-wrapper{
      color: ${theme.palette.lightGray[700]};
    }
    .Mui-selected .MuiTab-wrapper{
      color: ${theme.palette.primary.main};
    }

    .MuiTabs-indicator {
      background-color: ${theme.palette.secondary.main};
    }
  `}
`

export const StyledTab = styled(Tab)`
  flex:1;
  max-width: none;
`;

export const StyledTabBox = styled(Box)`
  p {
    padding: 20px 0;
    max-width: 100%;
    white-space: pre-line;
  }
`;

export const RadioContainer = styled.div`
${({ width }) => `
  display: flex;
  ${width < Breakpoints.XS_MAX ?
      `justify-content: flex-start;
     margin-left: 8%;`
      :
      `justify-content: center;`
    } 
  margin-top: 40px;
  #radio-house {
    margin-left: 0;
  }
  #radio-office {
    ${width < Breakpoints.XS_MAX ?
      `margin-left: 30px;` : `margin-left: 60px;`
    }
  }
  .MuiFormGroup-root {
    flex-wrap: nowrap;
  }
`}
`;

export const InformationContainer = styled.div`
  margin-top: 40px;
  .MuiInputLabel-animated{
    margin-top: 10px;
    font-weight: bold;
    font-size:12px;
  }
`;


export const Line = styled.div`
  background-color:black;
  height:2px;
  margin-top:5px;
  margin-bottom:5px;
  width:100%;
`;


export const RowContainer = styled(Row)`
  text-align:center;
  margin-bottom:10px;
  ${({ width }) => `
  .input-box {
    width: 100%;
  }
  h1 {
    font-size: 9px;
    font-weight: 400;
    margin-bottom:0;
  }
  h2 {
    margin-top:0;
    margin-bottom: 0;
    font-size: 11px;
    font-weight: 400;
    border: 1px solid;
    width: 30px;
    height: 15px;
    padding-left: 3px;
    display: inline-block;
  }
  .country-code {
    display: inline-block;
    margin-top: 10px;
    ${width < Breakpoints.XS_MAX ?
      `margin-right: 9px;` : `margin-right: 10px;`
    }  
  }
`}
`;

export const RowPaymentContainer = styled(Row)`
  margin-bottom:16px;
  ${({ width }) => `
  ${width < Breakpoints.MD_MAX ?
      ` #name,#number , #cvc , #date{
      width: 280px;
    }
    #number,#office-number {
      width: 253px;
    }`: ` 
  #name,#number
  {
    width: 280px;
  }
  #cvc {
    width: 60px;
  }
  #date{
    width:100px;
  }
  #number,#office-number {
    width: 253px;
  }
 `}
  
  h1 {
    font-size: 14px;
    font-weight: 450;
    margin-bottom:0;
  }
  h4 {
    font-size: 40px;
    font-weight: 400;
    margin-bottom:0;
    margin-top:10px;
    padding:0px;
  }
  h5 {
    font-size: 27px;
    font-weight: 800;
    margin-bottom:0;
    margin-top:16px;
    padding:0px;
  }
  h2 {
    margin-top:0;
    margin-bottom: 0;
    font-size: 11px;
    font-weight: 400;
  }
  h3 {
    margin-top:0;
    margin-bottom: 0;
    font-size: 9px;
    font-weight: 400;
    color:gray;
  }
  .country-code {
    display: inline-block;
    margin-top: 10px;
    ${width < Breakpoints.XS_MAX ?
      `margin-right: 9px;` : `margin-right: 10px;`
    }  
  }
`}
`;