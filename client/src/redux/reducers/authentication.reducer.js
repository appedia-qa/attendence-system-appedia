import authenticationConstants from "../actionTypes/authentication.types";
import { USER_AUTH_KEY, USER_PROFILE_ITEM } from "../constants";
import { parseErrorMessageFromAction } from "../reducerHelpers/error";

let initialState = {
  user: null,
  loggedIn: false,
  loading: false,
  error: null,
  updateError: null,
};

// const user = JSON.parse(localStorage.getItem(USER_PROFILE_ITEM));
// if (user) {
//   console.log('i am in',user)
//   initialState = {
//     ...initialState,
//     user,
//   };
// }

export function authentication(state = initialState, action) {
  switch (action.type) {
    case authenticationConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case authenticationConstants.LOGIN_SUCCESS:
      // TODO: fix this, store token instead of user
      // storeAuthToken(action);
      storeAuthToken(action);
      return {
        ...state,
        loggedIn: true,
        loading: false,
        user: action.payload.data.user,
      };
    case authenticationConstants.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: parseErrorMessageFromAction(action),
      };
    case authenticationConstants.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: parseErrorMessageFromAction(action),
      };
    case authenticationConstants.UPDATE_USER:
      return {
        ...state,
        user: action.payload.data.user,
      };
    case authenticationConstants.UPDATE_FAILURE:
      return {
        ...state,
        updateError: parseErrorMessageFromAction(action),
      };

    case authenticationConstants.LOGOUT:
      deleteUser();
      return {
        ...state,
        loggedIn: false,
        loading: false,
        error: null,
        user: null,
      };
    default:
      return state;
  }
}

const storeAuthToken = (action) => {
  try {
    const token = action.payload.data.access_token;
    localStorage.setItem(USER_AUTH_KEY, JSON.stringify(token));
  } catch (e) {
    // write method to add this to popup reducer
  }
};

const deleteUser = (action) => {
  try {
    localStorage.removeItem(USER_AUTH_KEY);
  } catch (e) {
    // write method to add this to popup reducer
  }
};

// todo: remove this
// const storeUser = (action) => {
//   try {
//     const user = action.payload.data.user;
//     localStorage.setItem(USER_PROFILE_ITEM, JSON.stringify(user));
//     console.log(localStorage.getItem(USER_PROFILE_ITEM));
//   } catch (e) {
//     // write method to add this to popup reducer
//   }
// };
export const getUser = (state) => state.authentication.user;
