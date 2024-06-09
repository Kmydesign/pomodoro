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

document.getElementById('input-box').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
        event.preventDefault(); // Prevent the form from submitting if it's part of a form
    }
});

function addTask() {
    const inputBox = document.getElementById('input-box');
    const listContainer = document.getElementById('list-container');
    const taskText = inputBox.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const newTask = document.createElement('li');
    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.addEventListener('change', function() {
        if (this.checked) {
            newTask.classList.add('completed');
        } else {
            newTask.classList.remove('completed');
        }
        updateCounters();
    });

    const removeButton = document.createElement('button');
    removeButton.textContent = 'X';
    removeButton.addEventListener('click', function() {
        listContainer.removeChild(newTask);
        updateCounters();
    });

    newTask.appendChild(checkBox);
    newTask.appendChild(taskContent);
    newTask.appendChild(removeButton);
    listContainer.appendChild(newTask);
    inputBox.value = ''; // Clear the input box after adding the task
    updateCounters();
}

function updateCounters() {
    const allTasks = document.querySelectorAll('#list-container li');
    const completedTasks = document.querySelectorAll('#list-container .completed');
    const completedCounter = document.getElementById('completed-counter');
    const uncompletedCounter = document.getElementById('uncompleted-counter');

    completedCounter.textContent = completedTasks.length;
    uncompletedCounter.textContent = allTasks.length - completedTasks.length;
}