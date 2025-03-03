# Production Setup Guide

## Dark Mode Implementation

### 1. Theme Configuration
```typescript
// utils/theme.ts
import { createTheme, PaletteMode } from '@mui/material';

export const getTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
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
      default: mode === 'light' ? '#f5f5f5' : '#121212',
      paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
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

// Usage in App.tsx:
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const [mode, setMode] = useState<PaletteMode>(prefersDarkMode ? 'dark' : 'light');

useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleChange = (e: MediaQueryListEvent) => {
    setMode(e.matches ? 'dark' : 'light');
  };
  
  mediaQuery.addEventListener('change', handleChange);
  return () => mediaQuery.removeEventListener('change', handleChange);
}, []);
```

## Environment Setup

### 1. Environment Variables
Create a `.env.example` file to document required environment variables:
```env
# API Keys
REACT_APP_SPOONACULAR_API_KEY=your_api_key_here

# Optional Configuration
REACT_APP_API_BASE_URL=https://api.spoonacular.com
REACT_APP_CACHE_DURATION=300000
```

### 2. Git Configuration
Create a `.gitignore` file with common exclusions:
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
ehthumbs.db
Thumbs.db
```

## Production Considerations

### 1. Performance Optimization
- Enable gzip compression on the server
- Implement code splitting using React.lazy and Suspense
- Use production builds with `npm run build`
- Configure proper cache headers for static assets

### 2. Security
- Keep dependencies updated
- Implement proper CSP headers
- Never commit API keys to version control
- Use environment variables for sensitive data

### 3. Monitoring
- Implement error tracking (e.g., Sentry)
- Add performance monitoring
- Set up logging for production issues

### 4. Asset Configuration

#### Favicon Setup
```html
<!-- public/index.html -->
<link rel="icon" href="%PUBLIC_URL%/favicon.ico?v=5" />
```

- Use cache-busting version parameter for favicon updates
- Implement multiple icon sizes (16x16 to 64x64)
- Convert high-quality emoji to .ico format
- Test favicon across different browsers and devices

#### Browser Caching
```typescript
// Cache Control Headers (server configuration)
{
  'Cache-Control': 'public, max-age=31536000, immutable' // For static assets
  'Cache-Control': 'no-cache' // For dynamic content
}

// Version-based cache busting
- Use query parameters for favicon (?v=5)
- Include content hash in build filenames
- Configure service worker caching strategy
```

### 5. Deployment Checklist
- [ ] Create production build
- [ ] Test with production API keys
- [ ] Verify environment variables
- [ ] Check bundle size
- [ ] Test in multiple browsers
- [ ] Verify dark mode functionality
- [ ] Test system preference changes
- [ ] Validate API error handling
- [ ] Verify favicon across devices
- [ ] Check browser caching behavior
- [ ] Test cache-busting mechanisms
