# React (Shadcn) + tRPC + Express + Drizzle ORM + Better Auth Boilerplate

A modern, full-stack TypeScript boilerplate with **dynamic authentication**, end-to-end type safety, Better Auth, and clean architecture.

## 🚀 Features

- **Frontend**: React 18 + TypeScript + Vite + Better Auth Client + Shadcn UI
- **Backend**: Express.js + TypeScript + tRPC Server + Better Auth
- **Database**: Drizzle ORM with multiple database support (PostgreSQL, MySQL, SQLite)
- **🔐 Dynamic Authentication**: Email, phone, or both (configurable via environment)
- **📱 Phone Verification**: SMS service with customizable providers
- **🎨 Modern UI**: Shadcn UI components with responsive design
- **Type Safety**: Full end-to-end type safety with tRPC
- **🤖 AI-Friendly**: Optimized for AI-assisted development
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
- Drizzle ORM for database operations
- Better Auth for authentication
- JWT and Session support
- CORS and security middleware

### Database
- Drizzle ORM with multiple database support
- Migration system with auto-generation
- Seeding capabilities

### Dynamic Authentication (Better Auth)
- **🔐 Flexible Methods**: Email, phone, or both (configurable via environment)
- **📱 Phone Verification**: SMS service with customizable providers (Twilio, custom, mock)
- **📧 Email Verification**: Secure email verification system
- **🔄 Backend-Driven UI**: Frontend adapts based on backend configuration
- **🔑 Password Reset**: Forgot password and reset functionality
- **⚡ Session Management**: Flexible session and JWT authentication
- **🛡️ Security Features**: Rate limiting, CSRF protection, secure cookies
- **🔌 Multi-Provider**: Support for OAuth providers (configurable)

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
- `npm run drizzle:generate` - Generate new migration file
- `npm run drizzle:migrate` - Run pending migrations
- `npm run drizzle:push` - Push schema changes to database
- `npm run drizzle:studio` - Open Drizzle Studio for database management
- `npm run migration:generate` - Alias for drizzle:generate
- `npm run migration:run` - Alias for drizzle:migrate
- `npm run migration:push` - Alias for drizzle:push

### Database Workflow
```bash
# 1. Make changes to your schema files in backend/src/database/entities/
# 2. Generate migration file
npm run drizzle:generate

# 3. Apply migrations to database
npm run drizzle:migrate

# OR for development (direct schema push without migration files)
npm run drizzle:push

# 4. Open Drizzle Studio to view/manage your database
npm run drizzle:studio
```

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

### 🎯 **Complete Guide**
- **[📖 Complete Developer & AI Guide](./docs/COMPLETE_GUIDE.md)** - Everything you need in one place!

This comprehensive guide includes:
- **🚀 Quick Start** - Get running in 5 minutes
- **🏗️ Project Structure** - Understand the codebase organization
- **🔐 Dynamic Authentication** - Email/phone authentication system
- **🤖 AI-Assisted Development** - Work effectively with AI assistants
- **📝 Prompt Templates** - Ready-to-use AI prompts
- **🚀 Deployment** - Deploy to any platform (cPanel, VPS, Cloud)
- **🔍 Troubleshooting** - Common issues and solutions

### 📚 **For AI Assistants**
If you're using AI to help with development, the [Complete Guide](./docs/COMPLETE_GUIDE.md) contains all the patterns, examples, and prompts you need for effective AI-assisted development.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

