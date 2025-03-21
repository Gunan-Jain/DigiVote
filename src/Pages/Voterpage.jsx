import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Voterpage.css";

function Voterpage() {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  return (
    <div
      className="page-container"
      style={{
        backgroundImage: "url('./assets/voter_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="registration-container">
        <header className="registration-header">
          <h1>Register to Vote</h1>
          <p>Join the democratic process. Your vote matters!</p>
        </header>

        <div className="progress-bar">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`progress-step ${step >= num ? "active" : ""}`}
            >
              {num}
            </div>
          ))}
        </div>

        <div className="registration-form animate-fade">
          <form>
            {step === 1 && (
              <div className="form-section">
                <h2>Personal Details</h2>
                <div className="input-group">
                  <label htmlFor="epicNumber">EPIC Number</label>
                  <input
                    type="text"
                    id="epicNumber"
                    placeholder="Enter EPIC Number"
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <input type="date" id="dob" required />
                </div>
                <div className="button-group">
                  <button
                    type="button"
                    className="glow-button"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="form-section">
                <h2>Contact & Address</h2>
                <div className="input-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    placeholder="123 Main St"
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="123-456-7890"
                    required
                  />
                </div>
                <div className="button-group">
                  <button
                    type="button"
                    className="back-button"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="glow-button"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="form-section">
                <h2>Additional Information</h2>
                <div className="input-group">
                  <label htmlFor="gender">Gender</label>
                  <select id="gender" required>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="input-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    placeholder="Enter your state"
                    required
                  />
                </div>
                <div className="button-group">
                  <button
                    type="button"
                    className="back-button"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="glow-button"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="form-section">
                <h2>Verification</h2>
                <p>Review your details before submitting.</p>
                <div className="button-group">
                  <button
                    type="button"
                    className="back-button"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                  <button type="submit" className="glow-button">
                    Register
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        <footer className="registration-footer">
          <Link to="/help">Need help? Contact support.</Link>
        </footer>
      </div>
    </div>
  );
}

export default Voterpage;
