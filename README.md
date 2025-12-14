# Sweet Shop Management System

A full-stack sweet shop management system built with modern web technologies, featuring user authentication, inventory management, and role-based access control.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication with registration and login
- **Sweet Inventory Management**: Complete CRUD operations for sweet items
- **Admin Dashboard**: Advanced admin interface for managing sweets, restocking, and monitoring
- **Search & Filter**: Powerful search functionality with category and price range filters
- **Purchase System**: Real-time inventory tracking with purchase functionality
- **Role-Based Access Control**: Separate user and admin permissions
- **Responsive Design**: Modern, clean UI that works across all devices

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB Atlas with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Jest with Supertest
- **Validation**: Zod schemas

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS Modules
- **State Management**: React Context API
- **HTTP Client**: Axios

## 📋 Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **MongoDB Atlas Account**: Free tier works perfectly
- **Git**: For version control

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd sweet-shop-system
```

### 2. Backend Setup

```bash
cd backend
npm install
```

**Create `.env` file** in the backend directory:

```env
# Database
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/sweetshop?retryWrites=true&w=majority"

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:5173
```

**Generate Prisma Client**:

```bash
npx prisma generate
```

**Run the Backend**:

```bash
npm run dev
```

Backend server will start on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

**Create `.env` file** in the frontend directory (if needed):

```env
VITE_API_URL=http://localhost:5000/api
```

**Run the Frontend**:

```bash
npm run dev
```

Frontend will start on `http://localhost:5173`

## 🧪 Running Tests

### Backend Tests

```bash
cd backend
npm test
```

**Generate Coverage Report**:

```bash
npm test -- --coverage
```

Coverage report will be available in `backend/coverage/index.html`

### Test Coverage

- **38 Test Cases** covering all major functionality
- **Unit Tests**: AuthService, SweetsService
- **Integration Tests**: API endpoints
- **Coverage**: 70%+ across files, functions, lines, and branches

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login | No |

### Sweets Management

| Method | Endpoint | Description | Auth Required | Admin Only |
|--------|----------|-------------|---------------|------------|
| GET | `/api/sweets` | Get all sweets | No | No |
| GET | `/api/sweets/search` | Search sweets | No | No |
| GET | `/api/sweets/:id` | Get sweet by ID | No | No |
| POST | `/api/sweets` | Create new sweet | Yes | Yes |
| PUT | `/api/sweets/:id` | Update sweet | Yes | Yes |
| DELETE | `/api/sweets/:id` | Delete sweet | Yes | Yes |
| POST | `/api/sweets/:id/purchase` | Purchase sweet | Yes | No |
| POST | `/api/sweets/:id/restock` | Restock sweet | Yes | Yes |

## 🤖 My AI Usage

### My Role & Contributions

Before diving into AI assistance, it's important to clarify **my core responsibilities and decisions** in this project:

#### Architecture & Design Decisions 🏛️
- **Backend Setup**: Designed and implemented the complete backend architecture with MongoDB Atlas integration
- **Scalable Folder Structure**: Decided on and implemented the layered architecture:
  - **Middleware Layer**: Authentication, role-based access control, error handling, validation
  - **Controllers Layer**: Request/response handling and routing logic
  - **Services Layer**: Business logic and data processing
  - **Repositories Layer**: Database access and queries
  - **Utils**: Reusable utilities (JWT, password hashing, error classes, response formatters)
  
#### Technical Implementation 🛠️
- **Error Handling Mechanism**: Designed custom error classes (`AppError`, `NotFoundError`, `UnauthorizedError`, etc.) with centralized error middleware
- **Database Schema Design**: Created Prisma schema for MongoDB with proper relationships and indexes
- **Authentication Flow**: Implemented JWT-based authentication with password hashing (bcrypt)
- **API Route Structure**: Organized RESTful endpoints following best practices

#### Deployment Planning 🚀
- **Platform Selection**: Chose Vercel for frontend and Render for backend deployment
- **Environment Configuration**: Set up proper environment variable handling for production
- **Database Strategy**: Configured MongoDB Atlas for cloud database hosting

**Result**: A production-ready, scalable architecture that can handle growth and is deployment-ready.

---

### AI Tools Used

I extensively leveraged AI assistance throughout this project using two primary tools:

1. **ChatGPT** - For architecture planning and best practices research
2. **Google Gemini (Antigravity AI Assistant)** - For code implementation and debugging

### How I Used AI

#### 🏗️ Architecture & Project Structure (ChatGPT)

**Consultation**: I used ChatGPT to research and determine the best folder structure for a scalable full-stack application.

**Key Insights Gained**:
- **Atomic Design Principles**: ChatGPT recommended organizing the frontend using atomic design patterns (atoms, molecules, organisms) for better component reusability
- **Backend Layer Separation**: Learned about separating concerns into controllers, services, repositories, and middleware layers
- **Prisma ORM**: Got recommendations on using Prisma for type-safe database operations with MongoDB

**Example Prompt**: "What is the best folder structure for a full-stack MERN application with TypeScript? Should I use atomic design?"

