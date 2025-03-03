#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

echo -e "${GREEN}Starting Meal Planner Setup...${NC}\n"

# Check for Node.js installation
if ! command_exists node; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

# Check for npm installation
if ! command_exists npm; then
    echo -e "${RED}Error: npm is not installed${NC}"
    echo "Please install npm (usually comes with Node.js)"
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}Warning: .env file not found${NC}"
    if [ -f .env.example ]; then
        echo "Creating .env from .env.example..."
        cp .env.example .env
        echo -e "${YELLOW}Please update .env with your API key${NC}"
    else
        echo -e "${RED}Error: Neither .env nor .env.example found${NC}"
        exit 1
    fi
fi

# Check if node_modules exists, if not run npm install
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Check if REACT_APP_SPOONACULAR_API_KEY is set in .env
if ! grep -q "REACT_APP_SPOONACULAR_API_KEY" .env || grep -q "REACT_APP_SPOONACULAR_API_KEY=$" .env || grep -q "REACT_APP_SPOONACULAR_API_KEY=your_api_key" .env; then
    echo -e "${RED}Error: REACT_APP_SPOONACULAR_API_KEY is not set in .env${NC}"
    echo "Please add your Spoonacular API key to the .env file"
    exit 1
fi

echo -e "${GREEN}All checks passed! Starting the development server...${NC}\n"

# Start the development server
npm start
