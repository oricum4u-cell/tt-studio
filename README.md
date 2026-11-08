# Torque & Truth Studio

**Measure. Diagnose. Understand.**

A local-first production workspace for motorcycle and automotive engineering video content. The first milestone establishes the React + Vite application shell and Firebase client integration.

## Stack

- React + TypeScript + Vite
- Firebase Authentication (Email/Password)
- Cloud Firestore
- Local-first workflow; media files remain on the user's device
- Human approval required before any future publishing integration

## Setup

1. Install Node.js LTS.
2. Copy `.env.example` to `.env.local`.
3. Fill in the Firebase Web App configuration from Firebase Console.
4. Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

## Firebase data model

User-owned data lives under `users/{uid}` and its subcollections. Firestore rules must enforce that the authenticated UID matches the path UID.

## Security

- Never commit `.env.local`, credentials, service-account JSON, or private keys.
- Firebase Web configuration is public client configuration; restrict its API key to the app's authorized domains when deployment domains are known.
- Do not enable public/test Firestore rules.
- Do not upload video assets to Firebase Storage in the MVP.

## Current milestone

- [x] Firebase project and Web app registered
- [x] Email/Password provider enabled
- [x] Firestore database created
- [ ] Confirm deployed Firestore rules
- [ ] Add Firebase configuration locally
- [ ] Test sign-up, sign-in, and per-user Firestore access
