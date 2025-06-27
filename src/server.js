const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration for frontend
app.use(cors({
  origin: [
    'https://aimcs.net',
    'https://aimcs-frontend.azurewebsites.net',
    'https://aimcs-frontend-eastus2.azurewebsites.net',
    'http://localhost:5173', // For local development
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'AIMCS Backend API',
    version: '1.0.0'
  });
});

// API routes
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to AIMCS Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      test: '/api/test',
      models: '/api/models',
      chat: '/api/chat'
    }
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Backend API is working!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Models endpoint (placeholder for AI model management)
app.get('/api/models', (req, res) => {
  res.json({
    models: [
      {
        id: 'gpt-4o-mini',
        name: 'GPT-4o Mini',
        provider: 'OpenAI',
        status: 'available'
      },
      {
        id: 'claude-3-haiku',
        name: 'Claude 3 Haiku',
        provider: 'Anthropic',
        status: 'available'
      }
    ]
  });
});

// Chat endpoint (placeholder for AI chat functionality)
app.post('/api/chat', (req, res) => {
  const { message, model = 'gpt-4o-mini' } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  // Placeholder response - will be replaced with actual AI integration
  res.json({
    response: `This is a placeholder response from the backend. You said: "${message}"`,
    model: model,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('/', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AIMCS Backend API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API docs: http://localhost:${PORT}/api`);
});

module.exports = app;
