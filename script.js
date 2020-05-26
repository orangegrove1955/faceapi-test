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

// Add event listener for start of video to call detect faces every 100 milliseconds
videoElement.addEventListener("play", () => {
  setInterval(detectFace, 100);
});

/** Use faceapi to detect all faces in video and return landmark and expressions from them */
const detectFace = async () => {
  const detections = await faceapi
    // Detect all faces using Tiny face detector, using no custom options
    .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
    // Extract landmarks from faces found
    .withFaceLandmarks()
    // Determine expression of faces found
    .withFaceExpressions();
  console.log(detections);
};
