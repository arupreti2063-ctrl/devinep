# Setup Guide for Dr. Devi Nepal Website

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Firebase** (See detailed instructions below)

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   - The app will open at `http://localhost:3000`

## Firebase Setup (Detailed)

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Enter project name: "devi-nepal-website" (or your preferred name)
4. Follow the setup wizard

### Step 2: Enable Services

#### Enable Authentication
1. Go to **Authentication** > **Sign-in method**
2. Enable **Email/Password** provider
3. Save

#### Enable Firestore
1. Go to **Firestore Database**
2. Click "Create database"
3. Start in **production mode** (we'll configure rules later)
4. Choose your location (preferably closest to your users)
5. Click "Enable"

#### Enable Storage
1. Go to **Storage**
2. Click "Get started"
3. Start in **production mode**
4. Use the same location as Firestore
5. Click "Done"

### Step 3: Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps"
3. Click the web icon (`</>`)
4. Register app with nickname: "Web App"
5. Copy the `firebaseConfig` object

### Step 4: Update Configuration File

1. Open `src/config/firebase.js`
2. Replace the placeholder values with your actual Firebase config:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   }
   ```

### Step 5: Configure Firestore Security Rules

1. Go to **Firestore Database** > **Rules**
2. Replace with:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Public read access
       match /{document=**} {
         allow read: if true;
       }
       
       // Write access only for authenticated users
       match /poems/{id} {
         allow write: if request.auth != null;
       }
       match /articles/{id} {
         allow write: if request.auth != null;
       }
       match /externalList/{id} {
         allow write: if request.auth != null;
       }
       
       // Comments and likes allow public write
       match /comments/{id} {
         allow write: if true;
       }
       match /likes/{id} {
         allow write: if true;
       }
     }
   }
   ```
3. Click "Publish"

### Step 6: Configure Storage Security Rules

1. Go to **Storage** > **Rules**
2. Replace with:
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /{allPaths=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```
3. Click "Publish"

### Step 7: Create Firestore Collections

The collections will be created automatically when you add content, but you can also create them manually:

1. Go to **Firestore Database** > **Data**
2. Click "Start collection"
3. Create these collections:
   - `poems` (for poetry)
   - `articles` (for blog posts)
   - `externalList` (for publications/awards)
   - `comments` (for user comments)
   - `likes` (for like counts)

### Step 8: Create Admin User

1. Go to **Authentication** > **Users**
2. Click "Add user"
3. Enter admin email and password
4. Click "Add user"
5. Use these credentials to log in to the Admin Dashboard at `/admin`

## First Use

1. **Start the app**: `npm run dev`
2. **Login to Admin**: Navigate to `/admin` and login with your admin credentials
3. **Add Content**:
   - Add poems in the "कविताहरू" tab
   - Add articles in the "लेखहरू" tab
   - Add publications/awards in the "बाह्य सूची" tab

## Troubleshooting

### Firebase Not Working?
- Check that you've replaced all placeholder values in `firebase.js`
- Verify all services are enabled in Firebase Console
- Check browser console for errors

### Can't Login to Admin?
- Make sure Authentication is enabled
- Verify admin user exists in Firebase Console
- Check Firestore rules allow authenticated writes

### Images/Audio Not Uploading?
- Verify Storage is enabled
- Check Storage security rules
- Ensure file size is within limits (Firebase free tier: 5GB storage)

### Content Not Showing?
- Check Firestore collections exist
- Verify security rules allow public read
- Check browser console for errors

## Production Deployment

1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Deploy** (choose one):
   - **Vercel**: `vercel --prod`
   - **Netlify**: Drag and drop the `dist` folder
   - **Firebase Hosting**: `firebase deploy`

3. **Update Firebase Configuration**:
   - Add your production domain to Firebase Console > Authentication > Settings > Authorized domains

## Support

For issues or questions, refer to:
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
