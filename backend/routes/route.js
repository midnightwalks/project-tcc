import express from "express";
import {
  createKonser,
  getKonser,
  updateKonser,
  deleteKonser,
} from "../controller/DaftarKonserController.js";
import {
  createMerchandise,
  getMerchandise,
  updateMerchandise,
  deleteMerchandise,
} from "../controller/MerchandiseController.js";
import {
  Register,
  Login,
  refreshToken,
  logout,
} from "../controller/UsersController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// User Routes
router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", logout);

// DaftarKonser Routes
router.get("/daftarkonser", getKonser);
router.get("/daftarkonser/:id", getKonser);
router.post("/daftarkonser", verifyToken, createKonser);
router.put("/daftarkonser/:id", verifyToken, updateKonser);
router.delete("/daftarkonser/:id", verifyToken, deleteKonser);

// Merchandise Routes
router.get("/merchandise", getMerchandise);
router.get("/merchandise/:id", getMerchandise);
router.post("/merchandise", verifyToken, createMerchandise);
router.put("/merchandise/:id", verifyToken, updateMerchandise);
router.delete("/merchandise/:id", verifyToken, deleteMerchandise);

router.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default router;
