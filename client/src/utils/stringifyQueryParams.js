const stringifyQueryParams = (params, base) => {
  const paramKeys = Object.keys(params);
  const paramsStrArr = paramKeys.map(key => {
    return `${key}=${params[key]}`;
  });
  return `${base}${paramsStrArr.join("&")}`;
};

export default stringifyQueryParams;
