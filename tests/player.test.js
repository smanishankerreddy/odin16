import { HumanPlayer, ComputerPlayer } from '../src/player.js';

describe('Player functionality', () => {
  test('Human player can attack opponent once per cell', () => {
    const player1 = new HumanPlayer('P1');
    const player2 = new HumanPlayer('P2');

    const success = player1.attack(player2.board, 2, 3);
    const repeat = player1.attack(player2.board, 2, 3);

    expect(success).toBe(true);
    expect(repeat).toBe(false);
  });

  test('Computer player makes valid random attacks', () => {
    const player = new HumanPlayer();
    const computer = new ComputerPlayer();

    const [x, y] = computer.makeRandomAttack(player.board);

    expect(x).toBeGreaterThanOrEqual(0);
    expect(x).toBeLessThan(10);
    expect(y).toBeGreaterThanOrEqual(0);
    expect(y).toBeLessThan(10);
    expect(player.board.board[x][y]).toBeDefined();
  });

  test('Computer does not repeat attack locations', () => {
    const player = new HumanPlayer();
    const computer = new ComputerPlayer();

    const tried = new Set();
    for (let i = 0; i < 100; i++) {
      const [x, y] = computer.makeRandomAttack(player.board);
      const key = `${x},${y}`;
      expect(tried.has(key)).toBe(false);
      tried.add(key);
    }
  });
});
