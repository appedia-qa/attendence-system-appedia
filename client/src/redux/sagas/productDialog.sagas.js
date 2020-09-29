/* eslint-disable no-constant-condition */

import { put, call, takeEvery, select, takeLatest } from "redux-saga/effects";
import * as cartConstants from "../actionTypes/cart.types";
import alertConstants from "../actionTypes/alert.types";
import productDialogConstants from "../actionTypes/productDialog.types";
import * as wishlistConstants from "../actionTypes/wishlist.type";

import { makeGetRequest } from "../../utils/requestUtils";
import { apiUrl } from "../../constants/urls";
import { selectWishlist } from "../reducers/wishList";
import { getCartItems } from "../reducers/cart.reducer";

function* handleOpenProductDialog(action) {
  try {
    yield put({ type: productDialogConstants.OPEN_PRODUCT_DIALOG });
    yield put({
      type: productDialogConstants.ADD_PRODUCTS_IN_PRODUCT_DIALOG_INPROGRESS,
    });

    const url = apiUrl + `/products/${action.id}`;
    const responce = yield call(makeGetRequest, url);

    if (
      responce &&
      responce.status === 200 &&
      responce.data &&
      responce.data.product &&
      responce.data.product.id
    ) {
      const cartItems = yield select(getCartItems);
      const wishListItems = yield select(selectWishlist);
      const addedToCart = cartItems.some(
        (c) => c.id === responce.data.product.id
      );
      const addedToWishlist = wishListItems.some(
        (w) => w.id === responce.data.product.id
      );
      responce.data.product.outOfStock =
        responce.data.product.quantity < 1 ? true : false;
      let qty = 1;
      if (addedToCart) {
        const cartItem = cartItems.find(
          (c) => c.id === responce.data.product.id
        );
        qty = cartItem.qty;
      }

      yield put({
        type: productDialogConstants.ADD_PRODUCTS_IN_PRODUCT_DIALOG_SUCCESS,
        payload: {
          ...responce.data.product,
          addedToCart,
          addedToWishlist,
          qty,
        },
      });
    } else {
      yield put({
        type: productDialogConstants.ADD_PRODUCTS_IN_PRODUCT_DIALOG_ERROR,
        error: "Network Error: Product loading failed",
      });
      yield put({
        type: alertConstants.ERROR,
        message: "Network Error: Product loading failed",
      });
    }
  } catch (e) {
    yield put({
      type: productDialogConstants.ADD_PRODUCTS_IN_PRODUCT_DIALOG_ERROR,
      error: e.message,
    });
    yield put({ type: alertConstants.ERROR, message: e.message });
  }
}

function* updateProductOnAddToCart(action) {
  const { product } = yield select((state) => state.productDialog);
  if (!product) return;
  const cartItems = yield select(getCartItems);
    let qty = 1;
    const cartItem = cartItems.find((c) => c.id === action.payload.id);
    qty = cartItem.qty;
  

  if (action.payload.id === product.id) {
    yield put({
      type: productDialogConstants.SET_CART_FLAG,
      flag: true,
      qty: qty,
    });
  }
}

function* deleteProductOnRemoveFromCart(action) {
  const { product } = yield select((state) => state.productDialog);
  if (!product) return;

  if (action.id === product.id) {
    yield put({ type: productDialogConstants.SET_CART_FLAG, flag: false });
  }
}

function* updateProductOnAddToWishlist(action) {
  const { product } = yield select((state) => state.productDialog);
  if (!product) return;

  if (action.payload.id === product.id) {
    yield put({ type: productDialogConstants.SET_WISHLIST_FLAG, flag: true });
  }
}

function* deleteProductOnRemoveFromWishlist(action) {
  const { product } = yield select((state) => state.productDialog);
  if (!product) return;

  if (action.id === product.id) {
    yield put({ type: productDialogConstants.SET_WISHLIST_FLAG, flag: false });
  }
}

export default function* productDialogSaga() {
  yield takeLatest(
    productDialogConstants.OPEN_PRODUCT_DIALOG_INITIATE,
    handleOpenProductDialog
  );
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
}
