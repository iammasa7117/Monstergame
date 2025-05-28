const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const bgImages = {
  forest: 'bg_forest.png',
  wasteland: 'bg_wasteland.png',
  cave: 'bg_cave.png',
  snowfield: 'bg_snowfield.png'
};

const bunnyImages = [
  'bunny_walk_1.png',
  'bunny_walk_2.png'
];

let currentStage = 'forest';
let bgImg = new Image();
let bunny = [new Image(), new Image()];
let bunnyFrame = 0;
let bunnyX = 100;
let bunnyY = canvas.height - 300;
let frameCount = 0;

bunny[0].src = bunnyImages[0];
bunny[1].src = bunnyImages[1];

function changeStage(stage) {
  currentStage = stage;
  bgImg.src = bgImages[stage];
}
changeStage('forest');

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (bgImg.complete) ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

  const frame = Math.floor(frameCount / 30) % 2;
  if (bunny[frame].complete) ctx.drawImage(bunny[frame], bunnyX, bunnyY, 200, 200);

  bunnyX += 1;
  if (bunnyX > canvas.width) bunnyX = -200;

  frameCount++;
  requestAnimationFrame(gameLoop);
}
gameLoop();
