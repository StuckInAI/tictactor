import React from 'react';
import Square from './Square';
import { GameState } from '../types';

interface BoardProps {
  squares: GameState['board'];
  onSquareClick: (index: number) => void;
  disabled: boolean;
}

const Board: React.FC<BoardProps> = ({ squares, onSquareClick, disabled }) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {squares.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onSquareClick(index)}
          disabled={disabled || value !== null}
        />
      ))}
    </div>
  );
};

export default Board;
