import styled from 'styled-components';
import { Typography, Box, Button } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Grid, Row, Col } from "react-flexbox-grid";

export const MainContainer = styled.div`
  ${({theme}) => `
    margin: ${theme.spacing(4)}px 0 ${theme.spacing(5)}px;
    h3 {
      color: ${theme.palette.brown.main};
    }
  `}
`;

export const ProductDetailRow = styled(Row)`
  position: relative;
  .float {
    @media only screen and (min-width: 600px) and (max-width: 768px) {
      position: absolute;
      right: -10%;
      width: 30%;
      min-width: 250px;
    }
    @media only screen and (min-width: 768px) and (max-width: 992px) {
      position: absolute;
      right: 0;
      width: 30%;
      min-width: 250px;
    }
  }
`;

export const DescriptionContainer = styled.div`
`



export const DescriptionHeader = styled.div`
  display:flex;
  justify-content: space-between;
  ${({theme}) => `
    margin-bottom: ${theme.spacing(1.5)}px;
    .favorite-filled {
      color: ${theme.palette.primary.main};
    }
    .favorite-unfilled {
      color: ${theme.palette.lightGray[700]};
    }
  `}
`

export const ReviewRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;

  h2{
    font-weight: 300;
  }
`

export const RatingContainer = styled.div`
  display:flex;
  align-items:center;

  .rating svg{
    height: 12px;
    width: 12px;
  }
  p {
    font-weight: 700;
    margin-left: 5px;
    font-size: 10px;
  }
`

export const ReviewTypography = styled.div`
  display: flex;
  p {
    font-weight: 700;
    font-size: 10px;
  }

  p.review {
    margin-left: 3px;
  }
`

export const ProductName = styled(Typography)`
${({theme}) => `
  margin-top: ${theme.spacing(1)}px;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 300;
  border-bottom: 1px ${theme.palette.lightGray.main} solid;
  padding-bottom: ${theme.spacing(1)}px;
`}
`

export const ColorMenuContainer = styled.div`
  ${({theme}) => `
    margin-top: ${theme.spacing(2)}px;
  `}
`;

export const ColorMenu = styled.div`
  display:flex;
  ${({theme}) => `
    margin-top: ${theme.spacing(1.5)}px;
  `}
`
export const SizeContainer = styled.div`
  display: flex;
  align-items:center;
  margin-top: 10px;

  p {
    font-size: 14px;
    margin-right: 26px;
  }

  input {
    margin-right: 15px;
  }

  svg {
    height: 13px;
    width: 13px;
  }
`

export const StyledTabs = styled(Tabs)`
  ${({theme}) => `
    margin-top: ${theme.spacing(1)}px;
  `}
`

export const StyledTab = styled(Tab)``;

export const StyledTabBox = styled(Box)`
  p {
    padding: 20px 0;
    max-width: 100%;
    white-space: pre-line;
  }
`;

export const PaymentContainer = styled.div`
  ${({theme}) => `
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 5px;
    border: 1px solid ${theme.palette.lightGray[700]};
    padding: ${theme.spacing(1)}px ${theme.spacing(2)}px;
    .border {
      height: 1px;
      background: ${theme.palette.lightGray.main};
      width: 100%;
      margin-top: 15px;
    }
    img {
      width: 95%;
      height: auto;
      object-fit: contain;
    }
    .addToCart {
      height: 50px;
      width: 100%;
      border-radius: 6px;
      margin-top: 40px;
      background-color: ${theme.palette.primary.main};
      p {
        color: ${theme.palette.white.main};
        margin: 0;
        padding: 0;
        margin-right: 15px;
        font-weight: bold;
      }  
      svg {
        height: 15px;
        width: 15px;
        path, line {
          stroke: ${theme.palette.white.main};
          fill: ${theme.palette.primary.main};
        }

      }
    }

    .addToCart:hover {
      background-color: ${theme.palette.primary[900]};
    }

    .shopping {
      height: 50px;
      width: 100%;
      border-radius: 6px;
      background-color: ${theme.palette.lightGray[700]};
      margin-top: 10px;
      p {
        color: ${theme.palette.primary.main};
        margin: 0;
        padding: 0;
        margin-right: 15px;
        font-weight: bold;
      }
    }
    .shopping:hover {
      background-color: ${theme.palette.lightGray[800]};
    }

  `}
`

export const PaymentButton = styled(Button)`
'&:hover': {
  background: 'blue'
}

${({theme}) => `

  `}
`
export const ShoppingButton = styled(Button)``