"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CodingQuestionSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    topics: [String],
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
});
// Pre-save middleware to auto-generate slug
CodingQuestionSchema.pre("validate", function (next) {
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-');
    }
    next();
});
exports.default = mongoose_1.default.model("CodingQuestion", CodingQuestionSchema);
