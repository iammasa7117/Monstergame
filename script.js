
let bunny = document.getElementById("bunny");
let stageMenu = document.getElementById("stageMenu");
let hungerIcons = [
    document.getElementById("meat1"),
    document.getElementById("meat2"),
    document.getElementById("meat3"),
    document.getElementById("meat4"),
    document.getElementById("meat5")
];
let background = document.getElementById("background");

let stageButton = document.getElementById("stageButton");
stageButton.onclick = () => {
    stageMenu.classList.toggle("hidden");
};

function changeStage(stage) {
    background.src = `bg_${stage}.png`;
    stageMenu.classList.add("hidden");
}

// Hunger system
let hungerLevel = parseInt(localStorage.getItem("hungerLevel")) || 5;
let lastHungerCheck = parseInt(localStorage.getItem("lastHungerCheck")) || Date.now();
updateHungerDisplay();

function updateHunger() {
    const now = Date.now();
    const minutesPassed = Math.floor((now - lastHungerCheck) / 60000);
    if (minutesPassed > 0) {
        hungerLevel = Math.max(0, hungerLevel - minutesPassed);
        lastHungerCheck = now;
        localStorage.setItem("hungerLevel", hungerLevel);
        localStorage.setItem("lastHungerCheck", lastHungerCheck);
        updateHungerDisplay();
    }
}

function updateHungerDisplay() {
    for (let i = 0; i < 5; i++) {
        hungerIcons[i].src = i < hungerLevel ? "hungry_full.png" : "hungry_empty.png";
    }
}

setInterval(updateHunger, 60000);
