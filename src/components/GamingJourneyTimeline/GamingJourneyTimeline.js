import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./GamingJourneyTimeline.css";

export const GamingJourneyTimeline = () => {
  const timelineRef = useRef();

  useEffect(() => {
    const data = [
      { year: "2020", milestone: "Started gaming", achievements: 10 },
      { year: "2021", milestone: "Achieved 50 trophies", achievements: 50 },
      { year: "2022", milestone: "Became RPG Master", achievements: 100 },
    ];

    const svgWidth = 300;
    const milestoneSpacing = 150; // Spacing between milestones
    const circleRadius = 15; // Circle radius
    const padding = 50; // Padding above and below milestones
    const svgHeight = data.length * milestoneSpacing; // Adjust height dynamically

    const svg = d3
      .select(timelineRef.current)
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    // Add segmented lines connecting milestones
    data.forEach((d, i) => {
      if (i < data.length - 1) {
        const y1 = padding + i * milestoneSpacing + circleRadius;
        const y2 = padding + (i + 1) * milestoneSpacing - circleRadius;

        svg
          .append("line")
          .attr("class", "timeline-line")
          .attr("x1", svgWidth / 2)
          .attr("y1", y1)
          .attr("x2", svgWidth / 2)
          .attr("y2", y2);
      }
    });

    // Add groups for circles and labels
    const milestones = svg
      .selectAll(".milestone")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "milestone")
      .attr(
        "transform",
        (d, i) =>
          `translate(${svgWidth / 2}, ${padding + i * milestoneSpacing})`
      );

    // Add circles
    milestones
      .append("circle")
      .attr("r", circleRadius)
      .attr("fill", "orange")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    // Add year labels (above each circle)
    milestones
      .append("text")
      .attr("class", "year-label")
      .attr("y", -30)
      .attr("text-anchor", "middle")
      .text((d) => d.year);

    // Add milestone descriptions (below each circle)
    milestones
      .append("text")
      .attr("class", "milestone-label")
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .text((d) => d.milestone);
  }, []);

  return (
    <div className="timeline-container">
      <h2 className="chart-title">Gaming Journey Timeline</h2>
      <svg ref={timelineRef}></svg>
    </div>
  );
};
