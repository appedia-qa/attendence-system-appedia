import RegistrationConstants from '../actionTypes/registration.types';

export const signupRequest = (payload) => {
  return dispatch => dispatch({
    type: RegistrationConstants.REGISTER_REQUEST,
    payload
  });
}


