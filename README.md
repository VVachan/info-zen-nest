# Newshunt - Personalized News Aggregator

A multi-language news aggregator with authentication and database integration.

## Live Demo
- **Website:** https://info-zen-nest.vercel.app/
- **GitHub:** https://github.com/VVachan/info-zen-nest

---

## Technologies Used

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **React Query (TanStack)** - Data fetching and caching

### Backend & Database
- **Supabase** - Authentication and PostgreSQL database
- **PostgreSQL** - Relational database

### UI Components
- **Radix UI** - Headless component library
- **Shadcn/ui** - Pre-built React components
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

### Utilities
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **date-fns** - Date utilities
- **next-themes** - Theme management (dark/light mode)

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript linting

---

## Setup Instructions for Your Friend

### Step 1: Clone the Repository
```bash
git clone https://github.com/VVachan/info-zen-nest.git
cd info-zen-nest
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create Environment File
Create a `.env.local` file in the project root and add:
```
VITE_SUPABASE_URL=https://jmyxajwmetunwfalokhw.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpteXhhandtZXR1bndmYWxva2h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwODk1ODgsImV4cCI6MjA4MDY2NTU4OH0.g6M9SYmfKynpGd3x1baqGFndD7onFsKkQFvE_bLQgNM
```

### Step 4: Run the Development Server
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

---

## Authentication Setup (Supabase)

### What is Supabase?
Supabase is a backend service that handles user authentication and database. Your project is already set up at:
https://supabase.com/dashboard/project/jmyxajwmetunwfalokhw/auth/users

### How Authentication Works:

1. **Sign Up:** User creates account with email/password
   - A confirmation email arrives at their registered email
   - User clicks the email link to verify
   - Account is now active

2. **Log In:** User signs in with registered email/password
   - Session is created and stored
   - User can now access `/account` page

3. **View Profile:** Go to `/account` to see:
   - Logged-in user email
   - User ID and session info
   - Profile data (name, avatar)
   - Edit and save profile information

### To Check Users in Supabase:
1. Go to https://supabase.com/dashboard/project/jmyxajwmetunwfalokhw/auth/users
2. Log in with your account
3. See all registered users in "Authentication → Users"

---

## Features

✅ **Multi-Language Support** - Hindi, Telugu, Tamil, Kannada, Marathi, Bengali, Gujarati, Punjabi, Odia, Urdu, Nepali, Assamese
✅ **User Authentication** - Email/password signup and login via Supabase
✅ **User Profiles** - Store and edit user name and avatar
✅ **News Aggregator** - Browse news by categories (Breaking, Sports, Technology, Business, etc.)
✅ **Responsive Design** - Works on desktop, tablet, mobile
✅ **Dark/Light Theme** - Built-in theme switcher

---

## Project Structure

```
src/
├── pages/          # Page components (News, Auth, Account, Index, etc.)
├── components/     # Reusable UI components
├── contexts/       # Auth and Language context
├── lib/            # Utilities, Supabase queries, and translations
├── App.tsx         # Main app component
└── main.tsx        # Entry point
```

---

## Deployment

The project is deployed on **Vercel**: https://info-zen-nest.vercel.app/

Any changes pushed to GitHub's `main` branch will automatically deploy to Vercel.

---

## Troubleshooting

**Issue:** "Supabase URL or anon key is missing"
- **Solution:** Check `.env.local` file exists with correct values

**Issue:** Authentication not working
- **Solution:** Go to https://supabase.com/dashboard/project/jmyxajwmetunwfalokhw/auth/users and check:
  - Email confirmations are enabled/disabled as needed
  - User status shows "Confirmed"

**Issue:** Profile data not saving
- **Solution:** Ensure the `profiles` table exists in Supabase database

**Issue:** Translations not showing
- **Solution:** Language selector is in the navbar. Click your language code to switch languages

---

## Need Help?

Contact: [Your Email/Contact Info]
