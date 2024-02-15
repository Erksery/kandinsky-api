const axios = require("axios");

async function getModels({ apiKey }) {
  const response = await axios.get(`${apiKey.URL}key/api/v1/models`, {
    headers: JSON.parse(apiKey.AUTH_HEADERS),
  });

  return response.data[0].id;
}

module.exports = { getModels };
