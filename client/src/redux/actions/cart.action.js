import {
  FLIP_CART,
  DELETE_ITEM_INITIATE,
  UPDATE_PRICE,
  DECREMENT_QTY,
  EMPTY_CART,
  INCREMENT_QTY,
  ADD_ITEM_INITIATE,
  LOAD_DATA
} from '../actionTypes/cart.types';

export const flipCart = () => {
  return { type: FLIP_CART };
};

//TODO: remove this
export const initializeCart = () => dispatch => {
  dispatch({ type: 'INITIALIZE_CART' })
  dispatch({ type: 'INITIATE_WISHLIST' })
}

export const addItemIntoCart = product => dispatch => {
  dispatch({
    type: ADD_ITEM_INITIATE,
    payload: product
  });
};

export const deleteItemFromCart = payload => dispatch => {
  dispatch({
    type: DELETE_ITEM_INITIATE,
    payload
  });
  // dispatch(updatePricesOfCart());
};

export const updatePricesOfCart = () => {
  return {
    type: UPDATE_PRICE
  };
};

export const incrementItemInCart = product => dispatch => {
  dispatch({
    type: INCREMENT_QTY,
    payload: product
  });
  // dispatch(updatePricesOfCart());
};
export const cartData = user_id => dispatch => {
  dispatch({
    type: LOAD_DATA,
    payload:user_id
  });
  // dispatch(updatePricesOfCart());
};
export const decrementItemInCart = product => dispatch => {
  dispatch({
    type: DECREMENT_QTY,
    payload: product
  });
  // dispatch(updatePricesOfCart());
};



export const emptyCartRequest = product => dispatch => {
  dispatch({
    type: EMPTY_CART,
  });
  // dispatch(updatePricesOfCart());
};