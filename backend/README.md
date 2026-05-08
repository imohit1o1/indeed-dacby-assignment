# Hacker News Scraper - Backend API

Node.js/Express backend for the Hacker News scraper application featuring JWT authentication, web scraping, and RESTful APIs.

## 🚀 Features

- **Web Scraping**: Automated scraping of Hacker News top stories
- **Authentication**: JWT-based user authentication
- **Story Management**: CRUD operations for stories and bookmarks
- **Security**: Password hashing, JWT verification, CORS
- **Database**: MongoDB with Mongoose ODM

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcryptjs for password hashing
- **Web Scraping**: Cheerio, Axios
- **CORS**: cors middleware

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── constants.js      # App constants and configurations
│   │   ├── cors.js          # CORS configuration
│   │   └── db.js            # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.js    # Authentication handlers
│   │   └── story.controller.js   # Story and bookmark handlers
│   ├── middleware/
│   │   ├── errorHandler.js      # Global error handling
│   │   └── protect.middleware.js # JWT authentication middleware
│   ├── models/
│   │   ├── story.model.js       # Story schema
│   │   └── user.model.js        # User schema
│   ├── routes/
│   │   ├── auth.route.js        # Authentication routes
│   │   └── story.route.js       # Story routes
│   ├── services/
│   │   └── scraper.service.js   # Hacker News scraping logic
│   ├── utils/
│   │   └── jwt.js              # JWT utilities
│   ├── app.js                  # Express app configuration
│   └── server.js               # Server entry point
├── .env                        # Environment variables
├── package.json
└── README.md                   # This file
```

## 🔧 Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or pnpm

### Installation

1. **Navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

### Environment Variables

Create a `.env` file in the backend root directory:

```env
# Server Configuration
NODE_ENV=development
PORT=8000

# Database
MONGODB_URI=mongodb://localhost:27017/hackernews-scraper

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Running the Server

**Development mode:**

```bash
npm run dev
# or
pnpm run dev
```

**Production mode:**

```bash
npm start
# or
pnpm start
```

The server will start on the configured port (default: 8000) and automatically scrape Hacker News stories on startup.

## 📡 API Documentation

### Base URL

```
http://localhost:8000/api
```

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

**Response (201):**

```json
{
  "message": "User registered successfully!",
  "user": {
    "username": "string",
    "_id": "string"
  }
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

**Response (200):**

```json
{
  "token": "jwt_token_here",
  "user": {
    "username": "string",
    "_id": "string"
  }
}
```

### Story Endpoints

#### Get All Stories

```http
GET /api/stories?page=1&limit=10
```

**Response (200):**

```json
{
  "stories": [
    {
      "_id": "string",
      "title": "string",
      "url": "string",
      "points": 123,
      "author": "string",
      "postedAt": "string",
      "hnId": "string"
    }
  ],
  "page": 1,
  "pages": 5,
  "total": 50
}
```

#### Get Single Story

```http
GET /api/stories/:id
```

**Response (200):**

```json
{
  "_id": "string",
  "title": "string",
  "url": "string",
  "points": 123,
  "author": "string",
  "postedAt": "string",
  "hnId": "string"
}
```

#### Toggle Bookmark

```http
POST /api/stories/:id/bookmark
Authorization: Bearer <jwt_token>
```

**Response (200):**

```json
{
  "bookmarks": ["story_id_1", "story_id_2"]
}
```

#### Trigger Manual Scrape

```http
POST /api/stories/scrape
```

**Response (200):**

```json
{
  "message": "Scraping successful",
  "count": 10,
  "data": [
    {
      "title": "string",
      "url": "string",
      "points": 123,
      "author": "string",
      "postedAt": "string"
    }
  ]
}
```

## 🔒 Authentication

### JWT Token Usage

Include the JWT token in the Authorization header for protected routes:

```
Authorization: Bearer <your_jwt_token>
```

### Protected Routes

- `POST /api/stories/:id/bookmark` - Requires authentication

## 🗄 Database Models

### User Model

```javascript
{
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }]
}
```

### Story Model

```javascript
{
  title: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  points: { type: Number, default: 0 },
  author: { type: String, required: true },
  postedAt: { type: String, required: true },
  hnId: { type: String, unique: true }
}
```

## 🔧 Key Features

### Web Scraping Service

- **Automatic**: Runs on server startup
- **Manual**: Trigger via API endpoint
- **Smart**: Uses upsert to avoid duplicates
- **Robust**: Error handling and retry logic

### Authentication Middleware

- **JWT Verification**: Validates tokens
- **User Lookup**: Fetches full user from database
- **Error Handling**: Returns appropriate HTTP status codes

### Error Handling

- **Global Middleware**: Catches all errors
- **Structured Responses**: Consistent error format
- **Logging**: Server-side error logging

## 🧪 Testing the API

### Using cURL

**Register:**

```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'
```

**Login:**

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'
```

**Get Stories:**

```bash
curl http://localhost:8000/api/stories
```

## 🚀 Deployment

### Environment Setup

For production deployment, ensure these environment variables are set:

```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-connection-string
JWT_SECRET=your-production-jwt-secret-key
CORS_ORIGIN=https://your-frontend-domain.com
```

### Build Process

```bash
npm run build  # If you add a build script
npm start
```

## 📝 Development Notes

- **Environment Variables**: Never commit `.env` file
- **Error Handling**: All routes use try-catch blocks
- **Security**: Passwords are hashed, JWT tokens are verified
- **CORS**: Configured for cross-origin requests
- **Database**: Connection includes error handling and logging

## 🔍 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check `MONGODB_URI` in `.env`
   - Ensure MongoDB is running
   - Verify network connectivity

2. **JWT Token Invalid**
   - Check `JWT_SECRET` in `.env`
   - Verify token format: `Bearer <token>`
   - Check token expiration

3. **CORS Errors**
   - Verify `CORS_ORIGIN` matches frontend URL
   - Check browser network tab for preflight requests

### Logs

Server logs will show:

- Database connection status
- Scraping progress
- Authentication attempts
- Error details

## 🤝 API Response Format

### Success Response

```json
{
  "status": "success",
  "data": { ... },
  "message": "Optional message"
}
```

### Error Response

```json
{
  "status": "error",
  "message": "Error description",
  "statusCode": 400
}
```

---

This backend provides a robust API for the Hacker News scraper application with proper authentication, error handling, and scalable architecture.
