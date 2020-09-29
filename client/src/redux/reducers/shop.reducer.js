import shopConstants from "../actionTypes/shop.types";

const initialState = {
  error: false,
  loading: false,
  shops: []
};

export function shop(state = initialState, action) {
  switch (action.type) {
    case shopConstants.GETALL_SHOPS_REQUEST:
      return {
        ...state,
        error: false,
        loading: false
      };
    case shopConstants.GETALL_SHOPS_SUCCESS:
      return {
        ...state,
        loading: true,
        error: false,
        shops: (action && action.payload && action.payload) ? action.payload: []
      };
    case shopConstants.GETALL_SHOPS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    case shopConstants.GET_SHOP_REQUEST:
      return {
        ...state,
        error: false,
        loading: false
      };
    case shopConstants.GET_SHOP_SUCCESS:
      return {
        ...state,
        loading: true,
        error: false,
        shops: action.payload.map(shop => {
          if (shop.id === action.payload.id) {
            return action.payload;
          }
        })
      };
    case shopConstants.GETALL_SHOPS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };

    default:
      return state;
  }
}
