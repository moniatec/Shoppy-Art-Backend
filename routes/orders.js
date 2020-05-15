const express = require("express");
const { check } = require("express-validator");
const { handleValidationErrors, asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");
const router = express.Router();
const db = require("../db/models");

const { Order, User } = db;

router.use(requireAuth);

const orderNotFoundError = (id) => {
  const err = Error("Order not found");
  err.errors = [`Order with id of ${id} could not be found.`];
  err.title = "Order not found.";
  err.status = 404;
  return err;
};

router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const order = await Order.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (order) {
      res.json({ order });
    } else {
      next(orderNotFoundError(req.params.id));
    }
  })
);
//create new order
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const parsedId = await parseInt(userId, 10);
    const order = await Order.create({ userId: parsedId });
    res.json({ order });
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const order = await order.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (req.user.id !== order.userId) {
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You are not authorized to edit this order.";
      err.title = "Unauthorized";
      throw err;
    }
    if (order) {
      await order.update({ message: req.body.message });
      res.json({ order });
    } else {
      next(orderNotFoundError(req.params.id));
    }
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const order = await Order.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (req.user.id !== order.userId) {
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You are not authorized to delete this order.";
      err.title = "Unauthorized";
      throw err;
    }
    if (order) {
      await order.destroy();
      res.json({ message: `Deleted order with id of ${req.params.id}.` });
    } else {
      next(orderNotFoundError(req.params.id));
    }
  })
);

module.exports = router;
