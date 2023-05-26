const express = require('express');
const cors = require('cors');
const request = require('request');
const cheerio = require('cheerio');
const rp = require('request-promise');
const axios = require('axios');

require('dotenv').config();

const app = express();

app.use(express.json());

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const crawlData = async (url) => {
  await sleep(500);
  let $;
  try {
    const axiosData = await axios.get(url);
    console.log(axiosData.data);
    $ = cheerio.load(axiosData.data);

    const blockDiv = $('.Rk6V+3');
    console.log(blockDiv.text());
  } catch (error) {
    console.log(error);
  }
};

const crawlDataAxios = async () => {
  const url =
    'https://shopee.vn/B%E1%BB%99-Qu%E1%BA%A7n-%C3%81o-M%E1%BA%B7c-Nh%C3%A0-Th%E1%BB%83-Thao-Nam-M%C3%B9a-H%C3%A8-Phong-C%C3%A1ch-Cao-C%E1%BA%A5p-ZERO-i.40342563.3015403040?sp_atk=b5013924-a2a9-4e1a-b299-69ac9675c591&xptdk=b5013924-a2a9-4e1a-b299-69ac9675c591';
  const data = await crawlData(url);
};

crawlDataAxios();

const port = 5001;

app.listen(port, () => console.log(`Server is running on PORT ${port}`));
