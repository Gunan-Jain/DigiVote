import { useEffect, useState } from "react";
import "../styles/Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const PORT = process.env.PORT || 5000;
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs";
    script.type = "module";
    document.body.appendChild(script);

    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.fontFamily = "'Poppins', sans-serif";
    (document.body.style.background =
      "linear-gradient(135deg, #0f0c29, #302b63, #24243e)"),
      (document.body.style.height = "100vh");
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";

    return () => {
      document.body.removeChild(script);
      document.body.style = {};
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    axios
      .post("http://localhost:{PORT}/login", formData)
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          navigate("/registration");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h2>🔐 DigiVote Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="📧 Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="👁️ Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
          <p className="signup-text">
            New here? <Link to={"/signup"}>Create an Account</Link>
          </p>
        </form>
      </div>

      <div className="login-right">
        <h2> Welcome, VoteGuardians!</h2>
        <p>Securely access your DigiVote account and make your voice count.</p>

        <dotlottie-player
          src="https://lottie.host/1c14a9e7-549e-4577-9b25-05097ea39475/Yp1QSyRrAu.lottie"
          background="transparent"
          speed="1"
          style={{ width: "300px", height: "300px" }}
          loop={1}
          autoplay
        ></dotlottie-player>
      </div>
    </div>
  );
};

export default Login;
