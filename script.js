let timer;
let minutos = 15;
let isPaused = false;
let enteredTime = null;

function startTimer() {
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

function formatTime() {
    return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

function togglePauseResume() {
    const pauseResumeButton = document.querySelector('.control-buttons button');
    isPaused = !isPaused
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
    isPaused = false;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = formatTime(minutos, segundos);
    const pauseResumeButton = document.getElementById('.control-buttons button');
    pauseResumeButton.textContent = "PAUSE";
    startTimer();
}

function chooseTime() {
    const newTime = prompt("Insira o tempo em minutos:");
    if (!NaN(newTime) && newTime > 0) {
        enteredTime = parseInt(newTime);
        minutos = enteredTime;
        segundos = 0;
        isPaused = false;
        const timerElement = document.getElementById('timer');
        timerElement.textContent = formatTime(minutos, segundos);
        clearInterval(timer);
        const pauseResumeButton = document.getElementById('.control-buttons button');
        pauseResumeButton.textContent = "PAUSE";
        startTimer();
    } else {
        alert("Inut inválido, entre com um número válido e maior que 0.")
    }
}

startTimer();