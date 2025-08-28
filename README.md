# React (Shadcn) + tRPC + Express + TypeORM + Better Auth Boilerplate

A modern, full-stack TypeScript boilerplate with end-to-end type safety, Better Auth authentication, and clean architecture.

## 🚀 Features

- **Frontend**: React 18 + TypeScript + Vite + Better Auth Client + Shadcn UI
- **Backend**: Express.js + TypeScript + tRPC Server + Better Auth
- **Database**: TypeORM with multiple database support (PostgreSQL, MySQL, SQLite)
- **Authentication**: Better Auth with Session & JWT support
- **Type Safety**: Full end-to-end type safety with tRPC
- **Modern Tooling**: Latest dependencies and best practices
- **Deployment Ready**: Separate frontend/backend for easy deployment

## 🏗️ Project Structure

```
├── frontend/          # React frontend application
├── backend/           # Express backend application
└── docs/              # Documentation and guides
```

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development and building
- Better Auth client for authentication
- Shadcn UI for beautiful, accessible components
- Tailwind CSS for styling
- React Router for navigation
- React Query for state management

### Backend
- Express.js with TypeScript
- tRPC server for type-safe APIs
- TypeORM for database operations
- Better Auth for authentication
- JWT and Session support
- CORS and security middleware

### Database
- TypeORM with multiple database support
- Migration system with auto-generation
- Seeding capabilities

### Authentication (Better Auth)
- **User Management**: Registration, login, profile management
- **Email Verification**: Secure email verification system
- **Password Reset**: Forgot password and reset functionality
- **Session Management**: Flexible session and JWT authentication
- **Security Features**: Rate limiting, CSRF protection, secure cookies
- **Multi-Provider**: Support for OAuth providers (configurable)

### UI Components (Shadcn UI)
- **Beautiful Design**: Modern, accessible component library
- **Customizable**: Easy to customize with Tailwind CSS
- **TypeScript**: Full TypeScript support for all components
- **Accessibility**: Built with accessibility best practices
- **Dark Mode**: Built-in dark mode support
- **Responsive**: Mobile-first responsive design

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+
- Database (PostgreSQL, MySQL, SQLite, etc.)

### Installation

1. **Clone and install dependencies:**
```bash
git clone <your-repo>
cd react-trpc-express-typeorm-better-auth
npm install
npm install --workspace=frontend
npm install --workspace=backend
```

2. **Configure environment:**
```bash
cp backend/env.example backend/.env
# Edit backend/.env with your database and auth settings
```

3. **Start development servers:**
```bash
npm run dev
```

## 🔧 Configuration

### Better Auth Configuration
Set these environment variables in `backend/.env`:
- `BETTER_AUTH_SECRET`: Your secret key for Better Auth
- `BETTER_AUTH_URL`: Your backend URL (e.g., http://localhost:3001)

### Database
Configure your database connection in `backend/.env`:
- `DB_TYPE`: postgres, mysql, sqlite, etc.
- `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`
- `DB_SYNCHRONIZE`: Set to "true" for auto-schema sync

### Email Service (Optional)
Configure email for verification and notifications:
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- `SMTP_FROM`: Sender email address

## 📁 Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend for production
- `npm run start` - Start production backend server
- `npm run clean` - Clean all build artifacts and node_modules

### Database Scripts
- `npm run migration:generate` - Generate new migration file
- `npm run migration:run` - Run pending migrations
- `npm run migration:revert` - Revert last migration

## 🔐 Better Auth Features

### What Better Auth Provides
- **Modern Authentication**: Built on modern web standards
- **Flexible Modes**: Support for both session and JWT authentication
- **Email Integration**: Built-in email verification and notifications
- **Security First**: CSRF protection, rate limiting, secure cookies
- **Easy Integration**: Simple setup with TypeORM and Express
- **Production Ready**: Battle-tested in production environments

### Authentication Flow
1. **Registration**: User signs up with email verification
2. **Login**: Secure authentication with session/JWT
3. **Verification**: Email verification for new accounts
4. **Password Reset**: Secure password reset via email
5. **Session Management**: Automatic session handling

## 🎨 UI & Design Features

### Shadcn UI Components
- **Forms**: Beautiful form components with validation
- **Navigation**: Responsive navigation and breadcrumbs
- **Data Display**: Tables, cards, and data visualization
- **Feedback**: Alerts, notifications, and loading states
- **Layout**: Grid systems and responsive containers
- **Inputs**: Modern input fields and controls

### Design System
- **Consistent**: Unified design language across components
- **Accessible**: WCAG compliant components
- **Responsive**: Mobile-first responsive design
- **Customizable**: Easy to customize with Tailwind CSS
- **Modern**: Clean, modern aesthetic

## 🚀 Deployment

### Frontend (cPanel)
1. Build the frontend: `npm run build:frontend`
2. Upload `frontend/dist` contents to your cPanel public_html directory

### Backend (cPanel)
1. Build the backend: `npm run build:backend`
2. Upload `backend/dist` contents to your cPanel application directory
3. Configure your domain to point to the backend

## 📚 Documentation

We've created comprehensive documentation to help you get started quickly:

### 🚀 **Getting Started**
- **[📖 Documentation Hub](./docs/README.md)** - Complete guide index
- **[🚀 Quick Start Guide](./docs/quick-start.md)** - Get running in 5 minutes
- **[🏗️ Project Structure](./docs/project-structure.md)** - Understand the codebase

### 🤖 **AI-Assisted Development**
- **[🤖 AI Coding Guide](./docs/ai-coding-guide.md)** - Work effectively with AI assistants
- **[📝 Prompt Templates](./docs/prompt-templates.md)** - Ready-to-use AI prompts

### 🚀 **Deployment & Production**
- **[🚀 Deployment Guide](./docs/deployment.md)** - Deploy to any platform (cPanel, VPS, Cloud)

### 📚 **For AI Assistants**
If you're using AI to help with development, start with the [AI Coding Guide](./docs/ai-coding-guide.md) and use the [Prompt Templates](./docs/prompt-templates.md) for common tasks.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details
# React-Shadcn-tRPC-Express-TypeORM-Better-Auth-Boilerplate
