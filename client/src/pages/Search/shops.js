import React, {useState, useEffect } from 'react';
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
import axios from 'axios';
import { addErrorItemInAlert } from "../../redux/actions/alert.action";
import { apiUrl } from "../../constants/urls";

const Shops = (props) => {

  const getShopString = (shopItem) => {
    return JSON.stringify({ 
      id:  shopItem.id,
      name: shopItem.name,
      mall_id: shopItem.mall_id
    })
  }

  const checkIfDisabled = (malls, shop) => {
    return malls.filter(x => x === shop.mall_id).length > 0 ? true: false;
  }
  
  return (
    <BrandContainer>
      <div class="brand-header">
        <h1>Shops</h1>
        {/* <CollapseLogo /> */}
      </div>
      <Row>
        {props.shops.map(item => (
          item.is_active ? 
          <div class="brands-row">
            <Checkbox
              color="primary"
              value={getShopString(item)}
              inputProps={{ "aria-label": "checkbox with default color" }}
              onChange={props.handleChange}
              disabled={checkIfDisabled(props.selectedMalls, item)}
            />
            <h2>{item.name}</h2>
          </div>
          : null
        ))}
      </Row>
    </BrandContainer>

  );
};

export default Shops;