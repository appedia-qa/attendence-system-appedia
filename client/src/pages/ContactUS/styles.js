import styled from "styled-components";
import { Typography, Box, Button } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Grid, Row, Col } from "react-flexbox-grid";

export const StyledGrid = styled(Grid)`
  h2.title {
    font-size: 40px;
    text-align: center;
    margin-top: 50px;
    margin-bottom: 15px;
  }
`;

export const Jumbotron = styled.div`
  ${({ theme }) => `
    width: 100%;
    display:flex;
    justify-content:center;
    height: 450px;
    margin-top: ${theme.spacing(3.5)}px;

    .jumbo-container {
      background-color:${theme.palette.white[300]};
    }
    ${theme.breakpoints.down("md")} {
      height: 300px;
    }
    ${theme.breakpoints.down("xs")} {
      height: 160px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `}
`;

export const CategoryContainer = styled.div`
   
  ${({ theme }) => `
    .category-title {
      font-weight:400;
      font-size:35px;
      margin-top: ${theme.spacing(12)}px;
      margin-bottom: ${theme.spacing(4.5)}px;
    
    }
    .innertext{
      background: #F5F8FC 0% 0% no-repeat padding-box;
      opacity: 1;
     
      p{
       margin-top:0px;
       padding :50px;
       padding-top:100px;
       padding-bottom:100px;
       font-size:18px;
       color:${theme.palette.white[800]};
       font-weight:300;
      }

    }
   
  `}
`;

export const FeaturedProducts = styled.div``;

export const FeaturedGrid = styled(Row)`
  // justify-content: space-between;
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
