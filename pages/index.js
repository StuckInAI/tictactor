import React, { useState, useEffect } from 'react';
import Board from '../components/Board';
import GameModeSelector from '../components/GameModeSelector';
import ScoreBoard from '../components/ScoreBoard';
import { calculateWinner, getComputerMove } from '../utils/gameLogic';

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameMode, setGameMode] = useState('human');
  const [difficulty, setDifficulty] = useState('medium');
  const [scores, setScores] = useState({ xWins: 0, oWins: 0, draws: 0 });

  useEffect(() => {
    const savedScores = localStorage.getItem('tictactorScores');
    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tictactorScores', JSON.stringify(scores));
  }, [scores]);

  const handleClick = (index) => {
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
      if (win === 'X') setScores(prev => ({ ...prev, xWins: prev.xWins + 1 }));
      else if (win === 'O') setScores(prev => ({ ...prev, oWins: prev.oWins + 1 }));
    } else if (newBoard.every(square => square)) {
      setWinner('draw');
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
    } else {
      setXIsNext(!xIsNext);
    }
  };

  useEffect(() => {
    if (gameMode === 'computer' && !xIsNext && !winner) {
      const computerMove = getComputerMove(board, difficulty);
      if (computerMove !== null) {
        setTimeout(() => {
          handleClick(computerMove);
        }, 500);
      }
    }
  }, [board, xIsNext, winner, gameMode, difficulty]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  const resetScores = () => {
    setScores({ xWins: 0, oWins: 0, draws: 0 });
    localStorage.removeItem('tictactorScores');
  };

  return (
    <div className="container">
      <h1>Tictactor</h1>
      <GameModeSelector 
        gameMode={gameMode} 
        setGameMode={setGameMode} 
        difficulty={difficulty} 
        setDifficulty={setDifficulty} 
      />
      <ScoreBoard scores={scores} />
      <Board board={board} onClick={handleClick} />
      <div className="status">
        {winner ? (winner === 'draw' ? 'Game Draw!' : `Winner: ${winner}`) : `Next Player: ${xIsNext ? 'X' : 'O'}`}
      </div>
      <button onClick={resetGame}>Reset Game</button>
      <button onClick={resetScores}>Reset Scores</button>
    </div>
  );
}