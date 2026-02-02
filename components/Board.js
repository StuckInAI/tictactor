import React from 'react';

export default function Board({ board, onClick }) {
  return (
    <div className="board">
      {board.map((square, index) => (
        <button key={index} className="square" onClick={() => onClick(index)}>
          {square}
        </button>
      ))}
    </div>
  );
}