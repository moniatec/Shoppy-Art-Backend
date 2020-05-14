const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken, requireAuth } = require("../auth");
const router = express.Router();
const db = require("../db/models");

const { User, Order } = db;

const validateEmailAndPassword = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

router.post(
  "/",
  check("fullName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a fullName"),
  validateEmailAndPassword,
  asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, email, hashedPassword });

    const token = getUserToken(user);
    res.status(201).json({
      user: { id: user.id },
      token,
    });
  })
);

router.post(
  "/token",
  validateEmailAndPassword,
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user || !user.validatePassword(password)) {
      const err = new Error("Login failed");
      err.status = 401;
      err.title = "Login failed";
      err.errors = ["The provided credentials were invalid."];
      return next(err);
    }
    const token = getUserToken(user);
    res.json({ token, user: { id: user.id } });
  })
);

router.get(
  "/:id/orders",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.id, 10);
    const orders = await Orders.findAll({
      where: { userId },
    });
    res.json({ orders });
  })
);

router.get(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId);
    res.json({ user });
  })
);

router.delete(
  "/token",
  requireAuth,
  asyncHandler(async (req, res) => {
    req.player.tokenId = null;
    await req.player.save();
    res.json({ message: "success" });
  })
);

module.exports = router;
