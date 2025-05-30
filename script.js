let hungerLevel = 5;
let emptyHours = 0;

function updateHungerDisplay() {
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`meat${i}`).src = i <= hungerLevel ? "hungry_full.png" : "hungry_empty.png";
    }
}

function decreaseHunger() {
    if (hungerLevel > 0) {
        hungerLevel--;
        if (hungerLevel === 0) emptyHours = 0;
    } else {
        emptyHours++;
        if (emptyHours >= 10) alert("モンスターは飢えて死んでしまいました。");
    }
    updateHungerDisplay();
}

setInterval(decreaseHunger, 60000);  // 毎分1つ減らす（テスト用）

function changeStage(stage) {
    const bg = document.getElementById("background");
    bg.src = `bg_${stage}.png`;
}

document.getElementById("stageButton").addEventListener("click", () => {
    const menu = document.getElementById("stageMenu");
    menu.classList.toggle("hidden");
});

updateHungerDisplay();
