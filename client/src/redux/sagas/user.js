// /* eslint-disable no-constant-condition */

// import { put, call, takeEvery } from 'redux-saga/effects';
// import { SAVE_USER_SIGNUP_DATA_REQUEST, SAVE_USER_SIGNUP_DATA_INPROGRESS, SAVE_USER_SIGNUP_DATA_SUCCESS, SAVE_USER_SIGNUP_DATA_ERROR } from '../actionTypes/index';

// import { makeGetRequest, isNetworkConnected, makePostRequest } from '../../utils/requestUtils';
// import { getOverviewDataEndpoint } from '../../constants/urls';
// export function* saveUserSignupData(payload) {
//   try {

//     const { data } = payload;

//     yield put({ type: SAVE_USER_SIGNUP_DATA_INPROGRESS });

//     const status = yield call(isNetworkConnected);

//     const urlBackend = '/signup';
//     if (status) {
//       const requestResponce = yield call(makePostRequest, urlBackend, { data });

//       if (requestResponce && requestResponce.status && requestResponce.status === 200) {
//         yield put({ type: SAVE_USER_SIGNUP_DATA_SUCCESS, data });
//         return;
//       } else {
//         yield put({ type: SAVE_USER_SIGNUP_DATA_ERROR, data });
//       }

//       // Handle error cases
//     }
//   } catch (error) {
//     yield put({ type: SAVE_USER_SIGNUP_DATA_ERROR, error });
//   }
// }


// export default function* overviewSaga() {
//   yield takeEvery(SAVE_USER_SIGNUP_DATA_REQUEST, saveUserSignupData);
// }
