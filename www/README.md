# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Firebase Emulator Data Persistence

Use these commands from the `www` folder to keep emulator data between runs:

```bash
npm run serveEmulators
```

```bash
npm run stopEmulators
```

Notes:
- `serveEmulators` starts with `--import=./test-data` and attempts export on exit.
- `stopEmulators` also performs an explicit export recovery step before shutting ports down, which avoids Windows `EPERM` export issues.
- Use `npm run forceKillEmulators` only when emulators are stuck; it skips the safe export flow.
