const { Product, Collection } = require("../models/collectionModel");

const productController = {
  addProduct: async (req, res) => {
    try {
      const newProduct = await new Product(req.body);
      const product = await newProduct.save();

      if (req.body.collectionId) {
        const collection = Collection.findById(req.body.collectionId);
        await collection.updateOne({ $push: { products: product._id } });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllProduct: async (req, res) => {
    try {
      const allProduct = await Product.find().populate("collectionId");
      res.status(200).json(allProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllProductTrash: async (req, res) => {
    try {
      const allProductTrash = await Product.findDeleted().populate(
        "collectionId"
      );
      res.status(200).json(allProductTrash);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getOneProduct: async (req, res) => {
    try {
      const oneProduct = await Product.findOne({ slug: req.params.slug });
      res.status(200).json(oneProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateProduct: async (req, res) => {
    try {
      const product = await Product.findOne({ slug: req.params.slug });
      await product.updateOne({ $set: req.body });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      await Product.delete({ slug: req.params.slug });
      res.status(200).json("Deleted successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  restoreProduct: async (req, res) => {
    try {
      await Product.restore({ slug: req.params.slug });
      res.status(200).json("Restore successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteProductForce: async (req, res) => {
    try {
      await Collection.updateMany(
        { product: req.params.id },
        { $pull: { products: req.params.id } }
      );
      await Product.deleteOne({ _id: req.params.id });
      res.status(200).json("Delete force successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteCheckedProduct: async (req, res) => {
    try {
      await Product.delete({ _id: { $in: req.body } });
      res.status(200).json(req.body);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = productController;
