// Import saga effects: call, put, takeEvery, select
// call = call async function and wait for result
// put = dispatch action to reducer
// takeEvery = listen for specific action
// select = read data from Redux store
import { call, put, takeEvery, select } from 'redux-saga/effects';
// Import API functions (these call backend endpoints)
import { authLogin, authRegister, authLogout } from '../api/auth';

// Import all action types
import {
  USER_LOGIN,                    // User clicked login button
  USER_LOGIN_COMPLETED,          // Saga dispatches after API success
  USER_LOGIN_ERROR,              // Saga dispatches after API failure
  USER_LOGIN_REQUEST,            // Saga dispatches before API call
  USER_REGISTER,                 // User clicked register button
  USER_REGISTER_REQUEST,         // Saga dispatches before API call
  USER_REGISTER_COMPLETED,       // Saga dispatches after API success
  USER_REGISTER_ERROR,           // Saga dispatches after API failure
  USER_LOGOUT,                   // User clicked logout button
  USER_LOGOUT_REQUEST,           // Saga dispatches before API call
  USER_LOGOUT_COMPLETED,         // Saga dispatches after API success
  USER_LOGOUT_ERROR,             // Saga dispatches after API failure
} from '../actions';

// Selector function: extracts auth state from Redux
// Used to access token, user data, etc. from within saga
function getAuthState(state) {
  return state.auth;
}

// SAGA 1: Handle login
// Generator function (function* syntax) - can use yield
// Called when USER_LOGIN action is dispatched from component
// Flow: Component dispatch → Saga receives action → API call → Dispatch to Reducer
export function* userLoginAsync(action) {
  // Log start of login with email
  console.log('[Saga] LOGIN started', { email: action.payload?.email });
  
  // STEP 1: Dispatch USER_LOGIN_REQUEST (tell reducer to show spinner)
  yield put({ type: USER_LOGIN_REQUEST });
  console.log('[Saga] LOGIN_REQUEST dispatched');
  
  try {
    // STEP 2: Log that we're calling API
    console.log('[Saga] Calling authLogin API...');
    
    // STEP 3: Call authLogin function from API file
    // yield call = wait for async function to complete
    // Pass email & password from action.payload
    const response = yield call(authLogin, action.payload);
    
    // STEP 4: Log successful response (token + user)
    console.log('[Saga] authLogin API success, token:', response?.token, 'user:', response?.user?.email);
    
    // STEP 5: Dispatch USER_LOGIN_COMPLETED with token+user data
    // Reducer will store this data in state.auth.data
    yield put({ type: USER_LOGIN_COMPLETED, payload: response });
    console.log('[Saga] USER_LOGIN_COMPLETED dispatched -> will be stored in Redux');
    
  } catch (error) {
    // ERROR HANDLING: API call failed
    console.log('[Saga] LOGIN failed:', error?.message);
    
    // STEP 6: Dispatch USER_LOGIN_ERROR with error message
    // Reducer will set isError=true and show error to user
    yield put({ type: USER_LOGIN_ERROR, payload: error.message });
    console.log('[Saga] USER_LOGIN_ERROR dispatched');
  }
}

