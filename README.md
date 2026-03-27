# Project Camp Backend

A RESTful API backend for a collaborative project management system built with Node.js, Express, and MongoDB.

## Overview

Project Camp Backend is a comprehensive backend API service that enables teams to organize projects, manage tasks with subtasks, maintain project notes, and handle user authentication with role-based access control.

## Features

### Authentication & Authorization

- User registration with email verification
- Secure login/logout with JWT tokens
- Password management (change, forgot, reset)
- Access token refresh mechanism
- Role-based access control (Admin, Project Admin, Member)

### Project Management

- Create, read, update, and delete projects
- List all user projects with member count
- Manage project team members
- Role-based project access control

### Task Management

- Create and organize tasks within projects
- Hierarchical subtask support
- Task assignment to team members
- Status tracking (Todo, In Progress, Done)
- Multiple file attachments support

### Project Notes

- Create and manage project notes
- Admin-controlled note management
- Organized project documentation

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js v5.2.1
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken) + bcrypt
- **Email Service:** Nodemailer with Mailgen
- **Validation:** express-validator
- **File Upload:** Multer (implicit)
- **Dev Tools:** Nodemon, Prettier

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- SMTP email service credentials

## Installation

1. Clone the repository:

```bash
git clone https://github.com/omprakash171/project_management_system_backend.git
cd project_management_system_backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# JWT Secrets
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d

# Email Configuration
MAILTRAP_SMTP_HOST=your_smtp_host
MAILTRAP_SMTP_PORT=your_smtp_port
MAILTRAP_SMTP_USER=your_smtp_username
MAILTRAP_SMTP_PASS=your_smtp_password
MAILTRAP_SMTP_FROM_EMAIL=noreply@projectcamp.com

# CORS
CORS_ORIGIN=http://localhost:3000
```

4. Start the development server:

```bash
npm run dev
```

5. For production:

```bash
npm start
```

## API Endpoints

### Base URL

```
http://localhost:8000/api/v1
```

### Authentication Routes (`/auth`)

| Method | Endpoint                           | Description               | Auth Required |
| ------ | ---------------------------------- | ------------------------- | ------------- |
| POST   | `/register`                        | Register new user         | No            |
| POST   | `/login`                           | User login                | No            |
| POST   | `/logout`                          | User logout               | Yes           |
| GET    | `/current-user`                    | Get current user          | Yes           |
| POST   | `/change-password`                 | Change password           | Yes           |
| POST   | `/refresh-token`                   | Refresh access token      | No            |
| GET    | `/verify-email/:verificationToken` | Verify email              | No            |
| POST   | `/forgot-password`                 | Request password reset    | No            |
| POST   | `/reset-password/:resetToken`      | Reset password            | No            |
| POST   | `/resend-email-verification`       | Resend verification email | Yes           |

### Project Routes (`/projects`)

| Method | Endpoint                      | Description         | Auth Required | Role  |
| ------ | ----------------------------- | ------------------- | ------------- | ----- |
| GET    | `/`                           | List user projects  | Yes           | All   |
| POST   | `/`                           | Create project      | Yes           | All   |
| GET    | `/:projectId`                 | Get project details | Yes           | All   |
| PUT    | `/:projectId`                 | Update project      | Yes           | Admin |
| DELETE | `/:projectId`                 | Delete project      | Yes           | Admin |
| GET    | `/:projectId/members`         | List members        | Yes           | All   |
| POST   | `/:projectId/members`         | Add member          | Yes           | Admin |
| PUT    | `/:projectId/members/:userId` | Update member role  | Yes           | Admin |
| DELETE | `/:projectId/members/:userId` | Remove member       | Yes           | Admin |

### Task Routes (`/tasks`)

