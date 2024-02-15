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

  const subPromtsArray = [
    "блондин",
    "черные волосы",
    "Красные глаза",
    "Желтые глаза",
    "Голубые глаза",
    "Зеленые глаза",
  ];

  const subPromts = [];

  const randomPromt = Math.floor(Math.random() * promtsArray.length);

  for (let i = 0; i <= 3; i++) {
    function random() {
      const randomSubPromt = Math.floor(Math.random() * subPromtsArray.length);

      if (!subPromts.includes(subPromtsArray[randomSubPromt])) {
        subPromts.push(subPromtsArray[randomSubPromt]);
      }
    }
    random();
  }

  console.log(subPromts);

  await getModels({ apiKey });

  const uuid = await generate({
    promt: promt + `, ${promtsArray[randomPromt]}` + ` ${subPromts.join(",")}`,
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
    //console.log(base64Sting);
  } catch (err) {
    start();
  }
}

module.exports = { start };
