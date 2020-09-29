import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { t, Trans } from "@lingui/macro";
import { I18n } from "@lingui/react";
import Theme from "../../theme/Theme";
import { compose } from "redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import shopImage from "../../assets/images/image.png";
import ProductItemCard from "../../components/ProductItemCard";
import ProductItemDouble from "../../components/ProductItemDouble";
import Pagination from "@material-ui/lab/Pagination";
import { apiUrl } from "../../constants/urls";
import axios from "axios";
import { addErrorItemInAlert } from "../../redux/actions/alert.action";

// import { fetchAllShopsData } from "../../redux/actions/shop.action";
import {
  addItemIntoCart,
  decrementItemInCart,
  deleteItemFromCart,
  flipCart,
  incrementItemInCart,
} from "../../redux/actions/cart.action";
import ReviewPanel from "../../components/ReviewPanel";
import * as Styles from "./styles";
import { Grid, Row, Col } from "react-flexbox-grid";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import CategoryList from "../../components/CategoryList";
import CategoryFilter from "../../components/CategoryFilter";
import Image from "../../components/Image";
import appendQuery from "append-query";
import categoryList from "./categoryList";

const banners = [
  "https://greentree.humantrackingsystem.com/storage-images/shops/Banners/31699774757311.5c38f92b9faa9.jpg",
  "https://greentree.humantrackingsystem.com/storage-images/shops/Banners/Background-1%402x.png",
  "https://greentree.humantrackingsystem.com/storage-images/shops/Banners/Banner-1.jpg",
  "https://greentree.humantrackingsystem.com/storage-images/shops/Banners/Banner-Image-2.png",
  "https://greentree.humantrackingsystem.com/storage-images/shops/Banners/Model-1.jpg",
  "https://greentree.humantrackingsystem.com/storage-images/shops/Banners/adaa7974757311.5c38f92b9e752.jpg",
  "https://greentree.humantrackingsystem.com/storage-images/shops/Banners/ba20c541798109.57b4afecb91d4.jpg",
  "https://greentree.humantrackingsystem.com/storage-images/shops/Banners/blazer%402x.png",
  "https://greentree.humantrackingsystem.com/storage-images/shops/Banners/shutterstock_1344280394.jpg",
  "https://greentree.humantrackingsystem.com/storage-images/shops/Banners/shutterstock_1536917768.jpg",
  "https://greentree.humantrackingsystem.com/storage-images/shops/Banners/shutterstock_259971707.jpg",
  "https://greentree.humantrackingsystem.com/storage-images/shops/Banners/shutterstock_390548488.jpg",
  "https://greentree.humantrackingsystem.com/storage-images/shops/Banners/shutterstock_403847893.jpg",
  "https://greentree.humantrackingsystem.com/storage-images/shops/Banners/shutterstock_763108027.jpg",
];

class Shop extends Component {
  componentDidMount() {
    this.fetchAllShopsData();
    this.fetchAllShopsTrendingData();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.loading === false && props.loading !== state.loading) {
      return {
        loading: false,
      };
    }

