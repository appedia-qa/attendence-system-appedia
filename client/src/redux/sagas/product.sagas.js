/* eslint-disable no-constant-condition */

import { put, call, takeEvery, select, takeLatest } from "redux-saga/effects";
import productConstants from "../actionTypes/product.types";
import * as cartConstants from "../actionTypes/cart.types";
import * as wishlistConstants from "../actionTypes/wishlist.type";
import authenticationTypes from "../actionTypes/authentication.types";
import { makeGetRequest, isNetworkConnected } from "../../utils/requestUtils";
import { apiUrl } from "../../constants/urls";
import { selectProductList } from "../reducers/product.reducer";
import { selectWishlist } from "../reducers/wishList";
import { getCartItems } from "../reducers/cart.reducer";

export function* getAllProductsRequest() {
  try {
    const url = apiUrl + `/products`;

    yield put({ type: productConstants.GETALL_PRODUCTS_INPROGRESS });
    const requestResponce = yield call(makeGetRequest, url);

    if (
      requestResponce &&
      requestResponce.status &&
      (requestResponce.status === 200 || requestResponce.status === 201)
    ) {
      const payload = {
        data: requestResponce.data,
      };
      yield put({ type: productConstants.GETALL_PRODUCTS_SUCCESS, payload });
      return;
    }

    // Handle error cases
  } catch (error) {
    yield put({ type: productConstants.GETALL_PRODUCTS_FAILURE, error });
  }
}

export function* getProductRequest(payload) {
  try {
    const url = apiUrl + `/product/${payload.id}`;

    yield put({ type: productConstants.GET_PRODUCT_INPROGRESS });

    const status = yield call(isNetworkConnected);

    if (status) {
      const requestResponce = yield call(makeGetRequest, url);

      if (
        requestResponce &&
        requestResponce.status &&
        requestResponce.status === 200
      ) {
        const payload = {
          data: requestResponce.data,
        };
        yield put({ type: productConstants.GET_PRODUCT_SUCCESS, payload });
        return;
      }

      // Handle error cases
    }
  } catch (error) {
    yield put({ type: productConstants.GET_PRODUCT_FAILURE, error });
  }
}

function* updateProductOnAddToCart(action) {
  const productList = yield select(selectProductList);

  Object.keys(productList).map((key) => {
    productList[key] = productList[key].map((p) => {
      if (action.payload.id === p.id) {
        p.addedToCart = true;
      }
      return p;
    });
  });

  yield put({ type: productConstants.UPDATE_PRODUCTS, payload: productList });
}

function* deleteProductOnRemoveFromCart(action) {
  const productList = yield select(selectProductList);

  Object.keys(productList).map((key) => {
    productList[key] = productList[key].map((p) => {
      if (action.id === p.id) {
        p.addedToCart = false;
      }
      return p;
    });
  });

  yield put({ type: productConstants.UPDATE_PRODUCTS, payload: productList });
}

function* updateProductOnAddToWishlist(action) {
  const productList = yield select(selectProductList);
  Object.keys(productList).map((key) => {
    productList[key] = productList[key].map((p) => {
      if (action.payload.id === p.id) {
        p.addedToWishlist = true;
      }
      return p;
    });
  });

  yield put({ type: productConstants.UPDATE_PRODUCTS, payload: productList });
}

function* deleteProductOnRemoveFromWishlist(action) {
  const productList = yield select(selectProductList);

  Object.keys(productList).map((key) => {
    productList[key] = productList[key].map((p) => {
      if (action.id === p.id) {
        p.addedToWishlist = false;
      }
      return p;
    });
  });

  yield put({ type: productConstants.UPDATE_PRODUCTS, payload: productList });
}

function* updateProducts() {
  const cartList = yield select(getCartItems);
  const wishList = yield select(selectWishlist);

  const productList = yield select(selectProductList);

  Object.keys(productList).map((key) => {
    productList[key] = productList[key].map((p) => {
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

  yield put({ type: productConstants.UPDATE_PRODUCTS, payload: productList });
}

export default function* productSaga() {
  // yield takeEvery(productConstants.GETALL_PRODUCTS_REQUEST, getAllProductsRequest);
  // yield takeEvery(productConstants.GET_PRODUCT_REQUEST, getProductRequest);
  yield takeEvery(cartConstants.ADD_ITEM, updateProductOnAddToCart);
  yield takeEvery(cartConstants.DELETE_ITEM, deleteProductOnRemoveFromCart);
  yield takeEvery(
    wishlistConstants.ADD_WISH_LIST_ITEM,
    updateProductOnAddToWishlist
  );
  yield takeEvery(
    wishlistConstants.DELETE_WISH_LIST_ITEM,
    deleteProductOnRemoveFromWishlist
  );

  yield takeLatest(
    [
      productConstants.UPDATE_PRODUCTS_ATER_LOGIN,
      productConstants.ADD_PRODUCTS_TO_REDUCER,
      wishlistConstants.EMPTY_WISH_LIST_DISPATCH,
      authenticationTypes.LOGIN_SUCCESS,
      authenticationTypes.LOGOUT,
    ],
    updateProducts
  );
}
