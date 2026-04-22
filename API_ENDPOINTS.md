# API Endpoints Reference

## Base URL
```
http://10.0.2.2:3000/api  (Android Emulator)
http://localhost:3000/api (Local/Web)
```

## Authentication Required
All endpoints require Bearer token in headers:
```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints Summary

### 1. User Profile
```
GET /api/profile
Response:
{
  user: {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phoneNumber: "+1234567890",
    username: "johndoe"
  }
}
```

### 2. Wallet & Transactions
```
GET /api/wallet
Response:
{
  balance: 2500,                    // Total from completed bookings
  pending: 500,                     // Total from pending/accepted
  totalBookings: 15,
  transactions: [
    {
      id: 1,
      amount: 150,
      status: "completed",
      from: "123 Main St",
      to: "456 Oak Ave",
      date: "2024-03-10T10:30:00"
    },
    ...
  ]
}
```

### 3. Active Bookings
```
GET /api/bookings/active

Query params (optional):
- status: pending|accepted|in_progress

Response:
{
  data: [
    {
      id: 5,
      booking_type: "delivery",
      pickup_address: "123 Main St",
      delivery_address: "456 Oak Ave",
      parcel_description: "Electronics",
      estimated_fare: 150,
      status: "in_progress",
      requested_pickup_time: "2024-03-12T14:00:00",
      estimated_duration: 45,
      created_at: "2024-03-12T10:30:00",
      first_name: "Raj",
      last_name: "Kumar",
      plate_number: "ABC-1234",
      type: "motorcycle"
    },
    ...
  ],
  count: 3
}
```

### 4. Completed Bookings
```
GET /api/bookings/completed

Query params (optional):
- limit: number (default 50)

Response:
{
  data: [
    {
      id: 1,
      booking_type: "delivery",
      pickup_address: "123 Main St",
      delivery_address: "456 Oak Ave",
      parcel_description: "Electronics",
      estimated_fare: 150,
      status: "completed",
      updated_at: "2024-03-10T16:30:00",
      created_at: "2024-03-10T10:30:00",
      first_name: "Raj",
      last_name: "Kumar",
      plate_number: "ABC-1234",
      type: "motorcycle"
    },
    ...
  ],
  count: 12
}
```

### 5. Get Booking Details
```
GET /api/bookings/:id

Example: GET /api/bookings/5

Response:
{
  booking: {
    id: 5,
    customer_id: 1,
    assigned_driver_id: 10,
    booking_type: "delivery",
    pickup_address: "123 Main St",
    delivery_address: "456 Oak Ave",
    parcel_description: "Electronics",
    parcel_weight: 2.5,
    customer_name: "John Doe",
    customer_phone: "+1234567890",
    status: "in_progress",
    estimated_fare: 150,
    estimated_distance: 12,
    estimated_duration: 45,
    priority_level: "normal",
    special_instructions: "Ring doorbell twice",
    first_name: "Raj",
    last_name: "Kumar",
    contact_number: "+9876543210",
    plate_number: "ABC-1234",
    type: "motorcycle"
  }
}
```

### 6. Create Booking
```
POST /api/bookings

Body:
{
  booking_type: "delivery",              // Required
  pickup_address: "123 Main St",         // Required
  delivery_address: "456 Oak Ave",       // Required
  parcel_description: "Electronics",     // Optional
  parcel_weight: 2.5,                    // Optional (kg)
  customer_name: "John Doe",             // Required
  customer_phone: "+1234567890",         // Required
  requested_pickup_time: "2024-03-12T14:00:00"  // Optional
}

Response (201):
{
  message: "Booking created successfully",
  bookingId: 5,
  estimated_fare: 150,
  estimated_duration: 45
}
```

### 7. Update Booking Status
```
PATCH /api/bookings/:id

Example: PATCH /api/bookings/5

Body:
{
  status: "completed"  // or "cancelled", "in_progress"
}

Response:
{
  message: "Booking updated successfully"
}
```

---

## Integration with React Native App

### Redux Actions to Dispatch
These actions are already set up in your Redux store:

```javascript
// Fetch wallet data
dispatch({ type: 'FETCH_WALLET' });

// Fetch active bookings
dispatch({ type: 'FETCH_ACTIVE_BOOKINGS' });

// Fetch completed bookings
dispatch({ type: 'FETCH_COMPLETED_BOOKINGS' });

// Create new booking
dispatch({
  type: 'CREATE_BOOKING',
  payload: {
    booking_type: 'delivery',
    pickup_address: '123 Main St',
    delivery_address: '456 Oak Ave',
    parcel_description: 'Electronics',
    customer_name: 'John Doe',
    customer_phone: '+1234567890'
  }
});
```

### Redux State Selectors
```javascript
const { balance, pending, transactions } = useSelector(state => state.bookings.wallet);
const { data: activeBookings, isLoading } = useSelector(state => state.bookings.activeBookings);
const { data: completedBookings } = useSelector(state => state.bookings.completedBookings);
```

---

## Error Handling

All endpoints return errors in this format:
```json
{
  "error": "Error message here"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad request (missing fields)
- `401` - Unauthorized (invalid token)
- `404` - Not found
- `500` - Server error

---

## Backend Location
```
C:\Users\tenne\my-backend\index.js
```

All endpoints are implemented and ready to use!

---

Updated: March 12, 2026