| Method | Endpoint                         | Description      | Auth Required | Role                |
| ------ | -------------------------------- | ---------------- | ------------- | ------------------- |
| GET    | `/:projectId`                    | List tasks       | Yes           | All                 |
| POST   | `/:projectId`                    | Create task      | Yes           | Admin/Project Admin |
| GET    | `/:projectId/t/:taskId`          | Get task details | Yes           | All                 |
| PUT    | `/:projectId/t/:taskId`          | Update task      | Yes           | Admin/Project Admin |
| DELETE | `/:projectId/t/:taskId`          | Delete task      | Yes           | Admin/Project Admin |
| POST   | `/:projectId/t/:taskId/subtasks` | Create subtask   | Yes           | Admin/Project Admin |
| PUT    | `/:projectId/st/:subTaskId`      | Update subtask   | Yes           | All                 |
| DELETE | `/:projectId/st/:subTaskId`      | Delete subtask   | Yes           | Admin/Project Admin |

### Note Routes (`/notes`)

| Method | Endpoint                | Description      | Auth Required | Role  |
| ------ | ----------------------- | ---------------- | ------------- | ----- |
| GET    | `/:projectId`           | List notes       | Yes           | All   |
| POST   | `/:projectId`           | Create note      | Yes           | Admin |
| GET    | `/:projectId/n/:noteId` | Get note details | Yes           | All   |
| PUT    | `/:projectId/n/:noteId` | Update note      | Yes           | Admin |
| DELETE | `/:projectId/n/:noteId` | Delete note      | Yes           | Admin |

### Health Check (`/healthcheck`)

| Method | Endpoint | Description          | Auth Required |
| ------ | -------- | -------------------- | ------------- |
| GET    | `/`      | System health status | No            |

## Project Structure

```
project_management_system_backend/
├── src/
│   ├── controllers/          # Route controllers
│   │   ├── auth.controllers.js
│   │   └── healthcheck.controllers.js
│   ├── db/                   # Database configuration
│   │   └── index.js
│   ├── middlewares/          # Custom middlewares
│   │   ├── auth.middleware.js
│   │   └── validator.middleware.js
│   ├── models/               # Mongoose models
│   │   └── user.models.js
│   ├── routes/               # API routes
│   │   ├── auth.routes.js
│   │   └── healthcheck.routes.js
│   ├── utils/                # Utility functions
│   │   ├── api-error.js
│   │   ├── api-response.js
│   │   ├── async-handler.js
│   │   ├── constants.js
│   │   └── mail.js
│   ├── validators/           # Input validators
│   │   └── index.js
│   ├── app.js                # Express app configuration
│   └── index.js              # Application entry point
├── public/                   # Static files
│   └── images/               # Uploaded files
├── .env                      # Environment variables
├── .gitignore
├── .prettierrc
├── package.json
├── PRD.md                    # Product Requirements Document
└── README.md
```

## Permission Matrix

| Feature                    | Admin | Project Admin | Member |
| -------------------------- | ----- | ------------- | ------ |
| Create Project             | ✓     | ✗             | ✗      |
| Update/Delete Project      | ✓     | ✗             | ✗      |
| Manage Project Members     | ✓     | ✗             | ✗      |
| Create/Update/Delete Tasks | ✓     | ✓             | ✗      |
| View Tasks                 | ✓     | ✓             | ✓      |
| Update Subtask Status      | ✓     | ✓             | ✓      |
| Create/Delete Subtasks     | ✓     | ✓             | ✗      |
| Create/Update/Delete Notes | ✓     | ✗             | ✗      |
| View Notes                 | ✓     | ✓             | ✓      |

## Security Features

- JWT-based authentication with refresh tokens
- Password hashing with bcrypt
- Role-based authorization middleware
- Input validation on all endpoints
- Email verification for account security
- Secure password reset functionality
- CORS configuration for cross-origin requests
- Cookie-based token management

## Development

### Scripts

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

### Code Formatting

The project uses Prettier for code formatting. Configuration is available in `.prettierrc`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC

## Author

Om Prakash

## Links

- [Repository](https://github.com/omprakash171/project_management_system_backend)
- [Issues](https://github.com/omprakash171/project_management_system_backend/issues)

## Support

For support and questions, please open an issue in the GitHub repository.
