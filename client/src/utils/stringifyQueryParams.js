// Takes in a list of query parameters
// Returns the parameters in a url-friendly string
// params = an object consiting of query params and their values
// base = the character to append to the beginning of the string (usually a ?)
const stringifyQueryParams = (params, base) => {
  const paramKeys = Object.keys(params);
  const paramsStrArr = paramKeys.map(key => {
    return `${key}=${params[key]}`;
  });
  return `${base}${paramsStrArr.join("&")}`;
};

export default stringifyQueryParams;
