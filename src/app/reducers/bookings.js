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

const INITIAL_STATE = {
  wallet: {
    balance: 0,
    transactions: [],
    isLoading: false,
    isError: false,
    errorMessage: null,
  },
  activeBookings: {
    data: [],
    isLoading: false,
    isError: false,
    errorMessage: null,
  },
  completedBookings: {
    data: [],
    isLoading: false,
    isError: false,
    errorMessage: null,
  },
  createBooking: {
    isLoading: false,
    isError: false,
    errorMessage: null,
  },
};

export default function reducer(state = INITIAL_STATE, action) {
  console.log('[Bookings Reducer]', action.type, action.payload ? '(has payload)' : '');
  
  switch (action.type) {
    case FETCH_WALLET_REQUEST:
      return {
        ...state,
        wallet: { ...state.wallet, isLoading: true, isError: false, errorMessage: null },
      };

    case FETCH_WALLET_COMPLETED:
      return {
        ...state,
        wallet: {
          balance: action.payload?.balance || 0,
          transactions: action.payload?.transactions || [],
          isLoading: false,
          isError: false,
          errorMessage: null,
        },
      };

    case FETCH_WALLET_ERROR:
      return {
        ...state,
        wallet: { ...state.wallet, isLoading: false, isError: true, errorMessage: action.payload },
      };

    case FETCH_ACTIVE_BOOKINGS_REQUEST:
      return {
        ...state,
        activeBookings: { ...state.activeBookings, isLoading: true, isError: false, errorMessage: null },
      };

    case FETCH_ACTIVE_BOOKINGS_COMPLETED:
      return {
        ...state,
        activeBookings: {
          data: action.payload || [],
          isLoading: false,
          isError: false,
          errorMessage: null,
        },
      };

    case FETCH_ACTIVE_BOOKINGS_ERROR:
      return {
        ...state,
        activeBookings: { ...state.activeBookings, isLoading: false, isError: true, errorMessage: action.payload },
      };

    case FETCH_COMPLETED_BOOKINGS_REQUEST:
      return {
        ...state,
        completedBookings: { ...state.completedBookings, isLoading: true, isError: false, errorMessage: null },
      };

    case FETCH_COMPLETED_BOOKINGS_COMPLETED:
      return {
        ...state,
        completedBookings: {
          data: action.payload || [],
          isLoading: false,
          isError: false,
          errorMessage: null,
        },
      };

    case FETCH_COMPLETED_BOOKINGS_ERROR:
      return {
        ...state,
        completedBookings: { ...state.completedBookings, isLoading: false, isError: true, errorMessage: action.payload },
      };

    case CREATE_BOOKING_REQUEST:
      return {
        ...state,
        createBooking: { isLoading: true, isError: false, errorMessage: null },
      };

    case CREATE_BOOKING_COMPLETED:
      return {
        ...state,
        createBooking: { isLoading: false, isError: false, errorMessage: null },
        activeBookings: {
          ...state.activeBookings,
          data: [action.payload, ...state.activeBookings.data],
        },
      };

    case CREATE_BOOKING_ERROR:
      return {
        ...state,
        createBooking: { isLoading: false, isError: true, errorMessage: action.payload },
      };

    default:
      return state;
  }
}
