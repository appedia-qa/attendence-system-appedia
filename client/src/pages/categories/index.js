import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { t, Trans } from "@lingui/macro";
import { I18n } from "@lingui/react";
import { compose } from "redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Categories from "../../components/categories";
import ProductList from "../../components/ProductList";
import { fetchAllProductsData } from "../../redux/actions/product.action";
import { addProductsToReducer } from "../../redux/actions/product.action";
import {
  addItemIntoCart,
  decrementItemInCart,
  deleteItemFromCart,
  flipCart,
  incrementItemInCart,
} from "../../redux/actions/cart.action";
import axios from "axios";
import { apiUrl } from "../../constants/urls";

const pageHeading = [
  <Trans>Indoor Plants</Trans>,
  <Trans>Outdoor Plants</Trans>,
  <Trans>Accessories</Trans>,
  <Trans>Gardening Needs</Trans>,
];
class IndoorPlants extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
    this.fetchAllProductsData();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.loading === false && props.loading !== state.loading) {
      return {
        loading: false,
      };
    }
    if (props.match.params.id !== state.categoryID) {
      state.getData = true;
      state.categoryID = props.match.params.id;
    }

    return state;
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedSize: 10,
      tabValue: 0,
      quantity: 1,
      selectedColor: 0,
      shopDialogOpen: false,
      categories: [],
      perPageProducts: 0,
      totalProducts: 0,
      currentPage: 1,
      paginationCount: 1,
      salesList: [1, 2, 3, 4],
      malls: [],
      selectedCategoryIndex: 0,
      value: 0,
      getData: true,
      categoryID: props.match.params.id || 1,
    };
  }

  fetchAllProductsData = async (page) => {
    const categories = this.props.match.params.id;
    if (!page) {
      page = 1;
    }
    if (page < 1) return;
    let url = apiUrl + `/product-search?pageSize=12&page=${page}`;
    if (!url) return;
    let bodyParams = {};
    bodyParams = { ...bodyParams, categories: [categories] };
    const responce = await axios.get(url, { params: bodyParams });
    if (responce && responce.data) {
      this.setState({
        categories: responce.data.categories,
        perPageProducts: responce.data.products.per_page,
        totalProducts: responce.data.products.total,
        paginationCount: Math.ceil(
          responce.data.products.total / responce.data.products.per_page
        ),
      });

      this.props.addProductsToReducer({
        name: `products`,
        list: responce.data.products.data,
      });
    }
  };

  handleShopDialogOpen = async (item) => {
    // TODO: uncomment this
    // const { data } = await Axios.get(apiUrl + `/malls/${item.id}`);
    this.setState({
      shopDialogOpen: true,
      // selectedCategoryIndex: index,
      selectedCategory: item ? item : null,
    });
  };

  handleProductPageChange = async (event, value) => {
    window.scrollTo(400, 400)
    await this.setState({ currentPage: value });
    this.fetchAllProductsData(value);
  };

  getSelectedShop = () => {
    const { malls, selectedCategoryIndex } = this.state;

    if (malls.length > 0 && malls.length > selectedCategoryIndex) {
      return malls[selectedCategoryIndex];
    }
    return { id: 1 };
  };
  
  handleProductDialogClose = () => {
    this.setState({ shopDialogOpen: false });
  };

  render() {
    const {
      paginationCount,
      selectedCategory,
      categoryID,
      getData,
    } = this.state;

    const { products } = this.props;

    if (getData) {
      this.setState({ getData: false });
      this.fetchAllProductsData();
    }

    return (
      <div>
        <Categories
          {...this.props}
          width={this.props.windowWidth}
          open={this.state.shopDialogOpen}
          handleDialogClose={this.handleProductDialogClose}
          product={selectedCategory != null ? selectedCategory : ""}
          count={paginationCount}
          handleProductPageChange={this.handleProductPageChange}
          handleOnCardClick={this.handleShopDialogOpen}
          products={products}
          name={pageHeading[categoryID - 1]}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { productLists, loading, error } = state.product;

  const { cartItems, isOpen, totalPrice } = state.cart;

  return {
    products: productLists.products ? productLists.products : [],
    loading,
    error,
    cartItems,
    isCartOpen: isOpen,
    totalPriceOfCart: totalPrice,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchAllProductsData,
      flipCart,
      addItemIntoCart,
      incrementItemInCart,
      decrementItemInCart,
      deleteItemFromCart,
      addProductsToReducer,
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(IndoorPlants);
