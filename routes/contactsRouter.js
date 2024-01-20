const express = require("express");

const ctrl = require("../controllers/contactsControllers");
const { validateBody } = require("../middlewares/");
const schemas = require("../schemas/contactsSchemas");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.delete("/:contactId", ctrl.remove);

router.put("/:contactId", validateBody(schemas.addSchema), ctrl.update);

module.exports = router;