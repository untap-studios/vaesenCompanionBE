import { Router } from "express";
import { createUser, getUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.mjs";
import verifyToken from "../middleware/authMiddleware.mjs";

const router = Router();

router.post("/", createUser);
router.get("/", verifyToken, getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;