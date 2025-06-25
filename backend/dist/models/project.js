"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const projectSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    problemDescription: {
        type: String,
        required: true,
    },
    techStack: {
        type: [String], // array of techs like ['React', 'Node.js', 'MongoDB']
        required: true,
    },
    repoLink: {
        type: String,
        required: true,
    },
    uploadedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});
const Project = mongoose_1.default.model('Project', projectSchema);
exports.default = Project;
