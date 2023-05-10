export function createQuery(object?: Object) {
  let query = "";
  if (typeof object === "object") {
    query = "?";
    for (const [key, value] of Object.entries(object)) {
      if (value !== null && value !== undefined) {
        query += `${key}_like=${value}`;
        query += "&";
      }
    }
    query = query.slice(0, query.length - 1);
  }
  return query;
}
