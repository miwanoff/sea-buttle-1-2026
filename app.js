const gameOptionContainer = document.querySelector("#game-option");
const rotateButton = document.querySelector("#rotate");
const gameBoardsContainer = document.querySelector("#game-boards");

let angle = 0;

const width = 10;

class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
  }
}

const ship1 = new Ship("deck-one", 1);
const ship2 = new Ship("deck-one", 1);
const ship3 = new Ship("deck-three", 3);
const ship4 = new Ship("deck-three", 3);

const ships = [ship1, ship2, ship3, ship4];

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
  for (let i = 0; i < width * width; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.id = `block-${user}-${i}`;
    gameBoardContainer.append(block);
  }
}

createBoаrd("tan", "user");
createBoаrd("pink", "computer");

function generate(ship) {
  const computerElement = document.querySelector("#computer");
  console.log(computerElement);
  const allBoardBlocks = computerElement.getElementsByClassName("block");
  console.log(allBoardBlocks);
  // let randomBoolean = Math.random < 0.5;
  isHorisontal = true;
  let randomStartIndex = Math.floor(Math.random() * width * width);
  let shipBlocks = [];
  for (let i = 0; i < ship.length; i++) {
    if (isHorisontal) {
      console.log(allBoardBlocks[Number(randomStartIndex) + i * width]);
      shipBlocks.push(allBoardBlocks[Number(randomStartIndex) + i * width]);
    }
  }
}

generate(ship4);
