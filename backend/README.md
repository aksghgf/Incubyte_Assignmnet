# Sweet Shop Backend API

Express + TypeScript + Prisma + MongoDB backend for Sweet Shop Management System.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB running locally OR MongoDB Atlas account

### Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment:**
```bash
cp .env.example .env
# Edit .env and update DATABASE_URL with your MongoDB connection string
```

3. **Generate Prisma Client:**
```bash
npm run prisma:generate
```

4. **Push database schema:**
```bash
npm run prisma:push
```

5. **Start development server:**
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## 📁 Project Structure

```
src/
├── config/          # Configuration files
├── middleware/      # Express middleware
├── schemas/         # Zod validation schemas
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── routes/          # API routes (coming soon)
├── controllers/     # Route controllers (coming soon)
├── services/        # Business logic (coming soon)
├── repositories/    # Database access layer (coming soon)
├── app.ts           # Express app setup
└── server.ts        # Server entry point
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Get coverage report
npm run test:coverage
```

## 📝 API Endpoints

Coming soon...

## 🗄️ Database

This project uses MongoDB with Prisma ORM. 

**MongoDB Atlas Setup:**
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `DATABASE_URL` in `.env`

**Local MongoDB:**
```bash
# Default connection
DATABASE_URL="mongodb://localhost:27017/sweetshop"
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm test` - Run tests
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:push` - Push schema to database
- `npm run prisma:studio` - Open Prisma Studio (DB GUI)

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Language:** TypeScript
- **Database:** MongoDB
- **ORM:** Prisma
- **Validation:** Zod
- **Authentication:** JWT
- **Testing:** Jest + Supertest
