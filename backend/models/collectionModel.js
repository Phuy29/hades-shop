const mongoose = require("mongoose");

const collectionModel = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
  },
  { timestamps: true }
);

const productModel = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    price: {
      type: String,
    },
    colors: [
      {
        name: {
          type: String,
        },
        color: {
          type: String,
        },
      },
    ],
    size: {
      type: [String],
    },
    imgUrl: {
      type: String,
    },
    imgUrlHover: {
      type: String,
    },
    collectionId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "collection",
    },
  },
  { timestamps: true }
);

const Collection = mongoose.model("collection", collectionModel);
const Product = mongoose.model("product", productModel);

module.exports = { Collection, Product };
