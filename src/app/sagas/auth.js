import { call, put, takeEvery, select } from 'redux-saga/effects';
import { authLogin, authRegister, authLogout } from '../api/auth';

import {
  USER_LOGIN,
  USER_LOGIN_COMPLETED,
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_REGISTER,
  USER_REGISTER_REQUEST,
  USER_REGISTER_COMPLETED,
  USER_REGISTER_ERROR,
  USER_LOGOUT,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_COMPLETED,
  USER_LOGOUT_ERROR,
} from '../actions';

function getAuthState(state) {
  return state.auth;
}

export function* userLoginAsync(action) {
  console.log('[Saga] LOGIN started', { email: action.payload?.email });
  yield put({ type: USER_LOGIN_REQUEST });
  console.log('[Saga] LOGIN_REQUEST dispatched');
  try {
    console.log('[Saga] Calling authLogin API...');
    const response = yield call(authLogin, action.payload);
    console.log('[Saga] authLogin API success, token:', !!response?.token, 'user:', response?.user?.email);
    yield put({ type: USER_LOGIN_COMPLETED, payload: response });
    console.log('[Saga] USER_LOGIN_COMPLETED dispatched -> will be stored in Redux (and persisted)');
  } catch (error) {
    console.log('[Saga] LOGIN failed:', error?.message);
    yield put({ type: USER_LOGIN_ERROR, payload: error.message });
    console.log('[Saga] USER_LOGIN_ERROR dispatched -> not stored');
  }
}

export function* userRegisterAsync(action) {
  const { firstName, lastName, username, email, password, phoneNumber } = action.payload || {};
  console.log('[Saga] REGISTER started', { email, username });
  yield put({ type: USER_REGISTER_REQUEST });
  console.log('[Saga] USER_REGISTER_REQUEST dispatched');
  try {
    console.log('[Saga] Calling authRegister API...');
    yield call(authRegister, { firstName, lastName, username, email, password, phoneNumber });
    console.log('[Saga] authRegister API success -> user saved in DB');
    yield put({ type: USER_REGISTER_COMPLETED });
    console.log('[Saga] USER_REGISTER_COMPLETED -> now auto-login...');
    const loginResponse = yield call(authLogin, { email, password });
    console.log('[Saga] Auto-login after register success, token:', !!loginResponse?.token);
    yield put({ type: USER_LOGIN_COMPLETED, payload: loginResponse });
    console.log('[Saga] USER_LOGIN_COMPLETED dispatched after register -> stored, redirect to home');
  } catch (error) {
    console.log('[Saga] REGISTER failed:', error?.message);
    yield put({ type: USER_REGISTER_ERROR, payload: error.message });
    console.log('[Saga] USER_REGISTER_ERROR dispatched -> not stored');
  }
}

export function* userLogoutAsync() {
  console.log('[Saga] LOGOUT started');
  const auth = yield select(getAuthState);
  const token = auth?.data?.token;
  if (!token) {
    console.log('[Saga] LOGOUT: no token in state, clearing state only');
    yield put({ type: USER_LOGOUT_COMPLETED });
    return;
  }
  yield put({ type: USER_LOGOUT_REQUEST });
  console.log('[Saga] USER_LOGOUT_REQUEST dispatched');
  try {
    console.log('[Saga] Calling authLogout API...');
    yield call(authLogout, token);
    console.log('[Saga] authLogout API success');
    yield put({ type: USER_LOGOUT_COMPLETED });
    console.log('[Saga] USER_LOGOUT_COMPLETED dispatched -> state cleared, not stored');
  } catch (error) {
    console.log('[Saga] LOGOUT API failed (clearing state anyway):', error?.message);
    yield put({ type: USER_LOGOUT_ERROR, payload: error.message });
    console.log('[Saga] USER_LOGOUT_ERROR dispatched -> state cleared anyway');
  }
}

export function* userLogin() {
  yield takeEvery(USER_LOGIN, userLoginAsync);
}

export function* userRegister() {
  yield takeEvery(USER_REGISTER, userRegisterAsync);
}

export function* userLogout() {
  yield takeEvery(USER_LOGOUT, userLogoutAsync);
}
