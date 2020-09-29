/* eslint-disable no-constant-condition */

import { put, call, takeEvery, select, delay, all } from "redux-saga/effects";
import * as cartConstants from "../actionTypes/cart.types";
import alertConstants from "../actionTypes/alert.types";
import {
  makeGetRequest,
  isNetworkConnected,
  makePostRequest,
} from "../../utils/requestUtils";
import { apiUrl } from "../../constants/urls";
import { getCartItems, getCartId } from "../reducers/cart.reducer";
import { getUser } from "../reducers/authentication.reducer";
import authenticationTypes from "../actionTypes/authentication.types";

const Normlilize = (cart) => {
  return {
    ...cart,
    id: cart && cart.product_id ? cart.product_id : "",
    qty: cart && cart.quantity ? cart.quantity : 1,
    cover_img_arr:
      cart && cart.products && cart.products.cover_img_arr
        ? cart.products.cover_img_arr
        : "[]",
    cover_img:
      cart && cart.products && cart.products.cover_img
        ? cart.products.cover_img
        : "",
    name:
      cart && cart.products && cart.products.name
        ? cart.products.name
        : "dummyName",
    price:
      cart && cart.products && cart.products.price ? cart.products.price : "50",
    quantity:
      cart && cart.products && cart.products.quantity
        ? cart.products.quantity
        : "0",
    product_attributes: {
      size:
        cart && cart.product_attributes && cart.product_attributes.size
          ? cart.product_attributes.size
          : "Standard Size",
      color:
        cart && cart.product_attributes && cart.product_attributes.color
          ? cart.product_attributes.color
          : "Standard",
    },
  };
};

function* addItem(payload) {
  try {
    const user = yield select(getUser);
    const cartItems = yield select(getCartItems);
    const exists = cartItems.find((x) => x.id === payload.payload.id);
    if (exists) {
      yield put({
        type: alertConstants.INFO,
        message: "Item already exist in your cart",
      });
      return;
    }

    if (user && user.id) {
      const apiUrlNew = apiUrl + "/cart/store";
      const responce = yield call(makePostRequest, apiUrlNew, {
        user_id: user.id,
        product_id: payload.payload.id,
        // total: payload.payload.qty,
        quantity: payload.payload.qty,
      });

      if (
        responce.status === 200 ||
        responce.status === 201 ||
        responce.status === 204
      ) {
        yield put({ type: cartConstants.ADD_ITEM, payload: payload.payload });
        yield put({
          type: alertConstants.SUCCESS,
          message: "Item added Into Your Cart",
        });

        return;
      }

      yield put({
        type: alertConstants.ERROR,
        payload: { message: "Network error: Error adding item to cart" },
      });
    } else {
      yield put({ type: cartConstants.ADD_ITEM, payload: payload.payload });
      yield put({
        type: alertConstants.SUCCESS,
        message: "Item added Into Your Cart",
      });

      return;
    }
  } catch (error) {
    yield put({
      type: alertConstants.ERROR,
      message: "Network Error: Error adding item in your cart",
    });
  }
}

function* updatePrice() {
  try {
    yield put({ type: cartConstants.UPDATE_PRICE });
  } catch (e) {}
}

function* loadCartData() {
  try {
    yield delay(2000);
    const user = yield select(getUser);

    if (!(user && user.id)) {
      return;
    }

    const cartItems = yield select(getCartItems);
    const apiUrlNew = apiUrl + "/cart/store";
    let cartItemsCloud = [];
    const url = apiUrl + "/cart";
    const requestResponce = yield call(makePostRequest, url, {
      user_id: user.id,
    });
    const { status } = requestResponce;

    if (status === 200 || status === 201 || status === 204) {
      let payload = requestResponce.data.data.cart;
      if (payload && payload.cart_items && payload.cart_items.length > 0) {
        payload.cart_items = payload.cart_items.map((cart) => {
          return Normlilize(cart);
        });

        let NewEnterItems = "";
        if (cartItems && cartItems.length > 0) {
          var Items = payload.cart_items.concat(
            (NewEnterItems = cartItems.filter(
              (s) => !payload.cart_items.find((t) => t.id == s.id)
            ))
          );
          payload.cart_items = Items;

          yield put({ type: cartConstants.SAVE_DATA, payload });
          yield put({ type: cartConstants.UPDATE_PRICE });
          yield all(
            NewEnterItems.map((item) =>
              call(makePostRequest, apiUrlNew, {
                user_id: user.id,
                product_id: item.id,
                // total: item.qty,
                quantity: item.qty,
              })
            )
          );
          return;
        } else {
          yield put({ type: cartConstants.SAVE_DATA, payload });
          yield put({ type: cartConstants.UPDATE_PRICE });
          return;
        }
      } else {
        payload.cart_items = cartItems;
        cartItemsCloud = cartItems;
        yield put({ type: cartConstants.SAVE_DATA, payload });
        yield put({ type: cartConstants.UPDATE_PRICE });
        yield all(
          cartItemsCloud.map((item) =>
            call(makePostRequest, apiUrlNew, {
              user_id: user.id,
              product_id: item.id,
              // total: item.qty,
              quantity: item.qty,
            })
          )
        );
      }

      return;
    } else {
      yield put({
        type: cartConstants.ERROR,
        error: requestResponce.data.error,
      });

      return;
    }
  } catch (e) {}
}

function* deleteItem(action) {
  const user = yield select(getUser);
  if (user && user.id) {
    const cartId = yield select(getCartId);
    const apiUrlNew = apiUrl + "/cart/delete";
    try {
      const requestResponce = yield call(makePostRequest, apiUrlNew, {
        cart_id: cartId,
        product_id: action.payload.id,
      });
      const { status } = requestResponce;
      if (status === 200 || status === 201 || status === 204) {
        yield put({ type: cartConstants.DELETE_ITEM, id: action.payload.id });
        return;
      } else {
        yield put({
          type: alertConstants.ERROR,
          message: "Network Error: Adding item to cart sync failed",
        });
        return;
      }
    } catch (e) {
      yield put({
        type: cartConstants.ERROR,
        error: "Network Error: Adding item to cart sync failed",
      });
    }
  } else {
    yield put({ type: cartConstants.DELETE_ITEM, id: action.payload.id });
  }
}

function* updateItem(action) {
  try {
    const user = yield select(getUser);
    const cartItems = yield select(getCartItems);
    const cartId = yield select(getCartId);

    const exists = cartItems.find((x) => x.id === action.payload.id);
    if (!(user && user.id)) {
      return;
    }
    const apiNewUrl = apiUrl + "/cart/update";
    const requestResponce = yield call(makePostRequest, apiNewUrl, {
      user_id: user.id,
      cart_id: cartId,
      product_id: action.payload.id,
      quantity: exists.qty,
      // total: action.payload.qty,
      // price: action.payload.price,
    });
  } catch (e) {}
}

export default function* productSaga() {
  yield takeEvery(cartConstants.ADD_ITEM_INITIATE, addItem);
  yield takeEvery(
    ["persist/REHYDRATE", authenticationTypes.LOGIN_SUCCESS],
    loadCartData
  );
  yield takeEvery(cartConstants.DELETE_ITEM_INITIATE, deleteItem);
  yield takeEvery(
    [cartConstants.INCREMENT_QTY, cartConstants.DECREMENT_QTY],
    updateItem
  );
  yield takeEvery(
    [
      cartConstants.ADD_ITEM,
      cartConstants.DECREMENT_QTY,
      cartConstants.INCREMENT_QTY,
      cartConstants.DELETE_ITEM,
    ],
    updatePrice
  );
}
