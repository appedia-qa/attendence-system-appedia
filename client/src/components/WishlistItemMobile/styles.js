import styled from 'styled-components';
import { Typography, Box, Button } from '@material-ui/core';
import { Grid, Row, Col } from "react-flexbox-grid";


export const ProductIcon = styled.img`
  height: 92px;
  width: 92px;
`

export const ContainerRow = styled(Row)`
  padding: 20px 15px;
  border: 1px solid black;
  flex-wrap: nowrap;
  align-items:center;
  ${({theme}) => `
    .header {
      color: ${theme.palette.brown.main};
      margin-bottom: 5px;
    }
  `}

  .row-right {
    display:flex;
    flex-direction: column;
    align-items:flex-end;
    justify-content:space-between;
    height: 90px;
    p {
      margin: 0;
      padding: 0;
    }
  }
`;

export const ProductDescription = styled.div`

  display:flex;
  flex-direction: column;
  justify-content:space-between;
  padding: 0px 5px 0px 15px;
  p {
    padding: 0;
    margin: 0;
  }
  .product-container {
    .header {
      font-size: 14px;
      font-weight: bold;
    }
    .product-name {
      font-weight: 500;
    }
    .product-size {
      margin-bottom: 10px;
    }
  }
//   display:flex;
//   align-items: center;
//   img {
//     width: 80px;
//     height: 80px;
//     object-fit: cover;
//   }

//   .product-description {
//     padding-left:12px;
//     display:flex;
//     flex-direction: column;
//     justify-content: center;
//     p {
//       padding: 2px 0;
//     }
//     .product-name {
//       margin-bottom: 8px;
//     }

//   }
 `;

// export const FlexContainer = styled.div`
//   height: 80px;
//   display: flex;
//   align-items: center;

//   .price {
//     font-weight: 500;
//   }
// `

// export const RemoveButtonContainer = styled.div`
//   ${({theme}) => `
//     margin-top: 52px;
//     height: 80px;
//     display: flex;
//     align-items: center;
//     justify-content:flex-end;
//     button {
//       height: 40px;
//       width: 100px;
//       background-color: ${theme.palette.primary.main};
//       p {
//         padding: 0;
//         margin: 0;
//         font-size: 13px;
//         color: ${theme.palette.white.main};
//       }

//       svg {
//         height: 20px;
//         width: auto;
//         path {
//           fill: ${theme.palette.white.main};
//         }
//       }
//     }
//   `}

// `