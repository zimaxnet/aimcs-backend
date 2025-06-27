# AIMCS Backend

A Node.js backend API for the AIMCS (AI Model Control System) project, deployed as a containerized application on Azure Container Apps.

## 🚀 Deployment

**Production URL**: https://aimcs-backend-eastus2.greenwave-bb2ac4ae.eastus2.azurecontainerapps.io/

**Region**: East US 2  
**Resource Group**: `aimcs-rg-eastus2`  
**Container Registry**: `aimcsacreastus2.azurecr.io`  
**Container App**: `aimcs-backend-eastus2`

## 🛠️ Technology Stack

- **Runtime**: Node.js 20 (Alpine Linux)
- **Framework**: Express.js 5.1.0
- **Security**: Helmet.js, CORS
- **Logging**: Morgan
- **Containerization**: Docker
- **Deployment**: Azure Container Apps

## 📋 API Endpoints

### Health Check
- `GET /health` - Service health status

### API Information
- `GET /api` - API overview and available endpoints

### Test Endpoints
- `GET /api/test` - Basic connectivity test

### AI Model Management
- `GET /api/models` - List available AI models

### Chat Functionality
- `POST /api/chat` - AI chat endpoint (placeholder)

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