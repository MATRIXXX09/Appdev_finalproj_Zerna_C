// Backend API base URL
// 10.0.2.2 = localhost for Android emulator
// 3000 = backend Express server port
const BASE_URL = 'http://10.0.2.2:3000/api';

// Default fetch options for all API requests
const options = {
  headers: {
    Accept: 'application/json',           // Accept JSON responses
    'Content-Type': 'application/json',   // Send JSON data
  },
};

// Function: Test if backend is running and reachable
// No authentication required for this endpoint
export async function checkBackendConnection() {
  // Build test endpoint URL
  const url = BASE_URL + '/test-jwt';
  console.log('[API] Checking backend at', url);
  
  try {
    // Make GET request to test endpoint
    const response = await fetch(url);
    
    // Parse JSON response (default to empty object if parse fails)
    const data = await response.json().catch(() => ({}));
    
    // Check if response status is 200-299 (success)
    if (response.ok) {
      console.log('[API] Successfully connected to backend at', BASE_URL);
      return true;  // Backend is running
    }
    
    // Backend responded but with error status
    console.log('[API] Backend responded but not OK:', response.status, data);
    return false;
  } catch (error) {
    // Network error (backend not running/unreachable)
    console.log('[API] Failed to connect to backend:', error?.message || error, '| URL:', url);
    return false;
  }
}

// Function: Send login credentials to backend, get JWT token
// Called by: Saga (via yield call)
// Receives: { email, password }
// Returns: { token, user: { id, email, username, firstName, lastName } }
// Throws: Error if login fails
export async function authLogin({ email, password }) {
  try {
    // Make POST request to /api/login endpoint
    const response = await fetch(BASE_URL + '/login', {
      method: 'POST',          // POST request
      ...options,              // Include default headers
      body: JSON.stringify({   // Convert JavaScript object to JSON string
        email,
        password,
      }),
    });
    
    // Parse JSON response from backend
    const data = await response.json();

    // Check if login was successful (2xx status)
    if (response.ok) {
      console.log('[API] Login request: connected to backend, success');
      console.log('[API] Success);
      return data;  // { token, user }
    }
    
    // Login failed - throw error with message from backend
    console.log('[API] Login request: connected to backend, error response', response.status, data?.error || data?.message);
    throw new Error(data.error || data.message || 'Login failed');
    
  } catch (error) {
    // Error handling: Check if it's a real error or network error
    if (error.message === 'Login failed' || (error.message && !error.message.includes('Network'))) {
      throw error;  // Known error from backend - re-throw
    }
    // Network error (fetch itself failed, backend unreachable)
    console.log('[API] Login request: network error (backend unreachable)', error?.message);
    throw error;
  }
}

// Function: Send registration data to backend, create new user
// Called by: Saga (via yield call)
// Receives: { firstName, lastName, username, email, password, phoneNumber }
// Returns: { message: 'User registered!' }
// Throws: Error if registration fails (email exists, validation error, etc.)
export async function authRegister({ firstName, lastName, username, email, password, phoneNumber }) {
  try {
    // Make POST request to /api/register endpoint
    const response = await fetch(BASE_URL + '/register', {
      method: 'POST',          // POST request
      ...options,              // Include default headers
      body: JSON.stringify({   // Convert to JSON string
        firstName: firstName ?? '',        // Use empty string if null/undefined
        lastName: lastName ?? '',
        username: username?.trim() ?? '', // Trim whitespace, default to empty
        email: email?.trim() ?? '',
        password: password ?? '',
        phoneNumber: phoneNumber?.trim() ?? '',
      }),
    });
    
    // Parse JSON response
    const data = await response.json();

    // Check if registration was successful
    if (response.ok) {
      console.log('[API] Register request: connected to backend, success');
      return data;  // { message: 'User registered!' }
    }
    
    // Registration failed - throw error
    console.log('[API] Register request: connected to backend, error response', response.status, data?.error || data?.message);
    throw new Error(data.error || data.message || 'Registration failed');
    
  } catch (error) {
    // Error handling
    if (error.message === 'Registration failed' || (error.message && !error.message.includes('Network'))) {
      throw error;  // Re-throw if known error
    }
    // Network error
    console.log('[API] Register request: network error (backend unreachable)', error?.message);
    throw error;
  }
}

// Function: Call logout endpoint on backend
// Called by: Saga (via yield call)
// Receives: token (JWT token from Redux state)
// Returns: { message: 'Logged out successfully' }
// Note: Even if this fails, Saga still clears Redux state
export async function authLogout(token) {
  try {
    // Make POST request to /api/logout endpoint
    const response = await fetch(BASE_URL + '/logout', {
      method: 'POST',          // POST request
      headers: {
        ...options.headers,    // Include default headers
        // Add JWT token to Authorization header: "Bearer {token}"
        Authorization: `Bearer ${token}`,
      },
    });
    
    // Parse JSON response (optional for logout, default to empty object)
    const data = await response.json().catch(() => ({}));

    // Check if logout was successful
    if (response.ok) {
      console.log('[API] Logout request: connected to backend, success');
      return data;
    }
    
    // Logout failed, throw error
    console.log('[API] Logout request: connected to backend, error', response.status);
    throw new Error(data.error || data.message || 'Logout failed');
    
  } catch (error) {
    // Network error
    console.log('[API] Logout request: network error', error?.message);
    throw error;
  }
}
