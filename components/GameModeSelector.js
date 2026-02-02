import React from 'react';

export default function GameModeSelector({ gameMode, setGameMode, difficulty, setDifficulty }) {
  return (
    <div className="selector">
      <label>
        Game Mode:
        <select value={gameMode} onChange={(e) => setGameMode(e.target.value)}>
          <option value="human">Human vs Human</option>
          <option value="computer">Human vs Computer</option>
        </select>
      </label>
      {gameMode === 'computer' && (
        <label>
          Difficulty:
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
      )}
    </div>
  );
}