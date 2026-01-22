# डा. देवी नेपालको व्यक्तिगत ब्रान्ड वेबसाइट

A responsive, SEO-optimized personal brand website for Prof. Dr. Devi Nepal featuring Sanskrit-inspired minimalist aesthetic with saffron, sandalwood, and parchment tones.

## Features

- **Chhanda-Gyan (छन्द-ज्ञान)**: Poetry section with audio playback
- **Lekhan-Shilpa (लेखन-शिल्प)**: Blog layout for critical essays and literary critiques
- **Vigya-Vichar (विज्ञा-विचार)**: Philosophy landing page with Eastern philosophical views
- **Real-time Features**: Firebase integration for live Comments and Likes
- **Admin Dashboard**: Secure login for content management
- **External List**: Management for publications and awards
- **Devanagari Typography**: Mukta font from Google Fonts
- **Sanskrit-inspired Design**: Mandala backgrounds and Vedic quotes

## Tech Stack

- **Frontend**: React with Vite
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Routing**: React Router
- **Fonts**: Google Fonts (Mukta - Devanagari)

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Firebase**
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication (Email/Password)
   - Create Firestore database
   - Enable Storage
   - Copy your Firebase config and paste it in `src/config/firebase.js`

3. **Create Firestore Collections**
   - `poems` - for poetry content
   - `articles` - for blog articles
   - `externalList` - for publications/awards
   - `comments` - for user comments
   - `likes` - for like counts

4. **Set Firebase Security Rules** (Firestore):
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
       match /comments/{id} {
         allow write: if request.auth != null || true; // Allow anonymous comments
       }
       match /likes/{id} {
         allow write: if true; // Allow anonymous likes
       }
     }
   }
   ```

5. **Set Firebase Storage Rules**:
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

6. **Run Development Server**
   ```bash
   npm run dev
   ```

7. **Build for Production**
   ```bash
   npm run build
   ```

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar with Devanagari menu
│   │   ├── Footer.jsx          # Footer with Vedic quotes
│   │   ├── AudioPlayer.jsx     # Audio player for poems
│   │   ├── CommentsSection.jsx # Real-time comments
│   │   └── LikeButton.jsx      # Like button with Firebase
│   ├── pages/
│   │   ├── Home.jsx            # Home page with hero section
│   │   ├── About.jsx           # About Dr. Nepal
│   │   ├── Works.jsx           # Publications and works
│   │   ├── ChhandaGyan.jsx     # Poetry section
│   │   ├── LekhanShilpa.jsx    # Articles/blog section
│   │   ├── VigyaVichar.jsx     # Philosophy section
│   │   └── AdminDashboard.jsx  # Admin content management
│   ├── config/
│   │   └── firebase.js         # Firebase configuration
│   ├── App.jsx                 # Main app component with routing
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles with Tailwind
├── public/
│   └── DOC/
│       └── PIC.PNG            # Profile image
├── package.json
├── tailwind.config.js         # Tailwind with custom colors
└── vite.config.js             # Vite configuration
```

## Color Palette

- **Saffron**: `#f97316` (Main brand color)
- **Sandalwood**: `#e6a03a` (Secondary accent)
- **Parchment**: `#c7bcab` (Background/text)

## Features in Detail

### Chhanda-Gyan (Poetry)
- Display metrical poetry with audio playback
- Real-time likes and comments
- Audio player with controls

### Lekhan-Shilpa (Articles)
- Blog layout for essays and critiques
- Category filtering
- Image support

### Vigya-Vichar (Philosophy)
- Philosophy landing page
- Mandala background patterns
- Vedic/Upanishadic quotes

### Admin Dashboard
- Secure email/password authentication
- CRUD operations for all content types
- File uploads (audio/images)
- Draft/publish toggle

## SEO Optimization

- Meta tags for description and keywords
- Semantic HTML structure
- Alt text for images
- Proper heading hierarchy
- Nepali language content with proper lang attribute

## License

All rights reserved © 2026 Dr. Devi Nepal
