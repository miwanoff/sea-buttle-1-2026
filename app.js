const gameOptionContainer = document.querySelector("#game-option");
const rotateButton = document.querySelector("#rotate");
const gameBoardsContainer = document.querySelector("#game-boards");

const startButton = document.querySelector("#start");
const turn = document.querySelector("#turn");
const info = document.querySelector("#info");

let draggedShip;
let angle = 0;
const width = 10;
let isHorisontal = true;

let notDropped;

let takenBlocks = [];
let userHits = [];
let computerHits = []

let gameOver = false;
let playerTurn = true;

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

function getValidity(allBoardBlocks, isHorisontal, startIndex, ship) {
  let validStart = isHorisontal
    ? startIndex <= width * width - ship.length
      ? startIndex
      : width * width - ship.length
    : startIndex <= width * width - width * ship.length
      ? startIndex
      : width * width - width * ship.length;
  // console.log(validStart, isHorisontal);
  let shipBlocks = [];

  for (let i = 0; i < ship.length; i++) {
    if (isHorisontal) {
      //console.log(allBoardBlocks[randomStartIndex + i]);
      shipBlocks.push(allBoardBlocks[Number(validStart) + i]);
    } else {
      //console.log(allBoardBlocks[Number(randomStartIndex) + i * width]);
      shipBlocks.push(allBoardBlocks[Number(validStart) + i * width]);
    }
  }

  const notTaken = shipBlocks.every(
    (shipBlocks) => !shipBlocks.classList.contains("taken"),
  );

  return { shipBlocks, notTaken };
}

function generate(user, ship, startId) {
  //   const computerElement = document.querySelector("#computer");
  //   const allBoardBlocks = computerElement.getElementsByClassName("block");
  const allBoardBlocks = document.querySelectorAll(`#${user} div`);
  //console.log(allBoardBlocks);
  let randomBoolean = Math.random() < 0.5;
  isHorisontal = user === "user" ? angle === 0 : randomBoolean;
  //   isHorisontal = randomBoolean;

  //console.log("ship ", ship.name);
  //console.log("isHorisontal ", isHorisontal);

  let randomStartIndex = Math.floor(Math.random() * width * width);
  let startIndex = startId ? startId.substr(11) : randomStartIndex;
  // console.log("startIndex " + startIndex);

  //   let validStart = isHorisontal
  //     ? randomStartIndex <= width * width - ship.length
  //       ? randomStartIndex
  //       : width * width - ship.length
  //     : randomStartIndex <= width * width - width * ship.length
  //       ? randomStartIndex
  //       : randomStartIndex - width * ship.length + width;
  //   let validStart = isHorisontal
  //     ? startIndex <= width * width - ship.length
  //       ? startIndex
  //       : width * width - ship.length
  //     : startIndex <= width * width - width * ship.length
  //       ? startIndex
  //       : width * width - width * ship.length;

  //   let temp = [];
  //   for (let i = 0; i < ship.length; i++) {
  //     isHorisontal
  //       ? temp.push(Number(validStart) + i)
  //       : temp.push(Number(validStart) + i * width);
  //   }

  //   const wrongPosition = temp.some((element) => {
  //     return takenBlocks.includes(element);
  //   });

  //   if (!wrongPosition) {
  //     let shipBlocks = [];
  //     for (let i = 0; i < ship.length; i++) {
  //       if (isHorisontal) {
  //         // console.log(allBoardBlocks[Number(validStart) + i]);
  //         shipBlocks.push(allBoardBlocks[Number(validStart) + i]);
  //         takenBlocks.push(Number(validStart) + i);
  //       } else {
  //         // console.log(allBoardBlocks[Number(validStart) + i * width]);
  //         shipBlocks.push(allBoardBlocks[Number(validStart) + i * width]);
  //         takenBlocks.push(Number(validStart) + i * width);
  //       }
  //     }
  //console.log(takenBlocks);

  const { shipBlocks, notTaken } = getValidity(
    allBoardBlocks,
    isHorisontal,
    startIndex,
    ship,
  );

  if (notTaken) {
    shipBlocks.forEach((shipBlock) => {
      shipBlock.classList.add(ship.name);
      shipBlock.classList.add("taken");
    });
  } else {
    if (user === "computer") generate(user, ship);
    if (user === "user") notDropped = true;
  }
}

//generate(ship4);
ships.forEach((ship) => generate("computer", ship));

const optionShips = Array.from(gameOptionContainer.children);

optionShips.forEach((optionShip) =>
  optionShip.addEventListener("dragstart", dragStart),
);

const allUserBlocks = document.querySelectorAll("#user div");
allUserBlocks.forEach((userBlock) => {
  userBlock.addEventListener("dragover", dragOver);
  userBlock.addEventListener("drop", dropShip);
});

function dragStart(event) {
  draggedShip = event.target;
  notDropped = false;
}

function highlight(startIndex, ship) {
  const allBoardBlocks = document.querySelectorAll("#user div");
  let isHorisontal = angle === 0;
  const { shipBlocks, notTaken } = getValidity(
    allBoardBlocks,
    isHorisontal,
    startIndex,
    ship,
  );
  if (notTaken) {
    shipBlocks.forEach((shipBlock) => {
      shipBlock.classList.add("hover");
      setTimeout(() => shipBlock.classList.remove("hover"), 500);
    });
  }
}

function dragOver(event) {
  event.preventDefault();
  const ship = ships[draggedShip.id.substr(5)];
  //console.log("draggedShip.id:", draggedShip.id, draggedShip.id.substr(5));
  //console.log("event.target.id:", event.target.id, event.target.id.substr(11));
  highlight(event.target.id.substr(11), ship);
}

function dropShip(event) {
  const startID = event.target.id;
  //console.log(startID);
  // console.log(draggedShip.id.substr(5));
  const ship = ships[draggedShip.id.substr(5)];
  // console.log(ship);
  generate("user", ship, startID);
  if (!notDropped) {
    draggedShip.remove();
  }
}

function handleClick(event) {
  if (!gameOver)
    if (event.target.classList.contains("taken")) {
      event.target.classList.add("boom");
      info.innerHTML = "You hit computers ship!";
      let classes = Array.from(event.target.classList);
      classes = classes.filter(
        (className) =>
          className !== "block" && className !== "boom" && className !== "taken"
      );
      userHits.push (...classes);
      console.log(userHits);
    }
    else {
      event.target.classList.add("empty");
      info.innerHTML = "Nothing hit!";
    }
}


function startGame() {
  if (gameOptionContainer.children.length != 0) {
    info.innerHTML = "Place all your ships!";
  } else {
    info.innerHTML = "The Game`s begin!";
    const allBoardBlocks = document.querySelectorAll("#computer div");
    allBoardBlocks.forEach((block) =>
      block.addEventListener("click", handleClick),
    );
  }
}

startButton.addEventListener("click", startGame);
