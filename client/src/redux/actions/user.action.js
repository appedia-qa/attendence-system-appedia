import UserConstants from '../actionTypes/user.types';

export const fetchAllUsersData = () => {
  return dispatch => dispatch({
    type: UserConstants.GETALL_USERS_REQUEST
  });
}

export const fetchUserDataWithId = (payload) => {
  return dispatch => dispatch({
    type: UserConstants.GET_USER_REQUEST,
    payload
  });
}
