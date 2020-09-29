import React from "react";
import * as StyledComponent from "./styles";
import ProductItemCard from '../ProductItemCard';
import Pagination from '@material-ui/lab/Pagination';
import { Grid, Row, Col } from 'react-flexbox-grid';

const reviews = [
  {
    id: 1,
    name: "Waleed",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "2020-03-09 07:14:33.571106",
    stars: 4,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    id: 1,
    name: "Faisal",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: "2020-04-09 07:14:33.571106",
    stars: 5,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
];

const ProductList = props => {
  return (
    <div>
    <Grid 
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      spacing={1}
    >
      <Row>
      {props?.products?.map(product => (
        <Col xs={6} md={6} lg={4} xl={3}>
        <ProductItemCard
          product={product}
          language={props.language}
          reviews={[
            {
              id: 1
            }
          ]}
        />
        </Col>
      ))}
      </Row>
    </Grid>
    <div style={{display:'flex', justifyContent:'flex-end'}}>
      <Pagination count={10} variant="outlined" shape="rounded" style={{marginTop: '40px', marginBottom:"40px"}} />
    </div>
    </div>
  );
};

export default ProductList;
