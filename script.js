
const INTERVAL_MS = 1000 * 60;

let hunger = parseInt(localStorage.getItem("hunger")) || 5;
let lastUpdated = parseInt(localStorage.getItem("lastUpdated")) || Date.now();

function updateHungerByTime() {
  const now = Date.now();
  const unitsPassed = Math.floor((now - lastUpdated) / INTERVAL_MS);

  if (unitsPassed > 0) {
    hunger = Math.max(0, hunger - unitsPassed);
    lastUpdated = now;
    localStorage.setItem("lastUpdated", lastUpdated.toString());
    localStorage.setItem("hunger", hunger.toString());
  }
}

function renderHungerBar() {
  const bar = document.getElementById("hunger-bar");
  bar.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const img = document.createElement("img");
    img.src = i < hunger ? "hungry_full.png" : "hungry_empty.png";
    bar.appendChild(img);
  }
}

function checkDeathCondition() {
  if (hunger === 0) {
    const now = Date.now();
    const minutesSinceZero = Math.floor((now - lastUpdated) / INTERVAL_MS);
    if (minutesSinceZero >= 10) {
      alert("モンスターが飢えて死にました...（テストモード）");
      hunger = 5;
      lastUpdated = now;
      localStorage.setItem("lastUpdated", lastUpdated.toString());
      localStorage.setItem("hunger", hunger.toString());
    }
  }
}

function changeStage(imageName) {
  document.getElementById("background").src = imageName;
}

document.getElementById("stage-button").addEventListener("click", () => {
  const options = document.getElementById("stage-options");
  options.style.display = options.style.display === "none" ? "block" : "none";
});

updateHungerByTime();
renderHungerBar();
checkDeathCondition();
