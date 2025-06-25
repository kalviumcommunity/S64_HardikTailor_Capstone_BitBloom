"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.getProjectById = exports.getProjects = exports.createProject = void 0;
const project_1 = __importDefault(require("../models/project"));
const mongoose_1 = __importDefault(require("mongoose"));
const createProject = async (req, res) => {
    try {
        const { title, problemDescription, techStack, repoLink } = req.body;
        if (!title || !problemDescription || !techStack || !repoLink) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const newProject = new project_1.default({
            title,
            problemDescription,
            techStack,
            repoLink,
            uploadedBy: req.user?.id,
        });
        const savedProject = await newProject.save();
        return res.status(201).json(savedProject);
    }
    catch (error) {
        console.error('Error creating project:', error);
        return res.status(400).json({ message: 'Failed to create project', error });
    }
};
exports.createProject = createProject;
const getProjects = async (req, res) => {
    console.log("🔥 [GET] /api/project called from frontend");
    try {
        const projects = await project_1.default.find()
            .sort({ createdAt: -1 })
            .populate('uploadedBy', 'username email');
        return res.status(200).json(projects);
    }
    catch (error) {
        console.error('❌ Error fetching projects:', error);
        return res.status(500).json({ message: 'Failed to fetch projects', error });
    }
};
exports.getProjects = getProjects;
const getProjectById = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid project ID' });
        }
        const project = await project_1.default.findById(id).populate('uploadedBy', 'username email');
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        return res.status(200).json(project);
    }
    catch (error) {
        console.error('Error fetching project:', error);
        return res.status(500).json({ message: 'Error fetching project', error });
    }
};
exports.getProjectById = getProjectById;
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedProject = await project_1.default.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        return res.status(200).json(updatedProject);
    }
    catch (error) {
        console.error('Error updating project:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.updateProject = updateProject;
const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await project_1.default.findById(id);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        await project_1.default.findByIdAndDelete(id);
        return res
            .status(200)
            .json({ success: true, message: 'Project deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting project:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
exports.deleteProject = deleteProject;
