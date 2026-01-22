# 🔧 Firebase Setup Fix - Step by Step

## ❌ Current Errors:
1. **`auth/invalid-credential`** - No admin user exists
2. **`Missing or insufficient permissions`** - Firestore rules not configured

## ✅ Fix These Issues:

### Step 1: Enable Authentication & Create Admin User

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **`devinepal-guru`**
3. Click **Authentication** in the left menu
4. Click **Get Started** (if first time)
5. Go to **Sign-in method** tab
6. Click on **Email/Password**
7. **Enable** it and click **Save**
8. Go to **Users** tab
9. Click **Add user** button
10. Enter:
    - **Email**: `admin@devinepal.com` (or your preferred email)
    - **Password**: Create a strong password (save it!)
11. Click **Add user**
12. ✅ **Admin user created!**

### Step 2: Configure Firestore Security Rules

1. In Firebase Console, go to **Firestore Database**
2. Click on **Rules** tab
3. **Delete all existing rules** and paste this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access for all collections
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

4. Click **Publish** button
5. ✅ **Firestore rules configured!**

### Step 3: Configure Storage Security Rules

1. In Firebase Console, go to **Storage**
2. Click on **Rules** tab
3. **Delete all existing rules** and paste this:

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

4. Click **Publish** button
5. ✅ **Storage rules configured!**

### Step 4: Verify Services Are Enabled

Make sure these are enabled in your Firebase project:

- ✅ **Authentication** - Enabled (Email/Password)
- ✅ **Firestore Database** - Created
- ✅ **Storage** - Enabled

### Step 5: Test Login

1. Go to your app: `http://localhost:5173/admin` (or your dev server URL)
2. Use the email and password you created in Step 1
3. Click **Sign In**
4. ✅ **Should login successfully!**

### Step 6: Initialize Collections

1. After logging in, you'll see **"Initialize Firestore Collections"** section
2. Click **"Initialize Collections"** button
3. ✅ **Collections will be created!**

---

## 🚨 Still Having Issues?

### Check These:

1. **Firebase Project**: Make sure you're using project `devinepal-guru`
2. **API Key**: Verify in `src/config/firebase.js` matches your Firebase project
3. **Browser Console**: Check for any other errors
4. **Network Tab**: Make sure requests aren't blocked by ad blockers

### Common Issues:

- **"ERR_BLOCKED_BY_CLIENT"**: Disable ad blockers temporarily
- **"Invalid API key"**: Double-check your Firebase config
- **"Permission denied"**: Make sure you published the Firestore rules

---

## 📝 Quick Checklist:

- [ ] Authentication enabled (Email/Password)
- [ ] Admin user created in Authentication > Users
- [ ] Firestore Database created
- [ ] Firestore Rules published (with the rules above)
- [ ] Storage enabled
- [ ] Storage Rules published (with the rules above)
- [ ] Can login to Admin Dashboard
- [ ] Can initialize collections

---

**After completing these steps, all errors should be resolved!** 🎉
