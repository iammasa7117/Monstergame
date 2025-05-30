
let hunger = 5;
let deathCountdown = 0;
let bunny = document.getElementById("bunny");
let hungerBar = document.getElementById("hungerBar");
let statusText = document.getElementById("statusText");
let bunnyState = true;

function updateStatus() {
    const aura = hunger >= 4 ? "強" : hunger >= 2 ? "普通" : "弱";
    statusText.innerHTML =
        `HP: 100<br>スタミナ: 100<br>攻撃力: 50<br>防御力: 30<br>捕食歴: 3<br>オーラ: ${aura}`;
}

function updateHungerBar() {
    hungerBar.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const icon = document.createElement("img");
        icon.src = i < hunger ? "hungry_full.png" : "hungry_empty.png";
        icon.style.width = "30px";
        icon.style.marginLeft = "2px";
        hungerBar.appendChild(icon);
    }
}

function hungerTick() {
    if (hunger > 0) {
        hunger--;
        updateHungerBar();
        updateStatus();
        if (hunger === 0) {
            deathCountdown = 10;
        }
    } else if (deathCountdown > 0) {
        deathCountdown--;
        if (deathCountdown === 0) {
            alert("モンスターは死にました");
        }
    }
}

function changeStage(stage) {
    document.getElementById("background").src = `bg_${stage}.png`;
    document.getElementById("stageMenu").style.display = "none";
}

document.getElementById("stageButton").onclick = () => {
    const menu = document.getElementById("stageMenu");
    menu.style.display = menu.style.display === "none" ? "block" : "none";
};

setInterval(() => {
    bunny.src = bunnyState ? "bunny_walk_1.png" : "bunny_walk_2.png";
    bunnyState = !bunnyState;
}, 500);

setInterval(hungerTick, 60000); // 毎分1つ減る（テスト時は60000 → 10000にしても良い）

updateHungerBar();
updateStatus();
