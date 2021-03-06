const Entry = require("../models/Entry");
const Series = require("../models/Series");
const Comment = require("../models/Comment");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const removeFields = ["select", "sort", "page", "limit", "search"];

// format Query from req query data
const formatQuery = queryData => {
  let queryStr = JSON.stringify(queryData);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  return JSON.parse(queryStr);
};

// return properly formatted limit and skip
const formatSelectAndSort = (select, sort) => {
  let result = {};
  if (select) {
    result.select = select.split(",").join(" ");
  }
  if (sort) {
    result.sort = sort.split(",").join(" ");
  } else {
    result.sort = "-dateAdded";
  }
  return result;
};

// create data pertaining to pagination
const createPaginationData = async (page, limit, queryObjToCount, model) => {
  let result = {};
  result.page = parseInt(page, 10) || 1;
  result.limit = parseInt(limit, 10) || 10;
  result.startIndex = (result.page - 1) * result.limit;
  result.endIndex = result.page * result.limit;
  result.total = await model.countDocuments(queryObjToCount);
  return result;
};

// create the pagination object that the API will return
const returnPagination = data => {
  const { page, limit, startIndex, endIndex, total } = data;
  let result = {};
  if (endIndex < total) {
    result.next = {
      page: page + 1,
      limit
    };
  }
  if (startIndex > 0) {
    result.prev = {
      page: page - 1,
      limit
    };
  }
  return result;
};

exports.advancedQuery = model => async (req, res, next) => {
  let query;
  let queryObj;

  // Copy request query and remove certain fields
  const reqQuery = { ...req.query };
  removeFields.forEach(param => delete reqQuery[param]);

  // Construct query
  queryObj = formatQuery(reqQuery);
  if (req.query.search) {
    queryObj.games = { $regex: req.query.search, $options: "i" };
  }
  query = model.find(queryObj);

  // Add select and sort to query where applicable
  const selectAndSort = formatSelectAndSort(req.query.select, req.query.sort);
  if (selectAndSort.select) {
    query = query.select(selectAndSort.select);
  }
  query = query.sort(selectAndSort.sort);

  // Pagination
  const pageData = await createPaginationData(
    req.query.page,
    req.query.limit,
    queryObj,
    model
  );
  query = query.skip(pageData.startIndex).limit(pageData.limit);

  // Execute query
  const results = await query;

  // Pagination result
  const pagination = returnPagination(pageData);

  res.advancedData = {
    success: true,
    count: results.length,
    pagination,
    data: results
  };
  next();
};

// Returns entries with series name and comment count
exports.advancedEntries = () => async (req, res, next) => {
  let query;
  let queryObj;

  // Copy request query and remove certain fields
  const reqQuery = { ...req.query };
  removeFields.forEach(param => delete reqQuery[param]);

  // Construct query
  queryObj = formatQuery(reqQuery);
  if (req.query.search) {
    queryObj.games = { $regex: req.query.search, $options: "i" };
  }
  query = Entry.find(queryObj);

  // Add select and sort, do not include blog data in multi-entry search
  const selectAndSort = formatSelectAndSort(req.query.select, req.query.sort);
  query = query.select(
    `-blog${!!selectAndSort.select ? " " + selectAndSort.select : ""}`
  );
  query = query.sort(selectAndSort.sort);

  // Pagination
  const pageData = await createPaginationData(
    req.query.page,
    req.query.limit,
    queryObj,
    Entry
  );
  query = query
    .skip(pageData.startIndex)
    .limit(pageData.limit)
    .populate([
      {
        path: "series",
        select: "seriesName"
      },
      {
        path: "comments",
        match: { isApproved: true },
        select: "user"
      }
    ]);

  // Execute query
  const results = await query;
  const formattedResults = results.map(entry => {
    let formatted = { ...entry._doc };
    delete formatted.comments;
    delete formatted.series;
    formatted.comments = entry.comments.length;
    formatted.series = {
      series: entry.series.seriesName,
      seriesId: entry.series._id
    };
    return formatted;
  });

  // Pagination result
  const pagination = returnPagination(pageData);

  res.advancedData = {
    success: true,
    count: results.length,
    pagination,
    data: formattedResults
  };
  next();
};

// Returns one series and queries entries within series
exports.advancedSeries = () => async (req, res, next) => {
  // Copy request query and remove certain fields
  const reqQuery = { ...req.query };
  removeFields.forEach(param => delete reqQuery[param]);

  // Construct query for match property
  let queryObj;
  queryObj = formatQuery(reqQuery);

  // Start constructing populate params
  let populateParams = {
    path: "entries",
    match: queryObj
  };

  // add select if applicable
  const selectAndSort = formatSelectAndSort(req.query.select, req.query.sort);
  if (selectAndSort.select) {
    populateParams.select = selectAndSort.select;
  }

  // get pagination data
  const pageData = await createPaginationData(
    req.query.page,
    req.query.limit,
    queryObj,
    Entry
  );

  // create populate options object and complete populate query
  const populateOptions = {
    sort: selectAndSort.sort,
    limit: pageData.limit,
    skip: pageData.startIndex
  };
  populateParams.options = populateOptions;

  // execute query
  const series = await Series.findOne({ slug: req.params.slug }).populate(
    populateParams
  );

  // Pagination result
  const pagination = returnPagination(pageData);

  res.advancedSeries = {
    success: true,
    count: series.entries.length,
    pagination,
    data: series
  };
  next();
};

// Returns comments with pertaining entry title and user name
exports.advancedComments = () => async (req, res, next) => {
  let query;
  let queryObj;

  // Copy request query and remove certain fields
  const reqQuery = { ...req.query };
  removeFields.forEach(param => delete reqQuery[param]);

  // Construct Query
  queryObj = formatQuery(reqQuery);
  query = Comment.find(queryObj);

  // Add select and sort, do not include blog data in multi-entry search
  const selectAndSort = formatSelectAndSort(req.query.select, req.query.sort);
  if (selectAndSort.select) {
    query = query.select(selectAndSort.select);
  }
  query = query.sort(selectAndSort.sort);

  // Populate comments with data from other models
  query.populate([
    {
      path: "user",
      select: "name"
    },
    {
      path: "entry",
      select: "title"
    }
  ]);

  // Pagination
  const pageData = await createPaginationData(
    req.query.page,
    req.query.limit,
    queryObj,
    Comment
  );
  query = query.skip(pageData.startIndex).limit(pageData.limit);

  // Execute query
  const results = await query;

  // Pagination result
  const pagination = returnPagination(pageData);

  res.advancedData = {
    success: true,
    count: results.length,
    pagination,
    data: results
  };
  next();
};
