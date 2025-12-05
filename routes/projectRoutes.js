
const express = require("express");
const { authMiddleware } = require("../middlewares/auth");
const Project = require("../models/Project");
const {getAllProjects, getProjectsById, 
      createProject, updateProject, deleteProject
      } = require('../controllers/projectController')
const projectRouter = express.Router();

/**
 * GET /api/projects
 */// Protects all rotes in this router
projectRouter.use(authMiddleware);

projectRouter.get("/", authMiddleware, getAllProjects)
/** 
 * GET /api/projects/:projectId
 */
projectRouter.get("/:projectId", authMiddleware, getProjectsById)

/**
 * POST /api/projects
 */
projectRouter.post("/", authMiddleware, createProject)

/**
 * PUT /api/projects/projectId
 */
projectRouter.put("/:projectId", authMiddleware, updateProject)

/**
 * DELETE /api/projects/projectId
 */
projectRouter.delete("/:projectId", authMiddleware,deleteProject)

 

module.exports = projectRouter;