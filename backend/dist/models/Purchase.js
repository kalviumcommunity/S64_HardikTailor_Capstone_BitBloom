"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const purchaseSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    resource: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Resource', required: true },
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
}, { timestamps: true });
// Compound index to ensure a user can only purchase a resource once
purchaseSchema.index({ user: 1, resource: 1 }, { unique: true });
const Purchase = mongoose_1.default.model('Purchase', purchaseSchema);
exports.default = Purchase;
