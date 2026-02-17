# 🏃 Runner App

A modern, feature-rich running tracker application built with **React Native**, **Expo**, and **NativeWind**.

## 🌟 Features

*   **🏃 Run Tracking**: Track your runs with real-time duration, distance, and pace monitoring.
*   **🎨 Dynamic Theming**: Full **Dark Mode** & **Light Mode** support that adapts to your system settings.
*   **📱 Modern UI**: 
    *   Custom **Floating Tab Bar** with animated interactions.
    *   Sleek, minimal design using **Tailwind CSS**.
*   **📍 Location Services**: Real-time GPS integration for accurate tracking using `expo-location`.
*   **🛠 Developer Tools**: Built-in `DEV_MODE` to simulate location updates for testing without moving.
*   **📊 Statistics**: View your total distance and run counts at a glance.

## 🛠 Tech Stack

*   **Core**: [React Native](https://reactnative.dev/) (0.81), [Expo](https://expo.dev/) (SDK 52)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [NativeWind (v2)](https://www.nativewind.dev/) + [Tailwind CSS](https://tailwindcss.com/)
*   **Navigation**: [React Navigation (v7)](https://reactnavigation.org/)
    *   Native Stack Navigator
    *   Bottom Tabs Navigator
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
*   **Maps & Location**: `react-native-maps`, `expo-location`

## 🚀 Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (LTS recommended)
*   [Expo Go](https://expo.dev/client) app on your Android/iOS device (or an Emulator).

### Installation

1.  **Clone the repository** (or navigate to the project folder):
    ```bash
    cd Runner
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npx expo start -c
    ```
    *(The `-c` flag clears the metro bundler cache, recommended for NativeWind changes).*

4.  **Run on Device**:
    *   Scan the QR code with the **Expo Go** app (Android) or Camera (iOS).
    *   Press `a` to open on Android Emulator.
    *   Press `i` to open on iOS Simulator.

## 📂 Project Structure

```
Runner/
├── src/
│   ├── components/  # Reusable UI components
│   ├── screens/     # Application screens (Home, Tracker, etc.)
│   ├── hooks/       # Custom React hooks
│   ├── utils/       # Helper functions
│   └── types/       # TypeScript type definitions
├── App.tsx          # Main entry point & Navigation setup
├── global.css       # Tailwind CSS directives
├── tailwind.config.js # Tailwind configuration
├── babel.config.js  # Babel configuration (NativeWind plugin)
└── package.json     # Dependencies and scripts
```

## 📝 Troubleshooting

*   **Styles not applying?**
    *   Ensure you are running `npx expo start -c` to clear the cache.
    *   Check `tailwind.config.js` content paths.

*   **"Element type is invalid" error?**
    *   Check your imports and exports in `App.tsx` or screen files.

## 📄 License

This project is licensed under the MIT License.
