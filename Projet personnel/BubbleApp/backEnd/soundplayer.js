const fs = require("fs");
const portAudio = require("naudiodon");
const AudioMixer = require("audio-mixer");

const devices = portAudio.getDevices();
console.log(devices)

// Update with your VB-Cable device id
function findDevice(namePart) {
    return devices.find(d => d.name.includes(namePart));
}

// Find VB-Cable and Real Mic dynamically
const realMic = findDevice("Microphone Array");
const cableOutput = findDevice("CABLE Input (VB-Audio Virtual C");

// Print them to check
console.log("VB-Cable Input:", cableOutput);
console.log("id", cableOutput.id);

// Now you can use their ids
const VB_ID = cableOutput.id;
const MIC_ID = realMic.id;

const VB_out = new portAudio.AudioIO({ outOptions: { channelCount: 2, sampleFormat: portAudio.SampleFormat16Bit, sampleRate: 44100, deviceId: VB_ID } });
const mic = new portAudio.AudioIO({ inOptions: { deviceId: MIC_ID, channelCount: 2, sampleFormat: portAudio.SampleFormat16Bit, sampleRate: 44100 } });
const mixer = new AudioMixer.Mixer({
    channelCount: 2,
    bitDepth: 16,
    sampleRate: 44100,
})

const frameSize = 1024;
const silence = Buffer.alloc(frameSize * 2);

function SoundboardPlay(file){
    const input = new AudioMixer.Input({
        channels: 2,
        bitDepth: 16,
        sampleRate: 44100
    });
    fs.createReadStream(file).pipe(input);
    mixer.addInput(input)
}



mic.on('data', (micChunk) => {
    // micChunk is a Buffer of PCM samples
    mixer.addInput('mic', micChunk);
});

mixer.pipe(VB_out);
VB_out.start();

SoundboardPlay("audio/the_moon.wav")
