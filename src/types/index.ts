// Redux State Types
export interface AuthData {
  token: string | null;
  user: {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
  } | null;
}

export interface AuthState {
  data: AuthData | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
}

export interface BookingTransaction {
  id: string;
  amount: number;
  date: string;
  description?: string;
}

export interface Wallet {
  balance: number;
  transactions: BookingTransaction[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
}

export interface BookingData {
  id: string;
  title: string;
  date: string;
  status: 'active' | 'completed' | 'cancelled';
  amount?: number;
  details?: string;
}

export interface BookingList {
  data: BookingData[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
}

export interface CreateBookingState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
}

export interface BookingsState {
  wallet: Wallet;
  activeBookings: BookingList;
  completedBookings: BookingList;
  createBooking: CreateBookingState;
}

export interface RootState {
  auth: AuthState;
  bookings: BookingsState;
}

// API Request/Response Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
  };
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}

// Redux Action Types
export interface ReduxAction<T = any> {
  type: string;
  payload?: T;
}

// Component Props Types
export interface CustomButtonProps {
  containerStyle?: any;
  label: string;
  textStyle?: any;
  onPress: () => void;
  loading?: boolean;
}

export interface CustomTextInputProps {
  containerStyle?: any;
  inputStyle?: any;
  label?: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
  secureTextEntry?: boolean;
  editable?: boolean;
}
