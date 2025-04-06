import { useEffect, useState } from "react";
import "../styles/Signup.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import dotenv from "dotenv";
dotenv.config();

const Signup = () => {
const PORT = process.env.PORT || 5000;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs";
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:{PORT}/register", formData)
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="signup-container">
        <div className="signup-left">
          <div className="onboarding-box">
            <h2>👋 Welcome to DigiVote</h2>
            <p>
              Empowering democracy with secure, smart, and seamless digital
              voting.
            </p>
            <p>
              I'm Ava, your AI assistant. Let’s get you ready to cast your vote
              with confidence!
            </p>

            <dotlottie-player
              src="https://lottie.host/1c14a9e7-549e-4577-9b25-05097ea39475/Yp1QSyRrAu.lottie"
              background="transparent"
              speed="1"
              style={{ width: "300px", height: "300px" }}
              loop={true}
              autoplay
            ></dotlottie-player>
          </div>
        </div>

        <div className="signup-right">
          <h2>Create Your DigiVote Account</h2>
          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create your password"
              required
            />
            <input type="date" placeholder="Date of Birth" required />
            <button type="submit">Sign Up</button>
            <p className="login-text">
              Already have Account? <Link to="/login">Login Here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
