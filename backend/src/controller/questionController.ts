import { Request, Response } from "express";
import CodingQuestion from "../models/codingQuestion";

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const { title, url, topics, difficulty } = req.body;

    const newQuestion = new CodingQuestion({
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
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const { topics, difficulty } = req.query;

    const query: any = {};

    if (topics) {
      query.topics = { $in: (topics as string).split(",") };
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    const questions = await CodingQuestion.find(query);
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getQuestionBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const question = await CodingQuestion.findOne({ slug });

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json(question);
  } catch (error) {
    console.error("Error fetching question by slug:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllUniqueTopics = async (req: Request, res: Response) => {
  try {
    const topics = await CodingQuestion.aggregate([
      { $unwind: '$topics' },
      { $group: { _id: '$topics' } },
      { $sort: { _id: 1 } }
    ]);

    res.json(topics.map(t => t._id));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch topics' });
  }
};


