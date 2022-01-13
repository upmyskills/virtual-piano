const btns = document.querySelector(".btn-container");
const pianoKeys = document.querySelector(".piano");
const fullScreenBtn = document.querySelector(".fullscreen");

let mouseDown = false;


const mouseDownToggler = () => mouseDown = !mouseDown;

const notesViewer = (btnName) => {
    const attr = btnName === 'Letters' ? 'data-letter' : 'data-note';
    const keys = pianoKeys.querySelectorAll(".piano-key");
    keys.forEach((e) => {
        if (attr === 'data-letter') e.classList.add("letter");
        if (attr === 'data-note') e.classList.remove("letter");
    });
};

const playSound = (note, isPlayed = true) => {
    const sound = document.querySelector(`#note_${note}`);
    if (sound && isPlayed) {
        audioObj = new Audio(sound.src);
        audioObj.play();
    }
};

let pressKeyList = new Set();

const keyHandler = (key, flag = true) => {
    const pressKey = pianoKeys.querySelector(`.piano-key[data-letter='${key.code.slice(3)}']`);
    if (!pressKey) return;
    if (flag) {
        const isPlayed = !pressKey.classList.contains("piano-key-active");
        pressKey.classList.add("piano-key-active", "piano-key-active-pseudo");
        playSound(pressKey.getAttribute('data-note'), isPlayed);
    } else {
        pressKey.classList.remove("piano-key-active", "piano-key-active-pseudo");
    }
};

const mouseHandler = (element) => {
    const target = element.target;
    target.classList.add("piano-key-active", "piano-key-active-pseudo");
    playSound(target.getAttribute('data-note'));
};

const toggleFullScreen = (elem) => {
    (document.fullscreenElement) ? document.exitFullscreen() : elem.requestFullscreen();
};

//////////////////////////////////////////////////////////////////////////////////////
fullScreenBtn.addEventListener('click', (e) => {
    const body = document.querySelector("body");
    toggleFullScreen(body);
});

document.addEventListener('keydown', (key) => {
    if (key.repeat) return;
    keyHandler(key);
});

document.addEventListener('keyup', (key) => {
    keyHandler(key, false);
});

btns.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        btns.querySelectorAll('button').forEach(e => e.classList.remove('btn-active'));
        e.target.classList.add('btn-active');
        notesViewer(e.target.textContent);
    }
});

pianoKeys.addEventListener('mousedown', (e) => {
    mouseDownToggler();
    mouseHandler(e);
});

pianoKeys.addEventListener('mouseup', (e) => {
    if (mouseDown) mouseDownToggler();
    e.target.classList.remove("piano-key-active", "piano-key-active-pseudo");
});

pianoKeys.addEventListener('mouseover', (e) => {
    if (mouseDown) mouseHandler(e);
});

pianoKeys.addEventListener('mouseout', (e) => {
    if (mouseDown) e.target.classList.remove("piano-key-active", "piano-key-active-pseudo");
});

document.querySelector("body").addEventListener('mouseup', () => {
    if (mouseDown) mouseDownToggler();
});

