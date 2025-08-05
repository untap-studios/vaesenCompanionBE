import { Router } from "express";
import { createPlayerCharacterAndAddToUser, getPlayerCharacter } from "../controllers/playerCharacterController.mjs";
import verifyToken from "../middleware/authMiddleware.mjs";

const router = Router();

router.post("/", verifyToken, createPlayerCharacterAndAddToUser);
router.get("/:id", verifyToken, getPlayerCharacter);

export default router;