// Load environment variables from .env file
require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
// Import Express framework
const express = require('express');
// Import bcrypt for password hashing (security)
const bcrypt = require('bcryptjs');
// Import JWT for token creation/verification
const jwt = require('jsonwebtoken');
// Import CORS (allow cross-origin requests from mobile app)
const cors = require('cors');
// Import database connection
const db = require('./db');

// Initialize Express app
const app = express();
// Enable CORS (allow requests from different domains/devices)
app.use(cors());
// Parse incoming JSON request body
app.use(express.json());

// ============================================================
// ENDPOINT 1: Test Backend Connection
// ============================================================
// GET /api/test-jwt
// Purpose: Simple endpoint to check if backend is running
// No authentication needed
app.get('/api/test-jwt', (req, res) => {
  // Send simple JSON response
  res.json({ message: 'Backend connected!' });
});

// ============================================================
// ENDPOINT 2: User Registration
// ============================================================
// POST /api/register
// Request body: { firstName, lastName, username, email, password, phoneNumber }
// Response: { message: 'User registered!' }
// Errors: 400 = validation error or duplicate email
app.post('/api/register', async (req, res) => {
  // Extract user data from request body
  const { firstName, lastName, username, email, password, phoneNumber } = req.body;
  
  // Validate required fields
  if (!email || !password || !username) {
    return res.status(400).json({ error: 'Email, password and username are required' });
  }
  
  try {
    // Hash password before saving (security - never store plain passwords)
    // bcrypt.hash(password, saltRounds)
    // saltRounds = 10 = security vs speed tradeoff
    const hashed = await bcrypt.hash(password, 10);
    
    // Insert new user into database
    await db.query(
      'INSERT INTO users (firstName, lastName, username, email, password, phoneNumber) VALUES (?, ?, ?, ?, ?, ?)',
      [firstName, lastName, username, email, hashed, phoneNumber]
    );
    
    // Send success response
    res.json({ message: 'User registered!' });
  } catch (err) {
    // Error handling (duplicate email, database error, etc.)
    res.status(400).json({ error: err.message });
  }
});

