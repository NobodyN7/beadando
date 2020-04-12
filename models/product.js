const mongoose = require("mongoose");
const config = require("../config/database");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  chapters: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
});

const Product = (module.exports = mongoose.model(
  "Product",
  ProductSchema,
  "products"
));

module.exports.deleteProduct = function (name, callback) {
  const query = { name: name };
  Product.remove(query, callback);
};

module.exports.modifyProduct = function (oldname, product, callback) {
  const query = { name: oldname };
  const modified = {
    name: product.name,
    chapters: product.chapters,
    genre: product.genre,
  };
  console.log(modified);
  Product.findOneAndUpdate(query, modified, callback);
};

module.exports.getAllProducts = function (callback) {
  Product.find(callback);
};

module.exports.getProductbyId = function (id, callback) {
  Product.findById(id, callback);
};

module.exports.getProductbyName = function (name, callback) {
  const query = { name: name };
  Product.findOne(query, callback);
};

module.exports.addProduct = function (newProduct, callback) {
  newProduct.save(callback);
};
