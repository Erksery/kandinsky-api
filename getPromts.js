const axios = require("axios");

const getPromts = async () => {
  try {
    const getPromts = await axios.get(
      "https://playground.com/api/images/risingFeed?category=&purePrompt=false&model=&is_top=false"
    );

    const arrayImages = getPromts.data.risingImages;

    const randomIndexImage = Math.floor(Math.random() * arrayImages.length);

    const randomImage = arrayImages[randomIndexImage];

    const imagePromt = arrayImages.filter(
      (image) => image.id === randomImage.id
    );
    //console.log(imagePromt[0].prompt);
    return imagePromt[0].prompt;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getPromts };
