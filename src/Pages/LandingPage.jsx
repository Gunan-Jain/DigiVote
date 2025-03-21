import {
  FaUserPlus,
  FaFileAlt,
  FaCheckCircle,
  FaQrcode,
  FaVoteYea,
  FaUsers,
  FaIdCard,
  FaRobot,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "../styles/LandingPage.css";
import { FaShieldAlt, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function LandingPage() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="wrapper">
      {/* Navbar */}
      <nav className="nav">
        <h1 className="logo">DigiVote</h1>
        <div className="nav-links">
          <a onClick={() => scrollToSection("about")} href="#">
            About
          </a>
          <a onClick={() => scrollToSection("features")} href="#">
            Features
          </a>
          <a onClick={() => scrollToSection("how")} href="#">
            How It Works
          </a>
          <a onClick={() => scrollToSection("faq")} href="#">
            FAQ
          </a>
          <a onClick={() => scrollToSection("contact")} href="#">
            Contact
          </a>
          <div className="dropdown">
            <a href="#">Resources ▾</a>
            <div className="dropdown-content">
              <a onClick={() => scrollToSection("ai-chatbot")} href="#">
                AI Chatbot
              </a>
              <a onClick={() => scrollToSection("qr-code-generator")} href="#">
                QR Code Generator
              </a>
            </div>
          </div>

          <div className="dropdown">
            <a href="#">Election Info ▾</a>
            <div className="dropdown-content">
              <a onClick={() => scrollToSection("election-updates")} href="#">
                Election Updates
              </a>
              <a
                onClick={() => scrollToSection("nearby-polling-booths")}
                href="#"
              >
                Nearby Polling Booths
              </a>
            </div>
          </div>
        </div>

        <div className="auth-buttons">
          <Link to={"/login"} className="btn">
            Login
          </Link>
          <Link to={"/signup"} className="btn-alt">
            Sign Up
          </Link>
        </div>
      </nav>

      <section className="hero">
        <h2 className="title">Together We Decide, Together We Rise</h2>
        <p className="subtitle">
          Empowering Every Vote, Strengthening Every Voice
        </p>
        <div className="hero-buttons">
          <button
            className="btn red"
            onClick={() => scrollToSection("how-it-works")}
          >
            Learn More
          </button>
          <a href="/vote" className="btn white">
            Vote Now
          </a>
        </div>
      </section>

      <section id="features" className="features">
        <div className="feature">
          <FaUsers className="feature-icon" />
          <h3>Queue Monitoring</h3>
          <p>
            Real-time crowd updates to reduce waiting time at polling stations
          </p>
        </div>
        <div className="feature">
          <FaIdCard className="feature-icon" />
          <h3>Digital Voter Registration</h3>
          <p>Easy online voter registration with document verification</p>
        </div>
        <div className="feature">
          <FaQrcode className="feature-icon" />
          <h3>QR Code-Based Voting</h3>
          <p>
            Unique QR codes for seamless voter verification at polling booths.
          </p>
        </div>
        <div className="feature">
          <FaRobot className="feature-icon" />
          <h3>AI Chatbot Assistance</h3>
          <p>24/7 chatbot support for voter queries and guidance</p>
        </div>
      </section>
      <section id="about" className="about-container">
        <div className="about-left">
          <img
            src="./assets/AI.png"
            alt="Voting Illustration"
            className="about-image"
          />
        </div>
        <div className="about-right">
          <p className="about-subheading">DISCOVER DigiVote</p>
          <h2 className="about-title">Empowering Secure Digital Elections</h2>
          <hr className="about-divider" />
          <p className="about-description">
            DigiVote revolutionizes the electoral process with our AI-enhanced,
            automated voting system. Designed for transparency and security, we
            ensure that every vote is both secure and easily accessible,
            allowing voters to participate confidently from anywhere.
          </p>
          <div className="about-features">
            <div className="about-feature-item">
              <div className="about-feature-icon">
                <FaShieldAlt />
              </div>
              <div className="about-feature-text">
                <h3>Unmatched Security</h3>
                <p>
                  Our platform employs end-to-end encryption and advanced fraud
                  prevention measures for absolute voter protection.
                </p>
              </div>
            </div>
            <div className="about-feature-item">
              <div className="about-feature-icon">
                <FaUserAlt />
              </div>
              <div className="about-feature-text">
                <h3>User-Centric Design</h3>
                <p>
                  Experience seamless navigation and intuitive interfaces that
                  cater to all users, ensuring an effortless voting journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="how" className="how-it-works">
        <div className="how-step-img-grid">
          <img src="/assets/step1.png" alt="Step 1" className="how-step-img" />
          <img src="/assets/step2.png" alt="Step 2" className="how-step-img" />
          <img src="/assets/step3.png" alt="Step 3" className="how-step-img" />
          <img src="/assets/step4.png" alt="Step 4" className="how-step-img" />
          <img src="/assets/step5.png" alt="Step 5" className="how-step-img" />
        </div>
        <div className="how-it-works-header">
          <h2>How It Works</h2>
          <h1>Simplified Process to Get Started</h1>
          <p>Follow these simple steps to experience seamless functionality.</p>
        </div>
        <div className="how-it-works-grid">
          <div id="step" className="step1">
            <h3>Step 1: Sign Up</h3>
            <p>
              Create an account by providing your name, email, and date of
              birth.
            </p>
          </div>

          <div id="step" className="step2">
            <h3>Step 2: Complete Registration</h3>
            <p>
              Fill out your voter registration form and upload your ID for
              verification.
            </p>
          </div>

          <div id="step" className="step3">
            <h3>Step 3: Verification</h3>
            <p>
              Your registration will be verified by the admin. You'll receive a
              confirmation.
            </p>
          </div>

          <div id="step" className="step4">
            <h3>Step 4: Get Your QR Code</h3>
            <p>On election day, a unique QR code will be generated for you.</p>
          </div>

          <div id="step" className="step5">
            <h3>Step 5: Cast Your Vote</h3>
            <p>Scan your QR code at the polling booth and vote securely.</p>
          </div>
        </div>
      </section>
      <section id="faq" className="faq-section">
        <div className="container">
          <h3 className="section-subtitle">USER FAQ</h3>
          <h2 className="section-title">
            What You Need to Know About DigiVote
          </h2>

          <div className="faq-cards">
            <div className="faq-card">
              <div className="quote-icon">❝</div>
              <p className="faq-question">
                Is DigiVote secure for online voting?
              </p>
              <p className="faq-answer">
                Yes, DigiVote uses blockchain technology and AI-driven
                authentication to ensure security and transparency.
              </p>
            </div>

            <div className="faq-card">
              <div className="quote-icon">❝</div>
              <p className="faq-question">How do I register for DigiVote?</p>
              <p className="faq-answer">
                To register, visit our website, sign up with your details,
                upload a valid government ID, and complete the verification
                process.
              </p>
            </div>

            <div className="faq-card">
              <div className="quote-icon">❝</div>
              <p className="faq-question">Can I vote from anywhere?</p>
              <p className="faq-answer">
                Currently, DigiVote is designed for in-person voting with QR
                code-based verification at designated polling stations.
              </p>
            </div>

            <div className="faq-card">
              <div className="quote-icon">❝</div>
              <p className="faq-question">
                How do I check my voter registration status?
              </p>
              <p className="faq-answer">
                Log in to your DigiVote account and navigate to the 'My
                Registration' section to check your status.
              </p>
            </div>

            <div className="faq-card">
              <div className="quote-icon">❝</div>
              <p className="faq-question">
                What documents do I need for registration?
              </p>
              <p className="faq-answer">
                You need a valid government-issued ID, proof of residence, and
                personal details such as your date of birth.
              </p>
            </div>

            <div className="faq-card">
              <div className="quote-icon">❝</div>
              <p className="faq-question">
                Can I change my vote after casting it?
              </p>
              <p className="faq-answer">
                No, once your vote is cast, it cannot be changed. Please review
                your choices carefully before submitting.
              </p>
            </div>

            <div className="faq-card">
              <div className="quote-icon">❝</div>
              <p className="faq-question">What if I lose my QR code?</p>
              <p className="faq-answer">
                If you lose your QR code, log in to your DigiVote account to
                regenerate it or contact support for assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-header">
          <h2>We're Here to Assist You</h2>
          <p>
            Have questions or need support with our automated voting system? Our
            team is ready to help you every step of the way.
          </p>
        </div>

        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-info-overlay">
              <h4>CONTACT INFORMATION</h4>
              <h3>Get in Touch</h3>
              <p> (555) 987-6543</p>
              <p> support@digivote.com</p>
              <p> 789 Digital Blvd, San Francisco, CA</p>
              <p> Mon - Fri: 8:00am - 6:00pm</p>
            </div>
          </div>
          <form className="contact-form">
            <input type="text" placeholder="Your Full Name" required />
            <input type="email" placeholder="Your Email Address" required />
            <input type="tel" placeholder="Your Contact Number" required />
            <textarea placeholder="Your Message" rows="4" required></textarea>
            <button type="submit">SEND INQUIRY</button>
          </form>
        </div>
      </section>
      <footer className="footer-section">
        <div className="footer-container">
          {/* Column 1 - About */}
          <div className="footer-col about">
            <h3>DigiVote</h3>
            <p>
              Reimagine Elections with DigiVote. A next-gen voting system
              powered by AI and end-to-end security — built to make elections
              faster, smarter, and 100% reliable. The future of voting isn't
              coming. It's here.
            </p>
            <div className="footer-socials">
              <a href="#"></a>
              <a href="#"></a>
              <a href="#"></a>
            </div>
          </div>
          <div className="footer-col links">
            <h4>Helpful Links</h4>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a href="#">How It Works</a>
              </li>
              <li>
                <a href="#">Election Updates</a>
              </li>
              <li>
                <a href="#">Nearby Polling Booths</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="footer-col contact">
            <h4>Reach Us</h4>
            <p> (555) 123 - 4567</p>
            <p>info@digivote.com</p>
            <p> 456 Oak Ave. Denver, CO</p>
            <p> Mon - Fri: 9:00am - 5:00pm</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 DigiVote, All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}
