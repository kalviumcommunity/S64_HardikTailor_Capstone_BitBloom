"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resourceController_1 = require("../controller/resourceController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.authMiddleware, resourceController_1.createResource);
router.get('/', resourceController_1.getResources);
router.get('/:id', resourceController_1.getResourceById);
router.put('/:id', resourceController_1.updateResource);
router.delete('/:id', resourceController_1.deleteResource);
exports.default = router;
