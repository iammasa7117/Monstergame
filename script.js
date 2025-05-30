
const bunny = document.getElementById('bunny');
const hungerGauge = document.getElementById('hunger-gauge');
const stageButton = document.getElementById('stage-button');
const stageOptions = document.getElementById('stage-options');

const stages = {
    forest: 'bg_forest.png',
    wasteland: 'bg_wasteland.png',
    cave: 'bg_cave.png',
    snowfield: 'bg_snowfield.png'
};

let currentFrame = 0;
let hungerLevel = 5;
let deathCountdown = null;

const fullMeat = 'hungry_full.png';
const emptyMeat = 'hungry_empty.png';

function updateHungerDisplay() {
    hungerGauge.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const img = document.createElement('img');
        img.src = i < hungerLevel ? fullMeat : emptyMeat;
        hungerGauge.appendChild(img);
    }
}

function loadHunger() {
    const saved = localStorage.getItem('hungerData');
    if (saved) {
        const { level, timestamp } = JSON.parse(saved);
        const elapsed = Math.floor((Date.now() - timestamp) / 3600000);
        hungerLevel = Math.max(0, level - elapsed);
        if (hungerLevel === 0) {
            const deathStart = localStorage.getItem('deathStart');
            if (!deathStart) localStorage.setItem('deathStart', Date.now());
        } else {
            localStorage.removeItem('deathStart');
        }
    }
    updateHungerDisplay();
}

function saveHunger() {
    localStorage.setItem('hungerData', JSON.stringify({ level: hungerLevel, timestamp: Date.now() }));
}

function animateBunny() {
    currentFrame = 1 - currentFrame;
    bunny.src = currentFrame ? 'bunny_walk_2.png' : 'bunny_walk_1.png';
}
setInterval(animateBunny, 500);

function hungerTick() {
    if (hungerLevel > 0) {
        hungerLevel--;
        saveHunger();
        updateHungerDisplay();
    } else {
        const deathStart = localStorage.getItem('deathStart');
        if (deathStart) {
            const hoursPassed = Math.floor((Date.now() - deathStart) / 3600000);
            if (hoursPassed >= 10) {
                alert('モンスターは餓死しました。');
            }
        } else {
            localStorage.setItem('deathStart', Date.now());
        }
    }
}
setInterval(hungerTick, 3600000); // 1時間

function changeStage(stage) {
    document.getElementById('background').style.backgroundImage = `url(${stages[stage]})`;
}

stageButton.addEventListener('click', () => {
    stageOptions.classList.toggle('hidden');
});

loadHunger();
