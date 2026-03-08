const BASE_URL = 'http://127.0.0.1:8000/api';
const options = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export async function checkBackendConnection() {
  const url = BASE_URL + '/test-jwt';
  console.log('[API] Checking backend at', url);
  try {
    const response = await fetch(url);
    const data = await response.json().catch(() => ({}));
    if (response.ok) {
      console.log('[API] Successfully connected to backend at', BASE_URL);
      return true;
    }
    console.log('[API] Backend responded but not OK:', response.status, data);
    return false;
  } catch (error) {
    console.log('[API] Failed to connect to backend:', error?.message || error, '| URL:', url);
    return false;
  }
}

export async function authLogin({ email, password }) {
  try {
    const response = await fetch(BASE_URL + '/login', {
      method: 'POST',
      ...options,
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();

    if (response.ok) {
      console.log('[API] Login request: connected to backend, success');
      return data; 
    }
    console.log('[API] Login request: connected to backend, error response', response.status, data?.error || data?.message);
    throw new Error(data.error || data.message || 'Login failed');
  } catch (error) {
    if (error.message === 'Login failed' || (error.message && !error.message.includes('Network'))) {
      throw error;
    }
    console.log('[API] Login request: network error (backend unreachable)', error?.message);
    throw error;
  }
}

export async function authRegister({ firstName, lastName, username, email, password, phoneNumber }) {
  try {
    const response = await fetch(BASE_URL + '/register', {
      method: 'POST',
      ...options,
      body: JSON.stringify({
        firstName: firstName ?? '',
        lastName: lastName ?? '',
        username: username?.trim() ?? '',
        email: email?.trim() ?? '',
        password: password ?? '',
        phoneNumber: phoneNumber?.trim() ?? '',
      }),
    });
    const data = await response.json();

    if (response.ok) {
      console.log('[API] Register request: connected to backend, success');
      return data; 
    }
    console.log('[API] Register request: connected to backend, error response', response.status, data?.error || data?.message);
    throw new Error(data.error || data.message || 'Registration failed');
  } catch (error) {
    if (error.message === 'Registration failed' || (error.message && !error.message.includes('Network'))) {
      throw error;
    }
    console.log('[API] Register request: network error (backend unreachable)', error?.message);
    throw error;
  }
}

export async function authLogout(token) {
  try {
    const response = await fetch(BASE_URL + '/logout', {
      method: 'POST',
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json().catch(() => ({}));

    if (response.ok) {
      console.log('[API] Logout request: connected to backend, success');
      return data;
    }
    console.log('[API] Logout request: connected to backend, error', response.status);
    throw new Error(data.error || data.message || 'Logout failed');
  } catch (error) {
    console.log('[API] Logout request: network error', error?.message);
    throw error;
  }
}
