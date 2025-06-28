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
router.post('/', authMiddleware_1.authMiddleware, (req, res, next) => {
    multerConfig_1.default.single('file')(req, res, (err) => {
        if (err) {
            console.error('❌ Multer Error:', err);
            return res.status(500).json({
                message: 'Multer upload failed',
                error: err.message || JSON.stringify(err),
            });
        }
        next();
    });
}, resourceController_1.createResource);
router.get('/', resourceController_1.getResources);
router.get('/download/:id', authMiddleware_1.authMiddleware, resourceController_1.downloadResource);
// Get resource by ID route
router.get('/:id', resourceController_1.getResourceById);
router.delete('/:id', authMiddleware_1.authMiddleware, resourceController_1.deleteResource);
router.put('/:id', authMiddleware_1.authMiddleware, resourceController_1.UpdateResource);
exports.default = router;
