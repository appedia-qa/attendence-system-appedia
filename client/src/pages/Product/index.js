import React, { Component, Fragment } from "react";
import { withRouter, useParams } from "react-router-dom";
import styled from "styled-components";
import { t, Trans } from "@lingui/macro";
import { I18n } from "@lingui/react";
import Theme from "../../theme/Theme";
import { compose } from "redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProductList from "../../components/ProductList";
import { fetchAllProductsData } from "../../redux/actions/product.action";
import {
  addItemIntoCart,
  decrementItemInCart,
  deleteItemFromCart,
  flipCart,
  incrementItemInCart
} from "../../redux/actions/cart.action";
import ProductItemCard from "../../components/ProductItemCard";
import ReviewPanel from "../../components/ReviewPanel";
import * as StyledComponent from "./styles";
import { Grid, Row, Col } from "react-flexbox-grid";

import Button from "@material-ui/core/Button";
import {
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
  IconButton,
  Icon
} from "@material-ui/core";
import ProductCarousel from "../../components/ProductCarousel";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Rating from "@material-ui/lab/Rating";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import NumericInput from "../../components/NumericInput";
import PaymentLogo from "../../assets/icons/payment.png";
import { ReactComponent as ShopSVG } from "../../assets/icons/shop.svg";
import Axios from "axios";
import { apiUrl } from "../../constants/urls";
import appendQuery from "append-query";
import LoaderComponent from '../../components/LoaderComponent';
import { handleImageArray, validateImageURL } from "../../utils/image";
import ColorSelector from "../../components/ColorSelector";
import { addErrorItemInAlert } from '../../redux/actions/alert.action';

