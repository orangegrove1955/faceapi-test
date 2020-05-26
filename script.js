// Get video element from the DOM
const videoElement = document.getElementById("video");

/** Start playing a video when the screen loads */
const startVideo = () => {
  // Get access to webcam stream
  navigator.getUserMedia(
    { video: {} },
    (stream) => (video.srcObject = stream),
    (err) => console.error(err)
  );
};

// Load all elements needed to perform facial detection and recognition
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models"),
])
  // Begin showing video on page
  .then(startVideo);
