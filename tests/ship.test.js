import { Ship } from '../src/ship.js';

describe('Ship', () => {
  test('initializes with correct length and 0 hits', () => {
    const ship = new Ship(4);
    expect(ship.length).toBe(4);
    expect(ship.hits).toBe(0);
  });

  test('hit() increments hits', () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(2);
  });

  test('isSunk() returns false when not all parts hit', () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test('isSunk() returns true when all parts hit', () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test('hit() does not increase hits beyond ship length', () => {
    const ship = new Ship(1);
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(1);
  });
});
