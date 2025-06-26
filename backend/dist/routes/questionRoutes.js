"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questionController_1 = require("../controller/questionController");
const router = express_1.default.Router();
router.get("/questions", questionController_1.getQuestions);
router.post("/questions", questionController_1.createQuestion);
router.get("/questions/:slug", questionController_1.getQuestionBySlug);
router.get('/topics', questionController_1.getAllUniqueTopics);
exports.default = router;
