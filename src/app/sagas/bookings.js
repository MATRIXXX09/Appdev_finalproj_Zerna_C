import { call, put, takeEvery, select } from 'redux-saga/effects';
import { getUserWallet, getActiveBookings, getCompletedBookings, createBooking } from '../api/bookings';

import {
  FETCH_WALLET,
  FETCH_WALLET_REQUEST,
  FETCH_WALLET_COMPLETED,
  FETCH_WALLET_ERROR,
  FETCH_ACTIVE_BOOKINGS,
  FETCH_ACTIVE_BOOKINGS_REQUEST,
  FETCH_ACTIVE_BOOKINGS_COMPLETED,
  FETCH_ACTIVE_BOOKINGS_ERROR,
  FETCH_COMPLETED_BOOKINGS,
  FETCH_COMPLETED_BOOKINGS_REQUEST,
  FETCH_COMPLETED_BOOKINGS_COMPLETED,
  FETCH_COMPLETED_BOOKINGS_ERROR,
  CREATE_BOOKING,
  CREATE_BOOKING_REQUEST,
  CREATE_BOOKING_COMPLETED,
  CREATE_BOOKING_ERROR,
} from '../actions';

function getAuthToken(state) {
  return state.auth?.data?.token;
}

export function* fetchWalletAsync() {
  console.log('[Saga] FETCH_WALLET started');
  yield put({ type: FETCH_WALLET_REQUEST });
  try {
    const token = yield select(getAuthToken);
    if (!token) {
      throw new Error('No auth token available');
    }
    console.log('[Saga] Fetching wallet from API...');
    const response = yield call(getUserWallet, token);
    console.log('[Saga] Wallet fetched successfully');
    yield put({ type: FETCH_WALLET_COMPLETED, payload: response });
  } catch (error) {
    console.log('[Saga] Fetch wallet failed:', error?.message);
    yield put({ type: FETCH_WALLET_ERROR, payload: error.message });
  }
}

export function* fetchActiveBookingsAsync() {
  console.log('[Saga] FETCH_ACTIVE_BOOKINGS started');
  yield put({ type: FETCH_ACTIVE_BOOKINGS_REQUEST });
  try {
    const token = yield select(getAuthToken);
    if (!token) {
      throw new Error('No auth token available');
    }
    console.log('[Saga] Fetching active bookings from API...');
    const response = yield call(getActiveBookings, token);
    console.log('[Saga] Active bookings fetched successfully');
    yield put({ type: FETCH_ACTIVE_BOOKINGS_COMPLETED, payload: response?.bookings || response });
  } catch (error) {
    console.log('[Saga] Fetch active bookings failed:', error?.message);
    yield put({ type: FETCH_ACTIVE_BOOKINGS_ERROR, payload: error.message });
  }
}

export function* fetchCompletedBookingsAsync() {
  console.log('[Saga] FETCH_COMPLETED_BOOKINGS started');
  yield put({ type: FETCH_COMPLETED_BOOKINGS_REQUEST });
  try {
    const token = yield select(getAuthToken);
    if (!token) {
      throw new Error('No auth token available');
    }
    console.log('[Saga] Fetching completed bookings from API...');
    const response = yield call(getCompletedBookings, token);
    console.log('[Saga] Completed bookings fetched successfully');
    yield put({ type: FETCH_COMPLETED_BOOKINGS_COMPLETED, payload: response?.bookings || response });
  } catch (error) {
    console.log('[Saga] Fetch completed bookings failed:', error?.message);
    yield put({ type: FETCH_COMPLETED_BOOKINGS_ERROR, payload: error.message });
  }
}

export function* createBookingAsync(action) {
  console.log('[Saga] CREATE_BOOKING started');
  yield put({ type: CREATE_BOOKING_REQUEST });
  try {
    const token = yield select(getAuthToken);
    if (!token) {
      throw new Error('No auth token available');
    }
    console.log('[Saga] Creating booking via API...');
    const response = yield call(createBooking, token, action.payload);
    console.log('[Saga] Booking created successfully');
    yield put({ type: CREATE_BOOKING_COMPLETED, payload: response });
  } catch (error) {
    console.log('[Saga] Create booking failed:', error?.message);
    yield put({ type: CREATE_BOOKING_ERROR, payload: error.message });
  }
}

export function* fetchWallet() {
  yield takeEvery(FETCH_WALLET, fetchWalletAsync);
}

export function* fetchActiveBookings() {
  yield takeEvery(FETCH_ACTIVE_BOOKINGS, fetchActiveBookingsAsync);
}

export function* fetchCompletedBookings() {
  yield takeEvery(FETCH_COMPLETED_BOOKINGS, fetchCompletedBookingsAsync);
}

export function* createBookingFlow() {
  yield takeEvery(CREATE_BOOKING, createBookingAsync);
}
