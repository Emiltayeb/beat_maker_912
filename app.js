class Drumkit {
  constructor() {
    this.pad = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play-btn");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.selects = document.querySelectorAll("select");
    this.slider = document.querySelector(".tempo-slider");
    this.mute = document.querySelectorAll(".mute");
    this.volumeBtn = document.querySelectorAll(".volume-control");
    this.randomBeatBtn = document.querySelector(".random-beat");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
  }

  activePads() {
    this.classList.toggle("active");
  }

  soundSelect(e) {
    const selection = e.target.name.replace("-select", "");
    const soundChosen = e.target.value;

    console.log(soundChosen);
    switch (selection) {
      case "kick":
        this.kickAudio.src = soundChosen;

        break;
      case "snare":
        this.snareAudio.src = soundChosen;
        break;
      case "hihat":
        this.hihatAudio.src = soundChosen;
        break;
    }
  }

  repeat() {
    const step = this.index % 8;
    let row = document.querySelectorAll(`.b${step}`);
    row.forEach((element) => {
      if (element.classList.contains("active")) {
        element.style.animation = `padAnimation 0.4s alternate ease-in-out   2`;
        const padSoundName = element.classList[1].replace("-pad", "");
        switch (padSoundName) {
          case "kick":
            this.kickAudio.currentTime = 0;
            this.kickAudio.play();
            break;
          case "snare":
            this.snareAudio.currentTime = 0;
            this.snareAudio.play();
            break;
          case "hihat":
            this.hihatAudio.currentTime = 0;
            this.hihatAudio.play();
            break;
        }
      }
    });
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    console.log(this.kickAudio);

    if (this.isPlaying) {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    } else {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }

    this.updateText();
  }

  updateText() {
    let playBtnText = this.playBtn.textContent;
    this.isPlaying
      ? (this.playBtn.textContent = "Stop")
      : (this.playBtn.textContent = "Play");
  }

  tempoChange(e) {
    const sliderValue = e.target.value;
    this.bpm = sliderValue;
    // check play state
    if (this.isPlaying) {
      // means temo changing while playing
      clearInterval(this.isPlaying);
      this.isPlaying = null;

      this.start();
    } else {
      // tempo change when not playing
    }
  }

  silderUiUpdate() {
    document.getElementById("tempo-number").textContent = drumkit1.slider.value;
  }
  muteTrack(e) {
    e.target.classList.toggle("active");
    const track = e.target.classList[1].replace("-mute", "");
    const trackId = e.target.getAttribute("data-track");

    // if we pressed mute we need to update the slider as well
    const volumeSlider = document.querySelector(`#${track}-volume`);
    volumeSlider.value == 0
      ? (volumeSlider.value = 100)
      : (volumeSlider.value = 0);
    document.querySelector(`#${track}-volume-number`).textContent =
      volumeSlider.value;
    volumeSlider.volume = 0;

    //
    switch (trackId) {
      case "0":
        this.kickAudio.volume == 0
          ? (this.kickAudio.volume = 1)
          : (this.kickAudio.volume = 0);

        break;
      case "1":
        this.snareAudio.volume == 0
          ? (this.snareAudio.volume = 1)
          : (this.snareAudio.volume = 0);
        break;
      case "2":
        this.hihatAudio.volume == 0
          ? (this.hihatAudio.volume = 1)
          : (this.hihatAudio.volume = 0);
        break;
    }
  }
  randomBeat() {
    //each track contains 8 pads.
    // so we need array of 4 items and genreate random number between each one
    const PadArray = [0, 1, 2, 3];

    const randKickPad = PadArray.map(
      (element) => (element = this.randomInteger(8))
    );

    randKickPad.forEach((padNum) =>
      document.querySelector(`.kick-pad.b${padNum}`).classList.toggle("active")
    );

    const randSnarePad = PadArray.map(
      (element) => (element = this.randomInteger(8))
    );

    randSnarePad.forEach((padNum) =>
      document.querySelector(`.snare-pad.b${padNum}`).classList.toggle("active")
    );

    const randHihatkPad = PadArray.map(
      (element) => (element = this.randomInteger(8))
    );

    randHihatkPad.forEach((padNum) =>
      document.querySelector(`.hihat-pad.b${padNum}`).classList.toggle("active")
    );

    // rnadom bpm

    // this.bpm = Math.floor(Math.random() * (300 - 120 + 1)) + 120;

    if (this.isPlaying) {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
    this.start();
  }
  randomInteger(max) {
    return Math.floor(Math.random() * max);
  }

  updateUiVolume(e) {
    const volume = e.target.value;
    const track = e.target.name.replace("-volume", "");
    document.getElementById(`${track}-volume-number`).textContent = volume;
  }
  setVolume(e) {
    const volume = e.target.value;
    const track = e.target.name.replace("-volume", "");
    switch (track) {
      case "kick":
        this.kickAudio.volume = volume / 100;
        break;
      case "snare":
        this.snareAudio.volume = volume / 100;
        break;
      case "hihat":
        this.hihatAudio.volume = volume / 100;
        break;
    }
  }
}

const drumkit1 = new Drumkit();

drumkit1.pad.forEach((pad) => {
  pad.addEventListener("click", drumkit1.activePads);
  pad.addEventListener("animationend", function() {
    this.style.animation = "";
  });
});

drumkit1.playBtn.addEventListener("click", function() {
  drumkit1.start();
  drumkit1.updateText();
});

drumkit1.selects.forEach((element) => {
  element.addEventListener("change", function(e) {
    drumkit1.soundSelect(e);
  });
});

drumkit1.slider.addEventListener("input", function() {
  drumkit1.silderUiUpdate();
});
drumkit1.slider.addEventListener("change", function(e) {
  drumkit1.tempoChange(e);
});

drumkit1.mute.forEach((element) =>
  element.addEventListener("click", function(e) {
    drumkit1.muteTrack(e);
  })
);

drumkit1.volumeBtn.forEach((btn) =>
  btn.addEventListener("input", drumkit1.updateUiVolume)
);
drumkit1.volumeBtn.forEach((btn) =>
  btn.addEventListener("change", (e) => {
    drumkit1.setVolume(e);
  })
);

drumkit1.randomBeatBtn.addEventListener("click", () => {
  drumkit1.randomBeat();
});
