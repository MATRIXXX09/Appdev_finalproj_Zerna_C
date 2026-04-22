const BASE_URL = 'http://10.0.2.2:3000/api';

const getAuthHeaders = (token) => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

export async function getUserWallet(token) {
  try {
    const response = await fetch(BASE_URL + '/wallet', {
      method: 'GET',
      headers: getAuthHeaders(token),
    });
    const data = await response.json();

    if (response.ok) {
      console.log('[API] Get wallet: success');
      return data;
    }
    throw new Error(data.error || data.message || 'Failed to fetch wallet');
  } catch (error) {
    console.log('[API] Get wallet failed:', error?.message);
    throw error;
  }
}

export async function getActiveBookings(token) {
  try {
    const response = await fetch(BASE_URL + '/bookings/active', {
      method: 'GET',
      headers: getAuthHeaders(token),
    });
    const data = await response.json();

    if (response.ok) {
      console.log('[API] Get active bookings: success');
      return data;
    }
    throw new Error(data.error || data.message || 'Failed to fetch bookings');
  } catch (error) {
    console.log('[API] Get active bookings failed:', error?.message);
    throw error;
  }
}

export async function getCompletedBookings(token) {
  try {
    const response = await fetch(BASE_URL + '/bookings/completed', {
      method: 'GET',
      headers: getAuthHeaders(token),
    });
    const data = await response.json();

    if (response.ok) {
      console.log('[API] Get completed bookings: success');
      return data;
    }
    throw new Error(data.error || data.message || 'Failed to fetch bookings');
  } catch (error) {
    console.log('[API] Get completed bookings failed:', error?.message);
    throw error;
  }
}

export async function createBooking(token, bookingData) {
  try {
    const response = await fetch(BASE_URL + '/bookings', {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(bookingData),
    });
    const data = await response.json();

    if (response.ok) {
      console.log('[API] Create booking: success');
      return data;
    }
    throw new Error(data.error || data.message || 'Failed to create booking');
  } catch (error) {
    console.log('[API] Create booking failed:', error?.message);
    throw error;
  }
}

export async function getBookingDetails(token, bookingId) {
  try {
    const response = await fetch(BASE_URL + `/bookings/${bookingId}`, {
      method: 'GET',
      headers: getAuthHeaders(token),
    });
    const data = await response.json();

    if (response.ok) {
      console.log('[API] Get booking details: success');
      return data;
    }
    throw new Error(data.error || data.message || 'Failed to fetch booking details');
  } catch (error) {
    console.log('[API] Get booking details failed:', error?.message);
    throw error;
  }
}
