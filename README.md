# OpenCode Mobile

> ## ⚠️ AI-authored fork disclaimer
>
> **This repository is a community fork of the upstream
> [OpenCode Mobile](https://github.com/alvarolorentedev/opencode-mobile).**
> The additional changes in this fork were written **entirely by Big Pickle, an
> AI model**, working with a human operator. Specifically:
>
> - **All non-upstream code, tests, and documentation changes were authored or
>   composed by the Big Pickle AI model.**
> - These changes have **not** been reviewed by the upstream maintainers.
> - **Things could be buggy.** Behavior may differ from the official Google Play
>   build, and non-brand color themes use heuristically derived Material 3 tone
>   mappings that may not look pixel-perfect on every screen.
> - The core app is unchanged from upstream; only the *appearance* features
>   described in this README were added on top.
> - **Use at your own risk.** This fork is provided as-is with no warranties.
> - For the official, reviewed release, use the upstream
>   [app on Google Play](https://play.google.com/apps/testing/app.getopencode)
>   or the [upstream release](https://github.com/alvarolorentedev/opencode-mobile/releases).

[![Get it on Google Play](https://img.shields.io/badge/Get_it_on-Google_Play-4285F4?style=for-the-badge&logo=googleplay&logoColor=white)](https://play.google.com/apps/testing/app.getopencode)
[![Download APK (this fork)](https://img.shields.io/badge/Download-APK-18A748?style=for-the-badge&logo=android&logoColor=white)](https://github.com/RunicKing/opencode-mobile/releases/download/v1.0.10-keyboard-composer-toggle-fixes/opencode-mobile-keyboard-composer-toggle-fixes.apk)


**Your OpenCode server, in your pocket.**

OpenCode Mobile brings the full power of your self-hosted OpenCode AI assistant to your Android device. Chat with your models, manage conversations, and stay productive anywhere.

## This fork: what changed (Full Color Themes Edition)

This fork adds a **Settings → Appearance** section on top of upstream with two
user-facing features, both by the big-pickle AI:

- **Full color themes** — choose between Brand green (default, matches the
  stock look), Ocean blue, Violet, Rose, or Amber. The chosen theme is applied
  **everywhere**, not just to highlights: the background, cards, surfaces,
  borders, muted text, chat bubbles, tabs, navigation chrome, and the
  conversation/voice screen all follow it in light and dark mode.
- **Text-size slider** — scale the base text size from **80% to 140%** so it
  applies almost everywhere, including chat cards, diffs, markdown, the model
  picker, settings rows, the terminal, workspace files, and tab labels. The
  slider is smooth: it previews the size live while you drag and commits once
  on release (0.05 steps).
- **Smooth keyboard** — the message-box area stays visible while the on-screen
  keyboard is open, and opening/closing it no longer "jitters" for a few
  seconds.
- **Collapsible chat header** — a button on the conversation tab (and in the
  composer's controls row) hides the session header and the Session /
  Files-Changed tab row with a smooth animation, reclaiming screen space (a
  floating button brings them back).

A full changelog and install notes live with each
**[release](https://github.com/RunicKing/opencode-mobile/releases)**.

**Install:** download the APK below, and if you previously installed a build
signed with a different key, uninstall it first (Android will reject a
signature mismatch).

Older builds:

- [Chrome Hide & Keyboard Fixes Edition APK](https://github.com/RunicKing/opencode-mobile/releases/download/v1.0.10-chrome-hide-keyboard-fixes/opencode-mobile-chrome-hide-keyboard-fixes.apk)
- [Font Scale Fixes Edition APK (smooth text-size slider)](https://github.com/RunicKing/opencode-mobile/releases/download/v1.0.10-font-scale-fixes/opencode-mobile-font-scale-fixes.apk)
- [Full Color Themes Edition APK](https://github.com/RunicKing/opencode-mobile/releases/download/v1.0.10-full-color-themes/opencode-mobile-full-color-themes.apk)
- [Appearance Edition APK (accents + font size, no full theming)](https://github.com/RunicKing/opencode-mobile/releases/download/v1.0.10-appearance/opencode-mobile-appearance.apk)

[![Download APK (this fork, Keyboard Fixes Edition)](https://img.shields.io/badge/Download-opencode--mobile--keyboard--composer--toggle--fixes--apk-18A748?style=for-the-badge&logo=android&logoColor=white)](https://github.com/RunicKing/opencode-mobile/releases/download/v1.0.10-keyboard-composer-toggle-fixes/opencode-mobile-keyboard-composer-toggle-fixes.apk)

## Why OpenCode Mobile?

- **Stay Connected**: Access your OpenCode server from anywhere on your mobile device
- **Seamless Conversations**: Pick up where you left off with synchronized chat history
- **Full Control**: Connect to your own OpenCode server — your data, your rules
- **Privacy-First**: Keep your conversations private on your self-hosted infrastructure
- **Fast & Native**: Built with React Native for smooth, responsive performance

## Quick Start

### For Users

1. **Download the app**:
   - [This fork: Keyboard Fixes Edition APK](https://github.com/RunicKing/opencode-mobile/releases/download/v1.0.10-keyboard-composer-toggle-fixes/opencode-mobile-keyboard-composer-toggle-fixes.apk)
   - [This fork: Chrome Hide & Keyboard Fixes Edition APK (older)](https://github.com/RunicKing/opencode-mobile/releases/download/v1.0.10-chrome-hide-keyboard-fixes/opencode-mobile-chrome-hide-keyboard-fixes.apk)
   - [This fork: Font Scale Fixes Edition APK (older)](https://github.com/RunicKing/opencode-mobile/releases/download/v1.0.10-font-scale-fixes/opencode-mobile-font-scale-fixes.apk)
   - [This fork: Full Color Themes Edition APK (older)](https://github.com/RunicKing/opencode-mobile/releases/download/v1.0.10-full-color-themes/opencode-mobile-full-color-themes.apk)
   - [This fork: Appearance Edition APK (oldest)](https://github.com/RunicKing/opencode-mobile/releases/download/v1.0.10-appearance/opencode-mobile-appearance.apk)
   - [Google Play (Beta, official upstream)](https://play.google.com/apps/testing/app.getopencode)
   - [Upstream direct APK](https://github.com/alvarolorentedev/opencode-mobile/releases/latest/download/opencode-mobile.apk)

2. **Connect to your server**: Open the app and enter your OpenCode server URL (default: `http://ip:4096`)

3. **Start chatting**: Begin conversations with your AI models instantly

### For Developers

Want to build from source or contribute? See the [Development](#development) section below.

## Features

- Real-time chat with your OpenCode models
- Conversation history and management
- Multi-model support
- Custom server configuration
- Streamed responses for natural conversations
- Clean, intuitive mobile interface

## Screenshots

Check out screenshots and more details on the [official website](https://getopencode.app/).

---

## Development

OpenCode Mobile is built with Expo and React Native.

### Requirements

- Node.js 20+
- npm
- Android Studio / Xcode for native builds

### Getting Started

1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/alvarolorentedev/opencode-mobile.git
   cd opencode-mobile
   npm install
   ```

2. Start the development server:
   ```bash
   npm run start
   ```

3. For a development client build:
   ```bash
   npm run start:dev-client
   ```

### Common Commands

```bash
npm run lint           # Run linter
npm run typecheck      # Type checking
npm run test:e2e:web   # End-to-end tests
npm run android        # Build Android app
npm run ios            # Build iOS app
```

### Android Builds

Build a production Android release:
```bash
npm run build:android
```

Build a development client:
```bash
npm run build:development:android
```

**Release Automation**:
- Push to `main` to trigger Android release build and artifact upload
- Push a version tag (e.g., `v1.2.3`) to trigger production Play Store upload
- Use `workflow_dispatch` for manual internal-track uploads

### Testing

- Flow validation runs against the fake OpenCode server in `tests/fake-opencode/server.mjs`
- End-to-end suite uses Playwright (`tests/e2e/flows.spec.mjs`)
- Full testing strategy documented in `TESTING.md`

### Configuration

Connection settings are configured inside the app. By default, the app expects an OpenCode server at `http://127.0.0.1:4096`.

Local configuration files (`.env`, `config.json`) are gitignored for security.
