const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database");
const Product = require("../models/Product");

//Register
router.post("/addProduct", (req, res, next) => {
  let found = false;
  let newProduct = new Product({
    name: req.body.name,
    chapters: req.body.chapters,
    genre: req.body.genre,
  });

  Product.getProductbyName(newProduct.name, (err, product) => {
    if (err) throw err;
    if (product) {
      found = true;
      return res.json({
        success: false,
        msg: "This product is already in the database",
      });
    } else {
      Product.addProduct(newProduct, (err, user) => {
        if (err) {
          res.json({
            success: false,
            msg: "Failed to add the specified product.",
          });
        } else {
          res.json({ success: true, msg: "Product added to database" });
        }
      });
    }
  });
});

router.get("/Products", (req, res) => {
  let products = Product.getAllProducts((err, doc) => {
    res.json(doc);
  });
});

router.post("/getProduct", (req, res) => {
  let modifiedProduct = new Product({
    name: req.body.name,
    chapters: req.body.chapters,
    genre: req.body.genre,
  });

  let product = Product.getProductbyName(modifiedProduct.name, (err, doc) => {
    res.json(doc);
  });
});

router.post("/modifyProduct", (req, res) => {
  let modifiedProduct = new Product({
    name: req.body.name,
    chapters: req.body.chapters,
    genre: req.body.genre,
  });
  const oldname = req.body.oldname;

  Product.modifyProduct(oldname, modifiedProduct, (err, doc) => {
    if (err) {
      res.json({
        success: false,
        msg: "Failed to modify the specified product.",
      });
    } else {
      res.json({ success: true, msg: "Product has been modified" });
    }
  });
});

router.post("/deleteProduct", (req, res) => {
  let deletedProduct = new Product({
    name: req.body.name,
    chapters: req.body.chapters,
    genre: req.body.genre,
  });
  Product.deleteProduct(deletedProduct.name, (err, doc) => {
    if (err) {
      res.json({
        success: false,
        msg: "Failed to delete the specified product.",
      });
    } else {
      res.json({ success: true, msg: "Product deleted from database" });
    }
  });
});

module.exports = router;
