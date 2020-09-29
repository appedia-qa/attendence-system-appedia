import React from 'react';
import Rating from "@material-ui/lab/Rating";
import {
  CategorySelection,
  RangeSlider,
  PriceContainer,
  RatingsContainer,
  RatingRow,
  BrandContainer,
  ProductsRow
} from "./styles";


const CustomerRating = (props) => {
  return (
    <RatingsContainer>
      <div class="rating-header">
        <h1>Customer Ratings</h1>
      </div>
      <div>
        <RatingRow
          selected={props.selected === 4}
          onClick={() => props.handleChange(4)}
        >
          <Rating value={4} className={"rating"} readOnly />
          <h1 class="rating-label">4.0&#xFE60;Up</h1>
        </RatingRow>
        <RatingRow
          selected={props.selected === 3}
          onClick={() => props.handleChange(3)}
        >
          <Rating value={3} className={"rating"} readOnly />
          <h1 class="rating-label">3.0&#xFE60;Up</h1>
        </RatingRow>
        <RatingRow
          selected={props.selected === 2}
          onClick={() => props.handleChange(2)}
        >
          <Rating value={3} className={"rating"} readOnly />
          <h1 class="rating-label">2.0&#xFE60;Up</h1>
        </RatingRow>
        <RatingRow
          selected={props.selected === 1}
          onClick={() => props.handleChange(1)}
        >
          <Rating value={1} className={"rating"} readOnly />
          <h1 class="rating-label">1.0&#xFE60;Up</h1>
        </RatingRow>
        <RatingRow
          selected={props.selected === 0}
          onClick={() => props.handleChange(0)}
        >
          <Rating value={0} className={"rating"} readOnly />
          <h1 class="rating-label">All</h1>
        </RatingRow>
      </div>
    </RatingsContainer>
  );
};

export default CustomerRating;