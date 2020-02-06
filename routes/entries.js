const express = require("express");
const router = express.Router();
const {
  getEntries,
  createEntry,
  getEntry,
  updateEntry,
  deleteEntry
} = require("../controllers/entries");

const { advancedEntries } = require("../middleware/advancedQuery");
const { protect, adminOnly } = require("../middleware/auth");

const commentRouter = require("./comments");
router.use("/:entryId/comment", commentRouter);

router
  .route("/")
  .get(advancedEntries(), getEntries)
  .post(protect, adminOnly(), createEntry);

router
  .route("/:id")
  .get(getEntry)
  .put(protect, adminOnly(), updateEntry)
  .delete(protect, adminOnly(), deleteEntry);

module.exports = router;
