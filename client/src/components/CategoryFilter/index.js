import React from "react";
import styled from "styled-components";
import { ReactComponent as Brush } from "../../assets/icons/brush.svg";
import { FormControl, Select, MenuItem, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DropdownSimple from "../DropdownSimple";
import { Row, Col } from "react-flexbox-grid";
import Breakpoints from "../../constants/Breakpoints";

const Container = styled(Row)`
  ${({ theme, width }) => `
  .MuiOutlinedInput-root {
    position: relative;
    border-radius: 4px;
    width: 100%;
}
  .MuiOutlinedInput-input {
    padding: 0;
   
}
.MuiFormControl-root {
  width: 100%;
}
.MuiInputBase-input {
  padding: 6px 0 7px;
  padding-left:6px;
}
 
    padding: ${theme.spacing(0.5)}px ${theme.spacing(2)}px;
    border: 1px solid ${theme.palette.lightGray.main};
    display: flex;
    align-items: center;
    // remove when categories added
    // justify-content: center;
    justify-content: flex-start;

    .text-container {
      display: flex;
      
      align-items: center;
      padding: ${theme.spacing(0.5)}px 8px;

      ${
        width <= Breakpoints.XS_MAX
          ? `justify-content: center;`
          : `justify-content: flex-end;`
      } 
    }

    .dropdown-container {
     
      height: 30px;
      margin: ${theme.spacing(0.5)}px 0;
    }
    .sorting-dropdown {
      flex:1;
    }

    .sorting-dropdown-container {
      margin: ${theme.spacing(0.5)}px 0;
      .row {
        margin: 0;
      }
      p {
        display: flex;
        align-items: center;
      }

      .dropdown-item {
        margin-left: 5px;
        flex:1;
      }

    }

    p {
      font-size:12px;
    }
  `}
`;

const category = [
  {
    value: "Beauty",
    id: "beauty",
  },
  {
    value: "Electronics",
    id: "electronics",
  },
  {
    value: "Stationary",
    id: "stationary",
  },
  {
    value: "Accessories",
    id: "accessories",
  },
];

const FilterGroup = styled(Row)``;

const SortGroup = styled(Row)`
  p {
    margin-right: 10px;
  }
`;

const rating = [
  {
    id: 0,
    name: "All",
  },
  {
    id: 1,
    name: "1 Star",
  },
  {
    id: 2,
    name: "2 Stars",
  },
  {
    id: 3,
    name: "3 Stars",
  },
  {
    id: 4,
    name: "4 Stars",
  },
  {
    id: 5,
    name: "5 Stars",
  },
];

const CategoryFilter = (props) => {
  return (
    <Container width={props.width}>
      <Col sm={3} md={1} lg={1} className="text-container">
        <Typography className="item">Filter By</Typography>
      </Col>
      <Col sm={12} md={12} lg={2} className="dropdown-container">
        <DropdownSimple
          className="item"
          list={props.categoryList}
          value={props.selectedCategory}
          handleValueChange={props.handleCategoryChange}
        />
      </Col>

      <Col sm={12} md={12} lg={1} className="dropdown-container">
        <TextField
          placeholder="min price"
          className="item"
          variant="outlined"
          onChange={(event) => props.handlePriceChange(event.target.value)}
        />
      </Col>
      <Col sm={12} md={12} lg={1} className="dropdown-container">
        <TextField
          className="item"
          variant="outlined"
          placeholder="max price"
          onChange={(event) => props.handlePriceChangeMax(event.target.value)}
        />
      </Col>
    </Container>
  );
};

export default CategoryFilter;
