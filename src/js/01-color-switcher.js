let intervalId = null;
const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');

btnStartEl.addEventListener('click', onButtonStartClick);
btnStopEl.addEventListener('click', onButtonStopClick);

function onButtonStartClick() {
  disableBtnStart(true);
  disableBtnStop(false);
  changeBodyColor();

  intervalId = setInterval(() => {
    changeBodyColor();
  }, 1000);
}

function onButtonStopClick() {
  clearInterval(intervalId);
  disableBtnStop(true);
  disableBtnStart(false);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function changeBodyColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function disableBtnStart(status) {
  btnStartEl.disabled = status;
}

function disableBtnStop(status) {
  btnStopEl.disabled = status;
}
