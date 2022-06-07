const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timer;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}

function start() {
    startBtn.setAttribute('disabled', '');
    timer = setInterval(changeColor, 1000);
}

function stop() {
    clearInterval(timer);
    startBtn.removeAttribute('disabled');
}

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);

