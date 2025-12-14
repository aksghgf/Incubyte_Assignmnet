# Quick Fix Guide

## ⚠️ Issue: Frontend calling wrong endpoint

**Problem**: Frontend is trying to call `localhost:5173/auth/login` instead of `localhost:5000/api/auth/login`

---

## ✅ Solution:

### Step 1: Check your backend `.env` file

Open `backend/.env` and verify it has:

```env
DATABASE_URL="mongodb+srv://Abhishektiwari:Abhishek_20413@cluster0.06m6gcn.mongodb.net/sweetshop?retryWrites=true&w=majority"
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

### Step 2: Create frontend `.env` file (if missing)

Create `frontend/.env` with:

```env
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Restart both servers

**Backend:**
```bash
cd backend
# Stop with Ctrl+C
npm run dev
```

**Frontend:**
```bash
cd frontend
# Stop with Ctrl+C
npm run dev
```

### Step 4: Clear browser cache

Press `Ctrl + Shift + Delete` → Clear cache → Hard refresh (`Ctrl + F5`)

---

## 🔍 Verify it's working:

1. Open DevTools (F12) → Network tab
2. Try to login
3. Check the request URL - it should be: `http://localhost:5000/api/auth/login` ✅

---

**If still not working, let me know which step failed!**
