let timer;
let timeLeft = 1500;
let isTimerRunning = false;

function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    isTimerRunning= false;
}

function resetTimer(){
    clearInterval(timer);
    isTimerRunning=false;
    timeLeft=1500;
    updateTimerDisplay();
}

function updateTimer(){
    if (timeLeft>0){
        timeLeft--;
        updateTimerDisplay();
    } else {
        clearInterval(timer);
        isTimerRunning = false;
        alert("Time's up! Take a break.");
    }
}

function updateTimerDisplay(){
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').innerText=`${padZeroes(minutes)}:${padZeroes(seconds)}`
}

function padZeroes(num) {
    return num < 10 ? `0${num}` : num;
}