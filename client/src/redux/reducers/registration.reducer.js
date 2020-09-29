import userConstants from '../actionTypes/user.types';
import { parseErrorMessageFromAction } from '../reducerHelpers/error';

const initialState = {
  registering: false,
  registered: false,
  error: null
}

export function registration(state = initialState, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { ...state, registering: true };
    case userConstants.REGISTER_SUCCESS:
      return {
        registering: false,
        registered: true,
        error: null
      };
    case userConstants.REGISTER_FAILURE:
      return {
        registering: false,
        error: parseErrorMessageFromAction(action)
      };
    default:
      return state
  }
}