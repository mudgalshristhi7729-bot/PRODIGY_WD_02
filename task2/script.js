let startTime = 0;
let elapsedTime = 0;
let interval;
let running = false;
let lapCount = 0;

function startStopwatch() {
    if (!running) {
        running = true;
        startTime = Date.now() - elapsedTime;
        interval = setInterval(updateTime, 10);

        toggleButtons(true);
    }
}

function pauseStopwatch() {
    running = false;
    clearInterval(interval);
    toggleButtons(false);
}

function resetStopwatch() {
    running = false;
    clearInterval(interval);
    elapsedTime = 0;
    lapCount = 0;
    updateDisplay(0);
    document.getElementById("laps").innerHTML = "";
    toggleButtons(false);
}

function recordLap() {
    if (running) {
        lapCount++;
        const li = document.createElement("li");
        li.textContent = `Lap ${lapCount} - ${document.getElementById("display").textContent}`;
        document.getElementById("laps").appendChild(li);
    }
}

function clearLaps() {
    lapCount = 0;
    document.getElementById("laps").innerHTML = "";
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    updateDisplay(elapsedTime);
}

function updateDisplay(time) {
    let ms = Math.floor((time % 1000) / 10);
    let sec = Math.floor((time / 1000) % 60);
    let min = Math.floor((time / (1000 * 60)) % 60);
    let hr = Math.floor(time / (1000 * 60 * 60));

    document.getElementById("display").textContent =
        `${String(hr).padStart(2,"0")}:${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}.${String(ms).padStart(2,"0")}`;
}

function toggleButtons(isRunning) {
    document.getElementById("start").disabled = isRunning;
    document.getElementById("pause").disabled = !isRunning;
    document.getElementById("lap").disabled = !isRunning;
}

function toggleTheme() {
    document.body.classList.toggle("dark");
}
