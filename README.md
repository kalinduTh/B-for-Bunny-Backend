# B for Bunny - Backend API

**Author:** Kalindu Tharanga  
**Student Number:** 2433317

## Overview

B for Bunny is an educational game backend API designed to help children learn through interactive gameplay. The backend provides RESTful APIs for managing parent accounts, children profiles, game sessions, and educational problem sets.

## Features

- **Parent Authentication**: Secure signup and login with JWT tokens
- **Child Profile Management**: CRUD operations for children profiles with avatar generation
- **Game Session Tracking**: Real-time game session management with score tracking
- **High Score System**: Automatic high score updates and leaderboard support
- **Problem Set Management**: Dynamic educational problem delivery
- **Admin Panel**: Administrative controls for content management

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Avatar Generation**: DiceBear API integration

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── db.js        # Database connection
│   │   └── env.js       # Environment variables
│   ├── controllers/     # Request handlers
│   │   ├── adminController.js
│   │   ├── childController.js
│   │   ├── gameController.js
│   │   ├── heartAPIController.js
│   │   ├── parentController.js
│   │   └── problemController.js
│   ├── models/          # Mongoose schemas
│   │   ├── adminModel.js
│   │   ├── childModel.js
│   │   ├── gameModel.js
│   │   ├── parentModel.js
│   │   └── problemModel.js
│   ├── routes/          # API route definitions
│   │   ├── adminRoute.js
│   │   ├── childRoute.js
│   │   ├── gameRoute.js
│   │   ├── heartAPIRoute.js
│   │   ├── parentRoute.js
│   │   └── problemRoute.js
│   ├── services/        # External API services
│   │   └── heartAPI.js  # Heart API service layer
│   └── server.js        # Application entry point
├── package.json
└── .env                 # Environment variables (not in git)
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=4001
   DATABASE_URL=mongodb://localhost:27017/b-for-bunny
   NODE_ENV=development
   JWT_SECRET=your-secret-key-here
   ```

4. **Start the server**
   
   Development mode (with auto-reload):
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

## API Endpoints

### Parent Routes (`/api/parent`)

- `POST /sign-up` - Register a new parent account
- `POST /login` - Authenticate parent and get JWT token
- `GET /:id` - Get parent information
- `DELETE /:id` - Delete parent account

### Child Routes (`/api/parent/:parentId/children`)

- `GET /` - Get all children for a parent
- `POST /add` - Add a new child
- `GET /:childId` - Get specific child by ID
- `PUT /:childId` - Update child information
- `DELETE /:childId` - Delete a child

### Game Routes (`/api/parent/:parentId/children/:childId/game`)

- `GET /current-session` - Get current active game session
- `POST /start-session` - Start a new game session
- `POST /end-session` - End current game session
- `PUT /update-session` - Update game session data
- `GET /problemset` - Get 10 random problems

### Admin Routes (`/api/admin`)

- `POST /add` - Register a new admin account
- `POST /login` - Authenticate admin and get JWT token

### Problem Routes (`/api/problem`)

- `GET /problemset` - Get a set of 10 random problems
- `POST /add` - Add a new problem (Admin only)
- `POST /delete` - Delete a problem (Admin only)

### Heart API Routes (`/api/heart`)

- `GET /` - Proxy request to external Heart API

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port number | 4001 |
| `DATABASE_URL` | MongoDB connection string | - |
| `NODE_ENV` | Node environment (development/production) | development |
| `JWT_SECRET` | Secret key for JWT token generation | - |

## Data Models

### Parent
- Email (unique)
- Password (hashed)
- Children (array of child subdocuments)

### Child
- Name
- Date of Birth
- Gender (Male/Female)
- Avatar Image URL
- High Score
- Current Game Session

### Game Session
- Game Level
- Current Score
- Active Status
- Start Time
- Last Updated

### Problem
- Image URL
- Solution (correct answer)
- Answer Choices (array)

### Admin
- Email (unique)
- Password (hashed)

## Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- Password fields excluded from queries by default
- Input validation on all endpoints
- CORS enabled for cross-origin requests

## Error Handling

All endpoints return consistent error responses:

```json
{
  "message": "Error description"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `204` - No Content (successful deletion)
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Development

### Code Style

- ES6+ JavaScript with modules
- Async/await for asynchronous operations
- JSDoc comments for all functions
- Consistent error handling patterns

### Database Schema

The application uses MongoDB with Mongoose for data modeling. Parent documents contain embedded child subdocuments, and each child contains an embedded game session subdocument.

## Testing

Currently, the project does not include automated tests. Manual testing can be performed using tools like:
- Postman
- Thunder Client
- cURL

## Deployment

For production deployment:

1. Set `NODE_ENV=production` in environment variables
2. Use a production MongoDB instance (MongoDB Atlas recommended)
3. Generate a strong JWT secret
4. Enable HTTPS
5. Consider using PM2 or similar process manager

## License

ISC

## Author

**Kalindu Tharanga**  
Student Number: 2433317  
University of Bedfordshire

---

*This project is part of the Distributed Service Architecture assignment.*
