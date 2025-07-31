# Firebase Setup Guide

## Prerequisites

Before you can use the authentication features, you need to set up a Firebase project and configure it in your application.

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "peters-quest" or "webgame")
4. Follow the setup wizard (you can disable Google Analytics if not needed)

## Step 2: Enable Authentication

1. In your Firebase project console, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Save the changes

## Step 3: Create Firestore Database

1. In your Firebase project console, go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" for development (you can secure it later)
4. Select a location closest to your users
5. Click "Done"

## Step 4: Get Your Firebase Config

1. In your Firebase project console, click the gear icon ⚙️ and select "Project settings"
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web platform (</>)
4. Enter an app nickname (e.g., "Peter's Quest Web")
5. You don't need to set up Firebase Hosting for now, just click "Continue to console"
6. Go back to Project Settings and scroll down to find your config object

## Step 5: Configure Your Application

1. Copy the Firebase configuration object from the Firebase Console
2. Open `src/firebase/config.js` in your project
3. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id",
  measurementId: "your-actual-measurement-id", // Optional
};
```

## Step 6: Test the Application

1. Make sure you've installed all dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Navigate to the login/register pages and test the authentication

## Security Note

- The current Firestore rules are set to "test mode" which allows all reads/writes
- For production, you should configure proper security rules
- Consider implementing additional validation and security measures

## File Structure

Your authentication system includes:

- `src/firebase/config.js` - Firebase configuration and initialization
- `src/firebase/auth.js` - Authentication service functions
- `src/pages/LoginPage.jsx` - Login form with retro styling
- `src/pages/RegisterPage.jsx` - Registration form with retro styling
- `src/pages/GamePage.jsx` - Protected game page for authenticated users

## Features Implemented

- ✅ User registration with email, password, and display name
- ✅ User login with email and password
- ✅ User logout functionality
- ✅ Protected game page that requires authentication
- ✅ User data storage in Firestore
- ✅ Retro gaming aesthetic throughout all auth pages
- ✅ Form validation and error handling
- ✅ Loading states and user feedback

## Next Steps

- Configure your Firebase project using the steps above
- Customize the GamePage.jsx to add actual game functionality
- Implement password reset functionality if needed
- Add additional user profile features
- Secure your Firestore database rules for production
