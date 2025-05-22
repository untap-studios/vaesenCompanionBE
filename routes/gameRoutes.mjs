import { Router } from "express";
import verifyToken from "../middleware/authMiddleware.mjs";
import { getGames, getGameById, createGame } from "../controllers/gameController.mjs";
import { addPlayerToGame } from "../controllers/gameController.mjs";

const router = Router();

router.get("/", verifyToken, getGames);
router.post("/", createGame);
router.get("/:id", getGameById);
router.post("/:id/add-user", addPlayerToGame);

export default router;
