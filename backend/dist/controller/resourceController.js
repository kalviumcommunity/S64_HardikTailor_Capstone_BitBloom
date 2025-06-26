"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateResource = exports.deleteResource = exports.downloadResource = exports.getResourceById = exports.getResources = exports.createResource = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Resource_1 = __importDefault(require("../models/Resource"));
// POST /api/resources
const createResource = async (req, res) => {
    try {
        const { title, description, isFree, price } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        if (!file.path || !file.path.startsWith('http')) {
            console.error('Invalid Cloudinary URL:', file.path);
            return res.status(500).json({ message: 'File upload failed - invalid URL returned' });
        }
        const newResource = new Resource_1.default({
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
    }
    catch (error) {
        console.error('Error creating resource:', error);
        return res.status(400).json({ message: 'Failed to create resource', error });
    }
};
exports.createResource = createResource;
// GET /api/resources
const getResources = async (_req, res) => {
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
// GET /api/resources/:id
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
// Helper (Mock) to simulate purchase check
const userHasPurchased = async (_userId, _resourceId) => {
    // Simulate true always; replace with DB logic later
    return true;
};
// GET /api/resources/:id/download
const downloadResource = async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.id;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid resource ID' });
        }
        const resource = await Resource_1.default.findById(id);
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
    }
    catch (error) {
        console.error('Error in downloadResource:', error);
        if (!res.headersSent) {
            return res.status(500).json({ message: 'Server error during download' });
        }
    }
};
exports.downloadResource = downloadResource;
// DELETE /api/resources/:id
const deleteResource = async (req, res) => {
    const { id } = req.params;
    try {
        const resource = await Resource_1.default.findById(id);
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        await Resource_1.default.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Resource deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting resource:', error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
exports.deleteResource = deleteResource;
// PUT /api/resources/:id
const UpdateResource = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const updatedResource = await Resource_1.default.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });
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