// SAGA 2: Handle registration
// Called when USER_REGISTER action is dispatched
// After successful registration, automatically logs user in
export function* userRegisterAsync(action) {
  // Extract registration data from action.payload
  const { firstName, lastName, username, email, password, phoneNumber } = action.payload || {};
  console.log('[Saga] REGISTER started', { email, username });
  
  // STEP 1: Dispatch USER_REGISTER_REQUEST (show spinner)
  yield put({ type: USER_REGISTER_REQUEST });
  console.log('[Saga] USER_REGISTER_REQUEST dispatched');
  
  try {
    // STEP 2: Log that we're calling register API
    console.log('[Saga] Calling authRegister API...');
    
    // STEP 3: Call authRegister API (saves user to database)
    yield call(authRegister, { firstName, lastName, username, email, password, phoneNumber });
    console.log('[Saga] authRegister API success -> user saved in DB');
    
    // STEP 4: Dispatch USER_REGISTER_COMPLETED
    yield put({ type: USER_REGISTER_COMPLETED });
    console.log('[Saga] USER_REGISTER_COMPLETED -> now auto-login...');
    
    // STEP 5: AUTO-LOGIN after registration
    // User doesn't need to manually login - saga does it automatically
    const loginResponse = yield call(authLogin, { email, password });
    console.log('[Saga] Auto-login after register success, token:', loginResponse?.token);
    
    // STEP 6: Dispatch USER_LOGIN_COMPLETED with token
    // Now user is logged in and has token in Redux
    yield put({ type: USER_LOGIN_COMPLETED, payload: loginResponse });
    console.log('[Saga] USER_LOGIN_COMPLETED dispatched after register');
    console.log('hello world');
    
  } catch (error) {
    // ERROR HANDLING: Registration failed
    console.log('[Saga] REGISTER failed:', error?.message);
    
    // STEP 7: Dispatch USER_REGISTER_ERROR
    yield put({ type: USER_REGISTER_ERROR, payload: error.message });
    console.log('[Saga] USER_REGISTER_ERROR dispatched');
  }
}

// SAGA 3: Handle logout
// Called when USER_LOGOUT action is dispatched
// Clears user data from Redux state
export function* userLogoutAsync() {
  console.log('[Saga] LOGOUT started');
  
  // STEP 1: Get current auth state from Redux
  // yield select = read from Redux store
  const auth = yield select(getAuthState);
  const token = auth?.data?.token;
  
  // If no token exists, just clear state (already logged out)
  if (!token) {
    console.log('[Saga] LOGOUT: no token in state, clearing state only');
    yield put({ type: USER_LOGOUT_COMPLETED });
    return;  // Exit early
  }
  
  // STEP 2: Dispatch USER_LOGOUT_REQUEST (show loading)
  yield put({ type: USER_LOGOUT_REQUEST });
  console.log('[Saga] USER_LOGOUT_REQUEST dispatched');
  
  try {
    // STEP 3: Log that we're calling logout API
    console.log('[Saga] Calling authLogout API...');
    
    // STEP 4: Call authLogout API (backend cleanup)
    yield call(authLogout, token);
    console.log('[Saga] authLogout API success');
    
    // STEP 5: Dispatch USER_LOGOUT_COMPLETED
    // Reducer will clear state.auth.data (token + user)
    yield put({ type: USER_LOGOUT_COMPLETED });
    console.log('[Saga] USER_LOGOUT_COMPLETED dispatched -> user logged out');
    
  } catch (error) {
    // ERROR HANDLING: Even if logout API fails, still clear state
    console.log('[Saga] LOGOUT API failed (clearing state anyway):', error?.message);
    
    // STEP 6: Dispatch USER_LOGOUT_ERROR (clear state anyway)
    yield put({ type: USER_LOGOUT_ERROR, payload: error.message });
    console.log('[Saga] USER_LOGOUT_ERROR dispatched -> state cleared anyway');
  }
}

// WATCHER 1: Listen for USER_LOGIN actions
// takeEvery(action type, handler function)
// Whenever USER_LOGIN action is dispatched, call userLoginAsync
export function* userLogin() {
  yield takeEvery(USER_LOGIN, userLoginAsync);
}

// WATCHER 2: Listen for USER_REGISTER actions
// Whenever USER_REGISTER action is dispatched, call userRegisterAsync
export function* userRegister() {
  yield takeEvery(USER_REGISTER, userRegisterAsync);
}

// WATCHER 3: Listen for USER_LOGOUT actions
// Whenever USER_LOGOUT action is dispatched, call userLogoutAsync
export function* userLogout() {
  yield takeEvery(USER_LOGOUT, userLogoutAsync);
}
