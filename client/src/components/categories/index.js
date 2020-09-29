import React from "react";
import { withRouter } from "react-router-dom";
import ProductItemCard from "../../components/ProductItemCard";
import * as Styles from "./styles";
import { Grid, Col } from "react-flexbox-grid";
import { Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import JumbotronMalls from "./Components/Mall";

const Categories = (props) => {
  return (
    <Styles.Container>
      <Styles.Jumbotron>
        <Styles.MallsContainer>
          <JumbotronMalls imageName={props.name} width={props.width} />
        </Styles.MallsContainer>
      </Styles.Jumbotron>
      <Grid>
        <Styles.TopShopContainer>
          <Typography variant="h2" component="h2" className="title">
            {props.name ? props.name : "dummy"}
          </Typography>
          <Styles.FeaturedGrid>
            {props.products.map((item) => (
              <Col xs={6} md={6} lg={4} xl={3} className="justify-center">
                <ProductItemCard product={item} language={props.language} />
              </Col>
            ))}
          </Styles.FeaturedGrid>
        </Styles.TopShopContainer>
        <Styles.FeaturedProducts>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Pagination
              count={props.count ? props.count : "1"}
              shape="rounded"
              style={{ marginTop: "40px", marginBottom: "40px" }}
              onChange={props.handleProductPageChange}
            />
          </div>
        </Styles.FeaturedProducts>
      </Grid>
    </Styles.Container>
  );
};

export default withRouter(Categories);
