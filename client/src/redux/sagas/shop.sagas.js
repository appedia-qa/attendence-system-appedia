/* eslint-disable no-constant-condition */

import { put, call, takeEvery } from 'redux-saga/effects';
import shopConstants from '../actionTypes/shop.types';

import { makeGetRequest, isNetworkConnected } from '../../utils/requestUtils';
import { apiUrl } from '../../constants/urls';

export function* getAllShopsRequest() {
  try {

    const url = apiUrl + `/shops`;

    yield put({ type: shopConstants.GETALL_SHOPS_INPROGRESS });

    const status = yield call(isNetworkConnected);

    if (status) {
      const requestResponce = yield call(makeGetRequest, url);

      if (requestResponce && requestResponce.status && requestResponce.status === 200) {
        const payload = {
          data: requestResponce.data,
        }
        yield put({ type: shopConstants.GETALL_SHOPS_SUCCESS, payload });
        return;
      }

      // Handle error cases
    }
  } catch (error) {
    yield put({ type: shopConstants.GETALL_SHOPS_FAILURE, error });
  }
}

export function* getShopRequest(payload) {
  try {

    const url = apiUrl + `/shop/${payload.id}`;

    yield put({ type: shopConstants.GET_SHOP_INPROGRESS });

    const status = yield call(isNetworkConnected);

    if (status) {
      const requestResponce = yield call(makeGetRequest, url);

      if (requestResponce && requestResponce.status && requestResponce.status === 200) {
        const payload = {
          data: requestResponce.data,
        }
        yield put({ type: shopConstants.GET_SHOP_SUCCESS, payload });
        return;
      }

      // Handle error cases
    }
  } catch (error) {
    yield put({ type: shopConstants.GET_SHOP_FAILURE, error });
  }
}

export default function* shopSaga() {
  yield takeEvery(shopConstants.GETALL_SHOPS_REQUEST, getAllShopsRequest);
  yield takeEvery(shopConstants.GET_SHOP_REQUEST, getShopRequest);
}
