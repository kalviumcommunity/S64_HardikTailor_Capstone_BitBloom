import { Request, Response } from 'express';
import Resource from '../models/Resource';
import mongoose from 'mongoose';
import axios from 'axios';

export const createResource = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, description, isFree, price } = req.body;
    const file = req.file as Express.Multer.File;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // When using Cloudinary with multer-storage-cloudinary, 
    // the file.path contains the Cloudinary URL
    if (!file.path || !file.path.startsWith('http')) {
      console.error('Invalid Cloudinary URL:', file.path);
      return res.status(500).json({ message: 'File upload failed - invalid URL returned' });
    }

    const newResource = new Resource({
      title,
      description,
      isFree,
      price: isFree ? undefined : price,
      file: file.path, // Cloudinary URL
      user: (req as any).user?.id,
    });

    const savedResource = await newResource.save();
    return res.status(201).json(savedResource);
  } catch (error) {
    console.error('Error creating resource:', error);
    return res.status(400).json({ message: 'Failed to create resource', error });
  }
};

export const getResources = async (req: Request, res: Response): Promise<Response> => {
  try {
    const resources = await Resource.find()
      .sort({ createdAt: -1 })
      .populate('user', 'username email');
    return res.status(200).json(resources);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch resources', error });
  }
};

export const getResourceById = async (req: Request, res: Response): Promise<Response> => {
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

// Helper function to check if user has purchased a resource
// In a real application, this would query your purchase/transaction database
const userHasPurchased = async (userId: string, resourceId: string): Promise<boolean> => {
  // This is a placeholder implementation
  // In a real application, you would check your database for purchase records
  console.log(`Checking if user ${userId} has purchased resource ${resourceId}`);
  
  // For testing purposes, let's assume the purchase check is successful
  return true;
};

// Unified download function for both free and paid resources
export const downloadResource = async (req: Request, res: Response): Promise<Response | undefined> => {
  const { id } = req.params;
  const userId = (req as any).user?.id;

  try {
    // Validate resource ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid resource ID' });
    }

    // Find the resource
    const resource = await Resource.findById(id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Check if file exists
    if (!resource.file) {
      return res.status(404).json({ message: 'File not found for this resource' });
    }

    // Access control logic
    if (!resource.isFree) {
      // For paid resources, check if user is authenticated
      if (!userId) {
        return res.status(401).json({ message: 'Authentication required to download paid resources' });
      }
      
      // Check if user has purchased the resource
      const hasPurchased = await userHasPurchased(userId, id);
      if (!hasPurchased) {
        return res.status(403).json({ 
          message: 'You need to purchase this resource before downloading',
          isPaid: true,
          price: resource.price
        });
      }
      
      // Log the paid download
      console.log(`User ${userId} is downloading paid resource ${id}`);
    }

    try {
      // Validate the Cloudinary URL
      if (!resource.file || !resource.file.startsWith('http')) {
        console.error('Invalid Cloudinary URL:', resource.file);
        return res.status(400).json({ message: 'Invalid file URL' });
      }
      
      // Log the download for analytics
      console.log(`Resource "${resource.title}" (${id}) accessed by ${userId || 'anonymous user'}`);
      
      // Log the original Cloudinary URL for debugging
      console.log('Original Cloudinary URL:', resource.file);
      
      // For Cloudinary URLs, we'll return the original URL without modification
      // The client will handle opening it directly
      
      // Return the original URL to the client
      return res.status(200).json({ 
        downloadUrl: resource.file,
        filename: resource.title
      });
      
    } catch (error) {
      console.error('Error with download:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      if (!res.headersSent) {
        return res.status(500).json({ message: 'Error downloading file' });
      }
      return undefined; // Add explicit return for TypeScript
    }
  } catch (error) {
    console.error('Error in downloadResource:', error);
    if (!res.headersSent) {
      return res.status(500).json({ message: 'Server error' });
    }
    return undefined; // Add explicit return for TypeScript
  }
};
 
