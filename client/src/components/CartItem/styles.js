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

  .product-description {
    padding-left: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    line-break: anywhere;
    p {
      width: 100%;
      line-break: anywhere;
      padding: 2px 0;
    }
    .product-name {
      width: 100%;
      line-break: anywhere;
      margin-bottom: 8px;
    }
  }
`;

export const FlexContainer = styled.div`
  height: 80px;
  display: flex;
  align-items: center;

  .price {
    font-weight: 500;
  }
`;

export const RemoveButtonContainer = styled.div`
  ${({ theme }) => `
  
  min-height:80px;
  margin-top:10px;
  svg {
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -ms-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
    display: flex;
    align-items: center;
    justify-content:flex-end;
    height: 70px;
    width: auto;
    path {
      fill: ${theme.palette.white.main};
    }
  }
  svg:hover{
    -webkit-transition: all 0.5s ease;
-moz-transition: all 0.5s ease;
-ms-transition: all 0.5s ease;
-o-transition: all 0.5s ease;
transition: all 0.5s ease;
    display: flex;
    align-items: center;
    justify-content:flex-end;
    height: 68px;
    width: auto;
    path {
      fill: 	 #e60000;
      stroke: 	#e60000;
    }
   

  }
  `}
`;
