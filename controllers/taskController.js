const Task = require("../models/Task");
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const expiration = '4h'; // Token will be valid for4 hours


async function getAllTasks(req,res) {
    try {
        if(!req.project){
            return res.status(401).json({message: 'this project does not have this task!'})
        }
        const tasks = await Task.find({project: req.project._id})

        if (!tasks) return res.status(401).json({ message: "any project found for this project" });
        return res.json(tasks)
    } catch (err){
        res.status(500).json(err);
    }
}

/** 
 * GET /api/tasks/:tasksId
 */

// async function getTasksById(req,res) {
//   try {
//     const { projectId } = req.params;
//     const project = await Project.findById(projectId);
//     if (!project) {
//       return res
//         .status(404)
//         .json({ message: `Project with id: ${projectId} not found!` });
//     }
//     // Authorization
//     console.log(req.user._id);
//     console.log(project.user);
    
//     if (project.user.toString() !== req.user._id) {
//       return res.status(403).json({ message: "User is not authorized!" });
//     }
//     return res.json(project);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// };
/**
 * POST /api/tasks
 */
async function createTask(req, res) {
  try {
    const newTask = await Task.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
// async function updateProject(req, res) {
//   try {
//     const updateProject = await Project.findById(req.params.projectId)//finding the user's project with the help of id.
//     console.log("here: ", updateProject);
    
//     if (req.user._id !== updateProject.user.toString()){
//       return res.status(403).json({message: "This user is not authorized to update this project."})
//     }
//     const project = await Project.findByIdAndUpdate( req.params.projectId, req.body, {new:true})// need more explanation
//     res.json(project)
//   } catch (error) {
//     console.log("errer is here", req.body)
//     res.status(500).json({error: error.message})
//   }
// };
/**
 * DELETE /api/projects/projectId
 */
// async function deleteProject(req, res) {
//   try {
//         const deleteProject = await Project.findById(req.params.projectId)//finding the user's project with the help of id.
//     if (req.user._id !== deleteProject.user.toString()){
//       return res.status(403).json({message: "This user is not authorized to Delete this project."})
//     }
//     const project = await Project.findByIdAndDelete(req.params.projectId)
//     res.json({message: `"Project DELETED haviing Id: " ${project.id}`})
//   } catch (error) {
//     res.status(500).json({error: error.message})
//   }
// };
module.exports = {
    getAllTasks, 
createTask
    }