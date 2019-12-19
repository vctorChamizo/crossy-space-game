class Sound {
  constructor(keys) {
    this.keys = keys;
    this.sound_data = sound_data;

    this.sounds = [];

    this.sound_data.forEach((e, index) => {
      let sound = document.createElement("audio");
      sound.src = e.src;
      sound.setAttribute("id", "sound-" + index);
      sound.setAttribute("preload", "auto");
      sound.setAttribute("controls", "none");
      sound.style.display = "none";
      document.body.appendChild(sound);
    });
  }

  play(sound) {
    document.getElementById("sound-" + sound).play();
  }

  stop(sound) {
    document.getElementById("sound-" + sound).pause();
  }
}
