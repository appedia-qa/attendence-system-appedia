import alertConstants from '../actionTypes/alert.types';

export const addSuccessItemInAlert = (payload) => {
  return dispatch => dispatch({
    type: alertConstants.SUCCESS,
    message: payload.message
  })
}

export const addErrorItemInAlert = (payload) => {
  return dispatch => dispatch({
    type: alertConstants.ERROR,
    message: payload.message
  })
}

