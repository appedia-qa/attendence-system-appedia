import React, { Component } from "react";
import Rating from "@material-ui/lab/Rating";
import Checkbox from "@material-ui/core/Checkbox";
import { ReactComponent as CollapseLogo } from "../../assets/icons/collapse-icon.svg";
import { Row, Col, Grid } from "react-flexbox-grid";
import ProductItemCard from "../../components/ProductItemCard";
import CustomerRating from "./CustomerRating";
import Brand from "./brand";
import appendQuery from "append-query";
import { apiUrl } from "../../constants/urls";
import { getSearchParameters } from "../../utils/url";
import Axios from "axios";
import Malls from "./malls";
import Shops from "./shops";
import Categories from "./categories";
import LoaderComponent from "../../components/LoaderComponent";
import { Typography } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import categoriesList from "../Shop/categoryList";
import { addProductsToReducer } from "../../redux/actions/product.action";
import CategoryFilter from "../../components/CategoryFilter";
import { compose } from "redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import {
  CategorySelection,
  PriceContainer,
  RatingsContainer,
  RatingRow,
  BrandContainer,
  ProductsRow,
} from "./styles";

function valuetext(value) {
  return `${value}°C`;
}

const PriceRange = (props) => {
  return (
    <PriceContainer>
      <div class="price-header">Price range</div>
      <div class="price-range">
        <h1>Q10</h1>
        <Slider
          min={10}
          max={5000}
          step={10}
          value={props.value}
          onChange={props.handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        />
        <h1 class="max-price">Q5000</h1>
      </div>
    </PriceContainer>
  );
};

class SearchResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMalls: [],
      selectedShops: [],
      categories: [],
      selectedCategories: [],
      selectedCategory: "",
      priceRange: ["1", "100000000"],
      products: [],
      selectedRating: 0,
      shops: [],
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.fetchAllProductsData();
    this.fetchCategories();
  }

  componentDidUpdate(prevProps) {
    if (window.location.search != this.state.query) {
      this.setState({ query: window.location.search });
      this.fetchAllProductsData();
    }
  }

  fetchCategories = async () => {
    const { data } = await Axios.get(apiUrl + "/categories/all");
    if (
      data &&
      data.data &&
      data.data.categories &&
      data.data.categories.data
    ) {
      this.setState({
        categories: [
          { id: "0", name: "select category" },
          ...data.data.categories.data,
        ],
      });
    }
  };

  fetchShops = async () => {
    const { data } = await Axios.get(apiUrl + "/shops?pageSize=100");

    if (data && data.data) {
      this.setState({ shops: data.data });
    }
  };

  fetchAllProductsData = async () => {
    this.setState({ loader: true });
    const { selectedCategories, priceRange, selectedRating } = this.state;
    let query = window.location.search;
    let url = apiUrl + "/product-search";

    const params = getSearchParameters();

    let bodyParams = {
      priceRange: this.state.priceRange,
    };

    if (query) {
      url = appendQuery(url, { ...params });
    }

    if (selectedCategories.length > 0) {
      bodyParams = { ...bodyParams, categories: selectedCategories };
    }

    // if (selectedRating > 0) {
    //   url = appendQuery(url, { rating: selectedRating });
    // }

    // if (filteredShops.length > 0) {
    //   url = appendQuery(url, { shopIds: filteredShops });
    // }
    if (priceRange.length > 0) {
      bodyParams = { ...bodyParams, priceRange };
    }

    if (this.state.selectedCategory && this.state.selectedCategory != "0") {
      bodyParams = { ...bodyParams, categories: [this.state.selectedCategory] };
    }
    const { data } = await Axios.get(url, { params: bodyParams });
    if (data && data.products && data.products.data) {
      this.setState({
        query: query,
        loader: false,
      });
      this.props.addProductsToReducer({
        name: `products`,
        list: data.products.data,
      });
      return;
    }
  };

  handleDropdownCategoryChange = async (category) => {
    await this.setState({
      selectedCategory: category && category.target && category.target.value,
    });
    this.fetchAllProductsData();
  };

  handleCategoryChange = async (event) => {
    const checked = event.target.checked;
    const value = JSON.parse(event.target.value);
    let { selectedCategories } = this.state;
    if (checked) {
      if (selectedCategories.indexOf(value.id) === -1) {
        selectedCategories.push(value.id);
      }
    } else {
      selectedCategories = selectedCategories.filter((x) => x == value.id);
    }

    await this.setState({ selectedCategories });
    this.fetchAllProductsData();
  };

  handlePriceChange = async (value) => {
    let priceRange = this.state.priceRange;
    priceRange[0] = value;
    if (value) {
      await this.setState({ ...priceRange });
    } else {
      priceRange[0] = "1";
    }
    this.fetchAllProductsData();
  };

  handlePriceChangeMax = async (value) => {
    let priceRange = this.state.priceRange;
    if (value) {
      priceRange[1] = value;
    } else {
      priceRange[1] = "100000000";
    }
    await this.setState({ ...priceRange });
    this.fetchAllProductsData();
  };

  handleRatingChange = async (rating) => {
    await this.setState({ selectedRating: rating });
    this.fetchAllProductsData();
  };

  render() {
    return (
      <div>
        <Row>
          <Col xs={12} md={12} lg={12}>
            <CategoryFilter
              categoryList={this.state.categories}
              selectedCategory={
                this.state.selectedCategory ? this.state.selectedCategory : "0"
              }
              selectedRating={"0"}
              width={this.props.windowWidth}
              brandList={[]}
              sizesList={[]}
              sorting="desc"
              handleRatingChange={this.handleRatingChange}
              handleCategoryChange={this.handleDropdownCategoryChange}
              handlePriceChange={this.handlePriceChange}
              handlePriceChangeMax={this.handlePriceChangeMax}
            />
          </Col>
          <Col xs={12} md={12} lg={12}>
            {this.state.loader ? (
              <LoaderComponent />
            ) : (
              <ProductsRow>
                {this.props.products.length > 0 ? (
                  this.props.products.map((item) => (
                    <ProductItemCard product={item} language={this.props.language}/>
                  ))
                ) : (
                  <div
                    style={{
                      height: "60vh",
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "20px",
                      textAlign: "center",
                    }}
                  >
                    <Typography component="h2" variant="h2">
                      No Product Found, please change your filters
                    </Typography>
                  </div>
                )}
              </ProductsRow>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { productLists, loading, error } = state.product;

  return {
    products: productLists.products ? productLists.products : [],
    loading,
    error,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addProductsToReducer,
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SearchResult);
