# Technical Context

## Technology Stack

### Core Dependencies
```json
{
  "dependencies": {
    "react": "^19.0.0",
    "typescript": "^5.0.0",
    "@mui/material": "^6.4.6",
    "@mui/icons-material": "^6.4.6",
    "@emotion/react": "latest",
    "@emotion/styled": "latest",
    "react-router-dom": "^7.2.0",
    "axios": "^1.8.1",
    "@tanstack/react-query": "^5.67.1"
  }
}
```

### Development Environment
- Node.js (Latest LTS)
- npm package manager
- VSCode with TypeScript support
- Git version control
- Chrome DevTools

## Configuration

### Environment Variables
```env
# Required
REACT_APP_SPOONACULAR_API_KEY=your_api_key_here

# Optional
REACT_APP_API_BASE_URL=https://api.spoonacular.com
REACT_APP_CACHE_DURATION=300000
```

### Theme Configuration
```typescript
// MUI v6.4.6 Theme Setup
const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff4081',
      dark: '#c51162',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: '48px',
        },
      },
    },
  },
});
```

## Technical Constraints

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features
- CSS Grid and Flexbox
- Local Storage API
- Service Workers

### Performance Requirements
- Initial load under 2 seconds
- Time to Interactive under 3 seconds
- First Contentful Paint under 1 second
- Core Web Vitals compliance

### API Limitations
- Spoonacular API rate limits
- Request caching requirements
- Error handling needs
- Response size considerations

## Development Setup

### Project Initialization
```bash
# Create new project
npx create-react-app meal-planner --template typescript

# Install dependencies
npm install @mui/material@6.4.6 @emotion/react @emotion/styled
npm install @mui/icons-material@6.4.6
npm install react-router-dom@7.2.0
npm install axios@1.8.1
npm install @tanstack/react-query@5.67.1
```

### Git Configuration
```gitignore
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE specific files
.idea
.vscode
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
```

## Asset Configuration

### Favicon Setup
- Multiple sizes (16x16 to 64x64)
- Cache-busting version parameter
- High-quality source image
- Browser-specific formats

```html
<link rel="icon" href="%PUBLIC_URL%/favicon.ico?v=5" />
```

### Browser Caching
```typescript
// Cache Control Headers
{
  'Cache-Control': 'public, max-age=31536000, immutable' // Static
  'Cache-Control': 'no-cache' // Dynamic
}
```

## Development Workflow

### Scripts
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --watchAll=false",
    "eject": "react-scripts eject"
  }
}
```

### Code Quality Tools
- ESLint for code linting
- Prettier for code formatting
- TypeScript strict mode
- React Testing Library
- Jest for unit testing

## Production Considerations

### Build Optimization
- Code splitting
- Tree shaking
- Asset optimization
- Compression

### Deployment Checklist
- Environment variables
- Build verification
- Cache configuration
- Performance testing
- Cross-browser testing
- Accessibility validation

### Monitoring
- Error tracking setup
- Performance monitoring
- Usage analytics
- Console logging

## Security Measures

### API Security
- Environment variables
- CORS configuration
- Rate limiting
- Error handling

### Data Security
- Local storage encryption
- Secure data transmission
- Input validation
- XSS prevention

## Testing Requirements

### Unit Testing
- Component testing
- Hook testing
- Utility testing
- Context testing

### Integration Testing
- Page routing
- Data flow
- API integration
- State management

### End-to-End Testing
- User workflows
- Error scenarios
- Performance testing
- Accessibility testing
