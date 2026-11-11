
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { addPPPoEAccount } = require('./mikrotik');

const app = express();

const PORT = Number(process.env.PORT) || 5000;

const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

// CORS configuration
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Parse JSON requests
app.use(express.json({ limit: '10kb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Backend is running',
  });
});

// Create PPPoE account
app.post('/api/pppoe', async (req, res) => {
  const {
    username,
    password,
    profile = 'default',
  } = req.body || {};

  // Validate request
  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof profile !== 'string' ||
    !/^[a-zA-Z0-9_.@-]{1,64}$/.test(username) ||
    password.length < 8 ||
    password.length > 128 ||
    !/^[a-zA-Z0-9_.-]{1,64}$/.test(profile)
  ) {
    return res.status(400).json({
      message: 'Invalid username, password or profile',
    });
  }

  try {
    console.log('Creating PPPoE account:', {
      username,
      profile,
    });

    const account = await addPPPoEAccount({
      username,
      password,
      profile,
    });

    console.log('PPPoE account created:', username);

    return res.status(201).json({
      message: 'PPPoE account created successfully',
      account,
    });

  } catch (error) {
    // Log the complete error for troubleshooting
    console.error('MikroTik error details:', error);
    console.error('Error message:', error?.message);

    const status = error?.status === 409 ? 409 : 502;

    return res.status(status).json({
      message:
        status === 409
          ? error.message || 'Account already exists'
          : 'Could not create PPPoE account on MikroTik',
    });
  }
});

// Start backend
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  console.log(`Allowed frontend: ${FRONTEND_ORIGIN}`);
});
