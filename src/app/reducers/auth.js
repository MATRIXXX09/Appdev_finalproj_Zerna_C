// Import all action types from actions.js
// These are constants that Saga dispatches to trigger state updates
import {
  USER_LOGIN,                    // Action: User initiated login
  USER_LOGIN_COMPLETED,          // Action: Login API succeeded, store token+user
  USER_LOGIN_ERROR,              // Action: Login API failed, show error
  USER_LOGIN_REQUEST,            // Action: Login API call started, show loading
  USER_LOGIN_RESET,              // Action: Clear login state on component mount
  USER_REGISTER,                 // Action: User initiated registration
  USER_REGISTER_COMPLETED,       // Action: Register API succeeded
  USER_REGISTER_ERROR,           // Action: Register API failed, show error
  USER_REGISTER_REQUEST,         // Action: Register API call started, show loading
  USER_LOGOUT,                   // Action: User initiated logout
  USER_LOGOUT_COMPLETED,         // Action: Logout API succeeded, clear state
  USER_LOGOUT_ERROR,             // Action: Logout API failed but clear state anyway
  USER_LOGOUT_REQUEST,           // Action: Logout API call started
} from '../actions';

// Define initial state structure when app first loads
const INITIAL_STATE = {
  data: null,                    // { token, user } when logged in, null when logged out
  isLoading: false,              // true = API call in progress (show spinner)
  isError: false,                // true = API call failed (show error message)
  errorMessage: null,            // Error text from backend/saga
};

// Reducer: Pure function that receives state + action, returns new state
// IMPORTANT: Reducer CANNOT make API calls (that's saga's job)
// Reducer CANNOT modify state directly (must return new state object)
export default function reducer(state = INITIAL_STATE, action) {
  // Log every action for debugging in console
  console.log('[Auth Reducer]', action.type, action.payload ? '(has payload)' : '');
  
  // Switch on action type to determine how to update state
  switch (action.type) {
    
    // CASE 1: Login API call STARTED (before API response)
    case USER_LOGIN_REQUEST:
      // Log state change for debugging
      console.log('[Auth Reducer] LOGIN_REQUEST -> state: isLoading=true, data=null, isError=false');
      // Return new state object (must use spread operator ...state to copy other properties)
      return {
        ...state,                // Copy all existing state
        data: null,              // Clear previous user data
        isLoading: true,         // Show loading spinner
        isError: false,          // Hide error (if any from previous attempt)
        errorMessage: null,      // Clear previous error message
      };

    // CASE 2: Login API call SUCCEEDED (got token + user from backend)
    case USER_LOGIN_COMPLETED:
      // Log successful login with token hash and user email
      console.log('[Auth Reducer] LOGIN_COMPLETED -> stored in state:', !!action.payload?.token, 'user:', action.payload?.user?.email);
      // Return new state with user data
      return {
        ...state,                // Copy all existing state
        data: action.payload,    // Store { token, user } from API response
        isLoading: false,        // Stop showing loading spinner
        isError: false,          // No error occurred
        errorMessage: null,      // No error message
      };

    // CASE 3: Login API call FAILED (wrong password, user not found, etc.)
    case USER_LOGIN_ERROR:
      // Log the error message from backend
      console.log('[Auth Reducer] LOGIN_ERROR -> not stored, errorMessage:', action.payload);
      // Return new state with error
      return {
        ...state,                // Copy all existing state
        data: null,              // Don't save failed response
        isLoading: false,        // Stop showing loading spinner
        isError: true,           // Show error UI
        errorMessage: action.payload, // Display error text to user
      };

    // CASE 4: Reset login state on component mount (clears old errors)
    case USER_LOGIN_RESET:
      // Log state reset
      console.log('[Auth Reducer] LOGIN_RESET -> state reset to INITIAL_STATE');
      // Return initial state (all defaults)
      return INITIAL_STATE;

    // CASE 5: Register API call STARTED
    case USER_REGISTER_REQUEST:
      // Log registration start
      console.log('[Auth Reducer] REGISTER_REQUEST -> isLoading=true');
      // Return new state with loading indicator
      return {
        ...state,                // Copy all existing state
        isLoading: true,         // Show loading spinner
        isError: false,          // Hide error
        errorMessage: null,      // Clear error message
      };

    // CASE 6: Register API call SUCCEEDED (user saved to DB)
    case USER_REGISTER_COMPLETED:
      // Log registration complete (saga will auto-login next)
      console.log('[Auth Reducer] REGISTER_COMPLETED -> (will follow with login)');
      // Return state ready for auto-login
      return {
        ...state,                // Copy all existing state
        isLoading: false,        // Stop showing spinner
        isError: false,          // No error
        errorMessage: null,      // No error message
      };

    // CASE 7: Register API call FAILED (email exists, validation error, etc.)
    case USER_REGISTER_ERROR:
      // Log registration error
      console.log('[Auth Reducer] REGISTER_ERROR -> not stored, errorMessage:', action.payload);
      // Return state with error
      return {
        ...state,                // Copy all existing state
        isLoading: false,        // Stop showing spinner
        isError: true,           // Show error UI
        errorMessage: action.payload, // Display error text
      };

    // CASE 8: Logout API call STARTED
    case USER_LOGOUT_REQUEST:
      // Log logout start
      console.log('[Auth Reducer] LOGOUT_REQUEST -> clearing after API call');
      // Return state with loading indicator
      return { ...state, isLoading: true };

    // CASE 9: Logout API call SUCCEEDED - CLEAR ALL USER DATA
    case USER_LOGOUT_COMPLETED:
      // Log logout complete
      console.log('[Auth Reducer] LOGOUT_COMPLETED -> state cleared, not stored');
      // Return to initial state (user logged out, navigation will show AuthNav)
      return INITIAL_STATE;

    // CASE 10: Logout API call FAILED - STILL CLEAR STATE
    case USER_LOGOUT_ERROR:
      // Log logout error but still clear state
      console.log('[Auth Reducer] LOGOUT_ERROR -> clearing state anyway, error:', action.payload);
      // Return to initial state even if API failed
      return INITIAL_STATE;

    // DEFAULT: Unknown action type, return unchanged state
    default:
      return state;
  }
}

// Helper function to create login action (optional shortcut)
export const userLogin = payload => ({ type: USER_LOGIN, payload });
// Helper function to create register action (optional shortcut)
export const userRegister = payload => ({ type: USER_REGISTER, payload });
// Helper function to create logout action (optional shortcut)
export const userLogout = () => ({ type: USER_LOGOUT });
// Helper function to create reset login action (optional shortcut)
export const resetLogin = () => ({ type: USER_LOGIN_RESET });
