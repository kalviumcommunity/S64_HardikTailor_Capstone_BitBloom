import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, techStack }) => {
  return (
    <div className="card shadow-sm border-0 h-100 w-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold mb-2">{title}</h5>
        <p className="card-text text-muted mb-3" style={{ flex: 1 }}>{description}</p>
        <div className="mb-3">
          <span className="badge bg-secondary">{techStack}</span>
        </div>
        <div className="d-flex gap-2 mt-auto">
          <button className="btn btn-outline-primary btn-sm">Read More</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
