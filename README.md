# Tictactor

A full-stack tic-tac-toe game application.

## Features

- Two game modes: Human vs. Human and Human vs. Computer.
- Real-time game state management.
- Responsive UI built with React and TypeScript.
- RESTful API backend with Node.js and Express.

## Prerequisites

- Docker and Docker Compose installed.

## Getting Started

1. Clone the repository.
2. Navigate to the project directory.
3. Run `docker-compose up --build` to start the application.
4. Open your browser and go to `http://localhost:3000` to play the game.

## Project Structure

- `client/`: Frontend React application.
- `server/`: Backend Express server.
- `docker-compose.yml`: Docker Compose configuration.

## Environment Variables

- Server: `PORT` (default: 5000)

## API Endpoints

- POST /api/game: Start a new game.
- PUT /api/game/move: Make a move.
- GET /api/game/status: Get current game status.

## Development

To run in development mode, refer to the individual README files in client and server directories.

## License

MIT
