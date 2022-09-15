const productController = require("../controllers/productController");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

const router = require("express").Router();

router.get("/", productController.getAllProduct);

router.get("/:slug", productController.getOneProduct);

router.post("/", verifyTokenAndAdmin, productController.addProduct);

router.put("/:slug", verifyTokenAndAdmin, productController.updateProduct);

router.delete("/:id", verifyTokenAndAdmin, productController.deleteProduct);

module.exports = router;
