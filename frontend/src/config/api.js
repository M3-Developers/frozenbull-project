// API Gateway configuration
const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL || 'https://your-api-id.execute-api.region.amazonaws.com/prod',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
};

// Environment variables
export const ENV = {
  API_URL: process.env.REACT_APP_API_URL,
  AWS_REGION: process.env.REACT_APP_AWS_REGION || 'us-east-1',
  ENVIRONMENT: process.env.NODE_ENV || 'development',
  S3_BUCKET: process.env.REACT_APP_S3_BUCKET || 'your-bucket-name'
};

export default API_CONFIG;
