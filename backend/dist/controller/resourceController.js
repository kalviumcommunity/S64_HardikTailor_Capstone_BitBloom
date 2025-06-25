"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateResource = exports.deleteResource = exports.downloadResource = exports.getResourceById = exports.getResources = exports.createResource = void 0;
const Resource_1 = __importDefault(require("../models/Resource"));
const mongoose_1 = __importDefault(require("mongoose"));
const createResource = async (req, res) => {
    try {
        const { title, description, isFree, price } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        // When using Cloudinary with multer-storage-cloudinary, 
        // the file.path contains the Cloudinary URL
        if (!file.path || !file.path.startsWith('http')) {
            console.error('Invalid Cloudinary URL:', file.path);
            return res.status(500).json({ message: 'File upload failed - invalid URL returned' });
        }
        const newResource = new Resource_1.default({
            title,
            description,
            isFree,
            price: isFree ? undefined : price,
            file: file.path, // Cloudinary URL
            user: req.user?.id,
        });
        const savedResource = await newResource.save();
        return res.status(201).json(savedResource);
    }
    catch (error) {
        console.error('Error creating resource:', error);
        return res.status(400).json({ message: 'Failed to create resource', error });
    }
};
exports.createResource = createResource;
const getResources = async (req, res) => {
    try {
        const resources = await Resource_1.default.find()
            .sort({ createdAt: -1 })
            .populate('user', 'username email');
        return res.status(200).json(resources);
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to fetch resources', error });
    }
};
exports.getResources = getResources;
const getResourceById = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid resource ID' });
        }
        const resource = await Resource_1.default.findById(id).populate('user', 'username email');
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        return res.status(200).json(resource);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error fetching resource', error });
    }
};
exports.getResourceById = getResourceById;
// Helper function to check if user has purchased a resource
// In a real application, this would query your purchase/transaction database
const userHasPurchased = async (userId, resourceId) => {
    // This is a placeholder implementation
    // In a real application, you would check your database for purchase records
    console.log(`Checking if user ${userId} has purchased resource ${resourceId}`);
    // For testing purposes, let's assume the purchase check is successful
    return true;
};
// Unified download function for both free and paid resources
const downloadResource = async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.id;
    try {
        // Validate resource ID
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid resource ID' });
        }
        // Find the resource
        const resource = await Resource_1.default.findById(id);
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
        }
        catch (error) {
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
    }
    catch (error) {
        console.error('Error in downloadResource:', error);
        if (!res.headersSent) {
            return res.status(500).json({ message: 'Server error' });
        }
        return undefined; // Add explicit return for TypeScript
    }
};
exports.downloadResource = downloadResource;
const deleteResource = async (req, res) => {
    const { id } = req.params;
    try {
        const resource = await Resource_1.default.findById(id);
        if (!resource) {
            return res.status(404).json({ success: false, message: 'Resource not found' });
        }
        await Resource_1.default.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: 'Resource deleted successfully' });
    }
    catch (error) {
        console.error("Error deleting resource:", error);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};
exports.deleteResource = deleteResource;
const UpdateResource = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedResource = await Resource_1.default.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true, });
        if (!updatedResource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        return res.status(200).json(updatedResource);
    }
    catch (error) {
        console.error('Error updating resource:', error);
        return res.status(500).json({ message: 'Failed to update resource' });
    }
};
exports.UpdateResource = UpdateResource;
