import React from "react";
import CategoryItem from "../CategoryItem";
import { Row, Col, Grid } from "react-flexbox-grid";
import styled from "styled-components";

const CategoryGrid = styled(Grid)``;

const CategoryRow = styled(Row)`
  margin-top:50px;
  margin-bottom:50px;
  padding:50px;
  justify-content: space-between;
  @media only screen and (max-width: 1200px){
    justify-content: center;
  }
`;
const CategoryList = (props) => {
  return (
    <CategoryGrid>
      <CategoryRow>
        {props.list.map((item) => (
          <Col>
            <CategoryItem
              selected={item.id === props.selectedCategory}
              handleCategoryChange={props.handleCategoryChange}
              item={item}
            />
          </Col>
        ))}
      </CategoryRow>
    </CategoryGrid>
  );
};

export default CategoryList;
