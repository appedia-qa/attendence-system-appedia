import React from 'react';
import {
  CategorySelection,
  RangeSlider,
  PriceContainer,
  RatingsContainer,
  RatingRow,
  BrandContainer,
  ProductsRow
} from "./styles";
import Checkbox from "@material-ui/core/Checkbox";
import { ReactComponent as CollapseLogo } from "../../assets/icons/collapse-icon.svg";
import { Row, Col, Grid } from "react-flexbox-grid";

const brandList = [
  {
    id: 1,
    name: "Addidas"
  },
  {
    id: 2,
    name: "Nike"
  },
  {
    id: 3,
    name: "Hushpuppies"
  },
  {
    id: 4,
    name: "Apple"
  },
  {
    id: 5,
    name: "HP"
  },
  {
    id: 6,
    name: "Samsung"
  },

  {
    id: 7,
    name: "Lascoste"
  },
  {
    id: 8,
    name: "Vans"
  },
  {
    id: 9,
    name: "Gucci"
  },
  {
    id: 10,
    name: "Name"
  },

  {
    id: 11,
    name: "Name"
  },
  {
    id: 12,
    name: "Name"
  },
  {
    id: 13,
    name: "Name"
  },
  {
    id: 14,
    name: "Name"
  },
  {
    id: 15,
    name: "Name"
  },
  {
    id: 16,
    name: "Name"
  },
  {
    id: 17,
    name: "Name"
  },
  {
    id: 18,
    name: "Name"
  },
  {
    id: 19,
    name: "Name"
  },
  {
    id: 20,
    name: "Name"
  }
];

const Brand = () => {
  return (
    <BrandContainer>
      <div class="brand-header">
        <h1>Brand</h1>
        {/* <CollapseLogo /> */}
      </div>
      <Row>
        {brandList.map(item => (
          <div class="brands-row">
            <Checkbox
              color="primary"
              inputProps={{ "aria-label": "checkbox with default color" }}
            />
            <h2>{item.name}</h2>
          </div>
        ))}
      </Row>
    </BrandContainer>
  );
};

export default Brand;