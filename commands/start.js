const { checkGeneration } = require("./checkGeneration");
const { generate } = require("./generate");
const { getModels } = require("./getModel");
const fs = require("fs");

async function start({
  promt = "векторная графика",
  style = "DEFAULT",
  apiKey,
}) {
  console.time(apiKey);
  const promtsArray = [
    "человек смотрит в камеру",
    "кот смотрит в камеру",
    "hello kity",
    "каппибара смотрит в камеру",
  ];

  const subPromtsArray = ["Махает рукой"];

  const backgroundPromt = [
    "фон красного цвета",
    "фон голубого цвета",
    "город на фоне",
    "лес на фоне",
    "фон розового цвета",
  ];

  const subPromts = [];

  const randomPromt = Math.floor(Math.random() * promtsArray.length);

  const randomBackgroundPromt = Math.floor(
    Math.random() * backgroundPromt.length
  );

  for (let i = 0; i <= 3; i++) {
    function random() {
      const randomSubPromt = Math.floor(Math.random() * subPromtsArray.length);

      if (!subPromts.includes(subPromtsArray[randomSubPromt])) {
        subPromts.push(subPromtsArray[randomSubPromt]);
      }
    }
    random();
  }

  await getModels({ apiKey });

  const uuid = await generate({
    promt:
      promt +
      `, ${promtsArray[randomPromt]}, ${
        backgroundPromt[randomBackgroundPromt]
      }, ${subPromts.join(",")}, `,
    style: style,
    apiKey,
  });
  try {
    const images = await checkGeneration({ uuid, apiKey });
    const base64Sting = images[0];

    const base64Data = base64Sting.replace(/^data:image\/\w+;base64,/, "");

    const buffer = Buffer.from(base64Data, "base64");

    fs.writeFile(`generate/${uuid}.jpg`, buffer, "base64", (err) => {
      if (err) console.log(err);
      console.timeEnd(apiKey);
      start({ apiKey });

      console.log(`Генерация изображения (${uuid}) завершенна`);
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { start };
