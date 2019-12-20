class Audio {
  constructor(keys) {
    this.keys = keys;
    this.audio_data = audio_data;

    this.audios = [];

    this.audio_data.forEach((e, index) => {
      let audio = document.createElement("audio");
      audio.src = e.src;
      audio.setAttribute("id", "audio-" + index);
      audio.setAttribute("preload", "auto");
      audio.setAttribute("controls", "none");
      audio.style.display = "none";
      document.body.appendChild(audio);
    });
  }

  play(audio) {
    document.getElementById("audio-" + audio).play();
  }

  stop(audio) {
    document.getElementById("audio-" + audio).pause();
  }
}
