const BASE_URL = 'http://192.168.2.7:8000/api';
const options = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export async function authLogin({ email, password }) {
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
    return data;
  } else {
    throw new Error(data.message || 'Login failed');
  }
}
