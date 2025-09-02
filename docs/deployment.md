# 🚀 Deployment Guide

Complete guide to deploy your React + tRPC + Express + Drizzle ORM + Better Auth application to production.

## 🎯 **Deployment Options**

| Platform | Difficulty | Cost | Features | Best For |
|----------|------------|------|----------|----------|
| **cPanel** | ⭐⭐ | $ | Easy setup, managed hosting | Small projects, shared hosting |
| **VPS** | ⭐⭐⭐ | $$ | Full control, scalable | Medium projects, learning |
| **Cloud Platforms** | ⭐⭐⭐⭐ | $$$ | Auto-scaling, managed services | Production apps, enterprise |
| **Docker** | ⭐⭐⭐⭐ | $$ | Consistent environments | Teams, CI/CD pipelines |

## 🚀 **Quick Deployment (Recommended)**

### **Option 1: Automated Deployment Script**

```bash
# Make the script executable
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

This creates a `deployment-[timestamp].tar.gz` file ready for upload.

### **Option 2: Manual Build**

```bash
# Install dependencies
npm install && npm install --workspace=frontend && npm install --workspace=backend

# Build both applications
npm run build

# The built files are now in:
# - frontend/dist/ (frontend)
# - backend/dist/ (backend)
```

## 📱 **cPanel Deployment (Easiest)**

### **Step 1: Prepare Your Application**

```bash
# Build the application
npm run build

# Create deployment package
./deploy.sh
```

### **Step 2: Upload to cPanel**

1. **Login to cPanel**
2. **File Manager** → Navigate to `public_html`
3. **Upload** the `deployment-[timestamp].tar.gz`
4. **Extract** the archive
5. **Move** contents to appropriate directories

### **Step 3: Configure Backend**

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
BETTERAUTH_WAY=session
BETTERAUTH_SECRET=your-super-secret-production-key
SESSION_SECRET=your-super-secret-session-key

# Security
CORS_ORIGIN=https://yourdomain.com
SESSION_COOKIE_SECURE=true
SESSION_COOKIE_HTTPONLY=true
```

### **Step 4: Install Dependencies & Start**

```bash
# SSH into your cPanel account
ssh username@yourdomain.com

# Navigate to backend directory
cd public_html/api

# Install production dependencies
npm install --production

# Start the application
npm start
```

### **Step 5: Configure Frontend**

1. **Update API URL** in frontend environment
2. **Upload Frontend** to `public_html`
3. **Test** the application

## 🖥️ **VPS Deployment (More Control)**

### **Step 1: Server Setup**

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

### **Step 2: Database Setup**

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

### **Step 3: Application Deployment**

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

**Production Environment:**
```bash
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://yourdomain.com
BACKEND_URL=https://yourdomain.com

# Database
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=myuser
DB_PASSWORD=mypassword
DB_DATABASE=myapp

# Security
BETTERAUTH_SECRET=your-production-secret
SESSION_SECRET=your-session-secret
CORS_ORIGIN=https://yourdomain.com
```

### **Step 4: Start with PM2**

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

### **Step 5: Nginx Configuration**

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/myapp
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    # SSL configuration
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;

    # Frontend
    location / {
        root /var/www/myapp/frontend/dist;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### **Step 6: SSL Certificate (Let's Encrypt)**

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## ☁️ **Cloud Platform Deployment**

### **Option 1: Railway.app (Recommended for Beginners)**

1. **Connect Repository** to Railway
2. **Set Environment Variables** in Railway dashboard
3. **Deploy** automatically on git push
4. **Get** production URLs

### **Option 2: Render.com**

1. **Create New Service** → Web Service
2. **Connect** your GitHub repository
3. **Configure** build and start commands
4. **Set** environment variables
5. **Deploy**

### **Option 3: Heroku**

```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Add PostgreSQL
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set BETTERAUTH_SECRET=your-secret

# Deploy
git push heroku main
```

## 🐳 **Docker Deployment**

### **Step 1: Create Dockerfile**

**Backend Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist/ ./dist/
COPY config/ ./config/

EXPOSE 3001

CMD ["node", "dist/index.js"]
```

**Frontend Dockerfile:**
```dockerfile
FROM nginx:alpine

COPY dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### **Step 2: Docker Compose**

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    environment:
      NODE_ENV: production
      DB_HOST: postgres
      DB_USERNAME: myuser
      DB_PASSWORD: mypassword
      DB_DATABASE: myapp
    depends_on:
      - postgres
    ports:
      - "3001:3001"

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

### **Step 3: Deploy with Docker**

```bash
# Build and start services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f backend
```

## 🔒 **Security Hardening**

### **Environment Security**

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

### **Database Security**

```sql
-- Create read-only user for frontend queries
CREATE USER readonly_user WITH PASSWORD 'readonly_password';
GRANT CONNECT ON DATABASE myapp TO readonly_user;
GRANT USAGE ON SCHEMA public TO readonly_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly_user;
```

### **Server Security**

```bash
# Configure firewall
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable

# Update regularly
sudo apt update && sudo apt upgrade -y
```

## 📊 **Monitoring & Logging**

### **Application Monitoring**

```bash
# PM2 monitoring
pm2 monit

# Log management
pm2 logs myapp-backend --lines 100

# Process monitoring
pm2 status
pm2 show myapp-backend
```

### **Server Monitoring**

```bash
# System resources
htop
df -h
free -h

# Application logs
sudo journalctl -u nginx -f
sudo journalctl -u postgresql -f
```

## 🚨 **Troubleshooting**

### **Common Issues**

#### **1. Port Already in Use**
```bash
# Check what's using the port
sudo lsof -i :3001

# Kill the process
sudo kill -9 <PID>
```

#### **2. Database Connection Failed**
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Check connection
psql -h localhost -U myuser -d myapp
```

#### **3. Permission Denied**
```bash
# Fix file permissions
sudo chown -R $USER:$USER /var/www/myapp
sudo chmod -R 755 /var/www/myapp
```

#### **4. SSL Certificate Issues**
```bash
# Check certificate validity
sudo certbot certificates

# Renew manually if needed
sudo certbot renew
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

## 📈 **Performance Optimization**

### **Frontend Optimization**

```bash
# Enable gzip compression in Nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;

# Cache static assets
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### **Backend Optimization**

```bash
# Use PM2 cluster mode
pm2 start dist/index.js -i max --name "myapp-backend"

# Enable compression
npm install compression
```

### **Database Optimization**

```sql
-- Add indexes for frequently queried fields
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);

-- Analyze table statistics
ANALYZE users;
```

## 🔄 **Continuous Deployment**

### **GitHub Actions**

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install && npm install --workspace=frontend && npm install --workspace=backend
        
      - name: Build application
        run: npm run build
        
      - name: Deploy to server
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.KEY }}
          script: |
            cd /var/www/myapp
            git pull origin main
            npm install && npm install --workspace=frontend && npm install --workspace=backend
            npm run build
            pm2 restart myapp-backend
```

## 📚 **Next Steps**

1. **Choose** your deployment platform
2. **Follow** the specific guide above
3. **Test** your deployment thoroughly
4. **Monitor** your application
5. **Optimize** performance as needed

---

**🎉 Your application is now ready for production deployment!**

**Need help?** Check the troubleshooting section or refer to the platform-specific documentation.
