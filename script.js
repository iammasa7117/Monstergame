const stageBtn = document.getElementById("stageBtn");
const stageMenu = document.getElementById("stageMenu");
const background = document.getElementById("background");

stageBtn.onclick = () => {
  stageMenu.classList.toggle("hidden");
};

function changeStage(stage) {
  const stages = {
    forest: "bg_forest.png",
    wasteland: "bg_wasteland.png",
    cave: "bg_cave.png",
    snowfield: "bg_snowfield.png"
  };
  background.src = stages[stage];
  stageMenu.classList.add("hidden");
}
