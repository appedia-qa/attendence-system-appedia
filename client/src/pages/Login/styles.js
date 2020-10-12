import styled from "styled-components";
import { Grid, Row } from "react-flexbox-grid";
import Breakpoints from "../../constants/Breakpoints";
import overlay from "../../assets/images/logo.svg";

export const LoginContainer = styled.div`
  margin-top: 30px;
  margin-left: 13%;
  margin-right: 13%;
  height: 80vh;

  ${({ theme, width }) => `
    .image-section{
        width: 60%;
        height: auto;
        background: #F36D12;
        background-size: cover;
        ${width < Breakpoints.SM_MAX ? `display: none;` : `display: flex;`}  
        justify-Content: center;
        align-items:center;
        flex-direction: column;
    }
    .login-button{
        background-color: ${theme.palette.white.main};
        color: ${theme.palette.primary[300]};
        border-color:  ${theme.palette.primary[300]};
        border-radius:7px;
        font-size: 18px;
        height: 47px;
        width: 30%;
        cursor: pointer;
       
    }
    h1{
        font-size: 12px;
        color: ${theme.palette.primary.main};
        cursor:pointer;
    }
    #backHome{
        color: ${theme.palette.backHome.main};
    }
    h2 {
        font-size: 13px;
        font-weight: 500;
        color: ${theme.palette.primary.main};
        margin:  0 2%;

    }
    label {
        color: ${theme.palette.primary.main};
        font-size: 14px;
        font-weight: 600;
    }
    .input-field {
        margin-top: 6px;
    }
    .account-not-exist{
        margin-top: 6px; 
        display: flex;
        justify-content: center; 
        p {
            margin-top: 0;
            margin-left: 7px;
            font-size: 12px;
            color: ${theme.palette.noAccount.main};
         }
         a {
             font-size: 13px;
             margin-left: 5px;
             color: ${theme.palette.noAccount.main};
         } 
    }
    p {
       margin-top: 0;
       font-size: 14px;
       color: ${theme.palette.noAccount.main};
    }
    a {
        font-size: 14px;
        margin-left: 5px;
        color: ${theme.palette.noAccount.main};
    }
    .horizontal-line {
        width: 39%;
        margin-bottom: 7px;
        border-bottom: 1px solid ${theme.palette.primary.main};
        ${width < Breakpoints.XS_MAX ? `display: none;` : ``}  
    }
    .forget-password {
        margin-top: 4px;
        display: flex;
        justify-content: flex-end;
        a { 
            font-size: 11px;
            font-weight: 300px;
            color: ${theme.palette.forgetPass.main};
        }
    }
    .join-with {
        margin-top: 2px;
        display: flex;
        justify-content: center;
        h2 {
            white-space: nowrap;
        }
    }
    .fb-button {
        background-color: #3B5999;
        border: none;
        font-size: 18px;
        height: 47px;
        width: 100%;
        cursor: pointer;
        &:hover {
            background-color: #1362B1;
        }
        .fb-name {
            margin-left: 15px;
        }
        .a {
            fill: white;
        }
    }
    .gg-button {
        background-color: #DC4E42;
        border: none;
        font-size: 18px;
        height: 47px;
        width: 100%;
        cursor: pointer;
        &:hover {
          background-color: #E92C2C;
        }
        .gg-name {
            margin-left: 15px;
        }
        .a {
            fill: white;
        }
    }
  `}
`;

export const ContainerRow = styled(Row)`
  box-shadow: 0px 3px 6px #00000029;
  margin-bottom: 40px;
  margin-top: 20px;
  height: 80vh;
  ${({ width }) => `
    h1 {
     ${
       width < Breakpoints.SM_MAX
         ? `font-size: 16px;
         font-weight: 400;`
         : `font-size: 25px;
         font-weight: 500;`
     }
    text-transform: uppercase;
    text-align: center
    }
    .email-section{
       
    }
    .password-section{
        margin-top: 30px;
    }
    .login-form {
      padding-top: 9%;
      padding-left: 10%;
      padding-right: 10%;
      padding-bottom: 15%;
      display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    }
    #login-button {
      margin-top: 30px;  
    }
    #fb-button {
        margin-top: 10px;  
    }
    #gg-button {
        margin-top: 5px;  
    }
    .MuiIconButton-root {
        padding: 5px;
    }
    .MuiOutlinedInput-adornedStart {
        padding-left: 0px;
    }
    h4 {
        color: red;
        font-size: 14px;
        font-weight: 500;
    }
    .col-md-6 {
        ${
          width > Breakpoints.SM_MAX
            ? `padding-left: 0;
             padding-right: 0;`
            : `padding-left: 8px;
             padding-right: 8px;`
        }
    }  
 `}
`;

export const ImageOverlay = styled.div`
  min-width: 200px;
  min-height: 50px;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
  background-size: cover;
`;
