"use strict";

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDate = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('button');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
buttonStart.disabled = true;
const calendar = flatpickr(inputDate, options);

inputDate.addEventListener('change', () => {
  let userSelectedDate = calendar.selectedDates[0];
  if (userSelectedDate.getTime() <= Date.now()) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    buttonStart.disabled = true;
  } else {
    buttonStart.disabled = false;
  }
});

buttonStart.addEventListener('click', event => {
  event.preventDefault();
  buttonStart.disabled = true;
  inputDate.disabled = true;
  let userSelectedDate = calendar.selectedDates[0];
  let totalTime = 0;

  const intervalId = setInterval(() => {
    totalTime = userSelectedDate.getTime() - Date.now();
    if (totalTime <= 0) {
      clearInterval(intervalId);
    } else {
      let { days, hours, minutes, seconds } = addLeadingZero(
        convertMs(totalTime)
      );
      timerDays.textContent = days;
      timerHours.textContent = hours;
      timerMinutes.textContent = minutes;
      timerSeconds.textContent = seconds;
    }
  }, 1000);
});

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
function addLeadingZero(value) {
  for (let element in value) {
    value[element] = value[element].toString().padStart(2, '0');
  }
  return value;
}
