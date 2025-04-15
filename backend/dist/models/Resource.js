"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const resourceSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    isFree: { type: Boolean, required: true },
    price: {
        type: Number,
        validate: {
            validator: function (value) {
                if (!this.isFree && (value === undefined || value === null)) {
                    return false;
                }
                return true;
            },
            message: 'Price is required if the resource is paid',
        },
    },
    file: { type: String }, // will store file path later 
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true,
    },
}, { timestamps: true });
const Resource = mongoose_1.default.model('Resource', resourceSchema);
exports.default = Resource;
