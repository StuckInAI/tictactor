import React from 'react';
import { GameState } from '../types';

interface GameStatusProps {
  gameState: GameState;
}

const GameStatus: React.FC<GameStatusProps> = ({ gameState }) => {
  const { currentPlayer, winner, isDraw, mode } = gameState;

  let status = '';
  if (winner) {
    status = `Winner: Player ${winner}`;
  } else if (isDraw) {
    status = 'Game Draw!';
  } else {
    status = `Current Player: ${currentPlayer}`;
  }

  return (
    <div className="text-xl mb-4">
      <p>{status}</p>
      <p>Mode: {mode === 'human' ? 'Human vs. Human' : 'Human vs. Computer'}</p>
    </div>
  );
};

export default GameStatus;
