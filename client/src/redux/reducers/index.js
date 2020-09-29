// import { combineReducers } from 'redux';
// import overview from './overview';
// import measurement from './measurement';
// import user from './user';

// export default combineReducers({
//   overview,
//   measurement,
//   user
// });
import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import FormData from "./saveForm.reducer";
import { registration } from "./registration.reducer";
import { users } from "./user.reducer";
import { alert } from "./alert.reducer";
import { product } from "./product.reducer";
import cart from "./cart.reducer";
import wishList from "./wishList";
import productDialog from "./productDialog.reducer";

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  product,
  cart,
  wishList,
  productDialog,
  FormData,
});

export default rootReducer;
