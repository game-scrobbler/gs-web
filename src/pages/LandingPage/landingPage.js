import React from "react";
import { icons, img } from "../../assets";
import "./landingPage.css"; // Assuming you'll add your styles here

export const LandingPage = () => {
  return (
    <div className="landing-page">
     

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Track Your Gaming Journey - All in One Place</h1>
          <p>
            Connect with Steam and Xbox to view achievements, playtime, and
            more.
          </p>
          <button className="cta-button">Get Started for Free</button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2>Features</h2>
        <div className="feature-list">
          <div className="feature-item">
            <img src={icons.achievement} alt="Achievement Tracking" />
            <h3>Achievement Tracking</h3>
            <p>View and compare your gaming milestones.</p>
          </div>
          <div className="feature-item">
            <img src={icons.playTime} alt="Playtime Analytics" />
            <h3>Playtime Analytics</h3>
            <p>See how much time you've put into each game.</p>
          </div>
          <div className="feature-item">
            <img src={icons.integration} alt="Cross-Platform Integration" />
            <h3>Cross-Platform Integration</h3>
            <p>Connect Steam and Xbox accounts seamlessly.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Log In</h3>
            <p>Sign in with your Steam or Xbox account.</p>
          </div>
          <div className="step">
            <h3>2. Sync Your Data</h3>
            <p>Allow us to sync your game library and achievements.</p>
          </div>
          <div className="step">
            <h3>3. Track & Share</h3>
            <p>Monitor your progress and share with friends.</p>
          </div>
        </div>
      </section>

      {/* User Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial">
          <p>
            "GameTracker helps me stay motivated by tracking my progress!" -
            Gamer123
          </p>
        </div>
        <div className="testimonial">
          <p>
            "I love seeing how much time I've put into my favorite games." -
            PlayerOne
          </p>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="showcase">
        <h2>Take a Look Inside</h2>
        <div className="showcase-images">
          <img
            src="https://img.freepik.com/free-vector/business-dashboard-element-collection_23-2148361995.jpg?t=st=1730642350~exp=1730645950~hmac=e4d827448b01569be388ea0b0419f158e90e3aae2ffdb4f284cb4dee8b76c3e1&w=826"
            alt="Dashboard Screenshot"
          />
          <img src={img.temp} alt="Progress Screenshot" />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="call-to-action">
        <h2>Ready to Track Your Gaming Progress?</h2>
        <button className="cta-button">Get Started</button>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-links">
          <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
        </div>
        <div className="social-media">
          <a href="#">
            <img src="/icons/twitter-icon.png" alt="Twitter" />
          </a>
          <a href="#">
            <img src="/icons/instagram-icon.png" alt="Instagram" />
          </a>
        </div>
        <div className="contact-info">
          <p>Contact us: support@gametracker.com</p>
        </div>
      </footer>
    </div>
  );
};
