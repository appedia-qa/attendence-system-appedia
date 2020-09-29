import AuthenticationConstants from '../actionTypes/authentication.types';

export const loginRequest = (payload) => {
  return dispatch => dispatch({
    type: AuthenticationConstants.LOGIN_REQUEST,
    payload
  });
}

export const logoutRequest = (payload) => {
  return dispatch => dispatch({
    type: AuthenticationConstants.LOGOUT,
    payload
  });
}

export const updateRequest = (payload) => {
  return dispatch => dispatch({
    type: AuthenticationConstants.UPDATE_USER_INITIVE,
    payload
  });
}

