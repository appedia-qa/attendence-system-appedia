/* eslint-disable no-constant-condition */

import { put, call, takeEvery,takeLatest, select, delay } from "redux-saga/effects";
import * as wishlistConstants from "../actionTypes/wishlist.type";
import { useSelector } from "react-redux";
import productConstants from "../actionTypes/product.types";
import { getUser } from "../reducers/authentication.reducer";
import * as cartConstants from "../actionTypes/cart.types";
import alertConstants from "../actionTypes/alert.types";
import { selectWishlist } from "../reducers/wishList";
import {
  makeGetRequest,
  isNetworkConnected,
  makePostRequest,
} from "../../utils/requestUtils";
import { apiUrl } from "../../constants/urls";
import { getCartItems } from "../reducers/cart.reducer";
import authenticationTypes from "../actionTypes/authentication.types";

const Normlilize = (item) => {
  return {
    ...item,
    name: item && item.name ? item.name : "Zamioculcas Zamiifolia - Small",
    price: item && item.price ? item.price : "50",
  };
};

function* addwishListItem(action) {
  try {
    const user = yield select(getUser);
    if (!(user && user.id)) {
      yield put({
        type: alertConstants.INFO,
        message: "Please login first",
      });
      return;
    }

    if (user && user.id) {
      const apiUrlNew = apiUrl + "/wishlist/store";
      const status = yield call(makePostRequest, apiUrlNew, {
        user_id: user.id,
        product_id: action.payload.id,
      });
      if (
        status.status === 200 ||
        status.status === 201 ||
        status.status === 204
      ) {
        yield put({
          type: wishlistConstants.ADD_WISH_LIST_ITEM,
          payload: action.payload,
        });
        yield put({
          type: alertConstants.INFO,
          message: "Item added in your wish list",
        });
        return;
      }

      yield put({
        type: alertConstants.ERROR,
        payload: { message: "Network error: Error adding item to wishlist" },
      });
    }
  } catch (error) {
    yield put({
      type: alertConstants.ERROR,
      payload: { message: "Network error: Error adding item to wishlist" },
    });
  }
}
function* updateWishList() {
  const cartList = yield select(getCartItems);
  let wishList = yield select(selectWishlist);

  Object.keys(wishList).map((key) => {
    wishList = wishList.map((p) => {
      if (cartList.some((c) => c.id === p.id)) {
        p.addedToCart = true;
      } else {
        p.addedToCart = false;
      }

      if (wishList.some((w) => w.id === p.id)) {
        p.addedToWishlist = true;
      } else {
        p.addedToWishlist = false;
      }

      return p;
    });
  });
  yield put({
    type: wishlistConstants.SAVE_WISH_LIST_ITEMS,
    payload: wishList,
  });
}
function* DeleteWishListItem(action) {
  try {
    const user = yield select(getUser);
    if (!(user && user.id)) {
      yield put({
        type: alertConstants.INFO,
        message: "Please login first",
      });
      return;
    }

    if (user && user.id) {
      const apiUrlNew = apiUrl + "/wishlist/delete";
      const status = yield call(makePostRequest, apiUrlNew, {
        user_id: user.id,
        product_id: action.payload.id,
      });

      if (
        status.status === 200 ||
        status.status === 201 ||
        status.status === 204
      ) {
        yield put({
          type: wishlistConstants.DELETE_WISH_LIST_ITEM,
          id: action.payload.id,
        });
        yield put({
          type: alertConstants.INFO,
          message: "Item removed from your wish list",
        });
        return;
      }

      yield put({
        type: alertConstants.ERROR,
        payload: { message: "Network error: Error deleting item to wishlist" },
      });
    }
  } catch (error) {
    yield put({
      type: alertConstants.ERROR,
      payload: { message: "Network error: Error deleting item to wishlist" },
    });
  }
}

function* loadWishlistData(payload) {
  try {
    yield delay(2000);
    const user = yield select(getUser);

    if (!(user && user.id)) {
      return;
    }

    const url = apiUrl + "/wishlist";
    const requestResponce = yield call(makePostRequest, url, {
      user_id: user.id,
    });
    
    const { status } = requestResponce;
    payload = requestResponce.data.data.wishlists;
    
    if (status === 200 || status === 201 || status === 204) {
      payload = payload.map((item) => {
        return Normlilize(item);
      });
      yield put({ type: wishlistConstants.SAVE_WISH_LIST_ITEMS, payload });
      yield put({ type: productConstants.UPDATE_PRODUCTS_ATER_LOGIN});
      return;
    } else {
      yield put({
        type: alertConstants.ERROR,
        payload: { message: "Network error: Error deleting item to wishlist" },
      });

      return;
    }
  } catch (e) {yield put({
    type: alertConstants.ERROR,
    payload: { message: "Network error: Error deleting item to wishlist" },
  });}
}

export default function* wishListSaga() {
  yield takeLatest(
    [
      productConstants.UPDATE_PRODUCTS_ATER_LOGIN,
      productConstants.ADD_PRODUCTS_TO_REDUCER,
      wishlistConstants.EMPTY_WISH_LIST_DISPATCH,
      cartConstants.ADD_ITEM,
      cartConstants.DELETE_ITEM,
    ],
    updateWishList
  );
  yield takeEvery(
    wishlistConstants.ADD_WISH_LIST_ITEM_INITIATE,
    addwishListItem
  );
  yield takeEvery(
    wishlistConstants.DELETE_WISH_LIST_ITEM_INITIATE,
    DeleteWishListItem
  );
  yield takeEvery(
    ["persist/REHYDRATE", authenticationTypes.LOGIN_SUCCESS],
    loadWishlistData
  );
}
