import { Request, Response } from 'express';
import Project from '../models/project';
import mongoose from 'mongoose';

export const createProject = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, problemDescription, techStack, repoLink } = req.body;

    if (!title || !problemDescription || !techStack || !repoLink) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newProject = new Project({
      title,
      problemDescription,
      techStack,
      repoLink,
      uploadedBy: (req as any).user?.id, 
    });

    const savedProject = await newProject.save();
    return res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error creating project:', error);
    return res.status(400).json({ message: 'Failed to create project', error });
  }
};


export const getProjects = async (req: Request, res: Response): Promise<Response> => {
  try {
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .populate('uploadedBy', 'username email');

    return res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ message: 'Failed to fetch projects', error });
  }
};


export const getProjectById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    const project = await Project.findById(id).populate('uploadedBy', 'username email');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return res.status(500).json({ message: 'Error fetching project', error });
  }
};


export const updateProject = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedProject = await Project.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.status(200).json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


export const deleteProject = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    await Project.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
