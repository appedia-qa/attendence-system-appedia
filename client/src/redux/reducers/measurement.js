// import {
//   FETCH_MEASUREMENT_DATA_ERROR,
//   FETCH_MEASUREMENT_DATA_SUCCESS,
//   FETCH_MEASUREMENT_DATA_INPROGRESS,
// } from '../actionTypes/index';

// //   import { normalizeOverviewData } from '../normalizers/overview';

// const initialState = {
//   data: [],
//   loading: false,
//   loaded: false,
//   error: false,
// }

// export default function measurement(state = initialState, action) {
//   switch (action.type) {
//     case FETCH_MEASUREMENT_DATA_INPROGRESS:
//       return {
//         ...state,
//         error: false,
//         loaded: false,
//         loading: true
//       }

//     case FETCH_MEASUREMENT_DATA_SUCCESS:
//       return {
//         ...state,
//         error: false,
//         loading: false,
//         loaded: true,
//         data: action ? action.payload ? action.payload.data : [] : [], //TODO: use normalize function
//       }

//     case FETCH_MEASUREMENT_DATA_ERROR:
//       return {
//         ...state,
//         error: true,
//         loaded: true,
//         loading: false
//       }
//     default:
//       return state;
//   }
// }
