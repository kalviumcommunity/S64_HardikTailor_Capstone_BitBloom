import mongoose from "mongoose";

const CodingQuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  topics: [String],
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
});

// Pre-save middleware to auto-generate slug
CodingQuestionSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }
  next();
});

export default mongoose.model("CodingQuestion", CodingQuestionSchema);
