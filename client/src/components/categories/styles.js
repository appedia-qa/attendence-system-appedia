import styled from "styled-components";
import { Typography, Box, Button } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Grid, Row, Col } from "react-flexbox-grid";

export const Container = styled(Grid)`
  margin-top:50px;
  ${({ theme }) => `
    h2.title {
      font-size:35px;
      margin-top: 50px;
      margin-bottom: 15px;
      font-weight: 300;
      color: ${theme.palette.textSecondary};

      ${theme.breakpoints.down("sm")} {
        text-align: center;
      }
    }
  `}
`;

export const Jumbotron = styled.div`
  ${({ theme }) => `
  img { 
    width: 100%;
    height:295px;
    object-fit: cover;
  }
  .jumbotron {
    position:relative;
    overflow:hidden;
    width:100%;
    height:295px;
    ${theme.breakpoints.down("xs")} {
      img { 
        width: 100%;
        height:295px;
        object-fit: contain;
      }
    }
  }
  
  .jumbotron .container {
    position:relative;
    z-index:2;
    top: 40%;
    right:24%;
    background:white;
    padding:2rem;
    border:1px solid rgba(0,0,0,0.1);
    border-radius:3px;
    max-width:546px;
    width:80%;
    ${theme.breakpoints.down("xs")} {
      top:20%;
      right: 0;
    }
    ${theme.breakpoints.down("md")} {
     
      right: 0;
    }
    hight:auto;
  }
  .display-4{
    font-size:25px;
  }
  p{
    font-size:18px;
    font-weight:100;
    }
  .jumbotron-background {
    position:absolute;
    z-index:1;
    width:100%;
    height:100%;
    
   
  }
 
  
  `}
`;

export const MallsContainer = styled.div`
  ${({ theme }) => `
    // background-color: ${theme.palette.white[300]};
    // padding: 10px 2% 50px; 
  `}
`;
export const JumbotronMalls = styled(Row)`
  ${({ theme }) => `
    margin: 0;
    margin-top: 10px;
    background-color: ${theme.palette.white[300]};
    justify-content: space-evenly;
    position: relative;
  `}
`;

export const MallsItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
`;

export const MallsItem = styled.div`
  ${({ theme, width }) => `
    width: ${width * 0.15}px;
    height: ${width * 0.16 * 0.58}px;
    max-height: 120px;
    max-width: 200px;
    background: ${theme.palette.white.main};
    margin-right: 5px;
    display:flex;
    justify-content: center;
    align-items: center;
    img {
      height: 80%;
      width: auto;
    }

  `}
`;

export const BottomArrow = styled.div`
  ${({ theme, selected }) => `
    ${
      selected
        ? `
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 10px 10px 0 10px;
        border-color: ${theme.palette.white.main} transparent transparent transparent;
        margin-bottom: 5px;
      `
        : `
        height: 15px;
      `
    }
  `}

  position: relative;
`;

export const MallsHeader = styled.div`
  ${({ theme }) => `
  display:flex;
  .title {
    font-size: 20px;
    font-weight: bold;
    color: ${theme.palette.brown[700]};
  }
  justify-content: space-between;
  align-items:center;

  .slide-button-group {

    button {
      height: 32px;
      width: 32px;
      min-width: 32px;
      
      svg {
        height: 20px;
        width: auto;
      }
    }

    .left {
      background-color: ${theme.palette.white.main};
      svg path {
        fill: ${theme.palette.primary.main};
      }
      margin-right: ${theme.spacing(1)}px;
    }
    .right {
      background-color: ${theme.palette.primary.main};
      svg path {
        fill: ${theme.palette.white.main};
      }
    }
  }
`}
`;

export const EmptyBox = styled.div`
  ${({ theme }) => `
    width: 100%;
    height: 200px;
    background-color: ${theme.palette.lightGray.main};
    border-radius: 15px;
    margin-top: 30px;
    // margin-bottom: 50px;
  `}
`;

export const TopShopContainer = styled.div``;
export const TopShopRow = styled(Row)`
  justify-content: space-evenly;
`;

export const MobileListView = styled.div`
  display: flex;
  overflow-x: scroll;
  padding: 10px 0;

  .product-item-card {
    min-width: 165px;
    margin-right: 5px;
  }
`;

export const FeaturedProducts = styled.div``;

export const FeaturedGrid = styled(Row)`
  justify-content: space-between;
`;
