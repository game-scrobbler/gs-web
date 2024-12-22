import React from "react";
import { Bar } from "react-chartjs-2";
import "./GoalPredictions.css";

export const GoalPredictions = () => {
  // Temporary mock data
  const mockData = {
    shortTerm: { timeframe: "1-3 months", predictedGoals: 5, color: "green" },
    midTerm: { timeframe: "3-6 months", predictedGoals: 8, color: "blue" },
    longTerm: { timeframe: "6+ months", predictedGoals: 10, color: "purple" },
  };

  // Chart data and options
  const data = {
    labels: ["Short-term", "Mid-term", "Long-term"],
    datasets: [
      {
        label: "Predicted Achievements/Goals",
        data: [
          mockData.shortTerm.predictedGoals,
          mockData.midTerm.predictedGoals,
          mockData.longTerm.predictedGoals,
        ],
        backgroundColor: [
          mockData.shortTerm.color,
          mockData.midTerm.color,
          mockData.longTerm.color,
        ],
        borderColor: [
          "rgba(0, 128, 0, 0.8)", // Green
          "rgba(0, 0, 255, 0.8)", // Blue
          "rgba(128, 0, 128, 0.8)", // Purple
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#ffffff",
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            const timeframe = tooltipItem.label;
            return `${value} predicted goals (${timeframe})`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
  };

  return (
    <div className="goal-predictions-container">
      <h2 className="goal-predictions-title">Goal Predictions</h2>
      <p className="goal-predictions-description">
        Analyze your gaming habits and predict future achievements based on
        your playtime trends.
      </p>
      <Bar data={data} options={options} />
      <div className="goal-predictions-tips">
        <h3>Personalized Tips</h3>
        <ul>
          <li>
            <strong>Short-term:</strong> Play 2 more hours of CS:GO to achieve
            "Gold Tier."
          </li>
          <li>
            <strong>Mid-term:</strong> Explore a new RPG game like "Elden Ring"
            for genre progression.
          </li>
          <li>
            <strong>Long-term:</strong> Complete all achievements in "Witcher
            3."
          </li>
        </ul>
      </div>
    </div>
  );
};
