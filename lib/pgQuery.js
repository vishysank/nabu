module.exports = {
  select: {
    apiList: "SELECT * from api_details",
    apiAuth: "SELECT * from api_auth WHERE id = $1",
    apiDetailsAndAuth: 'SELECT * from api_details a, api_auth b where a.id = b.id AND a.id = $1'
  },
  update: {
    apiDetails: "UPDATE api_details SET api_name = $2, api_desc = $3, api_owner = $4 WHERE id = $1",
    apiAuth: 'UPDATE api_auth SET api_path = $2, api_token = $3 WHERE id = $1'
  },
  insert: {
    apiDetails: 'INSERT into api_details (api_name, api_desc, api_owner, insert_datetime) values ($1, $2, $3, $4) RETURNING id',
    apiAuth: 'INSERT into api_auth (id, api_path, api_token) values ($1, $2, $3)'
  }
};
