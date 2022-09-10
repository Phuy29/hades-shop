const mongoose = require("mongoose");
var slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const collectionModel = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    slug: { type: String, slug: "name" },
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
    slug: { type: String, slug: "name" },
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "collection",
    },
  },
  { timestamps: true }
);

const Collection = mongoose.model("collection", collectionModel);
const Product = mongoose.model("product", productModel);

module.exports = { Collection, Product };
