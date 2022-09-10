const { Collection, Product } = require("../models/collectionModel");

const collectionController = {
  addCollection: async (req, res) => {
    try {
      const newCollection = await new Collection(req.body);
      const collection = await newCollection.save();

      res.status(200).json(collection);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllCollection: async (req, res) => {
    try {
      const allCollection = await Collection.find();
      res.status(200).json(allCollection);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getOneCollection: async (req, res) => {
    try {
      const oneCollection = await Collection.findOne({
        slug: req.params.slug,
      }).populate("products");
      res.status(200).json(oneCollection);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateCollection: async (req, res) => {
    try {
      const collection = await Collection.findOne({ slug: req.params.slug });
      await collection.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteCollection: async (req, res) => {
    try {
      await Product.updateMany(
        { collectionId: req.params.id },
        { $pull: { collectionId: req.params.id } }
      );
      await Collection.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = collectionController;
