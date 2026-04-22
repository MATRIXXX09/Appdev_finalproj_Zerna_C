# HABAL-HABAL Database Reference

## Overview
The database (`db_uiko`) contains all the data needed for your logistics and transportation app. All API endpoints are protected with JWT authentication.

---

## Available Tables & Structure

### **1. USERS** (Customer accounts)
- `id` (int) - Primary key
- `firstName` (varchar) - First name
- `lastName` (varchar) - Last name
- `username` (varchar) - Unique username
- `email` (varchar) - Email address
- `password` (varchar) - Hashed password
- `phoneNumber` (varchar) - Contact number

**Use Case:** Login/Register, User Profile, Account Management

---

### **2. BOOKING** (Customer orders/rides)
- `id` (int) - Primary key
- `customer_id` (int) - References `users.id`
- `assigned_driver_id` (int) - References `rider.id`
- `created_by_id` (int) - Admin/system user ID
- `booking_type` (varchar) - 'delivery', 'habal-habal', 'logistics'
- `pickup_address` (varchar) - Pickup location
- `delivery_address` (varchar) - Delivery location
- `customer_name` (varchar) - Name of customer
- `customer_phone` (varchar) - Contact number
- `parcel_description` (longtext) - What's being transported
- `parcel_type` (varchar) - Type of parcel (e.g., fragile, food)
- `parcel_weight` (double) - Weight in kg
- `status` (varchar) - 'pending', 'accepted', 'in_progress', 'completed', 'cancelled'
- `requested_pickup_time` (datetime) - When to pick up
- `requested_delivery_time` (datetime) - When to deliver
- `created_at` (datetime) - Booking creation time
- `updated_at` (datetime) - Last update
- `assigned_at` (datetime) - When driver assigned
- `estimated_distance` (double) - Estimated distance in km
- `estimated_duration` (double) - Estimated time in minutes
- `estimated_fare` (double) - Estimated cost
- `priority_level` (varchar) - 'normal', 'urgent', 'express'
- `special_instructions` (longtext) - Special delivery notes
- `cancellation_reason` (longtext) - Why booking was cancelled

**Use Case:** Dashboard bookings, Wallet transactions, Tracker active/completed rides

---

### **3. RIDER** (Drivers/delivery personnel)
- `id` (int) - Primary key
- `user_id` (int) - References `users.id`
- `created_by_id` (int) - Who registered this rider
- `first_name` (varchar) - First name
- `last_name` (varchar) - Last name
- `contact_number` (varchar) - Phone number
- `license_number` (varchar) - Driver's license
- `vehicle_type` (varchar) - Type of vehicle
- `plate_number` (varchar) - Vehicle plate
- `is_available` (tinyint) - 0 or 1 (availability status)
- `created_at` (datetime) - Registration date
- `status` (varchar) - 'active', 'inactive', 'suspended'
- `name` (varchar) - Full name

**Use Case:** Driver assignment, Tracking driver info

---

### **4. VEHICLE** (Delivery vehicles)
- `id` (int) - Primary key
- `type` (varchar) - 'motorcycle', 'car', 'truck', etc.
- `model` (varchar) - Vehicle model
- `plate_number` (varchar) - License plate
- `is_available` (tinyint) - 0 or 1
- `capacity` (varchar) - Cargo capacity
- `current_location` (varchar) - Current GPS location
- `created_at` (datetime) - Registration date
- `rider_id` (int) - References `rider.id`
- `created_by_id` (int) - Who registered this vehicle

**Use Case:** Vehicle info for bookings, Fleet management

---

### **5. SHIPMENT** (Shipment tracking)
- `id` (int) - Primary key
- `created_by_id` (int) - Who created shipment
- `tracking_number` (varchar) - Unique tracking ID
- `origin` (varchar) - Origin location
- `destination` (varchar) - Destination location
- `status` (varchar) - Shipment status
- `sender_name` (varchar) - Sender name
- `created_at` (datetime) - Creation date
- `updated_at` (datetime) - Last update

**Use Case:** Shipment tracking, Delivery history

---

