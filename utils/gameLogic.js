export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function getEmptySquares(board) {
  return board.map((square, index) => square === null ? index : null).filter(index => index !== null);
}

export function getComputerMove(board, difficulty) {
  const emptySquares = getEmptySquares(board);
  if (emptySquares.length === 0) return null;

  switch (difficulty) {
    case 'easy':
      return emptySquares[Math.floor(Math.random() * emptySquares.length)];

    case 'medium':
      for (let i = 0; i < emptySquares.length; i++) {
        const newBoard = [...board];
        newBoard[emptySquares[i]] = 'O';
        if (calculateWinner(newBoard) === 'O') {
          return emptySquares[i];
        }
      }
      for (let i = 0; i < emptySquares.length; i++) {
        const newBoard = [...board];
        newBoard[emptySquares[i]] = 'X';
        if (calculateWinner(newBoard) === 'X') {
          return emptySquares[i];
        }
      }
      return emptySquares[Math.floor(Math.random() * emptySquares.length)];

    case 'hard':
      return minimax(board, 'O').index;

    default:
      return emptySquares[0];
  }
}

function minimax(board, player) {
  const winner = calculateWinner(board);
  if (winner === 'X') return { score: -10 };
  if (winner === 'O') return { score: 10 };
  if (board.every(square => square !== null)) return { score: 0 };

  const moves = [];
  const emptySquares = getEmptySquares(board);

  for (let i = 0; i < emptySquares.length; i++) {
    const move = {};
    move.index = emptySquares[i];
    const newBoard = [...board];
    newBoard[emptySquares[i]] = player;

    if (player === 'O') {
      const result = minimax(newBoard, 'X');
      move.score = result.score;
    } else {
      const result = minimax(newBoard, 'O');
      move.score = result.score;
    }

    moves.push(move);
  }

  let bestMove;
  if (player === 'O') {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}