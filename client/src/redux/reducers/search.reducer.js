import searchConstants from "../actionTypes/search.types";

const initialState = {
  error: false,
  loading: false,
  searchs: []
};

export function search(state = initialState, action) {
  switch (action.type) {
    case searchConstants.GET_SEARCH_REQUEST:
      return {
        ...state,
        error: false,
        loading: false
      };
    case searchConstants.GET_SEARCH_SUCCESS:
      return {
        ...state,
        loading: true,
        error: false,
        searchs: action.payload.map(search => {
          if (search.id === action.payload.id) {
            return action.payload;
          }
        })
      };
    case searchConstants.GETALL_SEARCHS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };

    default:
      return state;
  }
}
