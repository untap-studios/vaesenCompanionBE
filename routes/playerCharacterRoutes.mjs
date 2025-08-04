import { Router } from "express";
import { createPlayerCharacterAndAddToUser, getPlayerCharacter } from "../controllers/playerCharacterController.mjs";

const router = Router();

router.post("/", createPlayerCharacterAndAddToUser);
router.get("/:id", getPlayerCharacter);

export default router;