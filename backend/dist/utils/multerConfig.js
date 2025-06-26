"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Supported file extensions
const docExts = ['.pdf', '.doc', '.docx', '.zip', '.ppt', '.pptx', '.txt'];
const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
const videoExts = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv'];
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: async (req, file) => {
        const ext = path_1.default.extname(file.originalname).toLowerCase();
        const baseName = path_1.default.basename(file.originalname, ext);
        // Dynamically determine resource_type
        const resource_type = docExts.includes(ext) ? 'raw' : 'auto';
        return {
            folder: 'bitbloom-resources',
            use_filename: true,
            unique_filename: false,
            type: 'upload',
            allowed_formats: [
                ...docExts,
                ...imageExts,
                ...videoExts,
            ].map((e) => e.replace('.', '')),
            public_id: () => baseName,
            resource_type, // ✅ included here inside `params`, not outside
        };
    },
});
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
