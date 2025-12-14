# 🚀 Quick Deployment Steps

## Prerequisites ✅
- [x] Code pushed to GitHub
- [x] MongoDB Atlas database URL ready
- [ ] Vercel account (free)
- [ ] Render account (free)

---

## 📦 Step 1: Deploy Backend to Render (10 minutes)

1. Go to **https://render.com** → Sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. Select repository: `aksghgf/Incubyte_Assignmnet`
4. **Configuration**:
   - **Name**: `sweet-shop-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npm start`
5. **Environment Variables** (click Advanced):
   ```
   NODE_ENV=production
   DATABASE_URL=<your-mongodb-atlas-url>
   JWT_SECRET=<generate-a-strong-secret>
   JWT_EXPIRES_IN=7d
   CORS_ORIGIN=https://your-frontend-url.vercel.app
   ```
6. Click **"Create Web Service"**
7. **Copy your backend URL**: `https://sweet-shop-backend-xxxx.onrender.com`

---

## 🌐 Step 2: Deploy Frontend to Vercel (5 minutes)

1. Go to **https://vercel.com** → Sign up with GitHub
2. Click **"Add New..."** → **"Project"**
3. Import: `aksghgf/Incubyte_Assignmnet`
4. **Configuration**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
5. **Environment Variable**:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```
6. Click **"Deploy"**
7. **Copy your frontend URL**: `https://sweet-shop-xxxx.vercel.app`

---

## 🔄 Step 3: Update Backend CORS

1. Go back to Render → Your backend service
2. **Environment** → Edit `CORS_ORIGIN`
3. Update to your Vercel URL: `https://sweet-shop-xxxx.vercel.app`
4. Save (service will redeploy)

---

## ✅ Step 4: Test Your Live App!

Visit your Vercel URL and:
1. Register a new account
2. Login
3. Try all features

---

## 📚 Full Documentation

See [deployment_guide.md](file:///C:/Users/kumar/.gemini/antigravity/brain/280fa141-deef-4644-a4ce-1f310efb2514/deployment_guide.md) for detailed instructions and troubleshooting.

---

## 🎯 Important Notes

⚠️ **Render Free Tier**: Backend sleeps after 15 mins of inactivity (first request will be slow)

🔐 **JWT_SECRET**: Generate a strong random string using https://randomkeygen.com/

📊 **MongoDB Atlas**: Make sure to allow connections from anywhere (0.0.0.0/0) in Network Access

---

**Good luck with your deployment!** 🎉
