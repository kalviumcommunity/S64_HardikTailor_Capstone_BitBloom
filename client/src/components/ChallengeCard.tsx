import React from "react";

type ChallengeCardProps = {
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  time: string;
  link: string;
};

const ChallengeCard: React.FC<ChallengeCardProps> = ({ title, description, difficulty, category, time , link}) => {
  return (
    <div className="card shadow-sm" style={{ width: "18rem" }}>
      <div className="card-body">
        <p className="card-subtitle mb-2 text-muted" style={{ fontSize: "0.9rem" }}>
          {category} | {time}
        </p>
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <span className={`badge bg-${difficulty === "Easy" ? "success" : difficulty === "Medium" ? "warning text-dark" : "danger"}`}>
            {difficulty}
          </span>
          <button className="btn btn-primary btn-sm" onClick={() => window.open(link)}>Solve Now</button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
