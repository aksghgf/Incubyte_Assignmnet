# 🚀 Vercel Deployment Guide

## ✅ Backend Deployed Successfully!
**Backend URL**: https://sweet-shop-backend-qvrz.onrender.com

---

## 📦 Frontend Deployment Steps

### Step 1: Go to Vercel
1. Open: https://vercel.com
2. Click **"Sign Up"** or **"Login"** with GitHub

### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Find and import: `aksghgf/Incubyte_Assignmnet`
3. Click **"Import"**

### Step 3: Configure Project

**Framework Preset**: `Vite` (should auto-detect)

**Root Directory**: Click **"Edit"** → Enter: `frontend`

**Build Settings** (should auto-fill):
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 4: Add Environment Variable

Click **"Environment Variables"** section:

**Key**: `VITE_API_URL`

**Value**: `https://sweet-shop-backend-qvrz.onrender.com/api`

**Environments**: Check all (Production, Preview, Development)

### Step 5: Deploy!

Click **"Deploy"**

⏳ Wait 2-3 minutes...

---

## 🎉 Once Deployed

You'll get a URL like: `https://sweet-shop-xxxx.vercel.app`

**Copy that URL!** You'll need it for the next step.

---

## 🔄 Step 6: Update Backend CORS

1. Go back to **Render Dashboard**
2. Find your backend service
3. Go to **"Environment"** tab
4. Find `CORS_ORIGIN` variable
5. Change value to your Vercel URL: `https://sweet-shop-xxxx.vercel.app`
6. Click **"Save Changes"**
7. Backend will auto-redeploy (takes 1-2 minutes)

---

## ✅ Test Your App!

1. Visit your Vercel URL
2. Try to register
3. Try to login
4. Test all features!

---

**Let me know once you have the Vercel URL!** 🚀
