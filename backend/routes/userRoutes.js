const userController = require("../controllers/userController");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

const router = require("express").Router();

router.get("/", userController.getAllUser);

router.delete("/:id", verifyTokenAndAdmin, userController.deleteUser);

router.put("/:id", verifyTokenAndAdmin, userController.updateUser);

module.exports = router;
