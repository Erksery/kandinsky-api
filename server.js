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
const apiKey = {
  URL: "https://api-key.fusionbrain.ai/",
  AUTH_HEADERS: 
  JSON.stringify({ 
    "X-Key": `Key A331583131633E853846E3359B9E3103`,
    "X-Secret": `Secret 26F9875AC66E5C90ABD9B7C59A9AD675`
  })
}

const arrayApiKeys = [
  {
    URL: "https://api-key.fusionbrain.ai/",
    AUTH_HEADERS: 
      JSON.stringify({ 
        "X-Key": `Key A331583131633E853846E3359B9E3103`,
        "X-Secret": `Secret 26F9875AC66E5C90ABD9B7C59A9AD675`
      })
  },
  {
    URL: "https://api-key.fusionbrain.ai/",
    AUTH_HEADERS: 
      JSON.stringify({ 
        "X-Key": `Key DAFE7BCABE8B852AE4EF9D6F73D1920B`,
        "X-Secret": `Secret DDBC0A6D9029B0E112E83D811AD734A5`
      })
  }
]


async function getModels() {
  const response = await axios.get(`${apiKey.URL}key/api/v1/models`, {
    headers: JSON.parse(apiKey.AUTH_HEADERS) ,
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

  const formData = new FormData();
  const modelIdData = { value: 4, options: { contentType: null } };
  const paramsData = {
    value: JSON.stringify(params),
    options: { contentType: "application/json" },
  };
  formData.append("model_id", modelIdData.value, modelIdData.options);
  formData.append("params", paramsData.value, paramsData.options);

  const response = await axios.post(
    `${apiKey.URL}key/api/v1/text2image/run`,
    formData,
    { headers: { ...formData.getHeaders(), ...JSON.parse(apiKey.AUTH_HEADERS ) } },
    "Content-Type: multipart/form-data"
  );
  const data = response.data;
  console.log(data, params);

  return data.uuid; 
}

async function checkGeneration(id) {
  let attempts = 100;
  while (attempts > 0) {
    try {
      const response = await axios.get(
        `${apiKey.URL}key/api/v1/text2image/status/${id}`,
        { headers: JSON.parse(apiKey.AUTH_HEADERS)  }
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
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

async function start(promt = "векторная графика", style = "DEFAULT") {
  console.time("status");
  const promtsArray = [
    "человек смотрит в камеру",
    "кот смотрит в камеру",
    "hello kity",
    "каппибара смотрит в камеру",
  ];
  const randomPromt = Math.floor(Math.random() * promtsArray.length);
  console.log(promtsArray[randomPromt]);


  await getModels();

  const uuid = await generate({
    promt: promt + `, ${promtsArray[randomPromt]}`,
    style: style,
  });
  try {
    const images = await checkGeneration(uuid);
    const base64Sting = images[0];

    const base64Data = base64Sting.replace(/^data:image\/\w+;base64,/, "");

    const buffer = Buffer.from(base64Data, "base64");

    fs.writeFile(`generate/${uuid}.jpg`, buffer, "base64", (err) => {
      if (err) console.log(err);
      console.timeEnd("status");
      start();

      console.log(`Генерация изображения (${uuid}) завершенна`);
    });
    //console.log(base64Sting);
  } catch (err) {
    start();
  }
}

start();
