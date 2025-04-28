import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    problemDescription: {
      type: String,
      required: true,
    },
    techStack: {
      type: [String], // array of techs like ['React', 'Node.js', 'MongoDB']
      required: true,
    },
    repoLink: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
