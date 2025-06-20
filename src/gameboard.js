import { Ship } from './ship.js';

export class Gameboard {
  constructor() {
    this.board = Array(10).fill(null).map(() => Array(10).fill(null));
    this.ships = [];
    this.missedAttacks = [];
  }

  placeShip(x, y, length, isHorizontal = true) {
    const ship = new Ship(length);
    const positions = [];

    for (let i = 0; i < length; i++) {
      const row = x + (isHorizontal ? 0 : i);
      const col = y + (isHorizontal ? i : 0);

      if (row > 9 || col > 9 || this.board[row][col]) return false;

      positions.push([row, col]);
    }

    positions.forEach(([r, c], index) => {
      this.board[r][c] = { ship, index };
    });

    this.ships.push(ship);
    return true;
  }

  receiveAttack(x, y) {
    const cell = this.board[x][y];
    if (cell === null) {
      this.board[x][y] = 'miss';
      this.missedAttacks.push([x, y]);
    } else if (cell && typeof cell === 'object') {
      cell.ship.hit();
      this.board[x][y] = 'hit';
    }
  }

  allShipsSunk() {
    return this.ships.every(ship => ship.isSunk());
  }
}
