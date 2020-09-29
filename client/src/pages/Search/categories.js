import React from 'react';
import {
  BrandContainer,
} from "./styles";
import Checkbox from "@material-ui/core/Checkbox";
import { Row } from "react-flexbox-grid";
import categoriesList from '../Shop/categoryList';

const Categories = (props) => {
  return (
    <BrandContainer>
      <div class="brand-header">
        <h1>Categories</h1>
        {/* <CollapseLogo /> */}
      </div>
      <Row>
        {categoriesList.map(item => (
          <div class="brands-row">
            <Checkbox
              color="primary"
              inputProps={{ "aria-label": "checkbox with default color" }}
              value={JSON.stringify(item)}
              onChange={props.handleChange}
            />
            <h2>{item.name}</h2>
          </div>
        ))}
      </Row>
    </BrandContainer>
  );
};

export default Categories;