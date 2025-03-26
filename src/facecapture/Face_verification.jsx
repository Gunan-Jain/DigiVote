import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import * as faceapi from "face-api.js";
import { useNavigate } from "react-router-dom";

const CLOUDINARY_CLOUD_NAME = "dnpaktlwa";
const UPLOAD_PRESET = "face_upload";

const Faceverification = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    startCamera();
    loadModels();
  }, []);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  const loadModels = async () => {
    await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
    await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
  };

  const captureAndVerify = async () => {
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

        const newImageUrl = response.data.secure_url;
        const storedImageUrl = localStorage.getItem("storedImageUrl");

        if (!storedImageUrl) {
          setMessage("No stored image found. Please register first.");
          return;
        }

        const match = await compareFaces(storedImageUrl, newImageUrl);

        if (match >= 0.8) {
          setMessage("Verification successful! Redirecting...");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setMessage("Face does not match! Try again.");
        }
      } catch (error) {
        console.error("Verification Error:", error);
        setMessage("Error in verification. Try again.");
      }
    }, "image/jpeg");
  };

  const compareFaces = async (storedImage, newImage) => {
    const storedImg = await faceapi.fetchImage(storedImage);
    const newImg = await faceapi.fetchImage(newImage);

    const storedDescriptor = await getFaceDescriptor(storedImg);
    const newDescriptor = await getFaceDescriptor(newImg);

    if (!storedDescriptor || !newDescriptor) return 0;

    const distance = faceapi.euclideanDistance(storedDescriptor, newDescriptor);
    return 1 - distance;
  };

  const getFaceDescriptor = async (image) => {
    const detection = await faceapi
      .detectSingleFace(image)
      .withFaceLandmarks()
      .withFaceDescriptor();
    return detection ? detection.descriptor : null;
  };

  return (
    <div>
      <h2>Verification</h2>
      <video
        ref={videoRef}
        autoPlay
        style={{ width: "300px", height: "200px" }}
      />
      <button onClick={captureAndVerify}>Verify Face</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Faceverification;
