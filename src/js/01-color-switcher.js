let intervalId = null;
const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');

btnStartEl.addEventListener('click', onButtonStartClick);
btnStopEl.addEventListener('click', onButtonStopClick);

function onButtonStartClick(event) {
  event.currentTarget.disabled = true;
  btnStopEl.disabled = false;
  document.body.style.backgroundColor = getRandomHexColor();
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onButtonStopClick(event) {
  if (!btnStartEl.disabled) return;
  clearInterval(intervalId);
  event.currentTarget.disabled = true;
  btnStartEl.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
