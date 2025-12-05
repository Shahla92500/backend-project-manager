# Express Backend Template


## Dependencies

- Express
- MongoDB/Mongoose
- Dotenv
- Morgan
- Cors
- Helmet


## Dev Dependencies

- Nodemon

Step 1 – Set up the project:
* Initialize project:
    * npm i
    * npm i express mongoose bcrypt jsonwebtoken dotenv morgan cors
* Create files:
    * server.js
    * /models
    * /controllers
    * /routes
    * /middleware
* Add .env with:
    * MONGO_URI=...
    * JWT_SECRET=...
    * PORT=4000 (or whatever)
Step 2 – Connect to MongoDB
In server.js:
* Load env, connect to MongoDB with mongoose.connect(...).
* Set up Express, JSON parsing, logging (morgan).

Step3-Design my data models
I will need at least:
1. User
    * username, email, password (hashed), maybe role.
2. Project
    * name, description, owner (ref → User), maybe members.
3. Task
    * title, description, status (todo/in-progress/done), dueDate,project (ref → Project), assignedTo (ref → User).
Create schemas in /models/User.js, /models/Project.js, /models/Task.js.

Step 4 – Implement authentication (User register + login)
In /controllers/authController.js (or similar):
* Register:
    * Check if email already exists.
    * Hash password with bcrypt in a pre-save hook.
    * Save user.
* Login:
    * Find user by email.
    * Compare password.
    * Create JWT with user info in payload.
    * Return { token, user }.
Add routes in /routes/authRoutes.js, like:
* POST /api/auth/register
* POST /api/auth/login

Step 5 – Auth middleware (protect routes)
In /middleware/auth.js:
* Read Authorization: Bearer <token> header.
* Verify JWT with JWT_SECRET.
* Put decoded user on req.user.
* next() or return 401.
Use it later on projects and tasks routes.

Step 6 – Project CRUD endpoints
In /controllers/projectController.js:
* createProject – create project with owner: req.user._id.
* getMyProjects – projects where owner = req.user._id (or member).
* updateProject – only owner can update.
* deleteProject – only owner can delete.
In /routes/projectRoutes.js:
* POST /api/projects (auth)
* GET /api/projects (auth)
* PUT /api/projects/:id (auth)
* DELETE /api/projects/:id (auth)

Step 7 – Task CRUD endpoints
In /controllers/taskController.js:
* createTask – link to a project, set default status: 'todo'.
* getTasksByProject – filter by project: req.params.projectId.
* updateTask – update status, title, etc.
* deleteTask.
In /routes/taskRoutes.js:
* POST /api/tasks (auth)
* GET /api/tasks/project/:projectId (auth)
* PUT /api/tasks/:id (auth)
* DELETE /api/tasks/:id (auth)
You can also enforce:
* Only project owner or member can manage tasks in that project.

Step 8 – Authorization rules (who can do what)
This is where they test your understanding of authorization:
* Only logged-in users can:
    * Create/read/update/delete their projects and tasks.
* Maybe:
    * Only admin can see all users.
    * Only project owner can delete a project.
Implement using:
* Checks inside controllers, e.g.if (project.owner.toString() !== req.user._id) return res.status(403)...

Step 9 – Test everything with Postman
For each flow:
1. Register → Login → copy token.
2. Use token to:
    * Create project.
    * Create tasks in that project.
    * List tasks.
    * Update & delete.
Make sure wrong tokens or missing tokens give proper errors.

Step 10 – Clean up & DRY
* Reuse patterns from your earlier labs:
    * Same auth pattern you’re already using now.
    * Same error handling style.
* Move repeated logic into helpers or middleware where possible.
* Don’t duplicate validation logic everywhere.
