const express = require("express");
const { check } = require("express-validator");
const { handleValidationErrors, asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");
const router = express.Router();
const db = require("../db/models");

const { Product, Order } = db;

router.use(requireAuth);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.findAll({
      include: [{ model: Order, as: "order", attributes: ["id"] }],
      order: [["createdAt", "DESC"]],
      attributes: ["productName", "id", "description", "photoUrl", "price"],
    });
    res.json({ products });
  })
);

const productNotFoundError = (id) => {
  const err = Error("Product not found");
  err.errors = [`Produc with id of ${id} could not be found.`];
  err.title = "Product not found.";
  err.status = 404;
  return err;
};

const validateProduct = [
  check("productName")
    .exists({ checkFalsy: true })
    .withMessage("Product can't be empty."),
  //  message cannot be longer than 280 characters:
  check("productName")
    .isLength({ max: 280 })
    .withMessage("product name can't be longer than 280 characters."),
  handleValidationErrors,
];

router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (product) {
      res.json({ product });
    } else {
      next(productNotFoundError(req.params.id));
    }
  })
);

router.get(
  "/search/:name",
  asyncHandler(async (req, res, next) => {
    const product = await Product.findOne({
      where: {
        productName: req.params.name,
      },
    });
    if (product) {
      res.json({ product });
    } else {
      next(productNotFoundError(req.params.name));
    }
  })
);

router.put(
  "/:id",
  validateProduct,
  asyncHandler(async (req, res, next) => {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (req.user.id !== product.userId) {
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You are not authorized to edit this product.";
      err.title = "Unauthorized";
      throw err;
    }
    if (product) {
      await product.update({ orderId: req.body.orderId });
      res.json({ product });
    } else {
      next(productNotFoundError(req.params.id));
    }
  })
);

module.exports = router;
