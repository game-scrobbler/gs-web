import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";
import "./GenreSkillMap.css";

export const GenreSkillMap = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Ref to hold the chart instance

  useEffect(() => {
    // Get the canvas context
    const ctx = chartRef.current.getContext("2d");

    // Destroy the existing chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new chart instance
    chartInstanceRef.current = new Chart(ctx, {
      type: "radar",
      data: {
        labels: ["RPG", "FPS", "Reflexes", "Creativity"],
        datasets: [
          {
            label: "Skills",
            data: [80, 70, 60, 90],
            fill: false,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(255, 99, 132)",
            pointBackgroundColor: "rgb(255, 99, 132)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(255, 99, 132)",
          },
        ],
      },
      options: {
        responsive: true,
        // maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: "#fff", // Legend text color
              font: { size: 14 },
            },
          },
        },
        scales: {
          r: {
            angleLines: {
              color: "rgba(255, 255, 255, 0.2)", // Change color of angle lines
            },
            grid: {
              color: "rgba(255, 255, 255, 0.4)", // Change color of grid lines
              circular: true, // Use circular grid lines for better aesthetics
            },
            ticks: {
              color: "#fff", // Change the color of value ticks
              backdropColor: "rgba(0, 0, 0, 0)", // Make backdrop transparent
              font: { size: 12 },
            },
            pointLabels: {
              color: "#fff", // Labels for RPG, FPS, etc.
              font: { size: 14 },
            },
          },
        },
      },
    });

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="chart-container skill-map">
      <h2 className="chart-title">Genre & Skill Map</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};
