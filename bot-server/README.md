# Puzzle Scratch Telegram Bot Server

This repository contains the server-side code for the Puzzle Scratch Telegram Bot.

## Webhook

The bot server is deployed as a Google Cloud Function, and its URL is registered as the webhook URL in the Telegram API. This means that the bot is triggered by Telegram servers on each update.

## Cloud Functions

The app handles three cloud functions:

- **handleWebhook**: The main function that processes incoming updates from Telegram.
- **setWebhook**: Resets the webhook URL via an HTTP trigger.
- **getWebhook**: Returns the current webhook information.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Google Cloud SDK (for deployment)

## Installation

1. Clone the repository:

    ```sh
    git clone git@gitlab.com:rebel-bots/puzzle-scratch-telegram-bot-server.git
    cd puzzle-scratch-telegram-bot-server
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the environment variables described in the next section.

## Environment Variables

The following environment variables are set in the Google Cloud client interface:

- `CONFIG_URL`: URL to fetch the bot configuration.
- `BOT_TOKEN`: Telegram bot token.
- `PUZZLE_GAME_SERVICE_URL` (not used in the local development environment): URL for the puzzle game service.
- `TELEGRAM_WEB_HOOK_URL`: Webhook URL for the Telegram bot.

The following environment variables should be added to the `.env` file for local development:

- `CONFIG_URL`: URL to fetch the bot configuration.
- `BOT_TOKEN`: Telegram bot token.
- `TELEGRAM_WEB_HOOK_URL`: Webhook URL for your local server (best option is to use ngrok). In local dev enviroment used only if `IS_LOCAL_DEV_WEBHOOK` is true.
- `IS_DEV`: Flag to indicate if the environment is development.
- `IS_LOCAL_DEV`: Flag to indicate if the environment is local development.
- `IS_LOCAL_DEV_WEBHOOK`: Flag to indicate if the webhook should be used instead of long polling locally.

Other variables:
- `TELEGRAM_INTERNAL_COMM_AUTH_TOKEN` (not used in the local development environment): Internal communication auth token for the puzzle game service API. This is set in the cloud function config build file.

## Development

To start the development server with hot-reloading (runs in long polling mode):

```sh
npm run start:dev
```

To start the local server with Google Cloud Functions Framework (runs in the same environment as Google Cloud Functions):

```sh
npm run start:local
```

To use the VSCode debugger, ensure you have the following configuration in `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/src/index.ts",
      "preLaunchTask": "tsc: build - tsconfig.json",
      "outFiles": ["${workspaceFolder}/dist/**/*.js"]
    }
  ]
}
```

## Build

To build the project:

```sh
npm run build:ts
```

## Deployment

To deploy the project to Google Cloud Functions, you need to authorize in Google Cloud SDK with a user who has access to the cloud project:

```sh
gcloud auth login
```

For production:

```sh
npm run build:deploy:prod
```

For development:

```sh
npm run build:deploy:dev
```

## Project Structure

The project structure is organized as follows:

```
puzzle-scratch-telegram-bot-server/
├── src/                        # Contains the source code for the bot and cloud functions
│   ├── bot.ts                  # Bot configuration and handlers
│   ├── index.ts                # Entry point for cloud functions
│   ├── commands/               # Command handlers
│   ├── models/                 # Data models and interfaces
│   ├── services/               # Services for API calls and other functionalities
│   ├── utils/                  # Utility functions
│   └── ...                     # Other source files
├── .env                        # Environment variables file
├── .babelrc                    # Babel configuration file
├── .gcloudignore               # Files to ignore when deploying to Google Cloud
├── .gitignore                  # Files to ignore in Git
├── .vscode/                    # VSCode configuration folder
│   └── launch.json             # VSCode debugger configuration
├── cloudfunction_config_dev.yml# Development environment build configuration
├── cloudfunction_config.yml    # Production environment build configuration
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration file
└── ...                         # Other project files
```

## Configuration

The configuration is fetched from a remote URL specified in the `CONFIG_URL` environment variable. The configuration includes various settings such as API URLs, localization data, and other bot-specific settings.

## Localization

Localization data is fetched from a remote URL specified in the configuration. The bot supports multiple languages and selects the appropriate language based on the user's locale.
