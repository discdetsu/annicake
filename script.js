window.onload = function() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(handleAudioStream)
        .catch(error => console.error('Microphone access denied', error));
};

function handleAudioStream(stream) {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    microphone.connect(analyser);

    const frequencyData = new Uint8Array(analyser.frequencyBinCount);
    listenForBlow(analyser, frequencyData);
}

function listenForBlow(analyser, frequencyData) {
    analyser.getByteFrequencyData(frequencyData);
    const blowIntensity = frequencyData[0]; 

    if (blowIntensity > 100) { 
        extinguishFlames();
    }

    requestAnimationFrame(() => listenForBlow(analyser, frequencyData));
}

function extinguishFlames() {
    const flames = document.querySelectorAll('.flame-gif');
    flames.forEach(flame => {
        flame.style.display = 'none'; 
    });
    // Show the banner caption
    const banner = document.getElementById('anniversary-banner');
    banner.style.display = 'block';
    
    // Show the paragraph text 
    const paragraph = document.getElementById('paragraph');
    paragraph.style.display = 'block';
}
