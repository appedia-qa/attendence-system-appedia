import formTypes from "../actionTypes/saveForm.types";

const initialState = {};

export default function FormData(state = initialState, action) {
  switch (action.type) {
    case formTypes.SAVE_DATA_TO_STATE:
      return {
        ...state,
        [action.payload.payload.filedName]: action.payload.payload.value,
      };
    case formTypes.EMPTY_DATA_FROM_STATE:
      return {};

    default:
      return state;
  }
}
