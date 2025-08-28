# 🚀 Quick Start Guide

Get your React + tRPC + Express + TypeORM + Better Auth application running in **5 minutes**!

## ⚡ **Prerequisites**

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** 9+ (comes with Node.js)
- **Database** (PostgreSQL, MySQL, SQLite, etc.)
- **Git** (optional, for version control)

## 🎯 **Step 1: Clone & Setup**

```bash
# Clone the repository (or download and extract)
git clone <your-repo-url>
cd react-trpc-express-typeorm-better-auth

# Install all dependencies
npm install
npm install --workspace=frontend
npm install --workspace=backend
```

## ⚙️ **Step 2: Environment Configuration**

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

## 🗄️ **Step 3: Database Setup**

### **Option A: PostgreSQL (Recommended)**
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

### **Option B: SQLite (Simplest)**
```bash
# Update backend/.env
DB_TYPE=sqlite
DB_DATABASE=./database.sqlite
# Remove other DB_* variables
```

### **Option C: MySQL**
```bash
# Install MySQL
sudo apt install mysql-server  # Ubuntu/Debian
brew install mysql              # macOS

# Create database
mysql -u root -p
CREATE DATABASE myapp;
CREATE USER 'myuser'@'localhost' IDENTIFIED BY 'mypassword';
GRANT ALL PRIVILEGES ON myapp.* TO 'myuser'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## 🚀 **Step 4: Start Development**

```bash
# Start both frontend and backend
npm run dev

# Or start them separately:
npm run dev:frontend  # Frontend on http://localhost:3000
npm run dev:backend   # Backend on http://localhost:3001
```

## ✅ **Step 5: Verify Installation**

### **Frontend** - http://localhost:3000
- ✅ React app loads
- ✅ Tailwind CSS styles applied
- ✅ No console errors

### **Backend** - http://localhost:3001
- ✅ Server starts without errors
- ✅ Database connection established
- ✅ Health check endpoint works: http://localhost:3001/api/test

### **Authentication** - http://localhost:3001/api/auth
- ✅ Better Auth endpoints available
- ✅ Registration and login working
- ✅ Email verification (if configured)

## 🔐 **Step 6: Test Authentication**

### **Register a User**
1. Go to http://localhost:3000/register
2. Fill in the registration form
3. Submit and check for success message

### **Login**
1. Go to http://localhost:3000/login
2. Use your registered credentials
3. Should redirect to dashboard

## 🗄️ **Step 7: Database Management**

### **Generate Migrations**
```bash
# When you make changes to entities, generate a migration
npm run migration:generate

# Run migrations
npm run migration:run

# Revert last migration if needed
npm run migration:revert
```

### **Database Synchronization**
- Set `DB_SYNCHRONIZE=true` in development for auto-schema updates
- Use migrations in production for controlled schema changes

## 🐛 **Troubleshooting**

### **Common Issues & Solutions**

#### **1. Port Already in Use**
```bash
# Check what's using the port
lsof -i :3000  # Frontend
lsof -i :3001  # Backend

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

#### **4. Dependencies Installation Failed**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### **5. TypeScript Compilation Errors**
```bash
# Check TypeScript version
npx tsc --version

# Rebuild the project
npm run build
```

#### **6. Frontend Build Issues**
```bash
# Clear Vite cache
rm -rf frontend/node_modules/.vite

# Reinstall frontend dependencies
cd frontend
npm install
npm run build
```

## 🔧 **Development Workflow**

### **Daily Development**
```bash
# Start development servers
npm run dev

# Make changes to your code
# Frontend auto-reloads at http://localhost:3000
# Backend auto-reloads at http://localhost:3001
```

### **Adding New Features**
```bash
# 1. Create database entity in backend/src/database/entities/
# 2. Add tRPC procedures in backend/src/trpc/routers/
# 3. Build React components in frontend/src/components/
# 4. Test functionality
# 5. Generate migration if needed: npm run migration:generate
# 6. Commit your changes
```

### **Building for Production**
```bash
# Build both applications
npm run build

# Start production backend
npm run start
```

## 📚 **Next Steps**

1. **Read the Documentation**
   - [Project Structure](./project-structure.md)
   - [AI Coding Guide](./ai-coding-guide.md)
   - [Prompt Templates](./prompt-templates.md)

2. **Explore the Codebase**
   - Check out the existing components
   - Understand the Better Auth flow
   - Look at the database entities

3. **Start Building**
   - Add new features
   - Customize the UI
   - Extend the API

## 🆘 **Need Help?**

### **Check These First**
- ✅ Environment variables are set correctly in `backend/.env`
- ✅ Database is running and accessible
- ✅ All dependencies are installed
- ✅ Ports are available

### **Common Resources**
- [GitHub Issues](https://github.com/your-repo/issues)
- [Documentation](./README.md)
- [Better Auth Documentation](https://better-auth.com/)

### **Still Stuck?**
1. Check the console for error messages
2. Look at the server logs
3. Verify your configuration
4. Try the troubleshooting steps above

---

**🎉 Congratulations!** You now have a fully functional full-stack application with Better Auth running locally. 

**Next**: Start building your features or dive deeper into the documentation!
