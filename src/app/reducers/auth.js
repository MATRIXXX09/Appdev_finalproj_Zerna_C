import {
  USER_LOGIN,
  USER_LOGIN_COMPLETED,
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESET,
  USER_REGISTER,
  USER_REGISTER_COMPLETED,
  USER_REGISTER_ERROR,
  USER_REGISTER_REQUEST,
  USER_LOGOUT,
  USER_LOGOUT_COMPLETED,
  USER_LOGOUT_ERROR,
  USER_LOGOUT_REQUEST,
} from '../actions';

const INITIAL_STATE = {
  data: null, // { token, user, roles } when logged in
  isLoading: false,
  isError: false,
  errorMessage: null,
};

export default function reducer(state = INITIAL_STATE, action) {
  console.log('[Auth Reducer]', action.type, action.payload ? '(has payload)' : '');
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      console.log('[Auth Reducer] LOGIN_REQUEST -> state: isLoading=true, data=null, isError=false');
      return {
        ...state,
        data: null,
        isLoading: true,
        isError: false,
        errorMessage: null,
      };

    case USER_LOGIN_COMPLETED:
      console.log('[Auth Reducer] LOGIN_COMPLETED -> stored in state:', !!action.payload?.token, 'user:', action.payload?.user?.email);
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
        errorMessage: null,
      };

    case USER_LOGIN_ERROR:
      console.log('[Auth Reducer] LOGIN_ERROR -> not stored, errorMessage:', action.payload);
      return {
        ...state,
        data: null,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    case USER_LOGIN_RESET:
      console.log('[Auth Reducer] LOGIN_RESET -> state reset to INITIAL_STATE');
      return INITIAL_STATE;

    case USER_REGISTER_REQUEST:
      console.log('[Auth Reducer] REGISTER_REQUEST -> isLoading=true');
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: null,
      };

    case USER_REGISTER_COMPLETED:
      console.log('[Auth Reducer] REGISTER_COMPLETED -> (will follow with login)');
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: null,
      };

    case USER_REGISTER_ERROR:
      console.log('[Auth Reducer] REGISTER_ERROR -> not stored, errorMessage:', action.payload);
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    case USER_LOGOUT_REQUEST:
      console.log('[Auth Reducer] LOGOUT_REQUEST -> clearing after API call');
      return { ...state, isLoading: true };

    case USER_LOGOUT_COMPLETED:
      console.log('[Auth Reducer] LOGOUT_COMPLETED -> state cleared, not stored');
      return INITIAL_STATE;

    case USER_LOGOUT_ERROR:
      console.log('[Auth Reducer] LOGOUT_ERROR -> clearing state anyway, error:', action.payload);
      return INITIAL_STATE;

    default:
      return state;
  }
}

export const userLogin = payload => ({ type: USER_LOGIN, payload });
export const userRegister = payload => ({ type: USER_REGISTER, payload });
export const userLogout = () => ({ type: USER_LOGOUT });
export const resetLogin = () => ({ type: USER_LOGIN_RESET });
