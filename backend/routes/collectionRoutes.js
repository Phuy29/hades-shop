const collectionController = require("../controllers/collectionController");

const router = require("express").Router();

router.get("/", collectionController.getAllCollection);

router.get("/:id", collectionController.getOneCollection);

router.post("/", collectionController.addCollection);

router.put("/:id", collectionController.updateCollection);

router.delete("/:id", collectionController.deleteCollection);

module.exports = router;
