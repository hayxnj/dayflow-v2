# Dayflow Mobile (isolated branch)

This branch prepares the existing Dayflow web app for Android and iOS using Capacitor.

- The production GitHub Pages site remains on `main` and is not changed.
- The existing Supabase project and authentication/data model are reused; no database migration is included.
- The current `index.html` is copied unchanged to `www/index.html`.

## Local setup

1. Install Node.js LTS and Android Studio. For iOS builds, use macOS with Xcode (or a macOS CI runner).
2. Run `npm install`.
3. Run `npx cap add android` and `npx cap add ios` (iOS command must run on macOS).
4. Run `npm run cap:sync` after web changes.
5. Build and test sign-in, deep links/password reset, notifications, safe areas, and account flows on real devices before distribution.

Do not add Supabase service-role secrets to this client app. Only the existing public/publishable client key belongs in browser/mobile code.
