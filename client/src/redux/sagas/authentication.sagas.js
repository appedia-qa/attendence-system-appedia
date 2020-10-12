/* eslint-disable no-constant-condition */

import { put, call, takeEvery, select } from "redux-saga/effects";
import authenticationConstants from "../actionTypes/authentication.types";
import { getUser } from "../reducers/authentication.reducer";

import {
  makeGetRequest,
  isNetworkConnected,
  makePutRequest,
  makePostRequest,
} from "../../utils/requestUtils";
import * as URL_CONSTANTS from "../../constants/urls";

export function* login(action) {
  try {
    const url = URL_CONSTANTS.baseUrl + URL_CONSTANTS.authEndpoint;

    yield put({ type: authenticationConstants.LOGIN_INPROGRESS });
    const { password } = action.payload;
    const username = action.payload.email;

    if (!username) {
      throw new Error("Empty email found in params");
    }
    if (!password) {
      throw new Error("Empty password found in params");
    }

    const requestResponce = yield call(makePostRequest, url, {
      username,
      password,
    });

    const { status } = requestResponce;
    if (status === 200 || status === 201) {
      const payload = {
        data: requestResponce.data,
      };
      yield put({ type: authenticationConstants.LOGIN_SUCCESS, payload });
      return;
    } else {
      yield put({
        type: authenticationConstants.LOGIN_FAILURE,
        error: requestResponce.data.error,
      });
      return;
    }
  } catch (error) {
    yield put({ type: authenticationConstants.LOGIN_FAILURE, error });
  }
}

export function* getUserFromId(action) {
  const user = yield select(getUser);
  try {
    const url = URL_CONSTANTS.apiUrl + `/users/${user.id}`;
    const requestResponce = yield call(makeGetRequest, url);
    const payload = {
      data: requestResponce.data,
    };

    const { status } = requestResponce;
    if (status === 200 || status === 201) {
      yield put({ type: authenticationConstants.UPDATE_USER, payload });
    }
  } catch (error) {}
}

export function* updateUserFromId(action) {
  const user = yield select(getUser);
  try {
    const url = URL_CONSTANTS.apiUrl + `/users/${user.id}`;
    let obj = {};

    if (action.payload.cardNumber) {
      obj = {
        card_number: action.payload.cardNumber,
        cvv_code: action.payload.cvc,
        expiry_date: action.payload.date,
        name_on_card: action.payload.cardHolderName,
      };
    } else {
      obj = {
        name: action.payload.name,
        contact_number: action.payload.number,
      };
    }

    const requestResponce = yield call(makePutRequest, url, obj);
    const payload = {
      data: requestResponce.data,
    };
    const { status } = requestResponce;
    if (status === 200 || status === 201) {
      yield put({ type: authenticationConstants.UPDATE_USER, payload });
    } else {
      yield put({
        type: authenticationConstants.UPDATE_FAILURE,
        error: "FAILED TO UPDATE",
      });
    }
  } catch (error) {}
}

export default function* authenticationSaga() {
  yield takeEvery(authenticationConstants.LOGIN_REQUEST, login);
}
