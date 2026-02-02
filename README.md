# Tictactor

A simple, interactive tic-tac-toe game built with Next.js.

## Features

- Play against another human or computer with adjustable difficulty (easy, medium, hard).
- Real-time win detection and draw detection.
- Score tracking with persistent storage using localStorage.
- Responsive design for mobile and desktop.

## Getting Started

### Prerequisites

- Node.js and npm installed.

### Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.

### Deployment with Docker

1. Build the Docker image: `docker build -t tictactor .`
2. Run the container: `docker run -p 3000:80 tictactor`

Or use docker-compose: `docker-compose up`

## Game Modes

- **Human vs Human**: Two players take turns on the same device.
- **Human vs Computer**: Play against the computer with selectable difficulty.

## Scoring

Scores are saved in the browser's local storage and persist across sessions.

## License

This project is open source and available under the MIT License.