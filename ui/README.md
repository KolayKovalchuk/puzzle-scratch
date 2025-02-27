# Puzzle Scratch UI

## Description
Puzzle Scratch UI is a Vite React web application with the main feature of solving puzzles directly within the Telegram web app interface. The application allows users to solve puzzles, share the game itself, and share game coins with friends. It also uses the PixiJS library in canvas mode for rendering complex design texts and the game scratch area, `@pixi/react` for using PixiJS with React, and `pixi-spine` plugin for rendering animations. Additionally, it uses React Router for routing and React Redux for app state management.

## Key Features
- **Vite**: Fast and optimized build tool for modern web projects.
- **React**: A JavaScript library for building user interfaces.
- **PixiJS**: A powerful 2D rendering library for rendering complex design texts and the game scratch area in canvas mode.
- **@pixi/react**: Integration of PixiJS with React for rendering components.
- **pixi-spine**: A library for rendering spine animations.
- **React Router**: For routing within the application.
- **React Redux**: For managing the application state.
- **Telegram Integration**: Provided by using `@twa-dev/sdk` package.
- **Responsive Design**: Ensures the application works well on various devices and screen sizes.

## Project Structure
The project structure is organized as follows:

```
puzzle-scratch-ui/
├── public/                 # Static assets
├── src/                    # Source files
│   ├── assets/             # Assets such as svg icons, fonts, etc.
│   ├── components/         # Feature components that could be reused
│   │   ├── shared/         # Small reusable components like Icon, Button, DropDown, etc.
│   ├── config/             # Configuration files
│   ├── hooks/              # Custom hooks
│   ├── models/             # Data, store, etc models and interfaces
│   ├── pages/              # Page components
│   ├── routers/            # React Router configuration
│   ├── services/           # Services for API calls and other functionalities
│   ├── store/              # Redux store and slices
│   ├── styles/             # Global styles and Sass files
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main App component
│   ├── main.tsx            # Entry point of the application
│   ├── index.scss          # Main styles file
│   └── ...                 # Other source files
├── .env                    # Base environment variables file
├── .env.development        # Development environment variables file
├── .env.production         # Production environment variables file
├── .env.qa                 # QA environment variables file
├── .eslintrc.js            # ESLint configuration
├── eslint.config.js        # Additional ESLint configuration
├── .gitignore              # Git ignore file
├── .gitlab-ci.yml          # GitLab CI configuration
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Installation
To get started with the project, follow these steps:

1. Clone the repository:
    ```sh
    git clone git@gitlab.com:rebel-bots/puzzle-scratch-ui.git
    ```
2. Navigate to the project directory:
    ```sh
    cd puzzle-scratch-ui
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Usage
To serve the application in development mode, use the following command:
```sh
npm run serve:dev
```
This will start the development server and you can view the application in your browser at `http://localhost:5173`.

## Opening in Telegram Web App Environment
To open the local development environment in the Telegram web app environment, follow these steps:

1. Expose a local server to the internet securely with the same port as the app is serving on the local machine. The best option is to use the `ngrok` library.
2. Using the Telegram bot `@BotFather`, create a Telegram web app with the remote server URL as the app URL.
3. After that, the web app can be reached by the Telegram web app URL provided by Telegram.

## Building for Production
To build the application for production, use the following command:
```sh
npm run build:prod
```
The production-ready files will be generated in the `dist` directory.

## Configuration

The configuration is fetched from a remote URL specified in the `CONFIG_URL` environment variable. The configuration includes various settings such as API URLs, localization data, and other bot-specific settings.

## Localization

Localization data is fetched from a remote URL specified in the configuration. The bot supports multiple languages and selects the appropriate language based on the user's locale.

## Scripts Explanation
- `build:dev`: Builds the application in development mode.
- `build:prod`: Builds the application in production mode.
- `build:qa`: Builds the application in QA (Quality Assurance) mode.
- `serve:dev`: Serves the application in development mode.
- `serve:prod`: Serves the application in production mode.
- `serve:qa`: Serves the application in QA (Quality Assurance) mode.

## Environment Variables
The project uses the following environment variable files:
- `.env`: Base environment variables file.
- `.env.development`: Development environment variables file.
- `.env.production`: Production environment variables file.
- `.env.qa`: QA environment variables file.

Developers can also add a `.env.development.local` file to provide local development environment variables. This file is included in `.gitignore` and should not be committed to the repository.
