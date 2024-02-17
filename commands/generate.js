const FormData = require("form-data");
const axios = require("axios");

async function generate({ promt, style="ANIME", apiKey }) {
  const params = {
    type: "GENERATE",
    numImages: 1,
    censored: false,
    width: 1024,
    height: 1024,
    style: `${style ?? "DEFAULT"}`,
    generateParams: {
      query: `${promt}`,
    },
  };

  const formData = new FormData();
  const modelIdData = { value: 4, options: { contentType: null } };
  const paramsData = {
    value: JSON.stringify(params),
    options: { contentType: "application/json" },
  };
  formData.append("model_id", modelIdData.value, modelIdData.options);
  formData.append("params", paramsData.value, paramsData.options);

  console.log(`Промт: ${params.generateParams.query} Стиль: ${params.style}`);
  try{
    const response = await axios.post(
      `${apiKey.URL}key/api/v1/text2image/run`,
      formData,
      {
        headers: { ...formData.getHeaders(), ...JSON.parse(apiKey.AUTH_HEADERS) },
      },
      "Content-Type: multipart/form-data"
    );
    const data = response.data;
  
    return data.uuid;
  }
  catch(err){
    console.log("Ошибка при отправке видимо",  { ...formData.getHeaders(), ...JSON.parse(apiKey.AUTH_HEADERS) })
    generate( promt, "ANIME", apiKey )
  }

  
}

module.exports = { generate };
