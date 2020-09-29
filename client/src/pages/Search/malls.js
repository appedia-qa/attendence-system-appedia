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

const Malls = (props) => {

  useEffect(() => {
    fetchMalls();
  }, [])
  const [ malls, setMalls ] = useState([]);

  const fetchMalls = async () => {
    const { data } = await axios.get(apiUrl + '/malls?pageSize=100');

    if (data && data.data) {
      setMalls(data.data);
    }
  }
  const getMallString = (mallItem) => {
    return JSON.stringify({ 
      id:  mallItem.id,
      name: mallItem.name,
    })
  }
  
  return (
    <BrandContainer>
      <div class="brand-header">
        <h1>Malls</h1>
      </div>
      <Row>
        {malls.map(item => (
          item.is_active ? 
          <div class="brands-row">
            <Checkbox
              color="primary"
              value={getMallString(item)}
              inputProps={{ "aria-label": "checkbox with default color" }}
              onChange={props.handleChange}
            />
            <h2>{item.name}</h2>
          </div>
          : null
        ))}
      </Row>
    </BrandContainer>
  );
};

export default Malls;