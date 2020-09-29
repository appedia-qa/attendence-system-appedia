import productDialogConstants from "../actionTypes/productDialog.types";

const initialState = {
  isDialogOpen: false,
  product: null,
  loading: false,
  error: false,
};

export function productDialog(state = initialState, action) {
  switch (action.type) {
    case productDialogConstants.ADD_PRODUCTS_IN_PRODUCT_DIALOG_INPROGRESS:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case productDialogConstants.ADD_PRODUCTS_IN_PRODUCT_DIALOG_SUCCESS:
      return {
        ...state,
        product: action.payload,
        loading: false,
        error: null,
      };
    case productDialogConstants.ADD_PRODUCTS_IN_PRODUCT_DIALOG_ERROR:
      return {
        ...state,
        product: null,
        loading: false,
        error: true,
      };
    case productDialogConstants.OPEN_PRODUCT_DIALOG:
      return {
        ...state,
        isDialogOpen: true,
      };
    case productDialogConstants.CLOSE_PRODUCT_DIALOG:
      return {
        ...state,
        isDialogOpen: false,
      };
    case productDialogConstants.SET_CART_FLAG:
      return {
        ...state,
        product: {
          ...state.product,
          addedToCart: action.flag,
          qty: action.qty,
        },
      };
    case productDialogConstants.SET_WISHLIST_FLAG:
      return {
        ...state,
        product: { ...state.product, addedToWishlist: action.flag },
      };
    default:
      return state;
  }
}

export default productDialog;
