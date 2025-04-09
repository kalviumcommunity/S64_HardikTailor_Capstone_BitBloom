import { Request, Response } from 'express';
import Resource from '../models/Resource';

export const createResource = async (req: Request, res: Response) => {
  try {
    const { title, description, isFree, price } = req.body;

    const newResource = new Resource({
      title,
      description,
      isFree,
      price: isFree ? undefined : price, // skip price if it's free
      // file: will be added when we do upload
    });

    const savedResource = await newResource.save();
    res.status(201).json(savedResource);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create resource', error });
  }
};

