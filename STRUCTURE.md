# Project Structure Guide

We are using a standard React Native folder structure to keep things organized.

## Key Directories

### `src/` (Source Code)
This is where 99% of our code will live.
- **`src/screens/`**: Full-page views (e.g., `HomeScreen`, `TrackerScreen`).
- **`src/components/`**: Reusable UI elements (e.g., `RunCard`, `TimerDisplay`).
- **`src/hooks/`**: Custom logic (e.g., `useLocation`, `useStopwatch`).
- **`src/utils/`**: Helper functions (e.g., `useRunLogic`).
- **`src/types/`**: TypeScript interfaces (e.g., `Run`, `Coordinate` models).

### Root Files
- **`App.tsx`**: The entry point. We set up our Navigation here.
- **`app.json`**: Configuration for Expo (app name, icon, permissions).
- **`package.json`**: List of installed libraries.

---
> **Note**: We are NOT using the `app/` directory (Expo Router) to keep the navigation logic explicit and easier to learn.
