import React from "react";
import { icons, img, SVG_path } from "../../assets";
import "./landingPage.css"; // Assuming you'll add your styles here
import { Svg } from "../../components";
import { NavLink } from "react-router-dom";

export const LandingPage = () => {
  // sessionStorage.removeItem("steamUser");
  // sessionStorage.removeItem("epicUser");
  // sessionStorage.removeItem("user");
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="w-100">
          <div className="hero-title">Track Your Gaming Journey</div>
          <p className="hero-desc">
            Level up your gaming experience with advanced analytics, progress
            tracking, and personalized insights.
          </p>
          <NavLink to="/Log-In">
            <button className="cta-button">Start Tracking Now</button>
          </NavLink>
        </div>
        <div className="hero-img-container"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="feature-title">Features</div>
        <div className="feature-list">
          <div className="feature-item">
            <Svg
              SVG={SVG_path.icon_progress}
              style={{ width: "40", height: "40", fill: "white" }}
              alt="Logo"
            />
            <div className="feature-header">Progress Tracking</div>
            <p className="feature-desc">
              Track your gaming progress across multiple platforms with detailed
              analytics and insights.
            </p>
          </div>
          <div className="feature-item">
            <Svg
              SVG={SVG_path.icon_target}
              style={{ width: "40", height: "40", fill: "white" }}
              alt="Logo"
            />
            <div className="feature-header">Goal Predictions</div>
            <p className="feature-desc">
              AI-powered predictions help you set and achieve meaningful gaming
              objectives.
            </p>
          </div>
          <div className="feature-item">
            <Svg
              SVG={SVG_path.icon_mapping}
              style={{ width: "40", height: "40", fill: "white" }}
              alt="Logo"
            />
            <div className="feature-header">Skill Mapping</div>
            <p className="feature-desc">
              Visualize your skill development and identify areas for
              improvement.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <div className="how-it-works-title">How It Works</div>
        <div className="steps">
          <div className="step">
            <div className="step_icon_container">
              <Svg
                SVG={SVG_path.logo_steam}
                style={{ width: "40", height: "40", fill: "white" }}
                alt="Logo"
              />
            </div>
            <h3>Connect Account</h3>
            <p>
              Link your gaming accounts from Steam, PlayStation, Xbox, and more.
            </p>
          </div>
          <div className="step">
            <div className="step_icon_container">
              <Svg
                SVG={SVG_path.icon_bar_chart}
                style={{ width: "40", height: "40", fill: "white" }}
                alt="Logo"
              />
            </div>
            <h3>View Progress</h3>
            <p>
              Get detailed insights into your gaming performance and
              achievements.
            </p>
          </div>
          <div className="step">
            <div className="step_icon_container">
              <Svg
                SVG={SVG_path.icon_trophy}
                style={{ width: "40", height: "40", fill: "white" }}
                alt="Logo"
              />
            </div>
            <h3>Achieve More</h3>
            <p>
              Level up your gaming experience with personalized recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* User Testimonials Section */}
      <section className="testimonials">
        <div className="testimonials-titles">What Gamers Say</div>
        <div className="testimonials-container">
          <div className="testimonial">
            <div className="testimonial-user-container">
              <Svg
                SVG={SVG_path.user1}
                style={{ width: "80", height: "80", fill: "white" }}
                alt="Logo"
              />
              <div className="testimonial-user-profile-container">
                <div className="testimonial-user-title">Alex Thompson</div>
                <div className="testimonial-user-tag">Pro Gamer</div>
              </div>
            </div>
            <p className="testimonial-user-review">
              "GameTrack has revolutionized how I approach competitive gaming.
              The insights are invaluable."
            </p>
          </div>
          <div className="testimonial">
            <div className="testimonial-user-container">
              <Svg
                SVG={SVG_path.user2}
                style={{ width: "80", height: "80", fill: "white" }}
                alt="Logo"
              />
              <div className="testimonial-user-profile-container">
                <div className="testimonial-user-title">Alex Thompson</div>
                <div className="testimonial-user-tag">Pro Gamer</div>
              </div>
            </div>
            <p className="testimonial-user-review">
              "The platform helps me track my progress and set meaningful goals
              for my gaming career."
            </p>
          </div>
          <div className="testimonial">
            <div className="testimonial-user-container">
              <Svg
                SVG={SVG_path.user3}
                style={{ width: "80", height: "80", fill: "white" }}
                alt="Logo"
              />
              <div className="testimonial-user-profile-container">
                <div className="testimonial-user-title">Alex Thompson</div>
                <div className="testimonial-user-tag">Pro Gamer</div>
              </div>
            </div>
            <p className="testimonial-user-review">
              "Finally, a platform that helps me understand my gaming habits and
              improve consistently."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
