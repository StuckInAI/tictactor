import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import GameStatus from './components/GameStatus';
import { GameState } from './types';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
    mode: 'human',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    startNewGame('human');
  }, []);

  const startNewGame = async (mode: 'human' | 'computer') => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/game`, { mode });
      setGameState(response.data);
    } catch (error) {
      console.error('Error starting game:', error);
    }
    setLoading(false);
  };

  const handleSquareClick = async (index: number) => {
    if (gameState.winner || gameState.isDraw || gameState.board[index] !== null) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.put(`${API_BASE_URL}/api/game/move`, {
        gameId: gameState.gameId,
        index,
        player: gameState.currentPlayer,
      });
      setGameState(response.data);
    } catch (error) {
      console.error('Error making move:', error);
    }
    setLoading(false);
  };

  const handleModeChange = (mode: 'human' | 'computer') => {
    startNewGame(mode);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Tictactor</h1>
      <div className="mb-4">
        <button
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => handleModeChange('human')}
          disabled={loading}
        >
          Human vs. Human
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => handleModeChange('computer')}
          disabled={loading}
        >
          Human vs. Computer
        </button>
      </div>
      <GameStatus gameState={gameState} />
      <Board
        squares={gameState.board}
        onSquareClick={handleSquareClick}
        disabled={loading || gameState.winner !== null || gameState.isDraw}
      />
      <button
        className="mt-8 px-6 py-2 bg-red-500 text-white rounded"
        onClick={() => startNewGame(gameState.mode)}
        disabled={loading}
      >
        Reset Game
      </button>
    </div>
  );
};

export default App;
