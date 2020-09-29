import {
  FLIP_CART,
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_PRICE,
  DECREMENT_QTY,
  INCREMENT_QTY,
  SAVE_DATA,
  EMPTY_CART,
} from "../actionTypes/cart.types";

const initialState = {
  isOpen: false,
  cartItems: [],
  totalPrice: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "INITIALIZE_CART":
      return initialState;
    case FLIP_CART:
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    case ADD_ITEM:
      const isAlreadyAdded = state.cartItems.find(
        (product) => product.id === action.payload.id
      );
      if (!isAlreadyAdded) {
        action.payload.qty = action.payload.qty ? action.payload.qty : 1;
        return {
          ...state,
          cartItems: [
            { ...action.payload, addedToCart: true },
            ...state.cartItems,
          ],
        };
      }
      return state;

    case DELETE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.id),
      };
    case SAVE_DATA:
      return {
        ...state,
        id: action.payload.id,
        cartItems: action.payload.cart_items,
      };
    case INCREMENT_QTY:
      return {
        ...state,
        cartItems: state.cartItems.map((x) =>
          x.id === action.payload.id ? { ...x, qty: ++x.qty } : x
        ),
      };
    case DECREMENT_QTY:
      return {
        ...state,
        cartItems: state.cartItems.map((x) => {
          if (x.id === action.payload.id && x.qty > 1) {
            return { ...x, qty: --x.qty };
          }
          return x;
        }),
      };
    case EMPTY_CART:
      return {
        ...state,
        cartItems: [],
        totalPrice: 0,
      };
    case UPDATE_PRICE:
      return {
        ...state,
        totalPrice: state.cartItems
          .reduce((acc, val) => acc + val.qty * val.price, 0)
          .toFixed(2),
      };
    default:
      return state;
  }
};

export const getCartItems = (state) => state.cart.cartItems;
export const getCartId = (state) => state.cart.id;
