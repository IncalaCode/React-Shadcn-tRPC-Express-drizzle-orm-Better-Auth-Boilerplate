# 🏗️ Project Structure & Organization

This document explains the complete structure of the React + tRPC + Express + Drizzle ORM + Better Auth boilerplate.

## 📁 **Root Directory Structure**

```
react-trpc-express-drizzle-better-auth/
├── 📁 backend/                # Express.js backend application
├── 📁 frontend/               # React frontend application
├── 📁 docs/                   # Documentation and guides
├── 📄 package.json            # Root workspace configuration
├── 📄 README.md               # Project overview
└── 🚀 deploy.sh               # Deployment script
```

## 🖥️ **Backend Layer (`backend/`)**

### **Purpose**
Express.js server with tRPC, Drizzle ORM, and Better Auth authentication.

### **Structure**
```
backend/
├── 📄 package.json            # Backend dependencies
├── 📄 tsconfig.json           # TypeScript configuration
├── 📄 env.example             # Environment variables template
├── 📄 src/
│   ├── 📄 index.ts            # Main server entry point
│   ├── 📁 trpc/               # tRPC setup and routers
│   ├── 📁 database/           # Drizzle ORM setup and schema
│   ├── 📁 auth/               # Better Auth configuration
│   ├── 📁 middleware/         # Express middleware
│   ├── 📁 services/           # Business logic layer
│   └── 📁 utils/              # Backend utilities
└── 📁 dist/                   # Compiled JavaScript (production)
```

### **Key Files Explained**

#### **`src/index.ts` - Main Server**
```typescript
// Server setup with:
- Security middleware (Helmet, CORS)
- Rate limiting
- Body parsing
- Database connection
- Better Auth integration
- tRPC integration
- Route setup
- Error handling
```

#### **`src/trpc/` - tRPC Setup**
```typescript
trpc/
├── 📄 trpc.ts                 # tRPC configuration and setup
├── 📄 context.ts              # tRPC context with auth
├── 📁 routers/                # tRPC procedure routers
│   ├── 📄 _app.ts             # Main router combining all routers
│   ├── 📄 auth.ts             # Auth router
│   └── 📄 user.ts             # User router
├── 📁 middleware/             # tRPC middleware
│   └── 📄 auth.ts             # Authentication middleware
└── 📁 controllers/            # Controller layer (organized procedures)
    ├── 📄 index.ts            # Controller exports
    ├── 📁 auth/               # Auth controllers
    │   ├── 📄 auth.controller.ts
    │   ├── 📁 signUp/
    │   ├── 📁 signIn/
    │   ├── 📁 signOut/
    │   └── 📁 [other auth functions]/
    └── 📁 user/               # User controllers
        ├── 📄 user.controller.ts
        ├── 📁 getProfile/
        ├── 📁 updateProfile/
        └── 📁 [other user functions]/
```

#### **`src/database/` - Data Layer**
```typescript
database/
├── 📄 connection.ts            # Drizzle database connection
├── 📁 entities/                # Database schema
│   ├── 📄 auth-schema.ts      # Auth entities for Better Auth
│   └── 📄 [other-schemas].ts  # Additional database schemas
├── 📁 migrations/              # Database schema changes
└── 📁 seeds/                   # Database seeding scripts
```

#### **`src/auth/` - Better Auth Configuration**
```typescript
auth/
├── 📄 config.ts               # Better Auth configuration
└── 📄 middleware.ts            # Express auth middleware
```

#### **`src/services/` - Business Logic**
```typescript
services/
├── 📄 index.ts                # Service exports
└── 📄 email.service.ts        # Email service for notifications
```

#### **`src/utils/` - Backend Utilities**
```typescript
utils/
├── 📄 logger.ts               # Logging utility
├── 📄 security.ts             # Security utilities (rate limiting)
└── 📄 cors.ts                 # CORS configuration utility
```

### **Backend Architecture Patterns**

