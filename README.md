# AIMCS Backend

A Node.js backend API for the AIMCS (AI Model Control System) project, deployed as a containerized application on Azure Container Apps.

## 🚀 Deployment

**Production URL**: https://aimcs-backend-eastus2.greenwave-bb2ac4ae.eastus2.azurecontainerapps.io/

**Region**: East US 2  
**Resource Group**: `aimcs-rg-eastus2`  
**Container Registry**: `aimcsacreastus2.azurecr.io`  
**Container App**: `aimcs-backend-eastus2`

## 🔗 Frontend Integration

### Connection Details

**Production Backend URL:**
```
https://aimcs-backend-eastus2.greenwave-bb2ac4ae.eastus2.azurecontainerapps.io
```

**Local Development Backend URL:**
```
http://localhost:3000
```

### CORS Configuration

The backend is configured to accept requests from the following origins:
- `https://aimcs.net` (Production domain)
- `https://aimcs-frontend.azurewebsites.net` (Azure frontend)
- `http://localhost:5173` (Local development)
- `http://localhost:3000` (Local backend)

### Frontend Configuration

Add the following environment variables to your frontend project:

```env
# Production
VITE_API_BASE_URL=https://aimcs-backend-eastus2.greenwave-bb2ac4ae.eastus2.azurecontainerapps.io

# Local Development
VITE_API_BASE_URL=http://localhost:3000
```

### API Integration Example

```javascript
// Frontend API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Health check
const checkHealth = async () => {
  const response = await fetch(`${API_BASE_URL}/health`);
  return response.json();
};

// Get available models
const getModels = async () => {
  const response = await fetch(`${API_BASE_URL}/api/models`);
  return response.json();
};

// Send chat message
const sendChatMessage = async (message, model = 'gpt-4o-mini') => {
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, model }),
  });
  return response.json();
};
```

### Request Headers

The backend accepts the following headers:
- `Content-Type: application/json`
- `Authorization` (for future authentication)
- `X-Requested-With`

### Error Handling

The backend returns standard HTTP status codes:
- `200` - Success
- `400` - Bad Request (missing required fields)
- `404` - Endpoint not found
- `500` - Internal server error

Error responses include:
```json
{
  "error": "Error message",
  "message": "Detailed error information (development only)"
}
```

## 📋 API Endpoints

### Health Check
- `GET /health` - Service health status
  ```json
  {
    "status": "OK",
    "timestamp": "2025-06-27T03:41:06.946Z",
    "service": "AIMCS Backend API",
    "version": "1.0.0"
  }
  ```

### API Information
- `GET /api` - API overview and available endpoints
  ```json
  {
    "message": "Welcome to AIMCS Backend API",
    "version": "1.0.0",
    "endpoints": {
      "health": "/health",
      "test": "/api/test",
      "models": "/api/models",
      "chat": "/api/chat"
    }
  }
  ```

### Test Endpoints
- `GET /api/test` - Basic connectivity test
  ```json
  {
    "message": "Backend API is working!",
    "timestamp": "2025-06-27T03:38:44.253Z",
    "environment": "development"
  }
  ```

### AI Model Management
- `GET /api/models` - List available AI models
  ```json
  {
    "models": [
      {
        "id": "gpt-4o-mini",
        "name": "GPT-4o Mini",
        "provider": "OpenAI",
        "status": "available"
      },
      {
        "id": "claude-3-haiku",
        "name": "Claude 3 Haiku",
        "provider": "Anthropic",
        "status": "available"
      }
    ]
  }
  ```

### Chat Functionality
- `POST /api/chat` - AI chat endpoint
  **Request:**
  ```json
  {
    "message": "Hello, how are you?",
    "model": "gpt-4o-mini"
  }
  ```
  **Response:**
  ```json
  {
    "response": "This is a placeholder response from the backend. You said: \"Hello, how are you?\"",
    "model": "gpt-4o-mini",
    "timestamp": "2025-06-27T03:38:44.253Z"
  }
  ```

## 🧪 Testing Connection

