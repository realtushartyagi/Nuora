# Nuora Deployment Guide: Next.js & Render

Since we migrated the frontend to Next.js (located in `next-client/`) and maintained the Express backend (in `server/`), follow these steps to redeploy your project accurately.

---

## 1. **Vercel (Frontend)**
Your frontend is now at `next-client/`.

### **Settings**
- **Framework Preset**: `Next.js`
- **Root Directory**: `next-client`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### **Environment Variables**
Make sure to add these to your Vercel project settings:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_... # Your Clerk Publishable Key
CLERK_SECRET_KEY=sk_test_...                 # Your Clerk Secret Key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_PUBLIC_BACKEND_URL=https://nuora-backend.onrender.com # Your Render Backend URL
```

---

## 2. **Render (Backend)**
Your backend is at `server/`.

### **Settings**
- **Runtime**: `Node`
- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`

### **Environment Variables**
Ensure these are set in your Render dashboard:
```bash
PORT=5000
MONGO_URI=mongodb+srv://...                    # Your MongoDB Connection String
CLERK_SECRET_KEY=sk_test_...                   # Your Clerk Secret Key (must match frontend)
CLERK_WEBHOOK_SECRET=whsec_...                 # Your Clerk Webhook Secret (for user sync)
INNGEST_EVENT_KEY=...                          # Generated from Inngest Dashboard
INNGEST_SIGNING_KEY=...                        # Generated from Inngest Dashboard
```

---

## 3. **Clerk Webhooks**
To ensure your backend database is updated when a user signs up on the Next.js frontend, you MUST update your Clerk Webhook URL:
1.  Go to the **Clerk Dashboard** -> **Webhooks**.
2.  Update the **Endpoint URL** to: `https://nuora-backend.onrender.com/api/webhooks`.
3.  Ensure the `user.created` event is selected.

---

## 4. **Inngest (Background Jobs)**
Since we use Inngest for user synchronization:
1.  Ensure your Render Backend URL is connected to your **Inngest Cloud** account.
2.  The Inngest endpoint will be: `https://nuora-backend.onrender.com/api/inngest`.

---

**Everything is now ready for deployment! Just push your code to your GitHub and trigger the builds on Vercel and Render.**
