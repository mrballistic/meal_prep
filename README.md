# Meal Planner

A modern React application for discovering recipes and planning meals, with a focus on user experience and accessibility.

## Features

- 🔍 Recipe search with advanced filtering
- 💾 Save favorite recipes with persistent local storage
- 📱 Responsive design with dark mode support
- 📅 Weekly meal planning
- 🎨 Material Design UI
- 🌙 Automatic dark mode based on system preferences

## Tech Stack

- React 19 with TypeScript
- Material-UI v6.4.6
- React Router v6
- React Query
- Axios
- Local Storage for data persistence

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Spoonacular API key (get one at [Spoonacular's website](https://spoonacular.com/food-api))

### Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/meal-planner.git
cd meal-planner
```

2. Run the start script:
```bash
./start.sh
```

The script will:
- Check for required dependencies (Node.js and npm)
- Create .env file from .env.example if needed
- Install project dependencies
- Verify environment variables
- Start the development server

The application will be available at `http://localhost:3000`.

### Manual Installation

If you prefer to set up manually:

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

3. Add your Spoonacular API key to the `.env` file:
```env
REACT_APP_SPOONACULAR_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm start
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| REACT_APP_SPOONACULAR_API_KEY | Your Spoonacular API key | Yes |
| REACT_APP_API_BASE_URL | API base URL (defaults to Spoonacular) | No |
| REACT_APP_CACHE_DURATION | Cache duration in milliseconds | No |

## Features in Detail

### Recipe Search
- Search through thousands of recipes
- Filter by dietary restrictions
- Real-time search results
- Save favorite recipes with persistent storage
- Recipe data persists through app restarts

### Meal Planning
- Weekly meal planning interface
- Organize meals by breakfast, lunch, and dinner
- Save and load meal plans
- Automatic local storage persistence

### Branding
- Custom fork and knife favicon
- Consistent branding across browsers
- High-quality app icon for bookmarks

### Dark Mode
- Automatic system preference detection
- Consistent theming across components
- High contrast ratios for accessibility
- Smooth transitions between modes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/          # Route-level components
├── services/       # API and external services
├── hooks/          # Custom React hooks
├── context/        # React context providers
├── utils/          # Utility functions
├── types/          # TypeScript type definitions
└── assets/         # Static assets
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- [Spoonacular API](https://spoonacular.com/food-api) for recipe data
- [Material-UI](https://mui.com/) for the component library
- [Create React App](https://create-react-app.dev/) for the initial project setup