### **6. PARCEL_REQUEST** (Customer parcel delivery requests)
- `id` (int) - Primary key
- `customer_id` (int) - References `users.id`
- `accepted_by_id` (int) - Driver who accepted
- `request_type` (varchar) - Type of request
- `parcel_description` (varchar) - What's being delivered
- `pickup_address` (varchar) - Pick up from
- `delivery_address` (varchar) - Deliver to
- `status` (varchar) - 'pending', 'accepted', 'completed'
- `created_at` (datetime) - Request date
- `accepted_at` (datetime) - When accepted
- `notes` (longtext) - Additional notes
- `contact_phone` (varchar) - Contact number

**Use Case:** Parcel requests, Delivery management

---

### **7. ACTIVITY_LOG** (Audit trail)
- `id` (int) - Primary key
- `user_id` (int) - User who performed action
- `username` (varchar) - Username
- `role` (varchar) - User role
- `action` (varchar) - Action performed
- `target_data` (longtext) - Data affected
- `date_time` (datetime) - When action occurred

**Use Case:** Admin logging, Activity tracking

---

### **8. MESSAGES** (System messages)
- `id` (int) - Primary key
- `sender_id` (int) - Who sent message
- `admin_id` (int) - Admin recipient
- `sender_email` (varchar) - Sender email
- `subject` (varchar) - Message subject
- `message` (longtext) - Message content
- `created_at` (datetime) - Sent date
- `read_at` (datetime) - Read date

**Use Case:** In-app messaging, Notifications

---

### **9. COMPLAINT** (Customer complaints)
- `id` (int) - Primary key
- `created_by_id` (int) - User who filed complaint
- `customer_name` (varchar) - Name of customer
- `message` (longtext) - Complaint details
- `status` (varchar) - 'open', 'resolved', 'closed'
- `created_at` (datetime) - Filed date

**Use Case:** Customer support, Issue tracking

---

## Available API Endpoints

All endpoints require JWT token in header: `Authorization: Bearer <token>`

### Authentication
- `POST /api/register` - Create new account
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user

### User
- `GET /api/profile` - Get current user profile

### Wallet & Transactions
- `GET /api/wallet` - Get wallet balance and transaction history

### Bookings
- `GET /api/bookings/active` - Get active bookings (pending, in_progress)
- `GET /api/bookings/completed` - Get completed/cancelled bookings
- `GET /api/bookings/:id` - Get specific booking details
- `POST /api/bookings` - Create new booking
- `PATCH /api/bookings/:id` - Update booking status

---

## Data Relationships

```
users (1) ──→ booking (many)
users (1) ──→ rider (1)
rider (1) ──→ vehicle (many)
rider (1) ──→ booking (assigned_driver)
parcel_request ──→ users (customer)
shipment ──→ users (creator)
```

---

## Implementation Ready Tables

### For Current Features:
✅ **Users** - Login/Register/Profile
✅ **Booking** - Active/Completed bookings, Wallet
✅ **Rider & Vehicle** - Driver info for bookings

### For Future Features:
📌 **PARCEL_REQUEST** - Custom parcel delivery requests
📌 **SHIPMENT** - Track shipments with tracking number
📌 **MESSAGES** - In-app messaging system
📌 **COMPLAINT** - Customer support system
📌 **ACTIVITY_LOG** - Admin audit trail

---

## Example: Creating a Booking

```javascript
// Frontend (React Native)
dispatch({
  type: CREATE_BOOKING,
  payload: {
    booking_type: 'delivery',
    pickup_address: '123 Main St',
    delivery_address: '456 Oak Ave',
    parcel_description: 'Electronics',
    customer_name: 'John Doe',
    customer_phone: '555-1234'
  }
});

// Backend automatically:
// 1. Inserts into `booking` table
// 2. Sets status = 'pending'
// 3. Returns booking_id and estimated_fare
// 4. Can be tracked via GET /api/bookings/active
```

---

## Database Connection Details
- Host: `127.0.0.1`
- Database: `db_uiko`
- User: `user_uiko`
- Port: `3306`

---

Generated: March 12, 2026
Last Updated: Today
