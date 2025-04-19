import flatpickr from "flatpickr";
import iziToast from "izitoast";

let userSelectedDate;
let btnStart = document.querySelector('button');
btnStart.setAttribute('disabled', 1)

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);

      if (selectedDates[0] <= new Date()) {
        iziToast.show({
            title: 'Hey',
            message: 'Please choose a date in the future'
        });
        btnStart.setAttribute("disabled", 1);
      } else {
        userSelectedDate = selectedDates[0];
        btnStart.removeAttribute("disabled");
      }
  },
};

flatpickr("#datetime-picker", options);

function addLeadingZero(value) { 
    return String(value).padStart(2, '0');  
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

btnStart.addEventListener('click', () => {
  btnStart.setAttribute("disabled", 1);
  document.querySelector("#datetime-picker").setAttribute("disabled", 1);
  let remainingMs = userSelectedDate - new Date();
  let diffTimes = convertMs(remainingMs);
  
  let intervalID = setInterval(() => {
    remainingMs -= 1000;
    diffTimes = convertMs(remainingMs);
          document.querySelector(".value[data-days]").innerText = addLeadingZero(diffTimes.days);
          document.querySelector(".value[data-hours]").innerText = addLeadingZero(diffTimes.hours);
          document.querySelector(".value[data-minutes]").innerText = addLeadingZero(diffTimes.minutes);
          document.querySelector(".value[data-seconds]").innerText = addLeadingZero(diffTimes.seconds);
          if (userSelectedDate - new Date() < 999) {
              clearInterval(intervalID);
              btnStart.removeAttribute("disabled");
              document.querySelector("#datetime-picker").removeAttribute("disabled")
          }
        }, 1000);
})