    return state;
  }
  constructor(props) {
    super(props);
    let id = -1;
    try {
      id = parseInt(this.props.match.params.id);
    } catch (e) {}

    if (id === -1) {
      this.props.addErrorItemInAlert({
        message: "No shop id found in url params",
      });
      this.props.history.push("");
    }

    this.state = {
      selectedShop: this.props.match.params.id,
      trendingProducts: [],
      shops: [],
      featuredProducts: [],
      selectedSize: 10,
      tabValue: 0,
      quantity: 1,
      selectedColor: 0,
      selectedCategory: 0,
      selectedRating: 0,
    };
  }

  fetchAllShopsData = async (page) => {
    const { selectedRating, selectedCategory, selectedShop } = this.state;
    let url = apiUrl + "/product-search?";

    let params = { shopIds: [selectedShop] };

    if (selectedRating > 0) {
      url = appendQuery(url, { rating: selectedRating });
    }
    if (selectedCategory > 0) {
      params = { ...params, categories: [selectedCategory] };
    }

    const { data } = await axios.get(url, { params });
    if (data && data.products && data.products.data) {
      let featuredProductsPaginationCount = Math.ceil(
        data.products.total / data.products.per_page
      );
      await this.setState({
        featuredProducts: data.products.data,
        featuredProductsPaginationCount,
      });
    }
  };

  fetchAllShopsTrendingData = async (page) => {
    const { selectedRating, selectedCategory, selectedShop } = this.state;
    let url = apiUrl + "/product-search?status=trending";

    let params = { shopIds: [selectedShop] };

    if (selectedRating > 0) {
      url = appendQuery(url, { rating: selectedRating });
    }
    if (selectedCategory > 0) {
      params = { ...params, categories: [selectedCategory] };
    }

    const { data } = await axios.get(url, { params });
    if (data && data.products && data.products.data) {
      let trendingProductsPaginationCount = Math.ceil(
        data.products.total / data.products.per_page
      );
      this.setState({
        trendingProducts: data.products.data,
        trendingProductsPaginationCount,
      });
    }
  };

  handleQuantityChange = (event) => {
    this.setState({ quantity: event.target.value || 0 });
  };

  handleDecrease = () => {
    const { quantity } = this.state;
    this.setState({ quantity: quantity - 1 });
  };

  handleIncrease = () => {
    const { quantity } = this.state;
    this.setState({ quantity: quantity + 1 });
  };

  handleColorChange = (color) => {
    this.setState({ selectedColor: color });
  };

  handleSizeChange = (size, event) => {
    this.setState({ selectedSize: event.props.value });
  };

  handleCategoryChange = async (category) => {
    await this.setState({
      selectedCategory: category.id,
    });

    this.fetchAllShopsTrendingData();
    this.fetchAllShopsData();
  };

  handleDropdownCategoryChange = async (category) => {
    await this.setState({
      selectedCategory: category.target.value,
    });
    this.fetchAllShopsTrendingData();
    this.fetchAllShopsData();
  };

  handleRatingChange = async (rating) => {
    await this.setState({
      selectedRating: rating.target.value,
    });
    this.fetchAllShopsTrendingData();
    this.fetchAllShopsData();
  };

  getBannerImage = () => {
    let randomNumber = 0;
    do {
      randomNumber = Math.floor(Math.random() * 14) + 1;
    } while (randomNumber > 0 && randomNumber < 14);
    return randomNumber - 1;
  };

  render() {
    const {
      shops,
      selectedCategory,
      selectedRating,
      featuredProducts,
      trendingProducts,
      featuredProductsPaginationCount,
      trendingProductsPaginationCount,
    } = this.state;
    return (
      <Styles.StyledGrid>
        <Styles.Jumbotron>
          <div className="jumbo-container">
            <Image src={banners[this.state.selectedShop % 14]} />
          </div>
        </Styles.Jumbotron>
        <Styles.CategoryContainer>
          <Typography component="h1" variant="h1" className="category-title">
            Browse By Category
          </Typography>
          <CategoryList
            list={categoryList}
            selectedCategory={selectedCategory}
            handleCategoryChange={this.handleCategoryChange}
          />
        </Styles.CategoryContainer>
        <CategoryFilter
          categoryList={categoryList}
          selectedCategory={selectedCategory}
          selectedRating={selectedRating}
          width={this.props.windowWidth}
          brandList={[]}
          sizesList={[]}
          sorting="desc"
          handleRatingChange={this.handleRatingChange}
          handleCategoryChange={this.handleDropdownCategoryChange}
        />

        <Styles.FeaturedProducts>
          <Typography variant="h2" component="h2" className="title">
            Featured Products
          </Typography>
          <Styles.FeaturedGrid>
            {featuredProducts.map((item, index) => (
              <Col xs={6} md={6} lg={4} xl={3} className="justify-center">
                <ProductItemCard product={item} {...this.props} />
              </Col>
            ))}
          </Styles.FeaturedGrid>
        </Styles.FeaturedProducts>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Pagination
            count={featuredProductsPaginationCount}
            variant="outlined"
            shape="rounded"
            style={{ marginTop: "40px", marginBottom: "40px" }}
          />
        </div>

        <Styles.EmptyBox />
        <Styles.FeaturedProducts>
          <Typography variant="h2" component="h2" className="title">
            Best of 2020
          </Typography>
          <Styles.FeaturedGrid>
            {trendingProducts.map((item, index) =>
              index == 10 ? (
                <Col xs={12} md={12} lg={8} xl={6} className="justify-center">
                  <Col
                    xs={12}
                    sm={12}
                    md={11}
                    lg={12}
                    className="justify-center"
                  >
                    <ProductItemDouble width={this.props.windowWidth} />
                  </Col>
                </Col>
              ) : (
                <Col xs={6} md={6} lg={4} xl={3} className="justify-center">
                  <ProductItemCard product={item} {...this.props} />
                </Col>
              )
            )}
          </Styles.FeaturedGrid>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Pagination
              count={trendingProductsPaginationCount}
              variant="outlined"
              shape="rounded"
              style={{ marginTop: "40px", marginBottom: "40px" }}
            />
          </div>
        </Styles.FeaturedProducts>
      </Styles.StyledGrid>
    );
  }
}

const mapStateToProps = (state) => {
  // const { shops, loading, error } = state.shop;
  // const { cartItems, isOpen, totalPrice } = state.cart;
  // return {
  //   shops,
  //   loading,
  //   error,
  //   cartItems,
  //   isCartOpen: isOpen,
  //   totalPriceOfCart: totalPrice
  // };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      flipCart,
      addItemIntoCart,
      incrementItemInCart,
      decrementItemInCart,
      deleteItemFromCart,
      addErrorItemInAlert,
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Shop);
