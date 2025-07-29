# FrozenBull Frontend

React application configured for AWS S3 static hosting with API Gateway integration.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- AWS CLI configured
- S3 bucket for hosting

### Installation
```bash
npm install
```

### Development
```bash
npm start
```

### Build
```bash
npm run build
```

### Deploy to S3
```bash
npm run deploy
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Loading/        # Loading component
│   └── ErrorBoundary/  # Error boundary component
├── pages/              # Page components
├── services/           # API services
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── styles/             # Global styles
├── contexts/           # React contexts
├── config/             # Configuration files
└── assets/             # Static assets
    ├── images/         # Image files
    └── icons/          # Icon files
```

## 🔧 Configuration

### Environment Variables
Create `.env.production` and `.env.development` files:

```env
REACT_APP_API_URL=https://your-api-gateway-url
REACT_APP_AWS_REGION=us-east-1
REACT_APP_S3_BUCKET=your-bucket-name
```

### AWS S3 Bucket Setup
1. Create S3 bucket
2. Enable static website hosting
3. Set bucket policy for public read access
4. Configure CORS if needed

### API Gateway Integration
- Configure base URL in `src/config/api.js`
- API services in `src/services/`
- Custom hooks for API calls in `src/hooks/`

## 📦 Scripts

- `npm start` - Development server
- `npm run build` - Production build
- `npm run test` - Run tests
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier
- `npm run deploy` - Build and deploy to S3

## 🎯 Features

- ✅ React 18+ with hooks
- ✅ React Router for navigation
- ✅ Axios for API calls
- ✅ Custom hooks for API integration
- ✅ Error boundaries
- ✅ Loading states
- ✅ Environment configuration
- ✅ ESLint + Prettier
- ✅ S3 deployment scripts
- ✅ Optimized caching headers

## 🔄 Deployment Process

1. **Build**: `npm run build` creates optimized production build
2. **Static Assets**: Uploaded with long cache headers (1 year)
3. **HTML Files**: Uploaded with no-cache headers
4. **CloudFront**: Optional invalidation for CDN

## 🛡️ Best Practices

- Use environment variables for configuration
- Implement error boundaries
- Custom hooks for API logic
- Proper loading states
- Optimized caching strategy
- Code splitting with React.lazy()
- SEO optimization with meta tags
