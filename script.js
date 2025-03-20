let timer;
let minutos = 15;
let segundos = 0; // Initialize the segundos variable
let isPaused = true; // Start with the timer paused
let enteredTime = null;

function startTimer() {
    updateTimer(); // Immediate update before starting the interval
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = formatTime(minutos, segundos);
    
    if (minutos === 0 && segundos === 0) {
        clearInterval(timer);
        alert("Já deu o tempo! Hora do descanso")
    } else if (!isPaused) {
        if (segundos > 0) {
            segundos--;
        } else {
            segundos = 59;
            minutos--;
        }
    }
}

function formatTime(min, sec) {
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function togglePauseResume() {
    const pauseResumeButton = document.querySelector('.control-buttons button');
    isPaused = !isPaused;
    if (isPaused) {
        clearInterval(timer);
        pauseResumeButton.textContent = "RESUME";
    } else {
        startTimer();
        pauseResumeButton.textContent = "PAUSE";
    }
}

function restartTimer() {
    clearInterval(timer);
    minutos = enteredTime || 15;
    segundos = 0;
    isPaused = true; // Ensure the timer is paused initially
    const timerElement = document.getElementById('timer');
    timerElement.textContent = formatTime(minutos, segundos);
    const pauseResumeButton = document.querySelector('.control-buttons button');
    pauseResumeButton.textContent = "RESUME"; // Set the button text to RESUME
}

function chooseTime() {
    const newTime = prompt("Insira o tempo em minutos:");
    if (!isNaN(newTime) && newTime > 0) {
        enteredTime = parseInt(newTime);
        minutos = enteredTime;
        segundos = 0;
        isPaused = true; // Ensure the timer is paused initially
        const timerElement = document.getElementById('timer');
        timerElement.textContent = formatTime(minutos, segundos);
        clearInterval(timer);
        const pauseResumeButton = document.querySelector('.control-buttons button');
        pauseResumeButton.textContent = "RESUME"; // Set the button text to RESUME
    } else {
        alert("Input inválido, entre com um número válido e maior que 0.")
    }
}

// Remove the call to startTimer() at the bottom