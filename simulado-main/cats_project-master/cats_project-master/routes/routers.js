const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const helper = require("../helpers/auth")

router.get("/login", authController.login);
router.post("/login", authController.loginPost);
router.get("/cadastro", authController.cadastro);
router.post("/cadastro", authController.cadastroPost);
router.get("/logout", authController.logout)

module.exports = router;
