// const AudioRecorder = require("audio-recorder-polyfill");  Uncomment and install this when using audio input

class AudioMediaRecorder {
  constructor() {
    if (!window.MediaRecorder) {
      // window.MediaRecorder = AudioRecorder;
    }

    if (!AudioMediaRecorder.instance) {
      AudioMediaRecorder.instance = this;
    }

    this.md = undefined;
    this.recordChunks = [];
  }

  static getInstance() {
    if (!AudioMediaRecorder.instance) {
      AudioMediaRecorder.instance = new AudioMediaRecorder();
    }

    return AudioMediaRecorder.instance;
  }

  async initialize() {
    if (this.md) {
      return this;
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    this.md = new MediaRecorder(stream);
    this.recordChunks = [];

    return this;
  }

  async startRecord() {
    return new Promise((resolve) => {
      if (!this.md) {
        throw new Error("Must be initialized.");
      }

      this.recordChunks = [];

      this.md.addEventListener("start", () => {
        resolve();
      });

      this.md.addEventListener("dataavailable", (e) => {
        if (e.data.size > 0) {
          this.recordChunks.push(e.data);
        }
      });

      this.md.start();
    });
  }

  async stopRecord() {
    return new Promise((resolve) => {
      if (!this.md) {
        throw new Error("Must be initialized.");
      }

      this.md.addEventListener("stop", () => {
        resolve(new Blob(this.recordChunks));
      });

      this.md.stop();
    });
  }
}

module.exports = AudioMediaRecorder;
