const { start } = require("./commands/start");

const arrayApiKeys = [
  {
    URL: "https://api-key.fusionbrain.ai/",
    AUTH_HEADERS: JSON.stringify({
      "X-Key": `Key A331583131633E853846E3359B9E3103`,
      "X-Secret": `Secret 26F9875AC66E5C90ABD9B7C59A9AD675`,
    }),
  },
  {
    URL: "https://api-key.fusionbrain.ai/",
    AUTH_HEADERS: JSON.stringify({
      "X-Key": `Key DAFE7BCABE8B852AE4EF9D6F73D1920B`,
      "X-Secret": `Secret DDBC0A6D9029B0E112E83D811AD734A5`,
    }),
  },
  {
    URL: "https://api-key.fusionbrain.ai/",
    AUTH_HEADERS: JSON.stringify({
      "X-Key": `Key BC6276EE97ADD67604D41001E279FC21`,
      "X-Secret": `Secret 664DC998E2ACA99E727CCCA0751E3700`,
    }),
  },
  {
    URL: "https://api-key.fusionbrain.ai/",
    AUTH_HEADERS: JSON.stringify({
      "X-Key": `Key 1189B3E57401F09E71C5500A18A18278`,
      "X-Secret": `Secret 440C6EA9A259ABB3CA50A14FE42E363C`,
    }),
  },
  {
    URL: "https://api-key.fusionbrain.ai/",
    AUTH_HEADERS: JSON.stringify({
      "X-Key": `Key 3163B3D2C786E0613184D592F0BB8AF7`,
      "X-Secret": `Secret EF53032136D78BB761C528990EC4EDDD`,
    }),
  },
  {
    URL: "https://api-key.fusionbrain.ai/",
    AUTH_HEADERS: JSON.stringify({
      "X-Key": `Key 32AD01DD90F409FC751C566A878BEE39`,
      "X-Secret": `Secret 778E036996B7FBD22DF9E920FDF0CEF4`,
    }),
  },
  {
    URL: "https://api-key.fusionbrain.ai/",
    AUTH_HEADERS: JSON.stringify({
      "X-Key": `Key FE4D85DDD40067ECD2B31708EC35B1BD`,
      "X-Secret": `Secret 9CDF364E6788708821CC16A7900FC304`,
    }),
  },
  {
    URL: "https://api-key.fusionbrain.ai/",
    AUTH_HEADERS: JSON.stringify({
      "X-Key": `Key 86283AE52A0365FDD052655A919BFB12`,
      "X-Secret": `Secret CB3757970B8EA08A8E6A33FCF05E1555`,
    }),
  },
  {
    URL: "https://api-key.fusionbrain.ai/",
    AUTH_HEADERS: JSON.stringify({
      "X-Key": `Key A727BE6FF5F30CF0BF42D5C0EEA8C59B`,
      "X-Secret": `Secret 7CD03D271E0CA7FB59E10E38D5F5952E`,
    }),
  },
  {
    URL: "https://api-key.fusionbrain.ai/",
    AUTH_HEADERS: JSON.stringify({
      "X-Key": `Key 1ADF0530B1A6E45B0AFEC35AC33595AE`,
      "X-Secret": `Secret 16BB8769EC202538EAFE8B0B23DBE22A`,
    }),
  },
];

arrayApiKeys.map((apiKey) => {
  start({ apiKey });
});
