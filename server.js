const FormData = require("form-data");
const axios = require("axios");
const fs = require("fs");

function TextImageApi() {
  const URL = "https://api-key.fusionbrain.ai/";
  const AUTH_HEADERS = {
    "X-Key": `Key A331583131633E853846E3359B9E3103`,
    "X-Secret": `Secret 26F9875AC66E5C90ABD9B7C59A9AD675`,
  };

  return { URL, AUTH_HEADERS };
}

async function getModels() {
  const response = await axios.get(`${TextImageApi().URL}key/api/v1/models`, {
    headers: TextImageApi().AUTH_HEADERS,
  });

  return response.data[0].id;
}

async function generate({ promt, style }) {
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

  console.log(params);
  const formData = new FormData();
  const modelIdData = { value: 4, options: { contentType: null } };
  const paramsData = {
    value: JSON.stringify(params),
    options: { contentType: "application/json" },
  };
  formData.append("model_id", modelIdData.value, modelIdData.options);
  formData.append("params", paramsData.value, paramsData.options);

  const response = await axios.post(
    `${TextImageApi().URL}key/api/v1/text2image/run`,
    formData,
    { headers: { ...formData.getHeaders(), ...TextImageApi().AUTH_HEADERS } },
    "Content-Type: multipart/form-data"
  );
  const data = response.data;

  return data.uuid;
}

async function checkGeneration(id) {
  let attempts = 10;
  while (attempts > 0) {
    try {
      const response = await axios.get(
        `${TextImageApi().URL}key/api/v1/text2image/status/${id}`,
        { headers: TextImageApi().AUTH_HEADERS }
      );
      const data = response.data;

      if (data.status === "DONE") {
        return data.images;
      }
    } catch (err) {
      console.log("Ошибка при генерации изображения, пробуем снова");
      setTimeout(() => {
        checkGeneration(id);
      }, 5000);
    }
    attempts--;
    await new Promise((resolve) => setTimeout(resolve, 10 * 1000));
  }
}

async function start() {
  TextImageApi();
  await getModels();
  const uuid = await generate({
    promt: "Пиклельная графика, пикселярт, дом, пиксельный дом",
    style: "",
  });
  const images = await checkGeneration(uuid);
  const base64Sting = images[0];

  const base64Data = base64Sting.replace(/^data:image\/\w+;base64,/, "");

  const buffer = Buffer.from(base64Data, "base64");

  fs.writeFile(`generate/${uuid}.jpg`, buffer, "base64", (err) => {
    if (err) console.log(err);

    console.log(`Генерация изображения (${uuid}) завершенна`);
  });
  //console.log(base64Sting);
}

start();
