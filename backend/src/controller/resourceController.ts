import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Resource from '../models/Resource';

// Extend Multer's File type for Cloudinary
interface CloudinaryFile extends Express.Multer.File {
  path: string;
  secure_url?: string;
  public_id?: string;
  resource_type?: string;
}

// POST /api/resources
export const createResource = async (req: Request, res: Response) => {
  try {
    const { title, description, isFree, price } = req.body;
    const file = req.file as CloudinaryFile;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    if (!file.path || !file.path.startsWith('http')) {
      console.error('Invalid Cloudinary URL:', file.path);
      return res.status(500).json({ message: 'File upload failed - invalid URL returned' });
    }

    const newResource = new Resource({
      title,
      description,
      isFree,
      price: isFree ? undefined : price,
      file: file.secure_url || file.path,
      user: req.user?.id,
    });

    const savedResource = await newResource.save();
    return res.status(201).json({
      ...savedResource.toObject(),
      downloadUrl: file.secure_url || file.path,
    });
  } catch (error) {
    console.error('Error creating resource:', error);
    return res.status(400).json({ message: 'Failed to create resource', error });
  }
};

// GET /api/resources
export const getResources = async (_req: Request, res: Response) => {
  try {
    const resources = await Resource.find()
      .sort({ createdAt: -1 })
      .populate('user', 'username email');
    return res.status(200).json(resources);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch resources', error });
  }
};

// GET /api/resources/:id
export const getResourceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid resource ID' });
    }

    const resource = await Resource.findById(id).populate('user', 'username email');
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    return res.status(200).json(resource);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching resource', error });
  }
};

// Helper (Mock) to simulate purchase check
const userHasPurchased = async (_userId: string, _resourceId: string) => {
  // Simulate true always; replace with DB logic later
  return true;
};

// GET /api/resources/:id/download
export const downloadResource = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid resource ID' });
    }

    const resource = await Resource.findById(id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (!resource.file || !resource.file.startsWith('http')) {
      return res.status(404).json({ message: 'File URL is invalid or missing' });
    }

    // Access control for paid resources
    if (!resource.isFree) {
      if (!userId) {
        return res.status(401).json({ message: 'Login required to access paid resources' });
      }

      const hasPurchased = await userHasPurchased(userId, id);
      if (!hasPurchased) {
        return res.status(403).json({
          message: 'You must purchase this resource before downloading',
          isPaid: true,
          price: resource.price,
        });
      }
    }

    return res.status(200).json({
      downloadUrl: resource.file,
      filename: resource.title,
    });
  } catch (error) {
    console.error('Error in downloadResource:', error);
    if (!res.headersSent) {
      return res.status(500).json({ message: 'Server error during download' });
    }
  }
};

// DELETE /api/resources/:id
export const deleteResource = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const resource = await Resource.findById(id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    await Resource.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error('Error deleting resource:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// PUT /api/resources/:id
export const UpdateResource = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedResource = await Resource.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    return res.status(200).json(updatedResource);
  } catch (error) {
    console.error('Error updating resource:', error);
    return res.status(500).json({ message: 'Failed to update resource' });
  }
};
