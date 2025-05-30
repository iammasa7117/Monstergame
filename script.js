
let bunny = document.getElementById('bunny');
let bunnyState = 0;
let meatIcons = [
    document.getElementById('meat1'),
    document.getElementById('meat2'),
    document.getElementById('meat3'),
    document.getElementById('meat4'),
    document.getElementById('meat5')
];

let hungerLevel = 5;
let hungerStartTime = localStorage.getItem('hungerStartTime');
if (!hungerStartTime) {
    hungerStartTime = Date.now();
    localStorage.setItem('hungerStartTime', hungerStartTime);
}

function updateHunger() {
    const elapsedHours = Math.floor((Date.now() - hungerStartTime) / (1000 * 60 * 60));
    hungerLevel = Math.max(0, 5 - elapsedHours);
    meatIcons.forEach((icon, index) => {
        icon.src = index < hungerLevel ? 'hungry_full.png' : 'hungry_empty.png';
    });
    if (hungerLevel === 0 && elapsedHours >= 10) {
        alert("モンスターは空腹で死んでしまいました...");
    }
}

setInterval(() => {
    bunnyState = 1 - bunnyState;
    bunny.src = bunnyState === 0 ? 'bunny_walk_1.png' : 'bunny_walk_2.png';
    updateHunger();
}, 1000);

document.getElementById("stageBtn").addEventListener("click", () => {
    const menu = document.getElementById("stageMenu");
    menu.classList.toggle("hidden");
});

function changeStage(stage) {
    const bg = document.getElementById("background");
    bg.src = `bg_${stage}.png`;
    document.getElementById("stageMenu").classList.add("hidden");
}
