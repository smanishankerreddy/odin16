import { Gameboard } from '../src/gameboard.js';

describe('Gameboard', () => {
  test('places ship horizontally', () => {
    const board = new Gameboard();
    expect(board.placeShip(0, 0, 3)).toBe(true);
    expect(board.board[0][0]).not.toBe(null);
    expect(board.board[0][1]).not.toBe(null);
    expect(board.board[0][2]).not.toBe(null);
  });

  test('places ship vertically', () => {
    const board = new Gameboard();
    expect(board.placeShip(1, 1, 2, false)).toBe(true);
    expect(board.board[1][1]).not.toBe(null);
    expect(board.board[2][1]).not.toBe(null);
  });

  test('prevents overlapping ships', () => {
    const board = new Gameboard();
    board.placeShip(0, 0, 3);
    expect(board.placeShip(0, 1, 3)).toBe(false);
  });

  test('registers a hit', () => {
    const board = new Gameboard();
    board.placeShip(0, 0, 1);
    board.receiveAttack(0, 0);
    expect(board.board[0][0]).toBe('hit');
  });

  test('registers a miss', () => {
    const board = new Gameboard();
    board.receiveAttack(4, 4);
    expect(board.board[4][4]).toBe('miss');
    expect(board.missedAttacks).toContainEqual([4, 4]);
  });

  test('reports all ships sunk correctly', () => {
    const board = new Gameboard();
    board.placeShip(0, 0, 1);
    board.receiveAttack(0, 0);
    expect(board.allShipsSunk()).toBe(true);
  });

  test('reports not all ships sunk', () => {
    const board = new Gameboard();
    board.placeShip(0, 0, 2);
    board.receiveAttack(0, 0);
    expect(board.allShipsSunk()).toBe(false);
  });
});
