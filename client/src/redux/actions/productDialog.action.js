import ProductDialogConstants from "../actionTypes/productDialog.types";

export const openProductDialog = (id) => {
  return (dispatch) =>
    dispatch({
      type: ProductDialogConstants.OPEN_PRODUCT_DIALOG_INITIATE,
      id,
    });
};

export const closeProductDialog = () => {
  return (dispatch) =>
    dispatch({
      type: ProductDialogConstants.CLOSE_PRODUCT_DIALOG,
    });
};

export const addProductToProductDialog = (payload) => {
  return (dispatch) =>
    dispatch({
      type: ProductDialogConstants.ADD_PRODUCTS_IN_PRODUCT_DIALOG_INITIATE,
      payload,
    });
};
