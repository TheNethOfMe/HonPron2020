const Entry = require("../models/Entry");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const path = require("path");
const getFormattedGameList = require("../utils/getFormattedGameList");
const uploadImg = require("../utils/uploadImg");

// @desc    Get all Entries
// @route   GET /api/v1/entries
// @access  Public
exports.getEntries = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedData);
});

// @desc    Create an Entry
// @route   POST /api/v1/entries
// @access  Private/Admin
exports.createEntry = asyncHandler(async (req, res, next) => {
  let entryData = req.body;
  entryData.games = entryData.games.split(", ");
  if (req.files && req.files.file) {
    entryData = uploadImg(
      req.files.file,
      entryData,
      "entry-img",
      "title",
      next
    );
  } else {
    entryData = {
      ...entryData,
      image: "default.jpg",
      imageAlt: "Default Image"
    };
  }
  const entry = await Entry.create(entryData);
  res.status(201).json({ success: true, data: entry });
});

// @desc    Get one Entry
// @route   GET /api/v1/entries/:id
// @access  Public
exports.getEntry = asyncHandler(async (req, res, next) => {
  let entry = await Entry.findById(req.params.id).populate([
    {
      path: "comments",
      match: { isApproved: true },
      populate: {
        path: "user",
        select: "name"
      }
    },
    {
      path: "gameList",
      select: "list"
    },
    {
      path: "series",
      select: "seriesName"
    }
  ]);
  if (!entry) {
    return next(
      new ErrorResponse(`Entry not found with id of ${req.params.id}`, 404)
    );
  }
  let result = {
    ...entry._doc
  };

  if (entry.gameList) {
    delete result.gameList;
    const formattedList = getFormattedGameList(
      entry.gameList.list,
      entry.episode
    );
    result.formattedList = formattedList;
    result.gameListId = entry.gameList._id;
  }
  if (entry.comments) {
    delete result.comments;
    const commentList = entry.comments.map(comment => {
      return {
        id: comment._id,
        user: comment.user.name,
        text: comment.text,
        dateAdded: comment.dateAdded
      };
    });
    result.comments = commentList;
  }
  res.status(200).json({ success: true, data: result });
});

// @desc    Update one Entry
// @route   PUT /api/v1/entries/:id
// @access  Private/Admin
exports.updateEntry = asyncHandler(async (req, res, next) => {
  let entryData = req.body;
  entryData.games = entryData.games.split(", ");
  if (req.files && req.files.file) {
    entryData = uploadImg(
      req.files.file,
      entryData,
      "entry-img",
      "title",
      next
    );
  }
  const entry = await Entry.findByIdAndUpdate(req.params.id, entryData, {
    new: true,
    runValidators: true
  });
  if (!entry) {
    return next(
      new ErrorResponse(`Entry not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: entry });
});

// @desc    Delete one Entry
// @route   DELETE /api/v1/entries/:id
// @access  Private/Admin
exports.deleteEntry = asyncHandler(async (req, res, next) => {
  const entry = await Entry.findById(req.params.id);
  if (!entry) {
    return next(
      new ErrorResponse(`Entry not found with id of ${req.params.id}`, 404)
    );
  }
  entry.remove();
  res.status(200).json({ success: true, data: {} });
});

// @desc    Get one Entry without extra data for editing purposes
// @route   GET /api/v1/entries/forEdit/:id
// @access  Private/Admin
exports.getEntryForEdit = asyncHandler(async (req, res, next) => {
  let entry = await Entry.findById(req.params.id).populate([
    {
      path: "series",
      select: "seriesName"
    }
  ]);
  if (!entry) {
    return next(
      new ErrorResponse(`Entry not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: entry });
});
