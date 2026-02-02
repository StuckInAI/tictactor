import { Router } from 'express';
import { startGame, makeMove, getGameStatus } from '../controllers/gameController';

const router = Router();

router.post('/game', startGame);
router.put('/game/move', makeMove);
router.get('/game/status', getGameStatus);

export default router;
