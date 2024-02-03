const express = require("express");

const ctrl = require("../controllers/auth")

const { validateBody, authenticate } = require("../middlewares");

const { schemas } = require("../services/user");

const router = express.Router();

router.post("/users/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/users/login", validateBody(schemas.registerSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;