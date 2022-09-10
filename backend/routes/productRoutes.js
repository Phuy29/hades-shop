const productController = require("../controllers/productController");

const router = require("express").Router();

router.get("/", productController.getAllProduct);

router.get("/:slug", productController.getOneProduct);

router.post("/", productController.addProduct);

router.put("/:slug", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
