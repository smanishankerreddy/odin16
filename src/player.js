import { Gameboard } from './gameboard.js';

class Player {
  constructor(name) {
    this.name = name;
    this.board = new Gameboard();
    this.attacksMade = new Set();
  }

  attack(opponentBoard, x, y) {
    const key = `${x},${y}`;
    if (!this.attacksMade.has(key)) {
      this.attacksMade.add(key);
      opponentBoard.receiveAttack(x, y);
      return true;
    }
    return false; // already attacked this spot
  }
}

class HumanPlayer extends Player {
  constructor(name = 'Player') {
    super(name);
  }

  // Uses base attack method
}

class ComputerPlayer extends Player {
  constructor(name = 'Computer') {
    super(name);
  }

  getRandomCoords() {
    let x, y, key;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      key = `${x},${y}`;
    } while (this.attacksMade.has(key));
    return [x, y];
  }

  makeRandomAttack(opponentBoard) {
    const [x, y] = this.getRandomCoords();
    this.attack(opponentBoard, x, y);
    return [x, y];
  }
}

export { Player, HumanPlayer, ComputerPlayer };
