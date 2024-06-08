let timer;
let timeLeft = 1500; // 15 seconds for work session
let pomodoroCount = 0; // Counter for Pomodoro sessions
const pomodoroSets = 5; // Number of Pomodoro sets including the extra break
let isBreakTime = false; // Flag to indicate break time
let isTimerRunning = false; // Variable to check if the timer is running

// Get the audio element
const breakSound = document.getElementById('breakSound');

function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    isTimerRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isTimerRunning = false;
    timeLeft = 1500; // Reset to 15 seconds
    isBreakTime = false;
    pomodoroCount = 0; // Reset pomodoro count
    updatePomodoroCircles();
    updateTimerDisplay();
}

function updateTimer() {
    timeLeft--;
    if (timeLeft === 0) {
        if (!isBreakTime) {
            // End of a work session
            breakSound.play(); // Play the break sound
            setTimeout(() => alert("Break time!"), 100); // Delay alert to allow sound to play
            isBreakTime = true;
            pomodoroCount++;
            updatePomodoroCircles();
            timeLeft = 300; 
        } else {
            // End of a break session
            isBreakTime = false;
            timeLeft = 1500; 
        }
        if (pomodoroCount === pomodoroSets) {
            // Reset pomodoroCount after completing all sets
            resetPomodoroCircles();
            pomodoroCount = 0;
        }
    }
    updateTimerDisplay();
}

function updatePomodoroCircles() {
    const circles = document.querySelectorAll('.pomodoro-circle');
    for (let i = 0; i < circles.length; i++) {
        if (i < pomodoroCount) {
            circles[i].classList.add('completed');
        } else {
            circles[i].classList.remove('completed');
        }
    }
}

function resetPomodoroCircles() {
    const circles = document.querySelectorAll('.pomodoro-circle');
    circles.forEach(circle => circle.classList.remove('completed'));
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').innerText = `${padZeroes(minutes)}:${padZeroes(seconds)}`;
}

function padZeroes(num) {
    return num < 10 ? `0${num}` : num;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('button.start').addEventListener('click', startTimer);
    document.querySelector('button.stop').addEventListener('click', stopTimer);
    document.querySelector('button.reset').addEventListener('click', resetTimer);
});

function changeVolume(volume) {
    breakSound.volume = volume;
}