#!/bin/bash

# Deployment Script for React (Vite) + tRPC + Express + TypeORM + Better Auth

echo "🚀 Starting full build and deployment process..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check project structure
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    print_error "Please run this script from the project root (must contain frontend/ and backend/)"
    exit 1
fi

# ============ BUILD FRONTEND ============
print_status "🔧 Building frontend..."
cd frontend
if npm run build; then
    print_status "✅ Frontend build completed"
else
    print_error "❌ Frontend build failed"
    exit 1
fi
cd ..

# ============ BUILD BACKEND ============
print_status "🔧 Building backend..."
cd backend
if npm run build; then
    print_status "✅ Backend build completed"
else
    print_error "❌ Backend build failed"
    exit 1
fi
cd ..

# ============ PACKAGE ============
DEPLOY_DIR="deployment-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$DEPLOY_DIR"

# Copy frontend build
print_status "📦 Copying frontend..."
cp -r frontend/dist "$DEPLOY_DIR/frontend"

# Copy backend build and configs
print_status "📦 Copying backend..."
cp -r backend/dist "$DEPLOY_DIR/backend"
cp backend/package.json "$DEPLOY_DIR/backend/"
cp backend/tsconfig.json "$DEPLOY_DIR/backend/" 2>/dev/null
cp backend/env.example "$DEPLOY_DIR/backend/" 2>/dev/null || print_warning "No env.example found"
cp -r backend/migrations "$DEPLOY_DIR/backend/" 2>/dev/null
cp -r backend/node_modules "$DEPLOY_DIR/backend/" 2>/dev/null || print_warning "No node_modules found (you'll need to run npm install on the server)"

# Copy top-level readme
cp README.md "$DEPLOY_DIR/" 2>/dev/null

# ============ DEPLOYMENT INSTRUCTIONS ============
print_status "📝 Writing deployment instructions..."
cat > "$DEPLOY_DIR/DEPLOYMENT_INSTRUCTIONS.md" << 'EOF'
# Deployment Instructions

## Frontend (Vite)

1. Upload `frontend/` contents to `public_html` or the web root on cPanel or server
2. Ensure index.html and assets are directly accessible

## Backend (Node.js)

1. Upload the `backend/` folder to your server (e.g. cPanel app directory or VPS)
2. SSH into the server and navigate to the backend directory
3. Install dependencies:
   ```bash
   npm install --production
