const gameOptionContainer = document.querySelector("#game-option");
const rotateButton = document.querySelector("#rotate");
const gameBoardsContainer = document.querySelector("#game-boards");

let angle = 0;

const dim = 10;

function rotate() {
  // const optionShips = gameOptionContainer.children;
  //   for (const ship of optionShips) {
  //     console.log(ship.className);
  //     ship.style.transform = "rotate(90deg)";
  //   }
  const optionShips = Array.from(gameOptionContainer.children);
  angle = angle === 0 ? 90 : 0;

  optionShips.forEach(
    (optionShip) => (optionShip.style.transform = `rotate(${angle}deg)`),
  );
}

rotateButton.addEventListener("click", rotate);

function createBoаrd(color, user) {
  const gameBoardContainer = document.createElement("div");
  gameBoardContainer.classList.add("game-board");
  gameBoardContainer.style.background = color;
  gameBoardContainer.id = user;
  gameBoardsContainer.append(gameBoardContainer);
  for (let i = 0; i < dim * dim; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.id = `block-${i}`;
    gameBoardContainer.append(block);
  }
}

createBoаrd("tan", "user");
createBoаrd("pink", "computer");
