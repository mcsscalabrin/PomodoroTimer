let timer;
let minutos = 15;
let segundos = 0;
let isPaused = true;
let enteredTime = null;

// Controle do tema
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    
    // Atualiza o botão de tema
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
    
    // Salva a preferência do tema
    localStorage.setItem('theme', newTheme);
}

// Carrega o tema salvo
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
}

function startTimer() {
    updateTimer();
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    const timeString = formatTime(minutos, segundos);
    timerElement.textContent = timeString;
    
    // Atualiza o título da aba
    document.title = `${timeString} - Pomodoro Timer`;
    
    if (minutos === 0 && segundos === 0) {
        clearInterval(timer);
        playNotification();
        document.title = "Pomodoro Timer";
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
        pauseResumeButton.textContent = "INICIAR";
    } else {
        startTimer();
        pauseResumeButton.textContent = "PAUSAR";
    }
}

function restartTimer() {
    clearInterval(timer);
    minutos = enteredTime || 15;
    segundos = 0;
    isPaused = true;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = formatTime(minutos, segundos);
    document.title = "Pomodoro Timer";
    const pauseResumeButton = document.querySelector('.control-buttons button');
    pauseResumeButton.textContent = "INICIAR";
}

function chooseTime() {
    const newTime = prompt("Insira o tempo em minutos:");
    if (!isNaN(newTime) && newTime > 0) {
        enteredTime = parseInt(newTime);
        minutos = enteredTime;
        segundos = 0;
        isPaused = true;
        const timerElement = document.getElementById('timer');
        timerElement.textContent = formatTime(minutos, segundos);
        clearInterval(timer);
        document.title = "Pomodoro Timer";
        const pauseResumeButton = document.querySelector('.control-buttons button');
        pauseResumeButton.textContent = "INICIAR";
    } else {
        alert("Entrada inválida, digite um número maior que 0.");
    }
}

function playNotification() {
    const audio = document.getElementById('timerComplete');
    audio.play();
    alert("Já deu o tempo! Hora do descanso");
}

// Atalhos de teclado
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        togglePauseResume();
    } else if (e.code === 'KeyR') {
        restartTimer();
    } else if (e.code === 'KeyT') {
        chooseTime();
    } else if (e.code === 'KeyD') {
        toggleTheme();
    }
});

// Inicializa o tema ao carregar
document.addEventListener('DOMContentLoaded', loadSavedTheme);