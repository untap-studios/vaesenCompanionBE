import { Router } from "express";
import { createPlayerCharacterAndAddToUser } from "../controllers/playerCharacterController.mjs";

const router = Router();

router.post("/", createPlayerCharacterAndAddToUser);

export default router;