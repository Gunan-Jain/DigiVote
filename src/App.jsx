import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage.jsx";
import Signup from "./Pages/Signup.jsx";
import Login from "./Pages/Login.jsx";
import Voterpage from "./Pages/Voterpage";
import Voterpageverification from "./Pages/Voterpageverification.jsx";
import FaceRegistration from "./facecapture/Face_registration.jsx";
import FaceVerification from "./facecapture/Face_verification.jsx";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Voterpage" element={<Voterpage />} />
          <Route
            path="/Voterverification"
            element={<Voterpageverification />}
          />
          <Route path="/registration" element={<FaceRegistration />} />
          <Route path="/verification" element={<FaceVerification />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