**Decision Made**: Implemented a clean architecture with:
- Backend: `controllers → services → repositories → database`
- Frontend: Feature-based structure with shared components

#### 💻 Code Implementation (Antigravity/Google Gemini)

**Usage**: Antigravity was my primary coding partner for writing boilerplate code, implementing features, and debugging issues.

**Specific Contributions**:

1. **Boilerplate Generation**
   - Express server setup with TypeScript
   - Prisma schema for MongoDB
   - JWT authentication middleware
   - Error handling utilities
   - API route structures

2. **Feature Implementation**
   - Auth service with password hashing and JWT token generation
   - Sweets CRUD service with validation
   - React components with TypeScript interfaces
   - API integration layer with Axios

3. **Test Suite Creation**
   - Generated 38 comprehensive test cases
   - Unit tests for AuthService and SweetsService
   - Integration tests for API endpoints
   - Mock setups and test fixtures

4. **Critical Debugging**
   - **DATABASE_URL Issue**: Antigravity identified that a system-level environment variable from another project (PostgreSQL) was overriding my MongoDB connection string
   - **TypeScript Type Conflicts**: Resolved complex type mismatches between Express Request types, Prisma types, and JWT payload types
   - **Error Handling**: Implemented proper `NotFoundError` handling for 404 responses instead of generic 500 errors

5. **Integration Analysis**
   - Performed comprehensive backend-frontend sync verification
   - Identified type inconsistencies between API contracts
   - Validated all endpoint mappings

#### � Research & Problem Solving

**ChatGPT Usage**:
- Researching MongoDB best practices with Prisma
- Understanding JWT token refresh strategies
- Learning about role-based access control patterns

**Antigravity Usage**:
- Real-time code fixes and refactoring
- Explaining error messages and suggesting solutions
- Code review and optimization suggestions

### Reflection on AI Impact

#### Positive Impacts

**Development Speed** ⚡
- Reduced development time by approximately **50-60%** through rapid boilerplate generation
- Instant access to best practices instead of hours of research

**Code Quality** ✨
- AI suggestions followed SOLID principles and TypeScript best practices
- Consistent code style across the project
- Comprehensive error handling patterns

**Learning Acceleration** 📚
- Learned Prisma ORM integration with MongoDB
- Understood advanced TypeScript type patterns
- Discovered modern React patterns and hooks

**Debugging Efficiency** 🐛
- The DATABASE_URL debugging session would have taken hours manually
- Antigravity's systematic approach to identifying the system environment variable conflict was invaluable

#### Challenges Encountered

**Verification Required** ⚠️
- Always had to validate AI-generated code for correctness
- Some initial suggestions needed customization for specific requirements
- Type definitions occasionally needed manual adjustment

**Over-reliance Risk** 🎯
- Had to ensure I understood the "why" behind suggestions, not just the "how"
- Forced myself to review and comprehend generated code before accepting

**Context Limitations** 📝
- Sometimes needed to provide multiple iterations to get the exact desired outcome
- Had to be specific about project requirements and constraints

### Key Learnings

**AI as a Tool, Not a Replacement** 🤝
- AI is most effective when you understand the problem domain yourself
- Critical thinking is essential to validate and customize AI suggestions
- The best results come from collaboration, not blind acceptance

**Effective AI Usage Patterns** 💡
1. Start with clear, specific prompts
2. Validate all generated code through testing
3. Use AI for learning, not just copying
4. Ask "why" when AI makes suggestions
5. Combine multiple AI tools for different strengths

**When AI Excels** ✅
- Boilerplate code generation
- Test case creation
- Debugging complex issues
- Research and documentation
- Code refactoring suggestions

**When Human Input is Critical** 👤
- Business logic decisions
- Security considerations
- Performance optimization choices
- Final code review and quality assurance
- Understanding user requirements

### Transparency Note

Every commit involving significant AI assistance includes AI co-authorship attribution:

```bash
Co-authored-by: Google Gemini <gemini@google.com>
```

This project demonstrates how AI can augment human capabilities in software development while maintaining high code quality and learning outcomes. The key is using AI as a **powerful assistant** while retaining **human oversight and decision-making**.

## � Screenshots

### Homepage
![Homepage](./screenshots/homepage.png)
*Browse available sweets with search and filter functionality*

### Login Page
![Login](./screenshots/login.png)
*Secure authentication system*

### Admin Dashboard
![Admin Dashboard](./screenshots/admin-dashboard.png)
*Comprehensive admin interface for inventory management*

### Sweet Details
![Sweet Details](./screenshots/sweet-details.png)
*Detailed view with purchase functionality*

## 📝 License

MIT License - feel free to use this project for learning and development.

## 🙏 Acknowledgments

- **Incubyte** for providing this TDD kata challenge
- **ChatGPT** for architecture guidance
- **Google Gemini (Antigravity)** for development assistance
- Open source community for amazing tools and libraries

---

**Developed with modern practices, comprehensive testing, and AI-assisted development** 🚀
