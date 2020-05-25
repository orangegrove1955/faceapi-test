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

startVideo();
