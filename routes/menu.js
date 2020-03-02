const express = require("express");
const router = express.Router();
const {
  getMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require("../controllers/menu");

const { protect, adminOnly } = require("../middleware/auth");

router
  .route("/")
  .get(getMenu)
  .post(protect, adminOnly(), createMenuItem);

router
  .route("/:id")
  .put(protect, adminOnly(), updateMenuItem)
  .delete(protect, adminOnly(), deleteMenuItem);

module.exports = router;
