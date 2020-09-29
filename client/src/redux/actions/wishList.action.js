import {
  ADD_WISH_LIST_ITEM_INITIATE,
  DELETE_WISH_LIST_ITEM_INITIATE,
  EMPTY_WISH_LIST_DISPATCH,
} from "../actionTypes/wishlist.type";

export const addItemIntoWishList = (product) => (dispatch) => {
  dispatch({
    type: ADD_WISH_LIST_ITEM_INITIATE,
    payload: product,
  });
};

export const deleteItemFromWishList = (id) => (dispatch) => {
  dispatch({
    type: DELETE_WISH_LIST_ITEM_INITIATE,
    payload: { id },
  });
};

export const emptyWishListRequest = () => (dispatch) => {
  dispatch({
    type: EMPTY_WISH_LIST_DISPATCH,
  });
};