// ============================================================
// ENDPOINT 3: User Login
// ============================================================
// POST /api/login
// Request body: { email, password }
// Success response (200): { token, user: { id, email, username, firstName, lastName } }
// Error responses: 404 = user not found, 401 = wrong password
app.post('/api/login', async (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body;
  
  try {
    // STEP 1: Find user in database by email
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    
    // Check if user exists
    if (!rows.length) return res.status(404).json({ error: 'User not found' });

    // STEP 2: Verify password
    // bcrypt.compare(plain password, hashed password from DB)
    // Returns true if password matches, false if wrong
    const valid = await bcrypt.compare(password, rows[0].password);
    if (!valid) return res.status(401).json({ error: 'Wrong password' });

    // STEP 3: Create JWT token (valid for 7 days)
    // jwt.sign(payload, secret_key, options)
    // payload = { id: userId } identifies the user when token is verified later
    const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    // STEP 4: Send token + user data to frontend (mobile app)
    res.json({
      token,  // JWT token - stored in Redux, sent with every protected request
      user: {
        id: rows[0].id,
        email: rows[0].email,
        username: rows[0].username,
        firstName: rows[0].firstName,
        lastName: rows[0].lastName,
      }
    });
  } catch (err) {
    // Server error
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// ENDPOINT 4: Logout
// ============================================================
// POST /api/logout
// Purpose: Backend cleanup on logout
// No sensitive data needed
app.post('/api/logout', (req, res) => {
  // Send logout success message
  res.json({ message: 'Logged out successfully' });
  // NOTE: Client-side Redux logout clears token automatically
  // This endpoint is mainly for backend logging/audit purposes
});

// ============================================================
// MIDDLEWARE: Verify JWT Token
// ============================================================
// Used on protected endpoints to ensure user is authenticated
// Runs BEFORE the endpoint handler
// Flow: Check Authorization header → Verify token → Attach userId → Call next()
const verifyToken = (req, res, next) => {
  // Extract token from Authorization header
  // Header format: "Authorization: Bearer {token}"
  // Split by space: ["Bearer", "{token}"]
  // [1] gets the token part
  const token = req.headers.authorization?.split(' ')[1];
  
  // If no token provided, return 401 Unauthorized
  if (!token) return res.status(401).json({ error: 'No token provided' });
  
  try {
    // Verify token signature
    // jwt.verify(token, secret_key)
    // If token is valid: returns decoded payload { id, iat, exp }
    // If token invalid/expired: throws error
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach userId to request object
    // Available in route handler via req.userId
    req.userId = decoded.id;
    
    // Call next middleware/route handler
    next();
  } catch (err) {
    // Token invalid or expired
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ============================================================
// ENDPOINT 5: Get User Profile (PROTECTED)
// ============================================================
// GET /api/profile
// Protected: Requires valid JWT token in Authorization header
// Response: { user: { id, firstName, lastName, email, phoneNumber, username } }
app.get('/api/profile', verifyToken, async (req, res) => {
  try {
    // Query user from database using req.userId (from token)
    // verifyToken middleware already verified token and set req.userId
    const [user] = await db.query(
      'SELECT id, firstName, lastName, email, phoneNumber, username FROM users WHERE id = ?',
      [req.userId]
    );
    
    // Check if user found
    if (!user.length) return res.status(404).json({ error: 'User not found' });
    
    // Send user profile data
    res.json({ user: user[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// ENDPOINT 6: Get Wallet (PROTECTED)
// ============================================================
// GET /api/wallet
// Protected: Requires valid JWT token
// Purpose: Calculate user's wallet balance and transaction history
// Response: { balance, pending, totalBookings, transactions }
app.get('/api/wallet', verifyToken, async (req, res) => {
  try {
    // Query all bookings for this user from database
    const [bookings] = await db.query(
      `SELECT id, estimated_fare, status, pickup_address, delivery_address, created_at 
       FROM booking WHERE customer_id = ? ORDER BY created_at DESC`,
      [req.userId]
    );
    
    // Calculate balance from completed bookings
    // filter() = keep only bookings with status 'completed'
    // reduce() = sum all estimated_fare values
    const completedTotal = bookings
      .filter(b => b.status === 'completed')
      .reduce((sum, b) => sum + (b.estimated_fare || 0), 0);
    
    // Calculate pending bookings (not yet completed)
    // Keep only bookings with status 'pending' or 'accepted'
    const pendingTotal = bookings
      .filter(b => b.status === 'pending' || b.status === 'accepted')
      .reduce((sum, b) => sum + (b.estimated_fare || 0), 0);
    
    // Send wallet data to frontend
    res.json({
      balance: completedTotal,      // Sum of completed bookings
      pending: pendingTotal,        // Sum of pending/accepted bookings
      totalBookings: bookings.length,
      // Get last 10 transactions and map to simplified format
      transactions: bookings.slice(0, 10).map(b => ({
        id: b.id,
        amount: b.estimated_fare || 0,
        status: b.status,
        from: b.pickup_address,
        to: b.delivery_address,
        date: b.created_at
      }))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// ENDPOINT 7: Get Active Bookings (PROTECTED)
// ============================================================
// GET /api/bookings/active
// Protected: Requires valid JWT token
// Purpose: Get user's active bookings (pending, accepted, in_progress)
// Response: { data: [bookings], count: number }
app.get('/api/bookings/active', verifyToken, async (req, res) => {
  try {
    // Query active bookings for this user
    // JOIN rider and vehicle tables to get driver/vehicle info
    // WHERE filters for active statuses only
    const [bookings] = await db.query(
      `SELECT b.id, b.booking_type, b.pickup_address, b.delivery_address, b.parcel_description, 
              b.estimated_fare, b.status, b.requested_pickup_time, b.estimated_duration,
              b.created_at, r.first_name, r.last_name, v.plate_number, v.type
       FROM booking b
       LEFT JOIN rider r ON b.assigned_driver_id = r.id
       LEFT JOIN vehicle v ON r.id = v.rider_id
       WHERE b.customer_id = ? AND b.status IN ('pending', 'accepted', 'in_progress')
       ORDER BY b.created_at DESC`,
      [req.userId]
    );
    
    // Send bookings to frontend
    res.json({ 
      data: bookings,           // Array of booking objects
      count: bookings.length    // Total count
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET COMPLETED BOOKINGS
app.get('/api/bookings/completed', verifyToken, async (req, res) => {
  try {
    const [bookings] = await db.query(
      `SELECT b.id, b.booking_type, b.pickup_address, b.delivery_address, b.parcel_description,
              b.estimated_fare, b.status, b.updated_at, b.created_at,
              r.first_name, r.last_name, v.plate_number, v.type
       FROM booking b
       LEFT JOIN rider r ON b.assigned_driver_id = r.id
       LEFT JOIN vehicle v ON r.id = v.rider_id
       WHERE b.customer_id = ? AND b.status IN ('completed', 'cancelled')
       ORDER BY b.updated_at DESC
       LIMIT 50`,
      [req.userId]
    );
    
    res.json({ 
      data: bookings,
      count: bookings.length 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET BOOKING DETAILS
app.get('/api/bookings/:id', verifyToken, async (req, res) => {
  try {
    const [bookings] = await db.query(
      `SELECT b.*, r.first_name, r.last_name, r.contact_number, v.plate_number, v.type
       FROM booking b
       LEFT JOIN rider r ON b.assigned_driver_id = r.id
       LEFT JOIN vehicle v ON r.id = v.rider_id
       WHERE b.id = ? AND b.customer_id = ?`,
      [req.params.id, req.userId]
    );
    
    if (!bookings.length) return res.status(404).json({ error: 'Booking not found' });
    res.json({ booking: bookings[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE BOOKING
app.post('/api/bookings', verifyToken, async (req, res) => {
  const { booking_type, pickup_address, delivery_address, parcel_description, parcel_weight, customer_name, customer_phone, requested_pickup_time } = req.body;
  
  if (!pickup_address || !delivery_address || !customer_name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    // Calculate estimated fare (simple calculation: ₹50 base + ₹5 per km)
    const estimated_fare = 50 + (Math.random() * 100); // Placeholder
    const estimated_duration = Math.floor(Math.random() * 60) + 15; // 15-75 minutes
    
    const [result] = await db.query(
      `INSERT INTO booking (customer_id, booking_type, pickup_address, delivery_address, parcel_description, 
                           parcel_weight, customer_name, customer_phone, status, estimated_fare, 
                           estimated_duration, requested_pickup_time, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [req.userId, booking_type || 'delivery', pickup_address, delivery_address, parcel_description, 
       parcel_weight, customer_name, customer_phone, 'pending', estimated_fare, estimated_duration, requested_pickup_time]
    );
    
    res.json({ 
      message: 'Booking created successfully',
      bookingId: result.insertId,
      estimated_fare,
      estimated_duration
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE BOOKING STATUS
app.patch('/api/bookings/:id', verifyToken, async (req, res) => {
  const { status } = req.body;
  
  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }
  
  try {
    await db.query(
      'UPDATE booking SET status = ?, updated_at = NOW() WHERE id = ? AND customer_id = ?',
      [status, req.params.id, req.userId]
    );
    
    res.json({ message: 'Booking updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));