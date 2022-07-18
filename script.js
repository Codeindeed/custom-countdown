const inputContainer = document.getElementById("input-container");
const countDownForm = document.getElementById("countdownform");
const dateEl = document.getElementById("date-picker");
const countDownEl = document.getElementById("countdown");
const countDownElTitle = document.getElementById("countdown-title");
const countDownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");
const completeEl = document.getElementById("complete");
const completeElinfo = document.getElementById("complete-info");
const completeElBtn = document.getElementById("complete-button");

let savedCountdown;
let countDownTitle = "";
let countDownDate = "";
let countDownValue = new Date();
let countdownActive;
//second min - hour all in milliseconds
let second = 1000;
let minute = second * 60;
let hour = minute * 60;
let day = hour * 24;
// Set the date input minimum To Todays DAte;
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

//Populate CountDown / Complete UI
function upDateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    //hide input
    inputContainer.hidden = true;

    //if the countdown has ended show Complete
    if (distance < 0) {
      countDownEl.hidden = true;
      clearInterval(countdownActive);
      completeElinfo.textContent = `${countDownTitle} finished on ${countDownDate}`;
      completeEl.hidden = false;
    } else {
      //show countdown in progress
      countDownElTitle.textContent = `${countDownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;

      completeEl.hidden = true;
      countDownEl.hidden = false;
    }

    //PouPlate Countdown
  }, second);
}
function localDAte() {
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    countDownTitle = savedCountdown.title;
    countDownDate = savedCountdown.date;
    countDownValue = new Date(countDownDate).getTime();
    upDateDOM();
  }
}
//Reset countdown
function reset() {
  //hide countdowns, show input
  completeEl.hidden = true;
  countDownEl.hidden = true;
  inputContainer.hidden = false;
  //Reset countdown
  clearInterval(countdownActive);
  //send back to empty strings
  countDownTitle = "";
  countDownDate = "";
  countDownValue = Date;
  localStorage.removeItem("countdown");
}
//Take values for event
function updateCountDown(e) {
  e.preventDefault();
  countDownTitle = e.srcElement[0].value;
  countDownDate = e.srcElement[1].value;
  savedCountdown = {
    title: countDownTitle,
    date: countDownDate,
  };
  localStorage.setItem("countdown", JSON.stringify(savedCountdown));
  //get number version of current Date, updatedom
  if (countDownDate === "") {
    alert("please select a date for the countdown");
  } else {
    countDownValue = new Date(countDownDate).getTime();
    upDateDOM();
  }
}
//event listeners
countDownForm.addEventListener("submit", updateCountDown);
countDownBtn.addEventListener("click", reset);
completeElBtn.addEventListener("click", reset);

//on Load ,checkLocalstorage;
localDAte();
