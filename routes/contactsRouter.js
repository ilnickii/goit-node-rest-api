const express = require("express");

const ctrl = require("../controllers/contactsControllers");
const { validateBody, isValidId } = require("../middlewares/");
const { schemas } = require("../services/contactsServices");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId ,ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.remove);

router.put("/:contactId", isValidId, validateBody(schemas.updateFavoriteSchema, "missing field favorite"), ctrl.updateStatusContact);

module.exports = router;