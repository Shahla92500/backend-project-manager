const Project = require("../models/Project");
const Task = require("../models/Task");
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const expiration = '4h'; // Token will be valid for4 hours


async function getAllTasksByProject(req,res) {
    try {
        const {projectId} = req.params;
        if (!projectId) {
          return res.status(400).json({ message: 'projectId param is missing' });
        } 

        // making sure that Project belongs to this user
        const project = await Project.findOne({
          _id:projectId, user: req.user._id
        })
        // check if there is any project belonging to user found
        if (!project) {
          return res.status(404)
            .json({ message: 'Project not found or not owned by this user' });
        }
        //Get all tasks for this project
        const tasks = await Task.find({project: projectId})
        console.log("tasks :", req.user._id);
        if (tasks.length === 0) return res.status(401).json({ message: "any task found for this project" });
        return res.json(tasks)
    } catch (err){
        res.status(500).json(err);
    }
}

/**
 * to create one task for a project=> POST /api/projects/:projectId/tasks
 */
async function createTask(req, res) {
  try {
    const {projectId} = req.params;
    if (!projectId) {
      return res.status(400).json({ message: 'projectId param is missing' });
    } 
   // const {title, description,status} = req.body;
    const project = await Project.findOne({
      _id:projectId, user: req.user._id
    })
      console.log("project:", project);
    if (!project) {
      return res.status(404).json({message: 'Project not found or not yours'})
    }

    const newTask = await Task.create({
      ...req.body,
      project: projectId,
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
/** 
 * to get one task of a project=> GET /api/projects/:projectId/tasks/:tasksId
 */

async function getTasksByIdByProject(req,res) {
  try {
    const { projectId, taskId } = req.params;
    if (!projectId || !taskId) {
        return res.status(400).json({ message: 'projectId or taskID param is missing' });
    }
    // making sure that Project belongs to this user
    const project = await Project.findOne({
      _id:projectId, 
      user: req.user._id,
    });
    if (!project) {
      return res.status(404)
        .json({ message: 'Project not found or not owned by this user' });
    } 
    // Find ONE task with this id that also belongs to this project
    const task = await Task.findOne({
      _id: taskId,
      project: projectId
    });
    if (!task) {
      return res.status(404).json({ message: `Task with id: ${taskId} not found!` });
    }
    
    return res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
/**
 * to update a task of a project => PUT /api/projects/:projectId/tasks/:tasksId
 */
async function updateTask(req, res) {
  try {
    const { projectId, taskId } = req.params;
    if (!projectId || !taskId) {
        return res.status(400).json({ message: 'projectId or taskID param is missing' });
    }
    // making sure that Project belongs to this user
    const project = await Project.findOne({
      _id:projectId, 
      user: req.user._id,
    });
    if (!project) {
      return res.status(404)
        .json({ message: 'Project not found or not owned by this user' });
    } 

        // Find ONE task with this id that also belongs to this project
    const updateTask = await Task.findOne({
      _id: taskId,
      project: projectId
    });
    if (!updateTask) {
      return res.status(404).json({ message: `Task with id: ${taskId} not found!` });
    }

    const updatedTask = await Task.findByIdAndUpdate( req.params.taskId, req.body, {new:true})// need more explanation

    res.json(updatedTask)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
};
/**
 * to delete a task of a project ==> DELETE /api/projects/:projectId/tasks/:tasksId
 */
async function deleteTaskOfProject(req, res) {
  try {
    const { projectId, taskId } = req.params;
    if (!projectId || !taskId) {
        return res.status(400).json({ message: 'projectId or taskID param is missing' });
    }

    // making sure that Project belongs to this user
    const project = await Project.findOne({
      _id:projectId, 
      user: req.user._id,
    });
    if (!project) {
      return res.status(404)
        .json({ message: 'Project not found or not owned by this user' });
    } 

    const deleteTask = await Task.findByIdAndDelete({
      _id: taskId,
      project: projectId
    });
    
    if (!deleteTask) {
      return res.status(404).json({ message: `Task with id: ${taskId} not found!` });
    }

    res.json({message: `Task having Id:  ${taskId} has been DELETED`})
  } catch (error) {
        res.status(500).json({error: error.message})
  }
};
module.exports = {
    getAllTasksByProject, 
    createTask, 
    getTasksByIdByProject,
    updateTask,
    deleteTaskOfProject
}