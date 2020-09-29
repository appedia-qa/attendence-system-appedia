import {
  FETCH_CURRENT_USER_DATA,
  SAVE_CURRENT_USER_DATA,
  SAVE_USER_SIGNUP_DATA_SUCCESS,
  SAVE_USER_SIGNUP_DATA_ERROR,
} from '../actionTypes/index';

const initialState = {
  data: null,
  error: false,
  loading: false,
}

export default function overview(state = initialState, action) {
  switch (action.type) {
    case FETCH_CURRENT_USER_DATA:
      return {
        ...state,
        loading: true,
        error: false,
      }

    case SAVE_CURRENT_USER_DATA:
      return {
        ...state,
        data: action ? ( action.payload ? action.payload : null) : null, //TODO: use normalize function
        loading: false,
        error: false,
      }

    case SAVE_USER_SIGNUP_DATA_SUCCESS: 
      return {
        ...state,
        data: action ? ( action.data ? action.data : null) : null, //TODO: use normalize function
        loading: false,
        error: false,
      }

    case SAVE_USER_SIGNUP_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      }


    default:
      return state;
  }
}
