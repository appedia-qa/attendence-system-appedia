import styled from "styled-components";
import { Typography, Box, Button } from "@material-ui/core";
import { Grid, Row, Col } from "react-flexbox-grid";

export const ContainerRow = styled(Row)`
  padding: 20px 0 15px 0;
  ${({ theme }) => `
    .header {
      color: ${theme.palette.brown.main};
      margin-bottom: 5px;
    }
    ${theme.breakpoints.down("xs")} {
      
      .MuiTypography-subtitle1 {
        font-size:15px;
        align-items: center;
        display: flex;
        justify-content: center;
      }
      .MuiTypography-body2 {
        align-items: center;
        display: flex;
        justify-content: center;
        font-size:15px;
      }
      
    }
    
  `}
`;

export const ProductDescription = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }

  ${({ theme }) => `
  ${theme.breakpoints.down("xs")} {
    img {
      width: 200px;
      height: 200px;
      object-fit: cover;
     
    }
    display: flex;
    justify-content: center;
    flex-direction:column;
  }
  `}

  .product-description {
    padding-left: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      padding: 2px 0;
    }
    .product-name {
      margin-bottom: 8px;
    }
  }
`;

export const FlexContainer = styled.div`
  height: 80px;
  display: flex;
  ${({ theme }) => `
  ${theme.breakpoints.down("xs")} {
    justify-content:center;
  }
  `}

  align-items: center;

  .price {
    font-weight: 500;
  }
`;

export const RemoveButtonContainer = styled.div`
  ${({ theme }) => `
    margin-top: 52px;
    height: 80px;
    ${theme.breakpoints.down("xs")} {
      margin-top: 0px;
      height: 40px;
    }
    display: flex;
    align-items: center;
    justify-content:flex-end;
    button {
      height: 40px;
      width: 100px;
      ${theme.breakpoints.down("xs")} {
        width: 100%;
      }
      background-color: ${theme.palette.primary.main};
      &:hover {
        background-color: ${theme.palette.red[600]};
      }
      p {
        padding: 0;
        margin: 0;
        font-size: 13px;
        color: ${theme.palette.white.main};
      }

      svg {
        height: 20px;
        width: auto;
        path {
          fill: ${theme.palette.white.main};
        }
      }
    }
  `}
`;
