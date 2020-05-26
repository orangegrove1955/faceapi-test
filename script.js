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
  const { canvas, displaySize } = createCanvas();
  setInterval(() => detectFace(canvas, displaySize), 100);
});

/** Create a canvas element for faceapi to draw detections on */
const createCanvas = () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);

  // Set size of canvas
  const displaySize = { width: video.width, height: video.height };

  // Resize dimensions in faceapi to match canvas
  faceapi.matchDimensions(canvas, displaySize);

  return { canvas, displaySize };
};

/** Use faceapi to detect all faces in video and display landmark and expressions from them on canvas
 * @param canvas Canvas element to display detections
 * @param displaySize Size of display to overlay video detections on
 */
const detectFace = async (canvas, displaySize) => {
  const detections = await faceapi
    // Detect all faces using Tiny face detector, using no custom options
    .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceExpressions();

  // Display detections on resized canvas
  const resizedDetections = faceapi.resizeResults(detections, displaySize);

  // Clear canvas and draw detections, landmarks and expressions
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  faceapi.draw.drawDetections(canvas, resizedDetections);
  faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
  faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
};
