import productConstants from "../actionTypes/product.types";
import * as cartConstants from "../actionTypes/cart.types";

const initialState = {
  error: false,
  loading: false,
  productLists: {},
};

export function product(state = initialState, action) {
  switch (action.type) {
    case productConstants.ADD_PRODUCTS_TO_REDUCER:
      return {
        ...state,
        loading: false,
        productLists: addToProductList(state.productLists, action.payload),
      };
      case productConstants.GETALL_PRODUCTS_INPROGRESS:
      return {
        ...state,
        loading: true,
      };
    case productConstants.UPDATE_PRODUCTS:
      return {
        ...state,
        productLists: action.payload,
      };
    default:
      return state;
  }
}

export const transformProduct = (products) => {
  return products.map((item) => {
    return { ...item, addedToCart: false, addedToWishlist: false };
  });
};

const addToProductList = (productLists, payload) => {
  const transformedProduct = transformProduct(payload.list);
  productLists[`${payload.name}`] = transformedProduct;
  return productLists;
};

export const selectProductList = (state) => state.product.productLists;
