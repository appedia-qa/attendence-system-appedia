/* eslint-disable no-constant-condition */

import { put, call, takeEvery } from 'redux-saga/effects';
import registrationConstants from '../actionTypes/registration.types';

import { makePostRequest } from '../../utils/requestUtils';
import * as URL_CONSTANTS from '../../constants/urls';
import { USER_AUTH_KEY } from '../constants';

export function* signup(action) {
  try {

    const url = URL_CONSTANTS.apiUrl + URL_CONSTANTS.signup;
    yield put({ type: registrationConstants.REGISTER_INPROGRESS });

    let { 
      name,
      email, 
      password
    } = action.payload;

    if (!email) { throw new Error('Empty email found in params') }
    if (!password) { throw new Error('Empty password found in params') }
    if (!name) { name = "User" }

    const requestResponce = yield call(makePostRequest, url,  { email, password, name, password_confirmation: password });

    const { status } = requestResponce;

    if (status === 200 || status === 201) {
      const payload = {
        data: requestResponce.data,
      }
      localStorage.setItem(USER_AUTH_KEY, JSON.stringify(requestResponce.data.success.token));
      yield put({ type: registrationConstants.REGISTER_SUCCESS, payload });      
      return;
    } else {
      yield put({ type: registrationConstants.REGISTER_FAILURE,  error: requestResponce.data.error });
      return;
    }


  } catch (error) {
    yield put({ type: registrationConstants.REGISTER_FAILURE, error });
  }
}

export default function* authenticationSaga() {
  yield takeEvery(registrationConstants.REGISTER_REQUEST, signup);
}
