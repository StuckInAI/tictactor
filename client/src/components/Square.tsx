import React from 'react';

interface SquareProps {
  value: string | null;
  onClick: () => void;
  disabled: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, disabled }) => {
  return (
    <button
      className="w-20 h-20 border border-gray-400 flex items-center justify-center text-3xl font-bold disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Square;
