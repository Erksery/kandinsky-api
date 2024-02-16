const axios = require("axios");
const { generate } = require("./generate");

async function checkGeneration({ uuid, apiKey }) {
  let attempts = 100;

  while (attempts > 0) {
    try {
      const response = await axios.get(
        `${apiKey.URL}key/api/v1/text2image/status/${uuid}`,
        { headers: JSON.parse(apiKey.AUTH_HEADERS) }
      );
      const data = response.data;

      if (data.status === "DONE") {
        return data.images;
      }
    } catch (err) {
      console.log("Ошибка при генерации изображения");
      // setTimeout(() => {
      //   checkGeneration({ uuid, apiKey });
      // }, 5000);
    }

    attempts--;
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }
}

module.exports = { checkGeneration };
