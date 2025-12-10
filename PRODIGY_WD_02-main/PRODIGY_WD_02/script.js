const timeDisplay = document.querySelector(".time-display");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsList = document.querySelector(".laps");
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
function formatTime(time) {
  const hrs = Math.floor(time / 3600000);
  const mins = Math.floor((time % 3600000) / 60000);
  const secs = Math.floor((time % 60000) / 1000);
  const ms = Math.floor((time % 1000) / 10);
  const pad = (num, size = 2) => String(num).padStart(size, "0");
  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}.${pad(ms)}`;
}
function updateTime() {
  elapsedTime = Date.now() - startTime;
  timeDisplay.textContent = formatTime(elapsedTime);
}
function startTimer() {
  if (timerInterval) return;
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTime, 10);
}
function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}
function resetTimer() {
  stopTimer();
  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00.00";
  lapsList.innerHTML = "";
}
function addLap() {
  if (!timerInterval) return;
  const li = document.createElement("li");
  li.textContent = formatTime(elapsedTime);
  lapsList.appendChild(li);
}
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", addLap);
