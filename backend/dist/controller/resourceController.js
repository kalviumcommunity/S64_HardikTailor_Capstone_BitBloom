"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResource = exports.updateResource = exports.getResourceById = exports.getResources = exports.createResource = void 0;
const Resource_1 = __importDefault(require("../models/Resource"));
const mongoose_1 = __importDefault(require("mongoose"));
const createResource = async (req, res) => {
    try {
        const { title, description, isFree, price } = req.body;
        const newResource = new Resource_1.default({
            title,
            description,
            isFree,
            price: isFree ? undefined : price,
            user: req.user?.id, // Ideally define a CustomRequest interface
        });
        const savedResource = await newResource.save();
        return res.status(201).json(savedResource);
    }
    catch (error) {
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
const updateResource = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
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
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.updateResource = updateResource;
const deleteResource = async (req, res) => {
    const { id } = req.params;
    try {
        const resource = await Resource_1.default.findById(id);
        if (!resource) {
            return res
                .status(404)
                .json({ success: false, message: 'Resource not found' });
        }
        await Resource_1.default.findByIdAndDelete(id);
        return res
            .status(200)
            .json({ success: true, message: 'Resource deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting resource:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
exports.deleteResource = deleteResource;
