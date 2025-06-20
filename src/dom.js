import { HumanPlayer, ComputerPlayer } from './player.js';

const DOM = (() => {
  let human, computer;

  const boardSize = 10;
  const playerBoardContainer = document.querySelector('#player-board');
  const computerBoardContainer = document.querySelector('#computer-board');
  const messageBox = document.querySelector('#message');

  const init = () => {
    human = new HumanPlayer('You');
    computer = new ComputerPlayer('Computer');

    // Place ships (random or fixed for now)
    human.board.placeShip(0, 0, 3, true);
    human.board.placeShip(2, 2, 2, false);
    computer.board.placeShip(5, 5, 3, true);
    computer.board.placeShip(8, 1, 2, false);

    renderBoards();
    addComputerBoardListeners();
  };

  const renderBoards = () => {
    renderBoard(human.board, playerBoardContainer, false);
    renderBoard(computer.board, computerBoardContainer, true);
  };

  const renderBoard = (board, container, hideShips = false) => {
    container.innerHTML = '';
    for (let x = 0; x < boardSize; x++) {
      for (let y = 0; y < boardSize; y++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.x = x;
        cell.dataset.y = y;

        const value = board.board[x][y];
        if (value === 'miss') {
          cell.classList.add('miss');
        } else if (value === 'hit') {
          cell.classList.add('hit');
        } else if (value && !hideShips) {
          cell.classList.add('ship');
        }

        container.appendChild(cell);
      }
    }
  };

  const addComputerBoardListeners = () => {
    computerBoardContainer.addEventListener('click', (e) => {
      const cell = e.target;
      if (!cell.classList.contains('cell')) return;

      const x = +cell.dataset.x;
      const y = +cell.dataset.y;

      const success = human.attack(computer.board, x, y);
      if (!success) return;

      renderBoards();
      checkWin();

      // Computer turn
      setTimeout(() => {
        computer.makeRandomAttack(human.board);
        renderBoards();
        checkWin();
      }, 500);
    });
  };

  const checkWin = () => {
    if (computer.board.allShipsSunk()) {
      messageBox.textContent = '🎉 You win!';
      disableInput();
    } else if (human.board.allShipsSunk()) {
      messageBox.textContent = '💀 You lost!';
      disableInput();
    }
  };

  const disableInput = () => {
    computerBoardContainer.style.pointerEvents = 'none';
  };

  return { init };
})();

export default DOM;
