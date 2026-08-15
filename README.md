# Cash Flow App - NestJS Backend

A NestJS backend for the Cash Flow App with MongoDB database and JWT authentication.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud instance like MongoDB Atlas)

## Installation

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your MongoDB URI and other configurations:
```
MONGODB_URI=mongodb://localhost:27017/cashflow
JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRATION=24h
NODE_ENV=development
PORT=3000
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run prod
```

## API Endpoints

### Authentication

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "mobileNumber": "+1234567890",
  "password": "securePassword123",
  "name": "John Doe",
  "email": "john@example.com"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "mobileNumber": "+1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "isActive": true,
    "createdAt": "2024-01-01T10:00:00Z",
    "updatedAt": "2024-01-01T10:00:00Z"
  }
}
```

#### Login User
```
POST /auth/login
Content-Type: application/json

{
  "mobileNumber": "+1234567890",
  "password": "securePassword123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "mobileNumber": "+1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "isActive": true,
    "createdAt": "2024-01-01T10:00:00Z",
    "updatedAt": "2024-01-01T10:00:00Z"
  }
}
```

#### Get Profile (Protected)
```
GET /auth/profile
Authorization: Bearer <token>

Response:
{
  "id": "507f1f77bcf86cd799439011",
  "mobileNumber": "+1234567890",
  "name": "John Doe",
  "email": "john@example.com",
  "isActive": true,
  "createdAt": "2024-01-01T10:00:00Z",
  "updatedAt": "2024-01-01T10:00:00Z"
}
```

## MongoDB Connection

The application uses MongoDB with Mongoose for data persistence. Ensure MongoDB is running and accessible at the URI specified in your `.env` file.

### Example MongoDB URI formats:
- Local: `mongodb://localhost:27017/cashflow`
- MongoDB Atlas: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cashflow`

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `JWT_EXPIRATION`: JWT token expiration time (default: 24h)
- `NODE_ENV`: Environment mode (development/production)
- `PORT`: Server port (default: 3000)

## Project Structure

```
backend/
├── src/
│   ├── auth/
│   │   ├── jwt.strategy.ts
│   │   └── jwt-auth.guard.ts
│   ├── users/
│   │   ├── schemas/
│   │   │   └── user.schema.ts
│   │   ├── dto/
│   │   │   ├── login.dto.ts
│   │   │   └── login-response.dto.ts
│   │   ├── users.service.ts
│   │   ├── users.controller.ts
│   │   └── users.module.ts
│   ├── app.module.ts
│   └── main.ts
├── package.json
├── tsconfig.json
├── nest-cli.json
├── .env.example
└── .gitignore
```

## Features

- User registration with mobile number and password
- User login with JWT token generation
- Password hashing using bcryptjs
- Protected routes with JWT authentication
- MongoDB integration with Mongoose
- Input validation with class-validator
- Global validation pipe
- CORS enabled

## Security Features

- Passwords are hashed using bcryptjs with salt rounds
- JWT tokens with expiration
- Protected endpoints with JwtAuthGuard
- Input validation and sanitization
- Environment variable configuration

## Next Steps

To extend this backend:

1. Create additional modules for transactions, products, etc.
2. Add database indexes for better performance
3. Implement logging and error handling
4. Add request/response interceptors
5. Implement refresh token mechanism
6. Add middleware for logging
7. Create API documentation with Swagger

## License

MIT
