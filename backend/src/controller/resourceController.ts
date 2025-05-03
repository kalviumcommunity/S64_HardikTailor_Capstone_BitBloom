import { Request, Response } from 'express';
import Resource from '../models/Resource';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';

export const createResource = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, description, isFree, price } = req.body;
    const file = req.file as Express.Multer.File;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = file.path;

    const newResource = new Resource({
      title,
      description,
      isFree,
      price: isFree ? undefined : price,
      file: filePath,
      user: (req as any).user?.id,
    });

    const savedResource = await newResource.save();
    return res.status(201).json(savedResource);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to create resource', error });
  }
};

// Get all resources
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

// Get a single resource by ID
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



export const downloadResource = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid resource ID' });
      return;
    }

    const resource = await Resource.findById(id);
    if (!resource) {
      res.status(404).json({ message: 'Resource not found' });
      return;
    }

    if (!resource.file) {
      res.status(404).json({ message: 'File not found for this resource' });
      return;
    }

    const filePath = resource.file;
    const fileName = path.basename(filePath);
    const fileExtension = path.extname(fileName).toLowerCase();

    // Map file extensions to content types
    const contentTypeMap: { [key: string]: string } = {
      '.pdf': 'application/pdf',
      '.doc': 'application/msword',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.xls': 'application/vnd.ms-excel',
      '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      '.txt': 'text/plain',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.zip': 'application/zip',
      '.rar': 'application/x-rar-compressed',
    };

    const contentType = contentTypeMap[fileExtension] || 'application/octet-stream';

    if (!fs.existsSync(filePath)) {
      res.status(404).json({ message: 'File not found on server' });
      return;
    }

    // Set the content type header
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

    // Stream the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    fileStream.on('error', (error) => {
      console.error('Error streaming file:', error);
      if (!res.headersSent) {
        res.status(500).json({ message: 'Error streaming file' });
      }
    });
  } catch (error) {
    console.error('Error in downloadResource:', error);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Server error' });
    }
  }
};