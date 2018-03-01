{
  const video = document.querySelector("video");
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  const w = canvas.width;
  const h = canvas.height;

  const fontsize = 16;

  const lookupTable = [
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    "'",
    "'",
    "'",
    "'",
    "'",
    "'",
    "'",
    "'",
    "'",
    "'",
    "'",
    "'",
    "'",
    "'",
    "'",
    "'",
    "'",
    "'",
    "'",
    "`",
    "`",
    "`",
    "`",
    "`",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "^",
    "^",
    "^",
    "^",
    "^",
    "^",
    "^",
    "^",
    "^",
    ",",
    "~",
    "-",
    "-",
    "_",
    "_",
    "_",
    '"',
    '"',
    '"',
    '"',
    '"',
    '"',
    '"',
    '"',
    '"',
    '"',
    '"',
    ":",
    ":",
    ":",
    ":",
    ":",
    ":",
    ":",
    ":",
    ":",
    ":",
    ":",
    ":",
    ":",
    ":",
    ":",
    "|",
    "|",
    "|",
    "|",
    "|",
    "|",
    "|",
    ";",
    ";",
    "!",
    "\\",
    "/",
    "/",
    "/",
    "/",
    "+",
    "+",
    "+",
    "+",
    "*",
    "*",
    "(",
    ")",
    ")",
    ")",
    "[",
    "[",
    "[",
    "[",
    "]",
    "=",
    "=",
    ">",
    ">",
    "<",
    "7",
    "1",
    "l",
    "i",
    "i",
    "i",
    "i",
    "}",
    "}",
    "}",
    "}",
    "?",
    "{",
    "I",
    "r",
    "r",
    "r",
    "r",
    "r",
    "r",
    "v",
    "v",
    "v",
    "v",
    "v",
    "v",
    "v",
    "t",
    "t",
    "j",
    "j",
    "j",
    "z",
    "z",
    "J",
    "c",
    "c",
    "c",
    "3",
    "3",
    "3",
    "o",
    "u",
    "L",
    "L",
    "2",
    "f",
    "f",
    "Y",
    "Y",
    "s",
    "s",
    "s",
    "&",
    "5",
    "x",
    "C",
    "C",
    "C",
    "T",
    "T",
    "0",
    "0",
    "P",
    "%",
    "F",
    "e",
    "h",
    "9",
    "y",
    "U",
    "U",
    "D",
    "D",
    "D",
    "$",
    "$",
    "$",
    "$",
    "O",
    "O",
    "O",
    "A",
    "b",
    "b",
    "8",
    "8",
    "8",
    "m",
    "S",
    "K",
    "@",
    "@",
    "G",
    "E",
    "R",
    "R",
    "q",
    "q",
    "H",
    "p",
    "p",
    "p",
    "p",
    "B",
    "B",
    "B",
    "B",
    "N",
    "N",
    "N",
    "N",
    "W",
    "W",
    "W",
    "W",
    "W",
    "W",
    "M",
    "M",
    "M",
    "M",
    "Q",
    "#"
  ];
  function getBrightness(buff, x, y) {
    let brightness = 0;

    for (let k = 0; k < 16; k++) {
      for (let j = 0; j < 16; j++) {
        let i = y * w + x;
        let v = buff[i];

        let r = v & 0xff;
        let g = (v & 0xff00) >> 8;
        let b = (v & 0xff0000) >> 16;
        brightness += (r + g + b) / 3;
      }
    }

    return brightness / fontsize ** 2;
  }

  async function render() {
    ctx.drawImage(video, 0, 0, w, h);

    ctx.textBaseline = "top";
    ctx.font = fontsize + "px monospace";
    const imageData = ctx.getImageData(0, 0, w, h);
    let buff = new Uint32Array(imageData.data.buffer);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += fontsize) {
      for (let x = 0; x < w; x += fontsize) {
        let br = Math.min(Math.round(getBrightness(buff, x, y)), 254);
        ctx.fillStyle = "white";
        ctx.fillText(lookupTable[br], x, y);
      }
    }
  }

  navigator.mediaDevices
    .getUserMedia({ video: { width: w, height: h } })
    .then(stream => {
      try {
        video.srcObject = stream;
      } catch (error) {
        video.src = URL.createObjectURL(stream);
      }

      video.play();
      loop();
    });

  const loop = () => {
    render();
    requestAnimationFrame(loop);
  };
  loop();
}
