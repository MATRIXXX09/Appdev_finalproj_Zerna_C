import { all } from 'redux-saga/effects';
import { userLogin, userRegister, userLogout } from './auth';
import { fetchWallet, fetchActiveBookings, fetchCompletedBookings, createBookingFlow } from './bookings';

export default function* rootSaga() {
  yield all([
    userLogin(),
    userRegister(),
    userLogout(),
    fetchWallet(),
    fetchActiveBookings(),
    fetchCompletedBookings(),
    createBookingFlow(),
  ]);
}
