import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const btnStartEl = document.querySelector('button[data-start]');
const spanDays = document.querySelector('[data-days]');
const spanHours = document.querySelector('[data-hours]');
const spanMinutes = document.querySelector('[data-minutes]');
const spanSeconds = document.querySelector('[data-seconds]');
let selectedDate = null;
let intervalId = null;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    const dif = selectedDate - Date.now();

    if (dif < 0) {
      disableBtnStart(true);
      createAlert();
      return;
    }

    disableBtnStart(false);
  },
});

btnStartEl.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
  disableBtnStart(true);
  disableInput(true);
  updateTimer();

  intervalId = setInterval(() => {
    updateTimer();
  }, 1000);
}

function disableBtnStart(status) {
  btnStartEl.disabled = status;
}
function disableInput(status) {
  inputEl.disabled = status;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function pad(number) {
  return number.toString().padStart('2', '0');
}

function createTimer({ days, hours, minutes, seconds }) {
  spanDays.textContent = pad(days);
  spanHours.textContent = pad(hours);
  spanMinutes.textContent = pad(minutes);
  spanSeconds.textContent = pad(seconds);
}

function updateTimer() {
  const dif = selectedDate - Date.now();
  if (dif <= 0) {
    clearInterval(intervalId);
    disableBtnStart(false);
    disableInput(false);
    return;
  }
  createTimer(convertMs(dif));
}

function createAlert() {
  return Notiflix.Notify.failure('Please choose a date in the future', {
    width: '400px',
    borderRadius: '5px',
    fontSize: '20px',
    position: 'center-center',
  });
}
