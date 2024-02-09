const express = require("express");

const ctrl = require("../controllers/contactsControllers");
const { validateBody, isValidId, authenticate } = require("../middlewares/index.js");
const { schemas } = require("../services/contactsServices");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add);

router.delete("/:contactId", authenticate, isValidId, ctrl.remove);

router.put("/:contactId", authenticate, isValidId, validateBody(schemas.updateFavoriteSchema, "missing field favorite"), ctrl.updateStatusContact);

module.exports = router;