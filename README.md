
TaskMaster API – Backend
📌 Project Overview

TaskMaster is a secure, RESTful backend API built for Productivity Inc. to power their flagship productivity application. The API manages user authentication, project organization, and task tracking, serving as the backbone of the TaskMaster platform.

This project is a capstone backend application, bringing together Node.js, Express, MongoDB, Mongoose, and JWT-based authentication while enforcing strong authorization and clean architecture principles.

Features

✅ User registration & login with hashed passwords

✅ JWT-based authentication

✅ Ownership-based authorization

✅ Full CRUD for Projects

✅ Full CRUD for Tasks (nested under Projects)

✅ Secure, scalable, modular architecture

✅ MongoDB relational modeling using Mongoose refs

Tech Stack:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcrypt
- dotenv


# Project Structure :
backend-project-manager/
│
├── config/                         # Authentication middleware for Node/Express. (login with email, Google, GitHub, etc...), in my app it configures
│   └── passport.js                 # and handles GitHub login , mapping a GitHub account to the User model and 
|                                   # manageslogged-in users via Passport’s session mechanism.
├── controllers/
│   ├── userController.js
│   ├── projectController.js
│   └── taskController.js
│
├── middleware/
│   └── auth.js    # JWT authentication
│
├── models/
│   ├── User.js
│   ├── Project.js
│   └── Task.js
│
├── routes/
│   ├── userRoutes.js
│   ├── projectRoutes.js
│   └── taskRoutes.js
│
├── .env
├── .gitignore
├── server.js
└── package.json

## Environment Variables

    Create a .env file in the root directory and define: 
    MONGO_URI, JWT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK_URL and FRONTEND_URL

## Data Models
# User:
    username (unique)
    email (unique)
    password (hashed with bcrypt)

# Project:
    name
    description
    user → reference to owning User

# Task:
    title
    description
    status (todo | in-progress | done)
    project → reference to parent Project

## Authentication:
    All protected routes require a valid JWT.

## API Endpoints: 
# User Routes:      Method	Route	            Description
                    POST	/api/users/register	Register new user
                    POST	/api/users/login	Login user & return JWT
                    GET     /api/user/          List All users
                    GET     /api/user/:id.      returns a specific user

# Project Routes:   Method	Route	            Description
                    POST	/api/projects	    Create new project for loged-in user
                    GET	    /api/projects	    Get all user projects for loged-in user
                    GET	    /api/projects/:id	Get a single project for loged-in user
                    PUT	    /api/projects/:id	Update a project for loged-in user
                    DELETE	/api/projects/:id	Delete a project for loged-in user

# Task Routes:      Method	Route	                                    Description
                    POST	/api/projects/:projectId/tasks	            Create task for a project
                    GET	    /api/projects/:projectId/tasks	            Get all tasks for a project
                    GET	    /api/projects/:projectId/tasks/:taskId	    Get single task for a project
                    PUT	    /api/projects/:projectId/tasks/:tasksId     Update task (ownership verified)
                    DELETE	/api/projects/:projectId/tasks/:tasksId     Delete task (ownership verified)

✅ All routes enforce ownership checks.
✅ Tasks can ONLY be managed by the user who owns the parent project.
✅ Projects and Tasks routes are Protected & Nested



## Dependencies

- Express
- MongoDB/Mongoose
- Dotenv
- Morgan
- Cors
- bcrypt
- jsonwebtoken
- passport


## Dev Dependencies

- Nodemon
## Running the Project:

* Initialize project by running these commandes:
    * npm install
    * npm i express mongoose bcrypt jsonwebtoken dotenv morgan cors

## Testing:

- Use Postman to test API routes.
- Recommended testing flow, CRUD endpoints
* Register user
* Login to obtain JWT: (email + password)
    * Created JWT with user info will be in payload.
    * in displaying info we see { token, user }.
    * copy the token :
        -in Authorization part paste the token in the given area for "Bearer Token"
* * => Only logged-in users can:
* Create project
* Create tasks within project
* Test ownership rules with different users
* List all project of a user
* List all tasks of a project
* Update a project
* update a task
* Test ownership rules with different project
* Delete a project
* Delete a task

This project demonstrates a production-ready backend API with secure access control, hierarchical data modeling, and clean Express architecture. It serves as a strong foundation for scaling into a full-stack productivity platform.





* Maybe:
    * Only admin can see all users.
    * Only project owner can delete a project.

