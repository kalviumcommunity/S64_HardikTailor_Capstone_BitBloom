"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUniqueTopics = exports.getQuestionBySlug = exports.getQuestions = exports.createQuestion = void 0;
const codingQuestion_1 = __importDefault(require("../models/codingQuestion"));
const createQuestion = async (req, res) => {
    try {
        const { title, url, topics, difficulty } = req.body;
        const newQuestion = new codingQuestion_1.default({
            title,
            url,
            topics,
            difficulty
        });
        await newQuestion.save();
        res.status(201).json({
            message: "Question created successfully",
            question: newQuestion,
        });
    }
    catch (error) {
        console.error("Error creating question:", error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.createQuestion = createQuestion;
const getQuestions = async (req, res) => {
    try {
        const { topics, difficulty } = req.query;
        const query = {};
        if (topics) {
            query.topics = { $in: topics.split(",") };
        }
        if (difficulty) {
            query.difficulty = difficulty;
        }
        const questions = await codingQuestion_1.default.find(query);
        res.status(200).json(questions);
    }
    catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.getQuestions = getQuestions;
const getQuestionBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const question = await codingQuestion_1.default.findOne({ slug });
        if (!question) {
            return res.status(404).json({ error: "Question not found" });
        }
        res.status(200).json(question);
    }
    catch (error) {
        console.error("Error fetching question by slug:", error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.getQuestionBySlug = getQuestionBySlug;
const getAllUniqueTopics = async (req, res) => {
    try {
        const topics = await codingQuestion_1.default.aggregate([
            { $unwind: '$topics' },
            { $group: { _id: '$topics' } },
            { $sort: { _id: 1 } }
        ]);
        res.json(topics.map(t => t._id));
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch topics' });
    }
};
exports.getAllUniqueTopics = getAllUniqueTopics;
