# Puzzle Scratch

A scratch-card puzzle game that runs as a **Telegram Mini App**. Players open the game from a Telegram bot, scratch cards to reveal puzzles, collect coins, invite friends and buy items with Telegram Stars.

This repository combines the three parts of the project. Each folder keeps its full commit history.

| Folder | What it is | Stack |
|---|---|---|
| [`ui/`](ui) | The game client that opens inside Telegram | React, TypeScript, Vite, PixiJS (+ Spine animations), Redux Toolkit, React Router, Sass |
| [`bot-server/`](bot-server) | The Telegram bot: `/start`, links into the game, Stars payment handling | Node.js, TypeScript, Telegraf, Google Cloud Functions |
| [`config/`](config) | Remote config, localisation and bot assets used by the client and the bot | JSON, GitLab CI → Google Cloud Storage |

## How the parts fit together

```
            Telegram
               │
     ┌─────────┴──────────┐
     ▼                    ▼
 bot-server/            ui/  (Mini App)
 Cloud Function          React + PixiJS
     │                    │
     └───────┬────────────┘
             ▼
          config/  → Cloud Storage bucket
 (game config, localisation, avatars, bot texts & images)
```

- **`ui/`** loads its environment config from `VITE_CONFIG_URL` and renders the game with PixiJS in canvas mode: the scratch area, styled text and Spine animations. Game modes include Vegas, Lucky Clover, Ice Box, Candy Maze and Santa Sac, along with wallet, profile, friend invites and language selection.
- **`bot-server/`** runs as a Google Cloud Function registered as the Telegram webhook. It answers `/start`, sends localised messages with images from `config/`, and handles pre-checkout and successful-payment updates for in-game purchases.
- **`config/`** is published to a Cloud Storage bucket by CI, so game settings, translations and bot content can change without redeploying the client or the bot.

## Running locally

Each part is a standalone project. See its own README for details:

```sh
# Game client
cd ui && npm install && npm run serve:dev

# Telegram bot (needs a .env, see bot-server/README.md)
cd bot-server && npm install && npm run start:dev
```

> The backend services and cloud resources this project used are no longer running. This repository is kept as a portfolio and code reference.
