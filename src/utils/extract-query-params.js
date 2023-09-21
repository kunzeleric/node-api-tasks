export function extractQueryParams(query) {
  return query.substr(1).split('&').reduce((queryParams, param) => {
    // splits each value of query into an array with two positions
    const [key, value] = param.split('=')

    // gets the name of the query parameter and applies the value
    queryParams[key] = value

    return queryParams
  }, {})
}