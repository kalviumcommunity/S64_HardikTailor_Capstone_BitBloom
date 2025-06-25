"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resourceController_1 = require("../controller/resourceController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const multerConfig_1 = __importDefault(require("../utils/multerConfig"));
const router = express_1.default.Router();
// Resource CRUD routes
router.post('/', authMiddleware_1.authMiddleware, multerConfig_1.default.single('file'), resourceController_1.createResource);
router.get('/', resourceController_1.getResources);
// Download route - authMiddleware is optional for free resources but required for paid ones
// The controller will handle the logic to determine if authentication is required
// Important: This route must come before the generic /:id route to avoid conflicts
router.get('/download/:id', authMiddleware_1.authMiddleware, resourceController_1.downloadResource);
// Get resource by ID route
router.get('/:id', resourceController_1.getResourceById);
router.delete('/:id', authMiddleware_1.authMiddleware, resourceController_1.deleteResource);
router.put('/:id', authMiddleware_1.authMiddleware, resourceController_1.UpdateResource);
exports.default = router;
