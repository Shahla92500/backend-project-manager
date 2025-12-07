const Project = require("../models/Project");
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const expiration = '4h'; // Token will be valid for4 hours


async function getAllProjects(req,res) {
    try {
        if(!req.user){
            return res.status(401).json({message: 'you must be logged in to see this!'})
        }

        const projects = await Project.find({user: req.user._id})
        if (!projects) return res.status(401).json({ message: "any project found for this user" });
        return res.json(projects)
    } catch (err){
        res.status(500).json(err);
    }
}

/** 
 * GET /api/projects/:projectId
 */
// projectRouter.get("/:projectId", async (req, res) => {
async function getProjectsById(req,res) {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) {
      return res
        .status(404)
        .json({ message: `Project with id: ${projectId} not found!` });
    }
    // Authorization
 
    if (project.user.toString() !== req.user._id) {
      return res.status(403).json({ message: "User is not authorized!" });
    }
    console.log("id in parameter",project.user.toString());
    console.log("project found in response",project);
   
    return res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
/**
 * POST /api/projects
 */
async function createProject(req, res) {
  try {
    const newProject = await Project.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
async function updateProject(req, res) {
  try {
    const updateProject = await Project.findById(req.params.projectId)//finding the user's project with the help of id.
    console.log("here: ", updateProject);
    
    if (req.user._id !== updateProject.user.toString()){
      return res.status(403).json({message: "This user is not authorized to update this project."})
    }
    const project = await Project.findByIdAndUpdate( req.params.projectId, req.body, {new:true})// need more explanation
    res.json(project)
  } catch (error) {
    console.log("errer is here", req.body)
    res.status(500).json({error: error.message})
  }
};
/**
 * DELETE /api/projects/projectId
 */
async function deleteProject(req, res) {
  try {
        const deleteProject = await Project.findById(req.params.projectId)//finding the user's project with the help of id.
    if (req.user._id !== deleteProject.user.toString()){
      return res.status(403).json({message: "This user is not authorized to Delete this project."})
    }
    const project = await Project.findByIdAndDelete(req.params.projectId)
    res.json({message: `"Project DELETED haviing Id: " ${project.id}`})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
};
module.exports = {
    getAllProjects, 
    getProjectsById, 
    createProject,
    updateProject,
    deleteProject
    }