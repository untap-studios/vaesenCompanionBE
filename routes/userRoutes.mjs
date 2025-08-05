import { Router } from "express";
import { createUser, getUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.mjs";
import verifyToken from "../middleware/authMiddleware.mjs";

const router = Router();

router.post("/", verifyToken, createUser);
router.get("/", verifyToken, getUsers);
router.get("/:id", verifyToken, getUserById);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;