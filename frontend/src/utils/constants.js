// API Endpoints
export const API_ENDPOINTS = {
  USERS: '/users',
  AUTH: '/auth',
  PRODUCTS: '/products',
  ORDERS: '/orders',
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  THEME: 'theme',
  LANGUAGE: 'language',
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
};

// Common Messages
export const MESSAGES = {
  LOADING: 'Carregando...',
  ERROR_GENERIC: 'Algo deu errado. Tente novamente.',
  ERROR_NETWORK: 'Erro de conexão. Verifique sua internet.',
  SUCCESS_SAVE: 'Salvo com sucesso!',
  SUCCESS_DELETE: 'Excluído com sucesso!',
  CONFIRM_DELETE: 'Tem certeza que deseja excluir?',
};

// Validation Rules
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
  CPF_REGEX: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  MIN_PASSWORD_LENGTH: 8,
};
