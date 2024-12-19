import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./SkillProgressTree.css";

export const SkillProgressTree = () => {
  const treeRef = useRef();

  useEffect(() => {
    const data = {
      name: "Skills",
      children: [
        {
          name: "RPG",
          children: [
            { name: "Beginner RPG", status: "completed" },
            { name: "Intermediate RPG", status: "upcoming" },
            { name: "RPG Mastery", status: "upcoming" },
          ],
        },
        {
          name: "FPS",
          children: [
            { name: "Beginner FPS", status: "completed" },
            { name: "Intermediate FPS", status: "completed" },
            { name: "FPS Mastery", status: "upcoming" },
          ],
        },
        {
          name: "Sandbox",
          children: [
            { name: "Unlock Sandbox Builder", status: "upcoming" },
            { name: "Sandbox Creativity", status: "upcoming" },
          ],
        },
      ],
    };

    const svgWidth = 800;
    const svgHeight = 600;
    const duration = 750;
    const margin = { top: 20, right: 50, bottom: 20, left: 100 };

    const treeLayout = d3
      .tree()
      .size([svgHeight, svgWidth - margin.left - margin.right]);

    const root = d3.hierarchy(data);
    root.x0 = svgHeight / 2;
    root.y0 = 0;

    const collapse = (d) => {
      if (d.children) {
        d._children = d.children; // Save children to _children
        d.children = null; // Collapse children
        d._children.forEach(collapse);
      }
    };

    root.children.forEach(collapse); // Collapse all children initially

    const svg = d3
      .select(treeRef.current)
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    // Clear existing content before rendering
    svg.selectAll("*").remove();

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const update = (source) => {
      treeLayout(root);

      const nodes = root.descendants();
      const links = root.links();

      nodes.forEach((d) => (d.y = d.depth * 180));

      const node = g
        .selectAll("g.node")
        .data(nodes, (d) => d.id || (d.id = ++i));

      const nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", () => `translate(${source.y0},${source.x0})`)
        .on("click", (event, d) => {
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }
          update(d);
        });

      nodeEnter
        .append("circle")
        .attr("r", 10)
        .attr("fill", (d) => (d.children || d._children ? "orange" : "#999"))
        .attr("stroke", "white")
        .attr("stroke-width", 2);

      nodeEnter
        .append("text")
        .attr("dy", ".35em")
        .attr("x", (d) => (d.children || d._children ? -13 : 13))
        .attr("text-anchor", (d) =>
          d.children || d._children ? "end" : "start"
        )
        .text((d) => d.data.name)
        .style("fill-opacity", 1);

      const nodeUpdate = nodeEnter.merge(node);

      nodeUpdate
        .transition()
        .duration(duration)
        .attr("transform", (d) => `translate(${d.y},${d.x})`);

      nodeUpdate
        .select("circle")
        .attr("r", 10)
        .attr("fill", (d) => (d.children || d._children ? "orange" : "#999"));

      const nodeExit = node
        .exit()
        .transition()
        .duration(duration)
        .attr("transform", () => `translate(${source.y},${source.x})`)
        .remove();

      nodeExit.select("circle").attr("r", 1e-6);

      nodeExit.select("text").style("fill-opacity", 1e-6);

      const link = g.selectAll("path.link").data(links, (d) => d.target.id);

      const linkEnter = link
        .enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("d", () => {
          const o = { x: source.x0, y: source.y0 };
          return diagonal({ source: o, target: o });
        });

      linkEnter.merge(link).transition().duration(duration).attr("d", diagonal);

      link
        .exit()
        .transition()
        .duration(duration)
        .attr("d", () => {
          const o = { x: source.x, y: source.y };
          return diagonal({ source: o, target: o });
        })
        .remove();

      nodes.forEach((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    };

    const diagonal = d3
      .linkHorizontal()
      .x((d) => d.y)
      .y((d) => d.x);

    let i = 0;
    update(root);
  }, []);

  return (
    <div className="chart-container skill-progress-tree">
      <h2 className="chart-title">Skill Progress Tree</h2>
      <svg ref={treeRef}></svg>
    </div>
  );
};
