import React, { useState } from "react";
import "../styles/Voterpageverification.css";

function Voterpageverification() {
  const [epicNumber, setEpicNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: EPIC & Phone, 2: OTP, 3: Result
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  const handleSubmitDetails = async (e) => {
    e.preventDefault();
    if (!epicNumber || !phoneNumber) {
      setError("Please fill in all fields");
      return;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      const response = await fetch("http://localhost:10000/api/check-voter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ epicNumber, phoneNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Verification failed");
        return;
      }

      setError("");
      setStep(2); // Move to OTP input step
      console.log(`OTP sent to ${phoneNumber}`);
    } catch (err) {
      setError("Server error. Please try again later.");
      console.error("Error verifying user:", err);
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }
    setError("");

    // Simulate verification - in real app, verify with backend
    setIsVerified(true);
    setStep(3);
  };

  const resetForm = () => {
    setEpicNumber("");
    setPhoneNumber("");
    setOtp("");
    setStep(1);
    setIsVerified(false);
    setError("");
  };

  return (
    <div className="verification-page-container">
      <div className="voter-verification-container">
        <header>
          <h1>Voter Verification Portal</h1>
          <p>Verify your identity to proceed with voting</p>
        </header>

        <div className="verification-steps">
          <div className={`step ${step >= 1 ? "active" : ""}`}>
            1. Enter Details
          </div>
          <div className={`step ${step >= 2 ? "active" : ""}`}>
            2. Verify OTP
          </div>
          <div className={`step ${step >= 3 ? "active" : ""}`}>3. Result</div>
        </div>

        <main className="verification-form-container">
          {error && <div className="error-message">{error}</div>}

          {step === 1 && (
            <form onSubmit={handleSubmitDetails} className="verification-form">
              <h2>Enter Your Voter Details</h2>

              <div className="form-group">
                <label htmlFor="epicNumber">EPIC/Voter ID Number</label>
                <input
                  type="text"
                  id="epicNumber"
                  value={epicNumber}
                  onChange={(e) => setEpicNumber(e.target.value)}
                  placeholder="e.g., ABC1234567"
                  required
                />
                <p className="input-hint">As mentioned on your voter ID card</p>
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Registered Mobile Number</label>
                <div className="phone-input-container">
                  <span className="country-code">+91</span>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="9876543210"
                    maxLength="10"
                    required
                  />
                </div>
                <p className="input-hint">OTP will be sent to this number</p>
              </div>

              <button type="submit" className="submit-button">
                Send OTP
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="verification-form">
              <h2>Verify OTP</h2>
              <p className="otp-instructions">
                We've sent a 6-digit OTP to your mobile number ending with
                <strong> ••••{phoneNumber.slice(-2)}</strong>
              </p>

              <div className="form-group">
                <label htmlFor="otp">Enter OTP</label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="123456"
                  maxLength="6"
                  required
                />
              </div>

              <div className="button-group">
                <button type="submit" className="submit-button">
                  Verify OTP
                </button>
                <button
                  type="button"
                  className="resend-button"
                  onClick={() => console.log("Resending OTP...")}
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="verification-result">
              <div
                className={`result-icon ${isVerified ? "success" : "failure"}`}
              >
                {isVerified ? "✓" : "✗"}
              </div>

              <h2>
                {isVerified
                  ? "Verification Successful!"
                  : "Verification Failed"}
              </h2>

              {isVerified ? (
                <>
                  <div className="voter-details">
                    <p>
                      <strong>EPIC Number:</strong> {epicNumber}
                    </p>
                    <p>
                      <strong>Mobile Number:</strong> +91 {phoneNumber}
                    </p>
                  </div>
                  <p className="success-message">
                    Your identity has been successfully verified. You may now
                    proceed to vote.
                  </p>
                  <button className="proceed-button">Proceed to Voting</button>
                </>
              ) : (
                <>
                  <p className="error-message">
                    We couldn't verify your details. Please try again.
                  </p>
                  <div className="possible-reasons">
                    <h4>Possible reasons:</h4>
                    <ul>
                      <li>Incorrect EPIC number or phone number</li>
                      <li>Phone number not registered with this EPIC</li>
                      <li>Invalid OTP entered</li>
                    </ul>
                  </div>
                </>
              )}

              <button className="reset-button" onClick={resetForm}>
                {isVerified ? "Verify Another Voter" : "Try Again"}
              </button>
            </div>
          )}
        </main>

        <footer>
          <p>Need help? Contact your local election office</p>
        </footer>
      </div>
    </div>
  );
}

export default Voterpageverification;
