import React from 'react';

export default function ScoreBoard({ scores }) {
  return (
    <div className="scoreBoard">
      <h3>Scores</h3>
      <p>X Wins: {scores.xWins}</p>
      <p>O Wins: {scores.oWins}</p>
      <p>Draws: {scores.draws}</p>
    </div>
  );
}