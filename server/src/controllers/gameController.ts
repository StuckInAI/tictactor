import { Request, Response } from 'express';
import { GameState } from '../types';

let currentGame: GameState | null = null;

const checkWinner = (board: (string | null)[]): string | null => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6], // diagonals
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const isDraw = (board: (string | null)[]): boolean => {
  return board.every(cell => cell !== null);
};

const makeComputerMove = (board: (string | null)[], currentPlayer: 'X' | 'O'): number => {
  const availableMoves = board.map((cell, index) => cell === null ? index : -1).filter(index => index !== -1);
  if (availableMoves.length > 0) {
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }
  return -1;
};

export const startGame = (req: Request, res: Response): void => {
  const { mode } = req.body;
  currentGame = {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
    mode: mode || 'human',
    gameId: Date.now().toString(),
  };
  res.json(currentGame);
};

export const makeMove = (req: Request, res: Response): void => {
  const { gameId, index, player } = req.body;

  if (!currentGame || currentGame.gameId !== gameId) {
    res.status(404).json({ error: 'Game not found' });
    return;
  }

  if (currentGame.winner || currentGame.isDraw) {
    res.status(400).json({ error: 'Game is over' });
    return;
  }

  if (currentGame.board[index] !== null) {
    res.status(400).json({ error: 'Cell already occupied' });
    return;
  }

  if (player !== currentGame.currentPlayer) {
    res.status(400).json({ error: 'Not your turn' });
    return;
  }

  currentGame.board[index] = player;

  const winner = checkWinner(currentGame.board);
  if (winner) {
    currentGame.winner = winner;
  } else if (isDraw(currentGame.board)) {
    currentGame.isDraw = true;
  } else {
    currentGame.currentPlayer = currentGame.currentPlayer === 'X' ? 'O' : 'X';

    if (currentGame.mode === 'computer' && currentGame.currentPlayer === 'O') {
      const computerMoveIndex = makeComputerMove(currentGame.board, 'O');
      if (computerMoveIndex !== -1) {
        currentGame.board[computerMoveIndex] = 'O';
        const newWinner = checkWinner(currentGame.board);
        if (newWinner) {
          currentGame.winner = newWinner;
        } else if (isDraw(currentGame.board)) {
          currentGame.isDraw = true;
        } else {
          currentGame.currentPlayer = 'X';
        }
      }
    }
  }

  res.json(currentGame);
};

export const getGameStatus = (req: Request, res: Response): void => {
  if (!currentGame) {
    res.status(404).json({ error: 'No active game' });
    return;
  }
  res.json(currentGame);
};
