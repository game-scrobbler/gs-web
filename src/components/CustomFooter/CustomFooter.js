import React from "react";
import "./CustomFooter.css";
import { Svg } from "../Svg";
import { SVG_path } from "../../assets";

export const CustomFooter = () => {
  return (
    <div className="footer">
      <div className="footer-big-container">
        <div className="footer-container-logo">
          <Svg
            SVG={SVG_path.logo_black}
            style={{ width: "40", height: "40", fill: "white" }}
            alt="Logo"
          />
          <div className="footer-container-logo-name">Game Scrobbler</div>
        </div>
        <div className="footer-container-logo-tagline">
          Track, analyze, and improve your gaming journey.
        </div>
      </div>
      <div className="footer-big-container">
        <div className="footer-header">Platform</div>
        <div className="footer-sub-header">Features</div>
        <div className="footer-sub-header">Pricing</div>
        <div className="footer-sub-header">Integration</div>
      </div>
      <div className="footer-big-container">
        <div className="footer-header">Company</div>
        <div className="footer-sub-header">About</div>
        <div className="footer-sub-header">Blog</div>
        <div className="footer-sub-header">Careers</div>
      </div>
      <div className="footer-big-container">
        <div className="footer-header">Connect</div>
        <div className="footer-connect-container">
          <Svg
            SVG={SVG_path.icon_twitter}
            style={{ width: "40", height: "40", fill: "#979fae" }}
            alt="Logo"
          />
          <Svg
            SVG={SVG_path.icon_discord}
            style={{ width: "40", height: "40", fill: "#979fae" }}
            alt="Logo"
          />
          <Svg
            SVG={SVG_path.icon_instagram}
            style={{ width: "40", height: "40", fill: "#979fae" }}
            alt="Logo"
          />
        </div>
      </div>
    </div>
  );
};
