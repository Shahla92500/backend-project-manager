
const express = require("express");
const { authMiddleware } = require("../middlewares/auth");
const Task = require("../models/Task");
const {getAllTasks,
      createTask
      } = require('../controllers/taskController')
const taskRouter = express.Router();

/**
 * GET /api/tasks
 */// Tasks all rotes in this router
taskRouter.use(authMiddleware);

taskRouter.get("/", authMiddleware, getAllTasks)
/** 
 * GET /api/projects/:projectId
 */
// taskRouter.get("/:projectId", authMiddleware, getProjectsById)

// /**
//  * POST /api/projects
//  */
taskRouter.post("/", authMiddleware, createTask)


// /**
//  * PUT /api/projects/projectId
//  */
// taskRouter.put("/:projectId", authMiddleware, updateProject)

// /**
//  * DELETE /api/projects/projectId
//  */
// taskRouter.delete("/:projectId", authMiddleware,deleteProject)

 

module.exports = projectRouter;