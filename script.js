
let stageBtn = document.getElementById("stageBtn");
let stageOptions = document.getElementById("stageOptions");
stageBtn.onclick = () => {
  stageOptions.style.display = stageOptions.style.display === "none" ? "block" : "none";
};

function changeStage(stage) {
  document.getElementById("background").src = `bg_${stage}.png`;
  stageOptions.style.display = "none";
}

const bunny = document.getElementById("bunny");
let currentFrame = 0;
const frames = ["bunny_walk_1.png", "bunny_walk_2.png"];
setInterval(() => {
  currentFrame = 1 - currentFrame;
  bunny.src = frames[currentFrame];
}, 500);

// ハングリーゲージ
const hungerContainer = document.getElementById("hungerContainer");
let hunger = 5;
let deathCountdown = 0;

function updateHungerDisplay() {
  hungerContainer.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    let img = document.createElement("img");
    img.src = i < hunger ? "hungry_full.png" : "hungry_empty.png";
    hungerContainer.appendChild(img);
  }
}

function decreaseHunger() {
  if (hunger > 0) {
    hunger--;
    updateHungerDisplay();
    if (hunger === 0) {
      deathCountdown = 10;
      startDeathTimer();
    }
  }
}

function startDeathTimer() {
  let interval = setInterval(() => {
    deathCountdown--;
    if (deathCountdown <= 0) {
      alert("モンスターが死んでしまいました。");
      clearInterval(interval);
    }
  }, 3600000);
}

// 初期表示
updateHungerDisplay();

// 1時間ごとに空腹を減らす（テスト用に5秒間隔に短縮可）
setInterval(decreaseHunger, 3600000);
