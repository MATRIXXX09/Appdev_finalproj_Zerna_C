import { all } from 'redux-saga/effects';
import { userLogin, userRegister, userLogout } from './auth';

export default function* rootSaga() {
  yield all([userLogin(), userRegister(), userLogout()]);
}
