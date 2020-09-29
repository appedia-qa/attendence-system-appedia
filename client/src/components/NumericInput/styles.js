import styled from "styled-components";

export const InputContainer = styled.div`
  ${({ theme }) => `
    height: 22px;
    width: 84px;
    display:flex;

    input {
      height: 16px;
      width: 20px;
      text-align: center;
      padding: 2px 10px;
      border:0;
      border-top: 1px solid ${theme.palette.primary.main};
      border-bottom: 1px solid ${theme.palette.primary.main};      
      background: ${theme.palette.white.main};
    }

    input:focus{
      outline: none;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type=number] {
      -moz-appearance: textfield;
    }

    button {
      border: border: 1px solid ${theme.palette.primary.main};
    }
  `}
`;

export const Button = styled.button`
  ${({ theme }) => `
    width: 22px;
    height: 22px;
    border: 1px solid ${theme.palette.primary.main};
    background-color: ${theme.palette.white.main};
    color: ${theme.palette.primary.main};
  `}
`;
