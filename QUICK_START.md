# Quick Start Guide

## 1. Install Dependencies

```bash
cd backend
npm install
```

## 2. Setup Environment Variables

```bash
cp .env.example .env
```

Update `.env` with your MongoDB URI:

```
MONGODB_URI=mongodb://localhost:27017/cashflow
JWT_SECRET=your_super_secret_key_change_in_production
PORT=3000
```

## 3. Start MongoDB (if running locally)

```bash
# Using brew (macOS)
brew services start mongodb-community

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## 4. Run the Backend Server

```bash
npm run dev
```

Server will be running on `http://localhost:3000`

## 5. Test the API

### Register a New User

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "mobileNumber": "+919876543210",
    "password": "Password123",
    "name": "John Doe",
    "email": "john@example.com"
  }'
```

### Login with Credentials

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "mobileNumber": "+919876543210",
    "password": "Password123"
  }'
```

### Access Protected Profile Endpoint

Replace `<YOUR_TOKEN>` with the token received from login response:

```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

## Next: Connect Frontend to Backend

Update your React Native frontend `services` to point to `http://localhost:3000` (or your backend URL).
