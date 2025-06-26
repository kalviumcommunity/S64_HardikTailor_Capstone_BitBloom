import express from "express";
import { createQuestion , getQuestions , getQuestionBySlug , getAllUniqueTopics} from "../controller/questionController";

const router = express.Router();

router.get("/questions" , getQuestions);
router.post("/questions", createQuestion);
router.get("/questions/:slug", getQuestionBySlug);
router.get('/topics', getAllUniqueTopics);


export default router;
