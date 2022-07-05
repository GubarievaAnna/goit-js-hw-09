import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btnStartEl = document.querySelector('button[data-start]');
const spanDays = document.querySelector('[data-days]');
const spanHours = document.querySelector('[data-hours]');
const spanMinutes = document.querySelector('[data-minutes]');
const spanSeconds = document.querySelector('[data-seconds]');
let selectedDate = null;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    const dif = selectedDates[0] - Date.now();

    if (dif < 0) {
      btnStartEl.disabled = true;
      alert('"Please choose a date in the future"');
      return;
    }

    btnStartEl.disabled = false;
  },
});

btnStartEl.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
  btnStartEl.disabled = true;

  setInterval(() => {
    const dif = selectedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(dif);
    spanDays.textContent = pad(days);
    spanHours.textContent = pad(hours);
    spanMinutes.textContent = pad(minutes);
    spanSeconds.textContent = pad(seconds);
  }, 1000);
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
