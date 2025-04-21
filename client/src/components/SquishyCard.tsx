import React from "react";
import { motion } from "framer-motion";

interface SquishyCardProps {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  color?: string;
  badgeColor?: string;
  ellipseColor?: string;
}

const SquishyCard: React.FC<SquishyCardProps> = ({
  badge,
  title,
  description,
  buttonText,
  color = "#ffffff",
  badgeColor = "#6c757d",
  ellipseColor = "#f8f9fa",
}) => {
  return (
    <motion.div
      whileHover="hover"
      transition={{ duration: 1, ease: "backInOut" }}
      variants={{ hover: { scale: 1.05 } }}
      className="position-relative h-100 w-100 overflow-hidden rounded-4 shadow-sm"
      style={{ backgroundColor: color }}
    >
      <div className="position-relative z-2 p-4 text-dark">
        <span
          className="badge mb-3"
          style={{ backgroundColor: badgeColor, color: "#fff" }}
        >
          {badge}
        </span>
        <h5 className="fw-bold">{title}</h5>
        <p>{description}</p>
        <button className="btn btn-light fw-bold mt-3">{buttonText}</button>
      </div>

      {/* Decorative Circles */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 320 384"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="position-absolute top-0 start-0 z-1"
      >
        <circle cx="160" cy="100" r="100" fill={ellipseColor} opacity="0.2" />
        <ellipse cx="160" cy="280" rx="100" ry="40" fill={ellipseColor} opacity="0.2" />
      </svg>
    </motion.div>
  );
};

export default SquishyCard;