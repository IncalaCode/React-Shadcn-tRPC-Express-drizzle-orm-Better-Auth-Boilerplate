# 🚀 Complete Developer & AI Guide

**React (Shadcn) + tRPC + Express + Drizzle ORM + Better Auth Boilerplate**

A comprehensive guide for developers and AI assistants working with this modern full-stack TypeScript boilerplate.

## 📋 Table of Contents

1. [🎯 Overview & Features](#-overview--features)
2. [🏗️ Project Structure](#️-project-structure)
3. [⚡ Quick Start](#-quick-start)
4. [🔧 Configuration](#-configuration)
5. [🔐 Dynamic Authentication System](#-dynamic-authentication-system)
6. [🤖 AI-Assisted Development](#-ai-assisted-development)
7. [🚀 Deployment](#-deployment)
8. [📚 Development Workflows](#-development-workflows)
9. [🔍 Troubleshooting](#-troubleshooting)
10. [📝 Prompt Templates](#-prompt-templates)

---

## 🎯 Overview & Features

### **What This Boilerplate Provides**

- **Frontend**: React 18 + TypeScript + Vite + Shadcn UI + Better Auth Client
- **Backend**: Express.js + TypeScript + tRPC Server + Better Auth
- **Database**: Drizzle ORM with multiple database support (PostgreSQL, MySQL, SQLite)
- **Authentication**: Better Auth with dynamic email/phone authentication
- **Type Safety**: Full end-to-end type safety with tRPC
- **Modern Tooling**: Latest dependencies and best practices
- **Deployment Ready**: Separate frontend/backend for easy deployment

### **Key Features**

#### **🔐 Dynamic Authentication System**
- **Flexible Methods**: Email, phone, or both (configurable via environment)
- **Backend-Driven UI**: Frontend adapts based on backend configuration
- **Phone Verification**: SMS service with customizable providers
- **Email Verification**: Built-in email verification system
- **Password Reset**: Secure password reset functionality
- **Session Management**: Flexible session and JWT authentication

#### **🎨 Modern UI with Shadcn**
- **Beautiful Components**: Modern, accessible component library
- **Responsive Design**: Mobile-first responsive design
- **Dark Mode**: Built-in dark mode support
- **TypeScript**: Full TypeScript support for all components
- **Customizable**: Easy to customize with Tailwind CSS

#### **🏗️ Clean Architecture**
- **Organized Controllers**: Individual function folders for maintainability
- **Type Safety**: End-to-end type safety with tRPC
- **Modular Structure**: Easy to add/remove features
- **Better Auth Integration**: Seamless authentication flow

---

## 🏗️ Project Structure

```
react-trpc-express-drizzle-better-auth/
├── 📁 frontend/                    # React frontend application
│   ├── 📄 src/
│   │   ├── 📁 components/          # Reusable UI components
│   │   │   ├── 📄 LoginForm.tsx    # Dynamic login form
│   │   │   ├── 📄 RegisterForm.tsx # Dynamic registration form
│   │   │   ├── 📄 AuthMethodSelector.tsx # Method selection component
│   │   │   └── 📁 ui/              # Shadcn UI components
│   │   ├── 📁 pages/               # Route components
│   │   │   ├── 📄 LoginPage.tsx    # Login page
│   │   │   ├── 📄 RegisterPage.tsx # Registration page
│   │   │   ├── 📄 ForgotPasswordPage.tsx # Password reset
│   │   │   └── 📄 ResetPasswordPage.tsx # Password reset form
│   │   ├── 📁 contexts/            # React contexts
│   │   │   └── 📄 AuthContext.tsx  # Authentication context
│   │   ├── 📁 lib/                 # Utilities and configurations
│   │   │   ├── 📁 auth/            # Modular auth library
│   │   │   │   ├── 📄 client.ts    # Better Auth client
│   │   │   │   ├── 📄 login.ts     # Login methods
│   │   │   │   ├── 📄 register.ts  # Registration methods
│   │   │   │   ├── 📄 verification.ts # Verification methods
│   │   │   │   ├── 📄 profile.ts   # Profile methods
│   │   │   │   └── 📄 index.ts     # Main export
│   │   │   ├── 📄 trpc.ts          # tRPC client setup
│   │   │   └── 📄 config.ts        # Frontend configuration
│   │   ├── 📁 hooks/               # Custom React hooks
│   │   │   └── 📄 useAuthConfig.ts # Auth config hook
│   │   └── 📁 providers/           # React providers
│   │       └── 📄 TRPCProvider.tsx # tRPC provider
│   └── 📁 dist/                    # Built application
├── 📁 backend/                     # Express backend application
│   ├── 📄 src/
│   │   ├── 📄 index.ts             # Main server entry point
│   │   ├── 📁 trpc/                # tRPC setup and routers
│   │   │   ├── 📁 routers/         # tRPC procedure routers
│   │   │   │   ├── 📄 _app.ts      # Main router
│   │   │   │   ├── 📄 auth.ts      # Auth router
│   │   │   │   └── 📄 user.ts      # User router
│   │   │   ├── 📄 trpc.ts          # tRPC configuration
│   │   │   └── 📄 context.ts       # tRPC context
│   │   ├── 📁 controllers/         # Organized controller functions
│   │   │   ├── 📁 auth/            # Auth controllers
│   │   │   │   ├── 📁 signUp/      # Sign up function
│   │   │   │   ├── 📁 signIn/      # Sign in function
│   │   │   │   ├── 📁 signOut/     # Sign out function
│   │   │   │   ├── 📁 getSession/  # Get session function
│   │   │   │   ├── 📁 getMe/       # Get user profile
│   │   │   │   ├── 📁 updateProfile/ # Update profile
│   │   │   │   ├── 📁 changePassword/ # Change password
│   │   │   │   ├── 📁 forgotPassword/ # Forgot password
│   │   │   │   ├── 📁 resetPassword/ # Reset password
│   │   │   │   ├── 📁 verifyEmail/ # Email verification
│   │   │   │   ├── 📁 sendVerificationEmail/ # Send verification
│   │   │   │   ├── 📄 authConfig.ts # Auth configuration endpoint
│   │   │   │   └── 📄 auth.controller.ts # Main auth controller
│   │   │   └── 📁 user/            # User controllers
│   │   │       ├── 📁 updateProfile/ # User profile update
│   │   │       └── 📄 user.controller.ts # Main user controller
│   │   ├── 📁 database/            # Drizzle ORM setup
│   │   │   ├── 📁 entities/        # Database schema
│   │   │   │   └── 📄 auth-schema.ts # Auth entities
│   │   │   ├── 📁 migrations/      # Database migrations
│   │   │   └── 📄 connection.ts    # Database connection
│   │   ├── 📁 auth/                # Better Auth configuration
│   │   │   └── 📄 config.ts        # Better Auth setup
│   │   ├── 📁 services/            # Business logic
│   │   │   └── 📄 sms.service.ts   # SMS service for phone auth
│   │   ├── 📁 middleware/          # Express middleware
│   │   └── 📁 utils/               # Backend utilities
│   └── 📁 dist/                    # Compiled JavaScript
├── 📁 docs/                        # Documentation
└── 📄 package.json                 # Root workspace configuration
```

### **Architecture Patterns**

#### **1. Layered Architecture**
```
Frontend (React) ←→ tRPC Client ←→ tRPC Server ←→ Controllers ←→ Services ←→ Database (Drizzle ORM)
     ↑                    ↑              ↑            ↑           ↑           ↑
  UI Logic         Type Safety    Route Setup   Function Logic  Business Logic  Data Access
```

#### **2. Controller Organization**
```typescript
// Each function has its own folder and file
controllers/
├── auth/
│   ├── signUp/signUp.ts           # Individual function
│   ├── signIn/signIn.ts           # Individual function
│   └── auth.controller.ts         # Main controller that imports all
└── user/
    ├── updateProfile/updateProfile.ts
    └── user.controller.ts
```

#### **3. Dynamic Authentication Flow**
```
Backend Config → tRPC Endpoint → Frontend Hook → UI Components
     ↑              ↑              ↑              ↑
Environment    Auth Config    React Query    Dynamic Forms
Variables      Endpoint       Hook           (Email/Phone)
```

---

## ⚡ Quick Start

### **Prerequisites**
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** 9+ (comes with Node.js)
- **Database** (PostgreSQL, MySQL, SQLite, etc.)

### **Step 1: Clone & Setup**
```bash
# Clone the repository
git clone <your-repo-url>
cd react-trpc-express-drizzle-better-auth

# Install all dependencies
npm install
npm install --workspace=frontend
npm install --workspace=backend
```

### **Step 2: Environment Configuration**
```bash
# Copy environment template
cp backend/env.example backend/.env

# Edit the configuration file
nano backend/.env  # or use your favorite editor
```

### **Essential Configuration**
```bash
# Database (choose one)
DB_TYPE=postgres          # or mysql, sqlite, mariadb
DB_HOST=localhost
DB_PORT=5432              # 3306 for MySQL, 5432 for PostgreSQL
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=myapp
DB_SYNCHRONIZE=true       # Auto-sync schema in development

# Better Auth
BETTER_AUTH_SECRET=your-super-secret-key-here
BETTER_AUTH_URL=http://localhost:3001

# Dynamic Authentication Configuration
AUTH_METHOD=both          # 'email', 'phone', or 'both'
SHOW_AUTH=both           # 'login', 'register', or 'both'
PHONE_AUTH_ENABLED=true
PHONE_VERIFICATION_REQUIRED=true
PHONE_VERIFICATION_EXPIRES=300
SMS_PROVIDER=mock         # 'mock', 'custom', or your provider

# App Settings
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3001

# Email Service (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@yourapp.com
```

### **Step 3: Database Setup**

#### **Option A: PostgreSQL (Recommended)**
```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib  # Ubuntu/Debian
brew install postgresql                          # macOS

# Create database
sudo -u postgres psql
CREATE DATABASE myapp;
CREATE USER myuser WITH PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE myapp TO myuser;
\q
```

#### **Option B: SQLite (Simplest)**
```bash
# Update backend/.env
DB_TYPE=sqlite
DB_DATABASE=./database.sqlite
# Remove other DB_* variables
```

### **Step 4: Start Development**
```bash
# Start both frontend and backend
npm run dev

# Or start them separately:
npm run dev:frontend  # Frontend on http://localhost:3000
npm run dev:backend   # Backend on http://localhost:3001
```

### **Step 5: Verify Installation**

#### **Frontend** - http://localhost:3000
- ✅ React app loads
- ✅ Tailwind CSS styles applied
- ✅ Dynamic authentication forms
- ✅ No console errors

#### **Backend** - http://localhost:3001
- ✅ Server starts without errors
- ✅ Database connection established
- ✅ Auth config endpoint: http://localhost:3001/api/trpc/auth.getAuthConfig

#### **Authentication** - http://localhost:3001/api/auth
- ✅ Better Auth endpoints available
- ✅ Dynamic registration and login
- ✅ Email/phone verification (if configured)

---

## 🔧 Configuration

### **Dynamic Authentication Configuration**

The system supports flexible authentication methods controlled by environment variables:

#### **Authentication Methods**
```bash
# Single method
AUTH_METHOD=email        # Email only
AUTH_METHOD=phone        # Phone only

# Multiple methods
AUTH_METHOD=both         # Both email and phone
```

#### **Authentication Page Access Control**
```bash
# Page access control - which auth pages are accessible
SHOW_AUTH=both          # Both login and register pages accessible (default)
SHOW_AUTH=login         # Only login page accessible, registration disabled
SHOW_AUTH=register      # Only register page accessible, login disabled
```

**Security Features:**
- **Login Only Mode**: When `SHOW_AUTH=login`, registration is completely disabled
- **Register Only Mode**: When `SHOW_AUTH=register`, login is completely disabled
- **Backend Protection**: All auth endpoints are protected and return 403 errors when disabled
- **Frontend Protection**: Disabled pages show access denied message
- **Token Validation**: No authentication tokens are accepted for disabled operations

#### **Phone Authentication Settings**
```bash
PHONE_AUTH_ENABLED=true
PHONE_VERIFICATION_REQUIRED=true
PHONE_VERIFICATION_EXPIRES=300  # 5 minutes
SMS_PROVIDER=mock               # For development
```

#### **Email Authentication Settings**
```bash
BETTERAUTH_EMAIL_VERIFICATION_REQUIRED=true
BETTERAUTH_EMAIL_VERIFICATION_EXPIRES=86400  # 24 hours
```

### **SMS Provider Configuration**

#### **Mock SMS (Development)**
```bash
SMS_PROVIDER=mock
```
This logs SMS messages to the console for testing.

#### **Custom SMS Provider**
```bash
SMS_PROVIDER=custom
SMS_API_KEY=your-api-key
SMS_API_SECRET=your-api-secret
SMS_ENDPOINT=https://api.yoursmsprovider.com/send
```

### **Database Configuration**

#### **PostgreSQL**
```bash
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=myapp
```

#### **MySQL**
```bash
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=myapp
```

#### **SQLite**
```bash
DB_TYPE=sqlite
DB_DATABASE=./database.sqlite
```

---

## 🔐 Dynamic Authentication System

### **How It Works**

1. **Backend Configuration**: Environment variables determine available auth methods
2. **tRPC Endpoint**: `/api/trpc/auth.getAuthConfig` provides configuration to frontend
3. **Frontend Adaptation**: UI components dynamically render based on configuration
4. **User Experience**: Seamless authentication with appropriate input fields

### **Configuration Endpoint Response**

```json
{
  "availableMethods": [
    {
      "type": "email",
      "label": "Email",
      "placeholder": "Enter your email address",
      "icon": "Mail",
      "verificationRequired": true,
      "verificationType": "email"
    },
    {
      "type": "phone",
      "label": "Phone Number",
      "placeholder": "Enter your phone number",
      "icon": "Phone",
      "verificationRequired": true,
      "verificationType": "sms"
    }
  ],
  "settings": {
    "allowMultipleMethods": true,
    "defaultMethod": "email",
    "passwordMinLength": 8,
    "passwordMaxLength": 128
  },
  "ui": {
    "showEmailOption": true,
    "showPhoneOption": true,
    "showMethodSelector": true,
    "emailLabel": "Email Address",
    "phoneLabel": "Phone Number",
    "passwordLabel": "Password",
    "signInButtonText": "Sign In",
    "signUpButtonText": "Create Account"
  },
  "pages": {
    "allowLogin": true,
    "allowRegister": true,
    "allowForgotPassword": true,
    "allowResetPassword": true
  },
  "features": {
    "emailVerification": true,
    "phoneVerification": true,
    "passwordReset": true,
    "rememberMe": true
  }
}
```

### **Frontend Integration**

#### **Using AuthContext**
```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { 
    authConfig, 
    authConfigLoading, 
    login, 
    loginWithPhone,
    register 
  } = useAuth();

  if (authConfigLoading) {
    return <div>Loading...</div>;
  }

  // Check available methods
  const canUseEmail = authConfig.ui.showEmailOption;
  const canUsePhone = authConfig.ui.showPhoneOption;
  const showSelector = authConfig.ui.showMethodSelector;

  return (
    <div>
      {showSelector && (
        <AuthMethodSelector
          availableMethods={authConfig.availableMethods}
          selectedMethod={selectedMethod}
          onMethodChange={setSelectedMethod}
        />
      )}
      
      {canUseEmail && <EmailInput />}
      {canUsePhone && <PhoneInput />}
    </div>
  );
}
```

#### **Using React Query Hook**
```typescript
import { useAuthConfigWithFallback } from '@/hooks/useAuthConfig';

function MyComponent() {
  const { data: authConfig, isLoading } = useAuthConfigWithFallback();

  if (isLoading) {
    return <div>Loading auth config...</div>;
  }

  return (
    <div>
      {authConfig.ui.showEmailOption && <EmailForm />}
      {authConfig.ui.showPhoneOption && <PhoneForm />}
    </div>
  );
}
```

### **SMS Service Implementation**

#### **Custom SMS Provider**
```typescript
// backend/src/services/sms.service.ts
private async sendCustomSMS(message: SMSMessage): Promise<boolean> {
  // Example: Twilio implementation
  const twilio = require('twilio');
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  
  try {
    await client.messages.create({
      body: message.body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: message.to
    });
    return true;
  } catch (error) {
    console.error('SMS failed:', error);
    return false;
  }
}
```

---

## 🤖 AI-Assisted Development

### **Why AI-Assisted Development?**

- **🚀 Faster Development** - Generate boilerplate code quickly
- **🔍 Better Debugging** - AI can spot patterns and suggest fixes
- **📚 Learning Tool** - Understand patterns and best practices
- **🔄 Code Consistency** - Maintain uniform coding standards

### **Key Concepts for AI**

When working with AI, explain these concepts clearly:

```
Frontend (React) ←→ Better Auth Client ←→ Better Auth Server ←→ Express.js ←→ Drizzle ORM ←→ Database
     ↑                    ↑                    ↑                    ↑           ↑
  TypeScript          TypeScript           TypeScript          TypeScript   TypeScript
```

**Important**: The entire stack is TypeScript with **end-to-end type safety** and **Better Auth** for authentication!

### **Effective AI Prompts**

#### **1. Adding New Features**

**❌ Bad Prompt:**
```
"Add a blog post feature"
```

**✅ Good Prompt:**
```
"I need to add a blog post feature to this React + tRPC + Drizzle ORM + Better Auth boilerplate.

Requirements:
- Blog posts have title, content, author, and publish date
- Users can create, read, update, delete posts
- Only authenticated users can create/edit posts
- Public users can read published posts
- Use React Query for data management

Please create:
1. Drizzle ORM schema for BlogPost
2. Controller functions in controllers/blogPost/ folders
3. Main controller file that imports all functions
4. tRPC router that uses the controller
5. React components with React Query integration
6. Update the shared types

Follow the existing controller organization pattern and React Query setup."
```

#### **2. Debugging Issues**

**❌ Bad Prompt:**
```
"My app is broken, fix it"
```

**✅ Good Prompt:**
```
"I'm getting this error in my React + tRPC + Drizzle ORM + Better Auth app:

Error: [Error details here]
Stack trace: [Stack trace here]

Context:
- I'm trying to [describe what you were doing]
- This happens when [describe when it occurs]
- I'm using [describe your setup]

Here's the relevant code:
[Paste the code that's causing issues]

Please help me understand what's wrong and how to fix it."
```

### **AI Coding Workflows**

#### **Workflow 1: Feature Development**

1. **Plan with AI**
   ```
   "Help me plan the [feature name] for my app. What components, 
   database changes, and API endpoints will I need?"
   ```

2. **Generate Database Schema**
   ```
   "Create a Drizzle ORM schema for [entity name] with these fields: [list fields]. 
   Include proper column types, validation, and relationships."
   ```

3. **Create Controller Functions**
   ```
   "Create controller functions for [entity name] CRUD operations in 
   controllers/[entity]/ folders. Follow the pattern from existing controllers."
   ```

4. **Create tRPC Router**
   ```
   "Create a tRPC router for [entity name] that uses the controller functions. 
   Follow the pattern from the existing routers."
   ```

5. **Build React Components**
   ```
   "Create React components for [feature name] with React Query integration. 
   Use Tailwind CSS and follow the existing component patterns."
   ```

### **Code Generation Patterns**

#### **Drizzle ORM Schema Pattern**
```typescript
// AI should follow this pattern:
import { mysqlTable, varchar, datetime, primaryKey } from "drizzle-orm/mysql-core";

export const entityName = mysqlTable("table_name", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: datetime("created_at").$defaultFn(() => new Date()).notNull(),
  updatedAt: datetime("updated_at").$defaultFn(() => new Date()).notNull(),
});
```

#### **Controller Organization Pattern**
```typescript
// AI should follow this pattern for controllers:
// controllers/entity/operation/operation.ts
export const operation = async (input: OperationInput, ctx: Context) => {
  // Implementation
};

// controllers/entity/entity.controller.ts
import { operation } from './operation/operation';
import { anotherOperation } from './anotherOperation/anotherOperation';

export const entityController = {
  operation,
  anotherOperation,
};
```

#### **tRPC Router Pattern**
```typescript
// AI should follow this pattern:
import { entityController } from '../../controllers/entity/entity.controller';

export const entityRouter = router({
  create: protectedProcedure
    .input(createSchema)
    .mutation(async ({ input, ctx }) => {
      return entityController.create(input, ctx);
    }),
    
  list: publicProcedure
    .input(paginationSchema)
    .query(async ({ input }) => {
      return entityController.list(input);
    }),
});
```

#### **React Component with React Query Pattern**
```typescript
// AI should follow this pattern:
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface ComponentProps {
  // Props interface
}

export const ComponentName: React.FC<ComponentProps> = ({ 
  // Destructured props 
}) => {
  const queryClient = useQueryClient();
  
  // React Query hooks
  const { data, isLoading, error } = useQuery({
    queryKey: ['entity', 'list'],
    queryFn: () => fetchEntities(),
  });
  
  const mutation = useMutation({
    mutationFn: createEntity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entity'] });
    },
  });
  
  // Event handlers
  
  return (
    <div className="component-styles">
      {/* JSX content */}
    </div>
  );
};
```

### **Common AI Pitfalls & Solutions**

#### **Pitfall 1: Ignoring Type Safety**
**Problem**: AI generates code without proper TypeScript types
**Solution**: Always ask for complete type definitions

```
"Please include complete TypeScript types for all functions, 
parameters, and return values."
```

#### **Pitfall 2: Breaking Existing Patterns**
**Problem**: AI creates inconsistent code that doesn't match the codebase
**Solution**: Reference existing code

```
"Follow the exact same pattern used in [existing file]. 
Use the same naming conventions, structure, and style."
```

#### **Pitfall 3: Missing Error Handling**
**Problem**: AI generates code without proper error handling
**Solution**: Explicitly request error handling

```
"Please include proper error handling, validation, 
and user feedback for all operations."
```

#### **Pitfall 4: Ignoring Better Auth Integration**
**Problem**: AI doesn't understand Better Auth patterns
**Solution**: Explicitly mention Better Auth requirements

```
"Remember this app uses Better Auth for authentication. 
Please follow Better Auth patterns and integrate with existing auth flow."
```

#### **Pitfall 5: Ignoring Controller Organization**
**Problem**: AI creates monolithic files instead of organized controllers
**Solution**: Reference the controller organization pattern

```
"Please organize the functions into individual files within controllers/[entity]/ folders, 
then create a main controller file that imports all functions."
```

---

## 🚀 Deployment

### **Deployment Options**

| Platform | Difficulty | Cost | Features | Best For |
|----------|------------|------|----------|----------|
| **cPanel** | ⭐⭐ | $ | Easy setup, managed hosting | Small projects, shared hosting |
| **VPS** | ⭐⭐⭐ | $$ | Full control, scalable | Medium projects, learning |
| **Cloud Platforms** | ⭐⭐⭐⭐ | $$$ | Auto-scaling, managed services | Production apps, enterprise |
| **Docker** | ⭐⭐⭐⭐ | $$ | Consistent environments | Teams, CI/CD pipelines |

### **Quick Deployment (Recommended)**

#### **Option 1: Automated Deployment Script**
```bash
# Make the script executable
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

This creates a `deployment-[timestamp].tar.gz` file ready for upload.

#### **Option 2: Manual Build**
```bash
# Install dependencies
npm install && npm install --workspace=frontend && npm install --workspace=backend

# Build both applications
npm run build

# The built files are now in:
# - frontend/dist/ (frontend)
# - backend/dist/ (backend)
```

### **cPanel Deployment (Easiest)**

#### **Step 1: Prepare Your Application**
```bash
# Build the application
npm run build

# Create deployment package
./deploy.sh
```

#### **Step 2: Upload to cPanel**
1. **Login to cPanel**
2. **File Manager** → Navigate to `public_html`
3. **Upload** the `deployment-[timestamp].tar.gz`
4. **Extract** the archive
5. **Move** contents to appropriate directories

#### **Step 3: Configure Backend**
1. **Create Subdomain** (e.g., `api.yourdomain.com`)
2. **Upload Backend** to subdomain directory
3. **Set up Environment Variables**

```bash
# In your backend directory
cp config/env.example config/.env
nano config/.env
```

**Production Environment Variables:**
```bash
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://yourdomain.com
BACKEND_URL=https://api.yourdomain.com

# Database (use production database)
DB_TYPE=postgres
DB_HOST=your-db-host
DB_PORT=5432
DB_USERNAME=your-db-user
DB_PASSWORD=your-db-password
DB_DATABASE=your-db-name

# Authentication
BETTERAUTH_SECRET=your-super-secret-production-key
SESSION_SECRET=your-super-secret-session-key

# Dynamic Authentication
AUTH_METHOD=both
PHONE_AUTH_ENABLED=true
SMS_PROVIDER=custom

# Security
CORS_ORIGIN=https://yourdomain.com
SESSION_COOKIE_SECURE=true
SESSION_COOKIE_HTTPONLY=true
```

### **VPS Deployment (More Control)**

#### **Step 1: Server Setup**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y
```

#### **Step 2: Database Setup**
```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE myapp;
CREATE USER myuser WITH PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE myapp TO myuser;
\q

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### **Step 3: Application Deployment**
```bash
# Clone your repository
git clone <your-repo-url>
cd react-trpc-express-drizzle-better-auth

# Install dependencies
npm install && npm install --workspace=frontend && npm install --workspace=backend

# Build applications
npm run build

# Configure environment
cp config/env.example config/.env
nano config/.env
```

#### **Step 4: Start with PM2**
```bash
# Navigate to backend
cd backend

# Start with PM2
pm2 start dist/index.js --name "myapp-backend"

# Save PM2 configuration
pm2 save
pm2 startup

# Check status
pm2 status
pm2 logs myapp-backend
```

### **Cloud Platform Deployment**

#### **Option 1: Railway.app (Recommended for Beginners)**
1. **Connect Repository** to Railway
2. **Set Environment Variables** in Railway dashboard
3. **Deploy** automatically on git push
4. **Get** production URLs

#### **Option 2: Render.com**
1. **Create New Service** → Web Service
2. **Connect** your GitHub repository
3. **Configure** build and start commands
4. **Set** environment variables
5. **Deploy**

### **Security Hardening**

#### **Environment Security**
```bash
# Generate strong secrets
openssl rand -hex 32  # For BETTERAUTH_SECRET
openssl rand -hex 32  # For SESSION_SECRET
openssl rand -hex 32  # For JWT_SECRET

# Use environment-specific files
config/
├── .env.development
├── .env.staging
└── .env.production
```

#### **Database Security**
```sql
-- Create read-only user for frontend queries
CREATE USER readonly_user WITH PASSWORD 'readonly_password';
GRANT CONNECT ON DATABASE myapp TO readonly_user;
GRANT USAGE ON SCHEMA public TO readonly_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly_user;
```

---

## 📚 Development Workflows

### **Daily Development**
```bash
# Start development servers
npm run dev

# Make changes to your code
# Frontend auto-reloads at http://localhost:3000
# Backend auto-reloads at http://localhost:3001
```

### **Adding New Features**

#### **Backend Feature**
```
1. Create schema in database/entities/
2. Create controller functions in controllers/[feature]/
3. Add controller to controllers/index.ts
4. Create tRPC router in trpc/routers/
5. Update shared types
6. Add validation schemas
7. Test with tRPC
```

#### **Frontend Feature**
```
1. Create components in components/
2. Add pages in pages/
3. Create hooks in hooks/
4. Update routing in App.tsx
5. Style with Tailwind CSS
```

#### **Authentication Feature**
```
1. Configure in auth/config.ts
2. Update entities if needed
3. Add frontend components
4. Test authentication flow
```

### **Database Management**

#### **Generate Migrations**
```bash
# When you make changes to schema, generate a migration
npm run drizzle:generate

# Run migrations
npm run drizzle:migrate

# Push schema changes directly (development)
npm run drizzle:push

# Open Drizzle Studio for database management
npm run drizzle:studio
```

#### **Database Synchronization**
- Set `DB_SYNCHRONIZE=true` in development for auto-schema updates
- Use migrations in production for controlled schema changes

### **Building for Production**
```bash
# Build both applications
npm run build

# Start production backend
npm run start
```

---

## 🔍 Troubleshooting

### **Common Issues & Solutions**

#### **1. Port Already in Use**
```bash
# Check what's using the port
sudo lsof -i :3000  # Frontend
sudo lsof -i :3001  # Backend

# Kill the process or change ports in backend/.env
```

#### **2. Database Connection Failed**
```bash
# Check database is running
sudo systemctl status postgresql  # PostgreSQL
sudo systemctl status mysql       # MySQL

# Verify credentials in backend/.env
# Test connection manually
psql -h localhost -U your_username -d your_database
```

#### **3. Better Auth Issues**
```bash
# Check Better Auth configuration
# Verify BETTER_AUTH_SECRET is set
# Ensure BETTER_AUTH_URL matches your backend URL
# Check database entities are properly configured
```

#### **4. Dynamic Authentication Not Working**
```bash
# Check auth config endpoint
curl http://localhost:3001/api/trpc/auth.getAuthConfig

# Verify environment variables
# Check AUTH_METHOD, PHONE_AUTH_ENABLED, etc.
# Ensure frontend is using the auth config hook
```

#### **5. Dependencies Installation Failed**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### **6. TypeScript Compilation Errors**
```bash
# Check TypeScript version
npx tsc --version

# Rebuild the project
npm run build
```

#### **7. Frontend Build Issues**
```bash
# Clear Vite cache
rm -rf frontend/node_modules/.vite

# Reinstall frontend dependencies
cd frontend
npm install
npm run build
```

### **Debug Commands**

```bash
# Check application status
pm2 status
pm2 logs myapp-backend --lines 50

# Check Nginx configuration
sudo nginx -t
sudo systemctl status nginx

# Check system resources
top
df -h
free -h
```

---

## 📝 Prompt Templates

### **Feature Development Prompts**

#### **Add New Database Entity**
```markdown
I need to add a new [EntityName] entity to my React + tRPC + Drizzle ORM + Better Auth boilerplate.

Requirements:
- [List the fields and their types]
- [Describe relationships with other entities]
- [Specify validation rules]
- [Include any special behaviors]

Please create:
1. Drizzle ORM schema with proper decorators
2. Update the database connection to include this entity
3. Add the entity to shared types
4. Follow the exact pattern from the existing User entity

Entity fields:
[Field 1]: [Type] - [Description]
[Field 2]: [Type] - [Description]
[Field 3]: [Type] - [Description]
```

#### **Create tRPC Controllers and Procedures**
```markdown
I need to create tRPC controllers and procedures for [EntityName] CRUD operations.

Requirements:
- [List the operations needed: create, read, update, delete, list, search]
- [Specify authentication requirements for each operation]
- [Describe any special business logic]
- [Include pagination if needed]

Please create:
1. Individual controller functions in controllers/[entity]/ folders
2. Main controller file that imports all functions
3. Input validation schemas using Zod
4. tRPC router that uses the controller
5. Proper error handling and validation
6. Follow the exact structure from the existing auth/user controllers

Operations needed:
- [Operation 1]: [Description] - [Auth level required]
- [Operation 2]: [Description] - [Auth level required]
- [Operation 3]: [Description] - [Auth level required]

Controller structure:
- controllers/[entity]/[operation]/[operation].ts
- controllers/[entity]/[entity].controller.ts
- trpc/routers/[entity].ts
```

#### **Build React Components with React Query**
```markdown
I need to create React components for [FeatureName] that use React Query for data management.

Requirements:
- [Describe the UI components needed]
- [Specify the data they should display/edit]
- [Include any user interactions]
- [Describe the styling approach]
- [Specify if using tRPC or direct API calls]

Please create:
1. Main component with proper TypeScript interfaces
2. React Query hooks for data fetching and mutations
3. Form components if needed (using react-hook-form)
4. List/display components if needed
5. Follow the existing component patterns
6. Use Tailwind CSS for styling
7. Include proper error handling and loading states
8. Ensure React Query DevTools compatibility

Components needed:
- [Component 1]: [Purpose] - [Props and behavior]
- [Component 2]: [Purpose] - [Props and behavior]
- [Component 3]: [Purpose] - [Props and behavior]

Data management:
- [Query 1]: [Purpose] - [Data source]
- [Mutation 1]: [Purpose] - [Data source]
- [Mutation 2]: [Purpose] - [Data source]
```

### **Debugging & Problem Solving Prompts**

#### **Debug TypeScript Errors**
```markdown
I'm getting TypeScript errors in my React + tRPC + Drizzle ORM + Better Auth boilerplate:

Error: [Paste the exact error message]
File: [File path where error occurs]
Line: [Line number]

Context:
- I'm trying to [describe what you were doing]
- This happens when [describe when it occurs]
- I'm using [describe your setup]

Here's the relevant code:
[Paste the problematic code]

Please help me:
1. Understand what's causing this error
2. Suggest a fix
3. Explain why this solution works
4. Show me the corrected code
```

#### **Fix Runtime Errors**
```markdown
I'm experiencing a runtime error in my React + tRPC + Drizzle ORM + Better Auth app:

Error: [Paste the error message]
Stack trace: [Paste the stack trace if available]

Context:
- I'm trying to [describe what you were doing]
- This happens when [describe when it occurs]
- I'm using [describe your setup]
- The error occurs in [frontend/backend/both]

Here's the relevant code:
[Paste the code that's causing issues]

Please help me:
1. Identify the root cause
2. Suggest debugging steps
3. Provide a working solution
4. Explain how to prevent this in the future
```

#### **Better Auth Issues**
```markdown
I'm having issues with Better Auth in my React + tRPC + Drizzle ORM app:

Problem: [Describe the authentication issue]
Error: [Paste any error messages]

Context:
- I'm trying to [describe what you were doing]
- This happens when [describe when it occurs]
- My Better Auth configuration: [describe your setup]

Here's the relevant code:
[Paste the code that's causing issues]

Please help me:
1. Identify the Better Auth configuration issue
2. Suggest debugging steps
3. Provide a working solution
4. Explain how to prevent this in the future
```

### **Code Review & Improvement**
```markdown
Please review this code from my React + tRPC + Drizzle ORM + Better Auth boilerplate:

[Paste your code]

Focus on:
1. TypeScript best practices and type safety
2. Security considerations (authentication, validation, etc.)
3. Performance optimization opportunities
4. Code organization and readability
5. Following the existing patterns in the codebase
6. Error handling and edge cases
7. Better Auth integration patterns
8. Controller organization and structure
9. React Query usage and optimization
10. CORS and environment variable handling

Please provide:
1. Specific issues found
2. Improvement suggestions
3. Code examples for fixes
4. Best practice recommendations
5. Controller structure improvements
6. React Query optimization suggestions
```

### **Tips for Using These Templates**

1. **Be Specific** - Fill in all the placeholders with your actual requirements
2. **Provide Context** - Give the AI enough information to understand your situation
3. **Mention Better Auth** - Always specify that you're using Better Auth for authentication
4. **Controller Structure** - Reference the organized controller pattern with individual function folders
5. **React Query** - Mention React Query for data management and DevTools integration
6. **CORS Configuration** - Include CORS and environment variable considerations
7. **Iterate** - Use the refinement prompts to improve AI responses
8. **Validate** - Always review and test AI-generated code

---

## 🎉 Conclusion

This comprehensive guide covers everything you need to know about working with this React + tRPC + Express + Drizzle ORM + Better Auth boilerplate. Whether you're a developer building features or an AI assistant helping with code generation, this guide provides the patterns, examples, and best practices needed for successful development.

### **Key Takeaways**

1. **Dynamic Authentication** - The system adapts to your configuration automatically
2. **Clean Architecture** - Organized controllers and modular structure
3. **Type Safety** - End-to-end type safety with tRPC
4. **AI-Friendly** - Clear patterns and prompts for AI assistance
5. **Production Ready** - Comprehensive deployment and security guidance

### **Next Steps**

1. **Start Building** - Use the quick start guide to get running
2. **Explore Features** - Try the dynamic authentication system
3. **Add Features** - Use the AI prompts to build new functionality
4. **Deploy** - Follow the deployment guide for production

**Happy coding!** 🚀
