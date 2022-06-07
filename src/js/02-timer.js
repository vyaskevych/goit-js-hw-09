// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.5.min.css";

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0] < Date.now());
        checkData(selectedDates[0])
    },
};

const picker = document.getElementById("datetime-picker");
const btnStart = document.querySelector("[data-start]");
const daysValue = document.querySelector("[data-days]");
const hoursValue = document.querySelector("[data-hours]");
const minutesValue = document.querySelector("[data-minutes]");
const secondsValue = document.querySelector("[data-seconds]");
let timer = null;
let selectedDate

function checkData(newDate) {
    if (newDate < Date.now()) {
        Notify.failure('Please choose a date in the future');
        btnStart.setAttribute('disabled', '');
    } else {
        selectedDate = newDate;
        btnStart.removeAttribute('disabled');
        clearInterval(timer)
    }
}

function startTimer() {
    btnStart.setAttribute('disabled', '');
    timer = setInterval(() => {
        const { days, hours, minutes, seconds } = convertMs(selectedDate - Date.now())
        setField({ days, hours, minutes, seconds })
        if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
            clearInterval(timer)
            btnStart.removeAttribute('disabled');
        }
    }, 1000)
}

function setField({ days, hours, minutes, seconds }) {
    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    value = String(value)
    return value.padStart(2, 0);
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

flatpickr(picker, options)

btnStart.addEventListener('click', startTimer)