import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "../styles/Faceregistration.css";

const CLOUDINARY_CLOUD_NAME = "dnpaktlwa";
const UPLOAD_PRESET = "face_upload";

const Faceregistration = () => {
  const videoRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  const captureImage = async () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);

    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", UPLOAD_PRESET);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );

        setImageUrl(response.data.secure_url);

        // Save image URL in the backend or localStorage
        localStorage.setItem("storedImageUrl", response.data.secure_url);

        console.log("Uploaded Image URL:", response.data.secure_url);

        setTimeout(() => {
          alert("Face Registered");
          window.location.href = "/voterpage";
        }, 3000); // 3000 ms = 3 seconds
      } catch (error) {
        console.error("Upload Error:", error);
      }
    }, "image/jpeg");
  };

  return (
    <div className="registration-box">
      <div className="registration-container">
        <h2>Registration</h2>
        <video
          ref={videoRef}
          autoPlay
          style={{ width: "400px", height: "400px" }}
        />
        <button onClick={captureImage}>Capture & Upload</button>
        {imageUrl && (
          <img src={imageUrl} alt="Captured" style={{ width: "200px" }} />
        )}
      </div>
    </div>
  );
};

export default Faceregistration;
