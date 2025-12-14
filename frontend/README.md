# Sweet Shop Frontend

React + TypeScript + Vite frontend for Sweet Shop Management System.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Backend API running on http://localhost:5000

### Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment:**
```bash
cp .env.example .env
# Edit .env if needed
```

3. **Start development server:**
```bash
npm run dev
```

Application will run on `http://localhost:5173`

## 📁 Project Structure (Feature-Based)

```
src/
├── features/           # Feature modules
│   ├── auth/          # Authentication
│   ├── sweets/        # Sweet catalog
  └── admin/         # Admin panel
├── components/        # Shared components
│   ├── Layout/        # Layout components
│   ├── ui/            # Reusable UI components
│   └── common/        # Common components
├── hooks/             # Global React Query hooks
├── services/api/      # API service files
├── types/             # TypeScript types
├── config/            # Configuration
└── styles/            # Global styles
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Get coverage report
npm run test:coverage
```

## 🛠️ Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Data Fetching:** React Query (TanStack Query)
- **Forms:** React Hook Form + Zod
- **HTTP Client:** Axios
- **Testing:** Vitest + React Testing Library

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Get coverage report

## 🎨 Features

- ✅ User registration and login
- ✅ Sweet catalog with search/filter
- ✅ Purchase functionality
- ✅ Admin CRUD operations
- ✅ Inventory management (restock)
- ✅ Role-based access control
- ✅ Responsive design
