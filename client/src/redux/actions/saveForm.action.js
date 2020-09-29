import SaveFormData from "../actionTypes/saveForm.types";

export const saveFormData = (payload) => {
  return (dispatch) =>
    dispatch({
      type: SaveFormData.SAVE_DATA_TO_STATE,
      payload: payload,
    });
};
export const deleteFromData = (payload) => {
  return (dispatch) =>
    dispatch({
      type: SaveFormData.EMPTY_DATA_FROM_STATE,
    });
};
