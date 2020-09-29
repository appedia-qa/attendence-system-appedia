import { all, fork } from 'redux-saga/effects';
import authentication from './authentication.sagas';
import product from './product.sagas';
import registration from './registration.sagas';
import cart from './cart.sagas';
import wishList from './wishList';
import productDialogSaga from './productDialog.sagas';

const sagas = [
  authentication,
  registration,
  cart,
  wishList,
  product,
  productDialogSaga
];

export default function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)));
}
