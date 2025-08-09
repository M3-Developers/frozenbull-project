# FrozenBull Frontend - AI Coding Instructions

## Project Overview
React 19 SPA designed for AWS S3 static hosting with API Gateway integration. Uses a mock-first development approach with automatic fallback patterns.

## Architecture Patterns

### API Integration Strategy
- **Mock-First Development**: `src/services/userService.js` implements automatic mock/real API switching based on `REACT_APP_USE_MOCK` environment variable
- **Fallback Pattern**: Real API calls automatically fall back to mock data on network errors
- **Service Layer**: All API calls go through `src/services/httpClient.js` (axios instance with interceptors) and domain-specific services like `userService.js`

### State Management & Hooks
- **useApiCall Hook**: Custom hook pattern in `src/hooks/useApiCall.js` provides loading/error/data states for any API call
- **Standardized API States**: All API calls return `{ data, loading, error, execute, refetch }` pattern
- **No Redux**: Uses React hooks and component state exclusively

### Error Handling
- **ErrorBoundary**: App-level error boundary wraps entire application in `src/App.js`
- **Development Mode**: Error boundaries show detailed stack traces in development
- **User-Friendly Fallbacks**: Production errors show reload button and simple messages

## Development Workflow

### Environment Configuration
- Development: `.env.development` with `REACT_APP_USE_MOCK=true`
- Production: `.env.production` with real API Gateway URLs
- API URL fallback: Defaults to mock if `REACT_APP_API_URL` contains placeholder text

### Key Commands
```bash
npm start              # Development with mock API
npm run build:prod     # Production build (CI=false to ignore warnings)
npm run deploy:auto    # Full PowerShell deployment to S3
npm run deploy:manual  # Build only, manual S3 upload
```

### S3 Deployment Strategy
- **Caching Headers**: Static assets get 1-year cache, HTML files get no-cache
- **PowerShell Automation**: `deploy-s3.ps1` handles AWS CLI validation, build, and sync
- **Dual Upload**: Separate commands for assets vs HTML to set different cache headers

## Code Conventions

### File Organization
- **Pages**: Top-level route components in `src/pages/`
- **Components**: Reusable UI in `src/components/` with co-located CSS
- **Services**: API layer in `src/services/` with consistent naming (e.g., `userService.js`)
- **Config**: Environment and API configuration in `src/config/api.js`

### Naming Standards Table

| Category | Convention | Examples | Notes |
|----------|------------|----------|-------|
| **Files** | | | |
| Components | PascalCase.js + matching .css | `Home.js`, `Loading.js`, `ErrorBoundary.js` | Folder structure: `components/Loading/Loading.js` |
| Services | camelCase + Service suffix | `userService.js`, `mockApiService.js`, `httpClient.js` | Domain-specific naming |
| Hooks | camelCase + use prefix | `useApiCall.js`, `useAsync.js` | Custom React hooks |
| Config | camelCase descriptive | `api.js`, `constants.js`, `helpers.js` | Configuration files |
| **JavaScript** | | | |
| Components | PascalCase | `const Home = () => {` | React component functions |
| Variables | camelCase | `apiResponse`, `apiMessage`, `users` | Descriptive names |
| Destructuring | camelCase with aliases | `{ data: apiResponse, loading, error, refetch }` | Clear aliasing pattern |
| Functions | camelCase | `userService.getUsers()` | Service methods |
| **CSS Classes** | | | |
| Component containers | kebab-case + component prefix | `home-container`, `users-section` | `[component]-[element]` |
| UI elements | kebab-case descriptive | `user-card`, `users-grid`, `no-users` | Purpose-based naming |
| State indicators | kebab-case + purpose | `error-container`, `api-status` | State-specific styling |
| **Content Language** | | | |
| Code/Technical | English | `loading`, `error`, `refetch`, `apiResponse` | All variables and functions |
| UI Text | Portuguese | `"Bem-vindo"`, `"Usuários"`, `"Recarregar"` | User-facing content |
| Comments | Portuguese | `// Extrair dados da resposta da API` | Developer comments |
| **Visual Elements** | | | |
| Status indicators | Emoji prefixes | `📡` API status, `📧` email, `👤` role, `🔄` reload | Consistent visual cues |
| Loading messages | Portuguese + "..." | `"Carregando usuários..."` | User feedback |
| Error messages | Portuguese descriptive | `"Erro ao carregar dados"` | Clear error communication |

### API Response Format
Mock and real APIs must return consistent format:
```javascript
{
  data: [...],           // Actual payload
  status: 200,           // HTTP status
  message: "Success"     // User-friendly message
}
```

## Integration Points

### AWS Services
- **S3 Static Hosting**: Bucket configuration with CORS for API Gateway
- **API Gateway**: Base URL configured in `src/config/api.js`
- **Authentication**: JWT tokens stored in localStorage, auto-attached via axios interceptors

### External Dependencies
- **Axios**: Pre-configured with interceptors for auth and error handling
- **React Router v6**: Single route structure, expandable in `src/App.js`
- **Testing Library**: Component testing setup with Jest

## Development Guidelines

### Adding New API Endpoints
1. Add method to appropriate service (e.g., `userService.js`)
2. Add corresponding mock implementation in `mockApiService.js`
3. Use `useApiCall` hook in components for consistent state management

### Deployment Best Practices
- Always test with `npm run build:prod` before deploying
- Use `deploy:auto` for PowerShell environments with AWS CLI configured
- Monitor S3 bucket policies and CORS settings for API integration

### Error Handling
- Wrap new pages in ErrorBoundary if creating separate route trees
- Use try/catch in services, let `useApiCall` handle component-level error states
- Provide network error fallbacks for critical user flows
