import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { Row, Col, Grid } from "react-flexbox-grid";

export const CategorySelection = styled.div`
  margin-top: 30px;
  width: 308px;
  height: auto;
  border: 2px solid #f5f5f5;
  border-radius: 0px 6px 0px 0px;
  ${({ theme }) => `
    
    `}
`;
export const PriceContainer = styled.div`
  margin-top: 54px;
  margin-left: 21px;
  ${({ theme }) => `
   .price-header {
       background-color: rgba(235,235,237,0.2);
       color: #191919;
       width: 287px;
       height: auto;
       font-size: 13px;
       font-weight: bold;
       display: flex;
       align-items: center;
       margin-bottom: 18px;
    }
    .price-range {
        margin-top: -12px;
        display: flex;
        h1 {
            margin-top: 4px;
            // width: 52px;
            padding: 2px 2px;
            border: 1px solid #545454;
            font-size: 12px;
            font-weight: 500;
            text-align: center;
        }
        .max-price {
           margin-right: 15px;
        }
        .MuiSlider-root {
            width: 94%;
            margin-left: 3%;
            margin-right: 3%;
            color: #D19130;
        }
    }  

`}
`;
export const RatingsContainer = styled.div`
  margin-top: 10px;
  margin-left: 21px;
  ${({ theme }) => `
    .rating-header {
        background-color: rgba(235,235,237,0.2);
        width: 287px;
        height: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 9px;
        h1 {
            font-size: 13px;
            font-weight: bold;
            color: #191919;
            margin-bottom: 0;
            margin-top: 0;
        }
        svg {
            margin-right: 15px;
        }    
    }
    
    `}
`;
export const RatingRow = styled.div`
  margin-left: 1px;
  margin-bottom: 8px;
  display: flex;
  cursor: pointer;
  .rating-label {
    margin-top: 7px;
  }
  
  ${({ theme, selected }) => `
    ${selected ? `border: 1px solid ${theme.palette.primary.main}; border-radius:5px;`: ``}
    h1 {
        font-size: 12px;
        font-weight: 500;
        color: #000000D9;
        margin-left: 40px;
        margin-top: 2px;
        margin-bottom: 0;
    }   
  `}
`;

export const BrandContainer = styled.div`
  margin-top: 15px;
  margin-left: 21px;
  ${({ theme }) => `
    h2 {
      font-size: 11px;
      color: #000000D9;
      opacity: 0.9;
      margin-left: -8px;
      margin-top: 13px;
    }
    .brands-row {
      display: flex;
      margin-top: -16px;
      width: 48%;
    }
    .brand-header {
      background-color: rgba(235,235,237,0.2);
        width: 287px;
        height: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        h1 {
            font-size: 13px;
            font-weight: bold;
            color: #191919;
            margin-bottom: 0;
            margin-top: 0;
        }
        svg {
            margin-right: 15px;
        }    
    }
    
  `}
`;

const useStyles = makeStyles({
  root: {
    width: 200
  }
});

function valuetext(value) {
  return `${value}°C`;
}

export const RangeSlider = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState([100, 800]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Slider
        min={10}
        max={1000}
        step={10}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
};

export const ProductsRow = styled(Row)`
  padding: 10px;
  justify-content: space-evenly;
`