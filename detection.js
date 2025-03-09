async function startObjectDetection() {
    const video = document.createElement('video');
    video.setAttribute("autoplay", "");
    video.setAttribute("playsinline", "");
    document.body.appendChild(video);

    // Get camera access
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.srcObject = stream;
    });

    // Load AI Model
    const model = await cocoSsd.load();

    setInterval(async () => {
        const predictions = await model.detect(video);
        predictions.forEach(prediction => {
            speakText(`Detected ${prediction.class}`);
        });
    }, 3000);
}

function speakText(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
}