const noInfoString = 'No Info available';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      selectedSize: 10,
      tabValue: 0,
      quantity: 1,
      selectedColor: 0,
      selectedQuantity: 1,
      outOfStock: false,
      favorite: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    try {
      const productId = this.props.match.params.id;
      this.fetchProductData(productId);
    } catch(e){}
  }

  static getDerivedStateFromProps(props, state) {
    if (props.loading === false && props.loading !== state.loading) {
      return {
        loading: false
      };
    }

    return state;
  }

  fetchProductData = async (id) => {
    let url = apiUrl + `/products/${id}`;
    if (!url) return;
    const { data } = await Axios.get(url);
    if (data && data.product) {
      data.product.qty = 1;
      if (data.product.images) {
        data.product.images = handleImageArray(data.product.images);
      }
      if (data.product.cover_img) {
        data.product.cover_img = validateImageURL(data.product.cover_img);
      }

      if (data.product.product_reviews && data.product.product_reviews.length > 0) {
        let totalRating = data.product.product_reviews.reduce((a, b) => a + parseInt(b.rating), 0.6);
        totalRating /= data.product.product_reviews.length;
        totalRating = totalRating.toFixed(2)
        data.product.rating = totalRating;
        let ratingDetail = [0,0,0,0,0];
        try {
          data.product.product_reviews.forEach(item => {
            ratingDetail[parseInt(item.rating) - 1]++;
          })
        } catch(e){}
        data.product.ratingDetail = ratingDetail;
      }

      data.product.sizes = [];
      data.product.colors = [];
      if (data.product.product_attributes) {
        let sizes = [];
        let colors = [];
        let defaultSize, defaultColor = null;

        data.product.product_attributes.forEach((item, index) => {
          if (index === 0) {
            defaultColor = item.color;
            defaultSize = item.size;
          }
          sizes.push({ id: item.id, value: item.size})
          colors.push({ id: item.id, value: item.color });
        });
        data.product.sizes = sizes;
        data.product.colors = colors;

        this.setState({ selectedColor: defaultColor, selectedSize: defaultSize });
      }
      this.setState({ product: data.product, outOfStock: data.product.quantity < 1 ? true: false  });
    } else {
      this.props.addErrorItemInAlert({ message:`No product exists with ID: ${id}`});
      this.props.history.push('');
    }
  }

  handleQuantityChange = event => {
    const { product } = this.state;
    let value = 0;
    try {
      value = parseInt(event.target.value);
      if (value < 0) {
        value = 1;
      } else if ( value > product.quantity) {
        value = product.quantity;
      }
    } catch(e){}

    this.setState({ selectedQuantity: value });
  };

  handleDecrease = () => {
    const { selectedQuantity } = this.state;
    if (selectedQuantity -1 < 1) return;

    this.setState({ 
      selectedQuantity: selectedQuantity - 1
    });
  };

  handleIncrease = () => {
    const { product, selectedQuantity } = this.state;
    if (selectedQuantity === product.quantity) return;

    this.setState({ 
      selectedQuantity: selectedQuantity + 1
    });
  };

  handleColorChange = (color) => {
    this.setState({ selectedColor: color });
  }

  handleSizeChange = (size, event) => {
    this.setState({ selectedSize: event.props.value });
  }

  getTabDetail = (product, tabValue) => {
    switch (tabValue) {
      case 0:
        return product.detail ? product.detail: noInfoString
      case 1:
          return product.description ? product.description: noInfoString
      case 2:
          return product.storeDetail ? product.storeDetail: noInfoString
      default:
        return noInfoString;
    }
  }

  flipFavorite = () => {
    const { favorite } = this.state;
    this.setState({ favorite: !favorite });
  }

  render() {

    const { product, selectedQuantity, outOfStock, tabValue, favorite } = this.state;
    return (
      product ? (
      <Grid>
        <StyledComponent.MainContainer>
          <Typography component="h3" className="navPath" onClick={() => this.props.history.goBack()}>{"\<"} Home/Mall/Shop/{product.name}</Typography>
        </StyledComponent.MainContainer>
          <StyledComponent.ProductDetailRow
           >
            <Col xs={12} sm={7} lg={4}>
              <ProductCarousel items={product.images} />
            </Col>
            <Col xs={12} lg={4} style={{width: "95%", padding: "0 2.5%"}}>
              <StyledComponent.DescriptionContainer>
                <StyledComponent.DescriptionHeader>
                  <Typography variant="h2">QR {product.price || '0'}</Typography>
                  <IconButton
                    onClick={this.flipFavorite}
                  >
                    <FavoriteIcon
                      className={`favorite-${favorite ? "filled" : "unfilled"}`}
                    />
                  </IconButton>
                </StyledComponent.DescriptionHeader>

                <StyledComponent.ReviewRow>
                  <StyledComponent.RatingContainer>
                    <Rating size="small" value={product.rating || 0} precision={0.5} readOnly className="rating"></Rating>
                    <Typography component="p"></Typography>
                  </StyledComponent.RatingContainer>
                  <StyledComponent.ReviewTypography>
                    <Typography color="textSecondary" component="p">
                      {product.product_reviews ? product.product_reviews.length: 0}
                    </Typography>
                    <Typography component="p" className="review">
                      Reviews
                    </Typography>
                  </StyledComponent.ReviewTypography>
                </StyledComponent.ReviewRow>

                <StyledComponent.ProductName component="p" variant="h3">
                  { product.name.toUpperCase() || 'No Name' }
                </StyledComponent.ProductName>
              </StyledComponent.DescriptionContainer>
              { product.colors && product.colors.length > 0 ?
                <StyledComponent.ColorMenuContainer>
                  <Typography>Pick Color</Typography>
                  <StyledComponent.ColorMenu>
                    {product.colors && product.colors.map((x, i) => (
                      <ColorSelector 
                        color={x.value} 
                        selected={this.state.selectedColor === x.value}
                        index={i}
                        onColorChange = {this.handleColorChange}
                      />
                    ))}
                  </StyledComponent.ColorMenu>
                </StyledComponent.ColorMenuContainer>
              : null
              }
              <StyledComponent.SizeContainer>
                <Typography component="p">Select Size</Typography>
                <FormControl variant="outlined" margin="none">
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.selectedSize}
                    onChange={this.handleSizeChange}
                  >
                    {product.sizes && product.sizes.map(size => <MenuItem key={size.id} value={size.value}>{size.value}</MenuItem>)}
                  </Select>
                </FormControl>
                <Tooltip title="Select size">
                  <IconButton aria-label="Select size">
                    <HelpOutlineIcon />
                  </IconButton>
                </Tooltip>
              </StyledComponent.SizeContainer>
              { outOfStock ?                 
              <Typography component="p">Out of stock</Typography>
                :
              <NumericInput
                label="Quantity"
                defaultValue={1}
                handleChange={this.handleQuantityChange}
                value={selectedQuantity}
                handleIncrease={this.handleIncrease}
                handleDecrease={this.handleDecrease}
                style={{marginTop:'10px'}}
              />
              }
              <StyledComponent.StyledTabs
                value={tabValue}
                onChange={(event, newValue) =>
                  this.setState({ tabValue: newValue })
                }
                aria-label="styled tabs example"
              >
                <StyledComponent.StyledTab label="Description" value={0} />
                <StyledComponent.StyledTab
                  label="Additional Information"
                  value={1}
                />
                <StyledComponent.StyledTab label="Store Details" value={2} />
              </StyledComponent.StyledTabs>
              <StyledComponent.StyledTabBox>
                <Typography component="p">{this.getTabDetail(product, tabValue)}</Typography>
              </StyledComponent.StyledTabBox>
            </Col>
            <Col xs={12} sm={5} md={5} lg={4} 
              className="float"
            >
              <StyledComponent.PaymentContainer>
                <img src={PaymentLogo} />
                <div className="border" />
                <Button className="addToCart" disabled={outOfStock} onClick={() => this.props.addItemIntoCart(product)}>
                  <p>{outOfStock ? 'Out Of Stock': 'Add to cart'}</p>
                  <ShopSVG />
                </Button>
                <Button className="shopping" onClick={() => this.props.history.push("/")}>
                  <p>CONTINUE SHOPPING</p>
                </Button>
              </StyledComponent.PaymentContainer>
            </Col>
          </StyledComponent.ProductDetailRow>
          {/* todo uncomment it */}
        {/* <ProductList products={productsArr} /> */}

        <ReviewPanel 
          reviews={product.product_reviews ? product.product_reviews: []} 
          rating={product.rating}
          ratingDetail = {product.ratingDetail}
        />
        <div style={{marginTop: '60px'}}/>
      </Grid>
      ): (
        <LoaderComponent />
      )
    );
  }
}

const mapStateToProps = state => {
  const { products, loading, error } = state.product;

  const { cartItems, isOpen, totalPrice } = state.cart;

  return {
    products,
    loading,
    error,
    cartItems,
    isCartOpen: isOpen,
    totalPriceOfCart: totalPrice
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAllProductsData,
      flipCart,
      addItemIntoCart,
      incrementItemInCart,
      decrementItemInCart,
      deleteItemFromCart,
      addErrorItemInAlert
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Product);
