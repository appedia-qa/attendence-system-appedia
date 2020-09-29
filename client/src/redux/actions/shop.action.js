import ShopConstants from '../actionTypes/product.types';

export const fetchAllShopsData = () => {
  return dispatch => dispatch({
    type: ShopConstants.GETALL_SHOPS_REQUEST
  });
}

export const fetchShopDataWithId = (payload) => {
  return dispatch => dispatch({
    type: ShopConstants.GET_SHOP_REQUEST,
    payload
  });
}

