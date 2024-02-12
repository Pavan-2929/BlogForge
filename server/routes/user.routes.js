import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
  deleteUser,
  getUser,
  updateProfile,
  userData,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/", verifyToken, userData);
router.post("/update", verifyToken, updateProfile);
router.delete("/delete", verifyToken, deleteUser);
router.get("/:id", getUser);

export default router;
