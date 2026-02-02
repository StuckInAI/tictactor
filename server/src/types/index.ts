export interface GameState {
  board: (string | null)[];
  currentPlayer: 'X' | 'O';
  winner: string | null;
  isDraw: boolean;
  mode: 'human' | 'computer';
  gameId?: string;
}