#### **1. Layered Architecture**
```
tRPC Routers → Controllers → Services → Database (Drizzle ORM)
     ↑            ↑           ↑           ↑
  Route Setup  Function Logic  Business Logic  Data Access
```

#### **2. Controller Organization**
```typescript
// Each function has its own folder and file
// Controllers import and organize individual functions
// tRPC routers use controller exports
// Clean separation of concerns
```

#### **3. Better Auth Integration**
```typescript
// Better Auth handles authentication
// tRPC procedures use auth context
// Drizzle ORM schema matches Better Auth requirements
```

#### **4. Middleware Chain**
```typescript
// Request flows through middleware chain:
Request → Security → CORS → Rate Limit → Body Parser → Better Auth → Route → Response
```

## 🎨 **Frontend Layer (`frontend/`)**

### **Purpose**
React application with Better Auth client, TypeScript, and modern tooling.

### **Structure**
```
frontend/
├── 📄 package.json            # Frontend dependencies
├── 📄 tsconfig.json           # TypeScript configuration
├── 📄 vite.config.ts          # Vite build configuration
├── 📄 tailwind.config.js      # Tailwind CSS configuration
├── 📄 .env                    # Frontend environment variables
├── 📄 index.html              # Main HTML template
├── 📄 src/
│   ├── 📄 main.tsx            # React entry point
│   ├── 📄 App.tsx             # Main app component
│   ├── 📁 components/         # Reusable UI components
│   ├── 📁 pages/              # Route components
│   ├── 📁 layouts/            # Page layouts
│   ├── 📁 contexts/           # React contexts
│   ├── 📁 lib/                # Utilities and configurations
│   ├── 📁 providers/          # React providers
│   ├── 📁 types/              # TypeScript type definitions
│   └── 📁 styles/             # CSS and styling
└── 📁 dist/                   # Built application (production)
```

### **Key Files Explained**

#### **`src/main.tsx` - React Entry Point**
```typescript
// Sets up:
- React Router for navigation
- Toast notifications
- Development tools
```

#### **`src/App.tsx` - Main App Component**
```typescript
// Handles:
- Authentication context
- Route protection
- Layout switching
- Global state
```

#### **`src/components/` - UI Components**
```typescript
components/
├── 📄 LoginForm.tsx           # Login form component
├── 📄 RegisterForm.tsx        # Registration form component
├── 📄 ProtectedRoute.tsx      # Route protection wrapper
└── 📁 ui/                     # Reusable UI components
    ├── 📄 alert.tsx           # Alert component
    ├── 📄 avatar.tsx          # Avatar component
    └── 📄 button.tsx          # Button component
```

#### **`src/contexts/` - React Contexts**
```typescript
contexts/
└── 📄 AuthContext.tsx         # Authentication context and logic
```

#### **`src/providers/` - React Providers**
```typescript
providers/
└── 📄 TRPCProvider.tsx        # React Query provider with DevTools
```

#### **`src/pages/` - Route Components**
```typescript
pages/
├── 📄 HomePage.tsx            # Landing page
├── 📄 LoginPage.tsx           # User authentication
├── 📄 RegisterPage.tsx        # User registration
├── 📄 ForgotPasswordPage.tsx  # Password reset request
├── 📄 ResetPasswordPage.tsx   # Password reset
└── 📄 NotFoundPage.tsx        # 404 page
```

#### **`src/layouts/` - Page Layouts**
```typescript
layouts/
├── 📄 MainLayout.tsx          # Authenticated user layout
└── 📄 AuthLayout.tsx          # Authentication pages layout
```

#### **`src/lib/` - Utilities and Config**
```typescript
lib/
├── 📄 auth.ts                 # Better Auth client configuration
├── 📄 trpc.ts                 # tRPC client setup (placeholder)
├── 📄 config.ts               # Frontend configuration
└── 📄 utils.ts                # Utility functions
```

### **Frontend Architecture Patterns**

#### **1. Component Hierarchy**
```
App → Layout → Page → Components → UI Elements
  ↑      ↑      ↑        ↑           ↑
Global  Page   Route   Feature    Reusable
State  Layout  Logic   Logic      Elements
```

