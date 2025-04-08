// script.js
const gameState = {
  score: 0,
  balloonsCollected: 0,
  balloons: [],
};

let spawnTimer;

function initGame() {
  spawnBalloons();
  spawnTimer = setInterval(spawnBalloons, 2000); // Spawn balloons every 2 seconds
}

function spawnBalloons() {
  const balloon = document.createElement('a-entity');
  balloon.setAttribute('gltf-model', '#balloon-model');
  balloon.setAttribute('scale', '0.5 0.5 0.5');
  balloon.setAttribute('position', `${Math.random() * 10 - 5} ${Math.random() * 5 + 5} ${Math.random() * 10 - 5}`);
  balloon.setAttribute('rotation', `${Math.random() * 360} ${Math.random() * 360} ${Math.random() * 360}`);
  balloon.setAttribute('animation', 'property: position; to: ${balloon.getAttribute("position")}; dur: 3000; loop: false; dir: alternate; easing: linear;');
  balloon.setAttribute('cursor-listener', '');

  balloon.addEventListener('click', () => collectBalloon(balloon));

  document.querySelector('a-scene').appendChild(balloon);
  gameState.balloons.push(balloon);
}

function collectBalloon(balloon) {
  const scorePoints = Math.floor(Math.random() * 10) + 1;
  gameState.score += scorePoints;
  gameState.balloonsCollected++;
  updateScoreUI();
  showMessage(`You popped a balloon! +${scorePoints} points`);
  playPopSound();
  balloon.parentNode.removeChild(balloon);
}

function updateScoreUI() {
  document.getElementById('score').textContent = gameState.score;
}

function showMessage(text, duration = 3000) {
  const messageContainer = document.getElementById('message-container');
  messageContainer.textContent = text;
  messageContainer.style.display = 'block';
  setTimeout(() => {
    messageContainer.style.display = 'none';
  }, duration);
}

function playPopSound() {
  const popSound = document.getElementById('pop-sound');
  popSound.currentTime = 0;
  popSound.play();
}

AFRAME.registerComponent('game-manager', {
  init: function () {
    initGame();
  },
});

AFRAME.registerComponent('cursor-listener', {
  init: function () {
    this.el.addEventListener('click', (evt) => {
      const balloon = this.el;
      collectBalloon(balloon);
    });
  },
});
