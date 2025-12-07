
const express = require("express");
const { authMiddleware } = require("../middlewares/auth");
const Task = require("../models/Task");
const { getAllTasksByProject,
        createTask,
        getTasksByIdByProject,
        updateTask,
        deleteTaskOfProject
      } = require('../controllers/taskController')
const taskRouter = express.Router({ mergeParams: true }); //merge: true=> pass parent route params into the child router

/**
 * GET /api/tasks
 */// Tasks all rotes in this router
taskRouter.use(authMiddleware);

taskRouter.get("/", authMiddleware, getAllTasksByProject)
/** 
 * GET /api/projects/:taskId
 */
taskRouter.get("/:taskId", authMiddleware, getTasksByIdByProject)

// /**
//  * POST /projects/:projectId/tasks
//  */
taskRouter.post("/", authMiddleware, createTask)


/**
 * PUT /api/projects/:projectId/tasks/:tasksId
 */
taskRouter.put("/:taskId", authMiddleware, updateTask)

/**
 * DELETE /api/projects/projectId
 */
taskRouter.delete("/:taskId", authMiddleware,deleteTaskOfProject)

 

module.exports = taskRouter;