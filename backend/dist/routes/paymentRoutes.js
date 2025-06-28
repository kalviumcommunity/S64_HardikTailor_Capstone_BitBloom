"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentController_1 = require("../controller/paymentController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Create Razorpay order
router.post('/create-order', authMiddleware_1.authMiddleware, paymentController_1.createOrder);
// Verify payment
router.post('/verify', authMiddleware_1.authMiddleware, paymentController_1.verifyPayment);
exports.default = router;
