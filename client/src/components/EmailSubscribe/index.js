import React from 'react';
import styled from 'styled-components';
import TelegramIcon from '@material-ui/icons/Telegram';
import { TextField } from '@material-ui/core';

const Container = styled.div`
  ${({theme}) => `
    max-height: 42px;
    max-width: 250px;
    width: 100%;
    border: 2px solid ${theme.palette.secondary.main};
    border-radius: 5px;
    display: flex;
  `}
`;

const StyledTextField = styled(TextField)`
  
  padding-left: 10px;
  padding-right: 10px;
  input {
    width: 200px;
    color: white;
    font-size: 12px;
    background-color: transparent;
  }

`

const SubscribeButton = styled.div`
  ${({theme}) => `
    cursor: pointer;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${theme.palette.secondary.main};

    svg {
      height: 16px;
      width: auto;
      path {
        fill: ${theme.palette.primary.main};
      }
    }
  `}
`

const EmailSubscribe = (props) => {
  return (
    <Container>
      <StyledTextField
          id="margin-dense"
          placeholder="Enter Your Email Address"
          margin="none"
        />      
      <SubscribeButton>
        <TelegramIcon />
      </SubscribeButton>
    </Container>
  );
}

export default EmailSubscribe;