### Test Backend Health
```bash
# Production
curl https://aimcs-backend-eastus2.greenwave-bb2ac4ae.eastus2.azurecontainerapps.io/health

# Local Development
curl http://localhost:3000/health
```

### Test API Endpoints
```bash
# Get API info
curl https://aimcs-backend-eastus2.greenwave-bb2ac4ae.eastus2.azurecontainerapps.io/api

# Get available models
curl https://aimcs-backend-eastus2.greenwave-bb2ac4ae.eastus2.azurecontainerapps.io/api/models

# Test chat endpoint
curl -X POST https://aimcs-backend-eastus2.greenwave-bb2ac4ae.eastus2.azurecontainerapps.io/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, backend!", "model": "gpt-4o-mini"}'
```

### Frontend Connection Test
```javascript
// Test if backend is reachable from frontend
const testBackendConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend connected:', data);
      return true;
    }
  } catch (error) {
    console.error('❌ Backend connection failed:', error);
    return false;
  }
};
```

## 🔧 Local Development

### Prerequisites
- Node.js 20+
- npm

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

### Environment Variables
Create a `.env` file with:
```
PORT=3000
NODE_ENV=development
```

## 🐳 Docker

### Build Image
```bash
docker build -t aimcs-backend .
```

### Run Container
```bash
docker run -p 3000:3000 aimcs-backend
```

## 📦 Dependencies

### Production
- `express`: Web framework
- `cors`: Cross-origin resource sharing
- `helmet`: Security middleware
- `morgan`: HTTP request logger
- `dotenv`: Environment variable management

### Development
- `nodemon`: Auto-restart on file changes

## 🔒 Security

- CORS configured for frontend domains
- Helmet.js security headers
- Non-root user in Docker container
- Health check endpoint for monitoring

## 📊 Monitoring

- Health check endpoint: `/health`
- Request logging with Morgan
- Container health checks configured

## 🚀 Deployment Commands

### Azure Container Registry Build
```bash
az acr build --registry aimcsacreastus2 --image aimcs-backend:latest .
```

### Container App Deployment
```bash
az containerapp create \
  --name aimcs-backend-eastus2 \
  --resource-group aimcs-rg-eastus2 \
  --environment aimcs-env-eastus2 \
  --image aimcsacreastus2.azurecr.io/aimcs-backend:latest \
  --target-port 3000 \
  --ingress external
```

## 📝 License

ISC License

## 🛠️ Technology Stack

- **Runtime**: Node.js 20 (Alpine Linux)
- **Framework**: Express.js 5.1.0
- **Security**: Helmet.js, CORS
- **Logging**: Morgan
- **Containerization**: Docker
- **Deployment**: Azure Container Apps

## 🚨 Troubleshooting

### Common Frontend Connection Issues

**CORS Errors:**
- Ensure your frontend domain is in the CORS allowed origins
- Check that you're using the correct protocol (http vs https)
- Verify the backend URL is correct

**Connection Timeout:**
- Check if the backend is running (`curl /health`)
- Verify network connectivity
- Check firewall settings

**404 Errors:**
- Ensure the API endpoint path is correct
- Check that the backend is deployed and running
- Verify the base URL configuration

**500 Server Errors:**
- Check backend logs for detailed error information
- Verify request payload format
- Ensure all required fields are provided

### Debugging Steps

1. **Test Backend Health:**
   ```bash
   curl https://aimcs-backend-eastus2.greenwave-bb2ac4ae.eastus2.azurecontainerapps.io/health
   ```

2. **Check CORS Configuration:**
   ```bash
   curl -H "Origin: https://your-frontend-domain.com" \
        -H "Access-Control-Request-Method: GET" \
        -H "Access-Control-Request-Headers: Content-Type" \
        -X OPTIONS \
        https://aimcs-backend-eastus2.greenwave-bb2ac4ae.eastus2.azurecontainerapps.io/health
   ```

3. **Verify Environment Variables:**
   ```javascript
   console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
   ```

4. **Check Network Tab:**
   - Open browser developer tools
   - Check Network tab for failed requests
   - Verify request/response headers