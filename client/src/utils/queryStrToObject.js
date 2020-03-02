// Takes in a query string
// Returns the query as an object with properties correspoding to each query param
// str = the string to be parsed
// queryObj = the object to append to query params to
const queryStrToObject = (str, queryObj) => {
  let result = queryObj;
  const strWithoutQuestionMark = str.substr(1);
  const paramsArr = strWithoutQuestionMark.split("&");
  paramsArr.forEach(param => {
    const paramKeyVal = param.split("=");
    result[paramKeyVal[0]] = paramKeyVal[1];
  });
  return result;
};

export default queryStrToObject;
