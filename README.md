# 🌟 Nuora

> **A beautiful, modern social media platform** focused on fast, delightful interactions and seamless connectivity.

Nuora is a high-performance social networking application built with the latest web technologies. It features a robust activity feed, real-time-like experiences, media management, and enterprise-grade authentication.

---

## 📖 Table of Contents
- [✨ Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [🛡️ Security & Auth](#️-security--auth)
- [📂 Project Structure](#-project-structure)
- [⚡ Quick Start](#-quick-start)
- [⚙️ Environment Configuration](#️-environment-configuration)
- [📸 Screenshots](#-screenshots)

---

## ✨ Features

### 📱 Social Experience
- **Personalized Feed**: See posts from users you follow and connect with.
- **Stories**: Share ephemeral updates with the Stories bar at the top of the feed.
- **Connections & Following**: Robust system for following users and managing connection requests.
- **User Discovery**: Search and discover new people to connect with based on name, username, or location.

### 📝 Content Management
- **Rich Posts**: Support for text and multi-image posts.
- **Smart Validation**: Automatic detection of post types (`text`, `image`, `text_with_image`).
- **Post Deletion**: Secure three-dots menu to let authors remove their content instantly.
- **Interactions**: Like posts and engage with the community.

### 👤 Profile Customization
- **Dynamic Profiles**: View any user's profile, posts, and stats.
- **Full Editing**: Update full name, username, bio, and location.
- **Media Customization**: Upload and manage profile pictures and cover photos using ImageKit.

---

## 🛠 Tech Stack

### Frontend (next-client)
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Handling**: [Moment.js](https://momentjs.com/)

### Backend (server)
- **Runtime**: Node.js / Express 5
- **Database**: MongoDB via [Mongoose](https://mongoosejs.com/)
- **Background Jobs**: [Inngest](https://www.inngest.com/)
- **Image Hosting**: [ImageKit](https://imagekit.io/)
- **File Handling**: Multer

---

## 🛡️ Security & Auth

Nuora uses **[Clerk](https://clerk.com/)** for enterprise-grade authentication:
- **Mandatory Sign-In**: All application routes are protected by Next.js middleware. Unauthenticated users are automatically redirected to a custom, Google-focused login page.
- **Social Login**: Optimized for "Continue with Google" as the primary entry point.
- **Backend Protection**: Every API request is verified using Clerk's secret keys and auth tokens.

---

## 📂 Project Structure

```text
Nuora/
├── next-client/          # Next.js Frontend
│   ├── src/app/          # App Router (Pages & Layouts)
│   ├── src/components/   # Reusable UI Components
│   └── src/store/        # Redux Toolkit Slices
├── server/               # Express Backend
│   ├── controllers/      # API Logic (User, Post, Messages)
│   ├── models/           # Mongoose Schemas
│   ├── routes/           # API Endpoint Definitions
│   └── utils/            # Shared Utilities (User Sync, etc.)
└── README.md             # Project Documentation
```

---

## ⚡ Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/realtushartyagi/Nuora.git
cd Nuora
```

### 2. Install Dependencies
```bash
# Install Server dependencies
cd server
npm install

# Install Client dependencies
cd ../next-client
npm install
```

### 3. Run the Project
```bash
# In one terminal (Server)
cd server
npm run server

# In another terminal (Client)
cd next-client
npm run dev
```

---

## ⚙️ Environment Configuration

### Client (`.env.local`)
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
```

### Server (`.env`)
```env
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
MONGO_URI=your_mongodb_connection_string
IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=your_endpoint
```

---

## 📸 Screenshots

![Feed Overview](file:///C:/Users/TUSHAR%20TYAGI/.gemini/antigravity/brain/40a88de0-33f4-4843-82a7-8b4e4aa97ede/media__1774608912179.png)

---

Built with ❤️ by [Tushar Tyagi](https://github.com/realtushartyagi)
