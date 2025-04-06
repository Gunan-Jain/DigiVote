import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Voterpage.css";
import dotenv from "dotenv";
dotenv.config();
function Voterpage() {
  const PORT = process.env.PORT || 5000;
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    epicNumber: "",
    fullName: "",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
    gender: "",
    state: "",
  });
  const [error, setError] = useState("");

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:{PORT}/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      alert("Registration Successful!");
      setStep(1);
      setFormData({
        epicNumber: "",
        fullName: "",
        dateOfBirth: "",
        address: "",
        phoneNumber: "",
        gender: "",
        state: "",
      });
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    }
  };

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
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="form-section">
                <h2>Personal Details</h2>
                <div className="input-group">
                  <label htmlFor="epicNumber">EPIC Number</label>
                  <input
                    type="text"
                    id="epicNumber"
                    value={formData.epicNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="button"
                  className="glow-button"
                  onClick={handleNext}
                >
                  Next
                </button>
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
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
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
            )}

            {step === 3 && (
              <div className="form-section">
                <h2>Additional Information</h2>
                <div className="input-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
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
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
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
            )}

            {step === 4 && (
              <div className="form-section">
                <h2>Verification</h2>
                <p>Review your details before submitting.</p>
                {error && <p className="error-message">{error}</p>}
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
