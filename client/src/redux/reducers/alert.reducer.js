import alertConstants from '../actionTypes/alert.types';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: alertConstants.SUCCESS,
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: alertConstants.ERROR,
        message: action.message
      };
    case alertConstants.INFO:
      return {
        type: alertConstants.INFO,
        message: action.message
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}