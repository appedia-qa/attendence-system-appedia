import ProductConstants from '../actionTypes/product.types';

export const fetchAllProductsData = () => {
  return dispatch => dispatch({
    type: ProductConstants.GETALL_PRODUCTS_REQUEST
  });
}

export const fetchProductDataWithId = (payload) => {
  return dispatch => dispatch({
    type: ProductConstants.GET_PRODUCT_REQUEST,
    payload
  });
}

export const addProductsToReducer = (payload) => {
  return dispatch => dispatch({
    type: ProductConstants.ADD_PRODUCTS_TO_REDUCER,
    payload
  })
}