#### **2. State Management**
```typescript
// Uses React Context + hooks for:
- Authentication state (Better Auth)
- User preferences
- Global notifications
- Theme management

// React Query for:
- Server state management
- Caching and synchronization
- Background updates
- DevTools integration
```

#### **3. Data Flow**
```
User Action → Component → Better Auth → Backend → Database
     ↑           ↑           ↑          ↑        ↑
  UI Event   State Update  Auth Flow  Server   Business
```

## 🔗 **Integration Points**

### **1. Better Auth Bridge**
```typescript
// Backend: Better Auth server configuration
// Frontend: Better Auth client
// Shared: User types and authentication flow
```

### **2. Type Safety Bridge**
```typescript
// Backend exports types
export type AppRouter = typeof appRouter;

// Frontend imports and uses
import { trpc } from '@/lib/trpc';
import type { AppRouter } from '@/backend/src/trpc';
```

### **3. Database Schema**
```typescript
// Drizzle ORM schema matches Better Auth requirements
// Automatic schema synchronization
// Migration system for production
```

## 📊 **File Naming Conventions**

### **Backend**
- **Files**: `camelCase.ts` (e.g., `userService.ts`)
- **Classes**: `PascalCase` (e.g., `UserService`)
- **Functions**: `camelCase` (e.g., `getUserById`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_FILE_SIZE`)

### **Frontend**
- **Files**: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- **Components**: `PascalCase` (e.g., `UserProfile`)
- **Hooks**: `camelCase` (e.g., `useUserProfile`)
- **Types**: `PascalCase` (e.g., `UserProfileProps`)

### **Shared**
- **Files**: `camelCase.ts` (e.g., `validationUtils.ts`)
- **Types**: `PascalCase` (e.g., `ValidationResult`)
- **Functions**: `camelCase` (e.g., `validateEmail`)

## 🎯 **Best Practices**

### **1. Separation of Concerns**
- **Backend**: Handle data, business logic, and API
- **Frontend**: Handle UI, user interaction, and state
- **Better Auth**: Handle authentication and authorization

### **2. Type Safety**
- Always define interfaces for data structures
- Use TypeScript strict mode
- Leverage tRPC for end-to-end type safety

### **3. Code Organization**
- Group related functionality together
- Keep files focused and single-purpose
- Use consistent naming patterns

### **4. Configuration Management**
- Use environment variables for configuration
- Validate environment variables
- Use type-safe configuration objects

### **5. Error Handling**
- Handle errors at appropriate levels
- Provide meaningful error messages
- Log errors for debugging

## 🚀 **Adding New Features**

### **1. Backend Feature**
```
1. Create schema in database/entities/
2. Create controller functions in controllers/[feature]/
3. Add controller to controllers/index.ts
4. Create tRPC router in trpc/routers/
5. Update shared types
6. Add validation schemas
7. Test with tRPC
```

### **2. Frontend Feature**
```
1. Create components in components/
2. Add pages in pages/
3. Create hooks in hooks/
4. Update routing in App.tsx
5. Style with Tailwind CSS
```

### **3. Authentication Feature**
```
1. Configure in auth/config.ts
2. Update entities if needed
3. Add frontend components
4. Test authentication flow
```

## 🔐 **Better Auth Integration**

### **Key Components**
- **User Entity**: Stores user information
- **Session Entity**: Manages user sessions
- **Account Entity**: Handles OAuth accounts
- **Verification Entity**: Email verification tokens

### **Authentication Flow**
1. User registers/logs in
2. Better Auth creates session
3. Frontend receives authentication state
4. Protected routes check auth context
5. tRPC procedures use auth context

### **Configuration Options**
- Session vs JWT mode
- Email verification
- Password reset
- OAuth providers
- Rate limiting
- Security policies

---

**🎉 Understanding this structure will help you navigate the codebase, add new features, and maintain consistency across your application.**
