import React from "react";
import ChallengeCard from "../components/ChallengeCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import codingHero from "../assets/coding-hero.png"; // adjust path as needed

type Difficulty = "Easy" | "Medium" | "Hard";

interface ChallengeCardProps {
  title: string;
  description: string;
  difficulty: Difficulty;
  category: string;
  time: string;
}

const CodingPage: React.FC = () => {
  const challenges: ChallengeCardProps[] = [
    {
      title: "Max Subarray Sum",
      description: "Find the contiguous subarray with the maximum sum",
      difficulty: "Medium",
      category: "Data Structures | Arrays",
      time: "~15 min",
    },
    {
      title: "Two Sum",
      description: "Find indices of two numbers that add up to target",
      difficulty: "Easy",
      category: "Algorithms | Hashmaps",
      time: "~10 min",
    },
    {
      title: "Longest Palindromic Substring",
      description: "Return the longest palindromic substring",
      difficulty: "Hard",
      category: "Dynamic Programming | Strings",
      time: "~25 min",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-md-6 text-center text-md-start">
              <h1 className="display-5 fw-bold mb-3">Sharpen Your Skills with Coding Challenges</h1>
              <p className="lead text-muted">
                Solve real-world problems, enhance your problem-solving abilities, and prepare for coding interviews.
                Join a community of learners and take your coding skills to the next level.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <button className="btn" style={{ backgroundColor: "#2F80ED", color: "white" }}>
                  Solve Challenges
                </button>
                <button className="btn btn-outline-primary" style={{ borderColor: "#2F80ED", color: "#2F80ED" }}>
                  Upload Challenge
                </button>
              </div>
            </div>
            <div className="col-md-6 text-center">
              <img src={codingHero} alt="Coding Challenges" className="img-fluid" style={{ maxHeight: "550px" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Grid */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-4">Explore Our Exciting Coding Challenges</h2>
          <div className="row justify-content-center g-4">
            {challenges.map((challenge, index) => (
              <div className="col-md-4 d-flex justify-content-center" key={index}>
                <ChallengeCard {...challenge} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CodingPage;
