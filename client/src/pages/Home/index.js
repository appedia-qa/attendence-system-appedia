import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Trans } from "@lingui/macro";
import { compose } from "redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Loader from "../../components/LoaderComponent";
import { addProductsToReducer } from "../../redux/actions/product.action";
import {
  addItemIntoCart,
  decrementItemInCart,
  deleteItemFromCart,
  flipCart,
  incrementItemInCart,
  initializeCart,
} from "../../redux/actions/cart.action";
import {
  addErrorItemInAlert,
  addSuccessItemInAlert,
} from "../../redux/actions/alert.action";
import ProductItemCard from "../../components/ProductItemCard";
import * as Styles from "./styles";
import { Grid, Row, Col } from "react-flexbox-grid";
import TabView from "../../components/TabBar";
import TabViewMobile from "../../components/TabBar/tabBarMob";
import { Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import { apiUrl } from "../../constants/urls";
import { JumbotronMalls } from "./Components/Mall";
import Breakpoints from "../../constants/Breakpoints";
import TopPicksComponent from "./Components/TopPick";
import ProductDialog from "../../components/ProductDialog";
import { openProductDialog } from "../../redux/actions/productDialog.action";

class Home extends Component {
  componentDidMount() {
    //skip redux for now
    window.scrollTo(0, 0);
    this.fetchAllProductsData();
    // this.fetchSummaryProductsData();
    // this.props.initializeCart();
    if (this.props.match.params.id) {
      this.props.openProductDialog(this.props.match.params.id);
    }
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
    this.state = {
      selectedSize: 10,
      loading: true,
      tabValue: 1,
      quantity: 1,
      selectedColor: 0,
      shopDialogOpen: false,
      categories: [],
      perPageProducts: 0,
      totalProducts: 0,
      currentPage: 1,
      paginationCount: 1,
      selectedProduct: null,
      value: 0,
    };
  }

  fetchSummaryProductsData = async (page) => {
    if (!page) {
      page = 1;
    }
    if (page < 1) return;
    this.setState({ loading: true });
    try {
      let url = apiUrl + `/products?pageSize=12&page=${page}`;
      if (!url) return;
      let bodyParams = {};
      bodyParams = { ...bodyParams, categories: [this.state.tabValue] };
      const responce = await axios.get(url, { params: bodyParams });
      if (responce && responce.data) {
        this.setState({
          loading: false,
          perPageProducts: responce.data.products.per_page,
          totalProducts: responce.data.products.total,
        });
        this.props.addProductsToReducer({
          name: `summerProducts`,
          list: responce.data.products.data,
        });
      }
    } catch (e) {
      this.setState({ loading: false });
    }
  };

  fetchAllProductsData = async (page) => {
    if (!page) {
      page = 1;
    }
    if (page < 1) return;
    this.setState({ loading: true });
    let url = apiUrl + `/product-search?pageSize=12&page=${page}`;
    if (!url) return;
    let bodyParams = {};
    try {
      bodyParams = { ...bodyParams, categories: [this.state.tabValue] };
      const responce = await axios.get(url, { params: bodyParams });
      if (responce && responce.data) {
        this.setState({
          perPageProducts: responce.data.products.per_page,
          totalProducts: responce.data.products.total,
          loading: false,
          paginationCount: Math.ceil(
            responce.data.products.total / responce.data.products.per_page
          ),
        });
        this.props.addProductsToReducer({
          name: `products`,
          list: responce.data.products.data,
        });
      }
    } catch (e) {
      this.setState({ loading: false });
    }
  };

  handleDialogClose = (props) => {
    this.setState({ shopDialogOpen: false });
  };

  handleOnSelectProduct = (item) => {
    if (item) {
      this.setState({
        shopDialogOpen: true,
        selectedProduct: item,
      });
      this.props.addProductsToReducer({
        name: `productItem`,
        list: [item],
      });
    } else {
      this.props.addErrorItemInAlert({ message: "Error opening product" });
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

  handleProductPageChange = async (event, value) => {
    this.setState({ currentPage: value });
    this.fetchAllProductsData(value);
    window.scrollTo(580, 580);
  };

  handleProductDialogClose = () => {
    this.setState({ shopDialogOpen: false });
  };

  handleTabChange = (props) => {
    this.setState({ tabValue: props }, () => {
      this.fetchAllProductsData();
    });
  };

  handleMobTabChange = (props) => {
    this.setState({ tabValue: props }, () => {
      this.fetchAllProductsData();
    });
  };

  render() {
    const { paginationCount } = this.state;

    const { products, summerProducts } = this.props;

    return (
      <Styles.Container>
        <Styles.Jumbotron>
          <Styles.MallsContainer>
            <JumbotronMalls />
          </Styles.MallsContainer>
        </Styles.Jumbotron>
        <Grid>
          {/* <Styles.TopShopContainer>
            <Typography variant="h2" component="h2" className="title">
              <Trans>Summer Sale</Trans>
            </Typography>
            {this.props.windowWidth > Breakpoints.SM_MAX ? (
              <Styles.TopShopRow>
                {summerProducts.length > 0 ? (
                  summerProducts.map((item, index) => {
                    return <ProductItemCard product={item} {...this.props} />;
                  })
                ) : (
                  <Loader type="Oval" />
                )}
              </Styles.TopShopRow>
            ) : (
              <Styles.MobileListView>
                {summerProducts.length > 0 ? (
                  summerProducts.map((item, index) => {
                    return <ProductItemCard product={item} {...this.props} />;
                  })
                ) : (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Loader type="Oval" />
                  </div>
                )}
              </Styles.MobileListView>
            )}
          </Styles.TopShopContainer> */}
          {/* <TopPicksComponent data={[1, 2, 3, 4]} /> */}
          <Styles.FeaturedProducts>
            <Typography variant="h2" component="h2" className="title">
              <Trans>Featured Products</Trans>
            </Typography>
            <div>
              {this.props.windowWidth > Breakpoints.SM_MAX ? (
                <TabView handleTabChange={this.handleTabChange} />
              ) : (
                <TabViewMobile
                  value={this.state.tabValue}
                  handleTabChange={this.handleMobTabChange}
                />
              )}
            </div>
            <Styles.FeaturedGrid>
              {!this.state.loading ? (
                products && products.length > 0 ? (
                  products.map((item, index) => (
                    <Col xs={6} md={6} lg={4} xl={3} className="justify-center">
                      <ProductItemCard product={item} {...this.props} />
                    </Col>
                  ))
                ) : (
                  <div
                    style={{
                      height: "40vh",
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "20px",
                      textAlign: "center",
                    }}
                  >
                    <Typography component="h2" variant="h2">
                      <Trans>No Product Found, please Try Again Latter</Trans>
                    </Typography>
                  </div>
                )
              ) : (
                <Loader type="Oval" />
              )}
            </Styles.FeaturedGrid>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Pagination
                count={paginationCount}
                shape="rounded"
                style={{ marginTop: "40px", marginBottom: "40px" }}
                onChange={this.handleProductPageChange}
              />
            </div>
          </Styles.FeaturedProducts>
        </Grid>
      </Styles.Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { productLists, error } = state.product;

  return {
    products: productLists.products ? productLists.products : [],
    summerProducts: productLists.summerProducts
      ? productLists.summerProducts
      : [],

    error,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      flipCart,
      addItemIntoCart,
      incrementItemInCart,
      decrementItemInCart,
      deleteItemFromCart,
      addSuccessItemInAlert,
      addErrorItemInAlert,
      addProductsToReducer,
      initializeCart,
      openProductDialog,
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Home);
