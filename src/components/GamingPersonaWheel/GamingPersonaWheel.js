import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import "./GamingPersonaWheel.css";

export const GamingPersonaWheel = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    const options = {
      tooltip: {},
      radar: {
        indicator: [
          { name: "Strategist", max: 100 },
          { name: "Explorer", max: 100 },
          { name: "Achiever", max: 100 },
          { name: "Socializer", max: 100 },
        ],
        splitLine: { lineStyle: { color: "rgba(255,255,255,0.2)" } },
      },
      series: [
        {
          name: "Persona Traits",
          type: "radar",
          data: [{ value: [80, 70, 90, 50], name: "Dominant Persona" }],
          itemStyle: { color: "#ff8c00" },
          lineStyle: { width: 2 },
        },
      ],
    };
    chart.setOption(options);
  }, []);

  return (
    <div className="chart-container persona-wheel chart-glow">
      <h2 className="chart-title">Gaming Persona Wheel</h2>
      <div ref={chartRef} className="persona-wheel-chart" />
    </div>
  );
};
