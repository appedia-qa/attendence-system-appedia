import {
  ADD_WISH_LIST_ITEM,
  DELETE_WISH_LIST_ITEM,
  SAVE_WISH_LIST_ITEMS,
  EMPTY_WISH_LIST_DISPATCH,
} from "../actionTypes/wishlist.type";

const initialState = {
  wishListItems: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "INITIATE_WISHLIST":
      return initialState;

    case "ADD_DATA_IN_WISHLIST":
      return {
        ...state,
        wishListItems: action.payload,
      };
    case SAVE_WISH_LIST_ITEMS:
      return {
        ...state,
        wishListItems: action.payload,
      };
    case EMPTY_WISH_LIST_DISPATCH:
      return {
        ...state,
        wishListItems: [],
      };
    case ADD_WISH_LIST_ITEM:
      const isAlreadyAdded = state.wishListItems.find(
        (product) => product.id === action.payload.id
      );

      if (!isAlreadyAdded) {
        return {
          ...state,
          wishListItems: [action.payload, ...state.wishListItems],
        };
      }
      return state;

    case DELETE_WISH_LIST_ITEM:
      return {
        ...state,
        wishListItems: state.wishListItems.filter(
          (item) => item.id !== action.id
        ),
      };

    default:
      return state;
  }
};

export const selectWishlist = (state) => state.wishList.wishListItems;
