const express = require('express');
const cors = require('cors');
const request = require('request');
const cheerio = require('cheerio');
const rp = require('request-promise');
const axios = require('axios');
const puppeteer = require('puppeteer');

require('dotenv').config();

const app = express();

app.use(express.json());

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const currencies = [
  'AED',
  'AFN',
  'ALL',
  'AMD',
  'AOA',
  'ARS',
  'AUD',
  'AWG',
  'BAM',
  'BDT',
  'BGN',
  'BHD',
  'BIF',
  'BND',
  'BOB',
  'BRL',
  'BTN',
  'BWP',
  'BZD',
  'CAD',
  'CDF',
  'CHF',
  'CLF',
  'CNH',
  'CNY',
  'COP',
  'CRC',
  'CVE',
  'CZK',
  'DJF',
  'DKK',
  'DOP',
  'DZD',
  'EGP',
  'ERN',
  'ETB',
  'EUR',
  'FJD',
  'FKP',
  'GBP',
  'GEL',
  'GHS',
  'GIP',
  'GMD',
  'GNF',
  'GTQ',
  'HKD',
  'HNL',
  'HTG',
  'HUF',
  'IDR',
  'ILS',
  'INR',
  'IQD',
  'IRR',
  'ISK',
  'JMD',
  'JOD',
  'JPY',
  'KES',
  'KGS',
  'KHR',
  'KMF',
  'KPW',
  'KRW',
  'KWD',
  'KZT',
  'LAK',
  'LBP',
  'LKR',
  'LRD',
  'LSL',
  'LYD',
  'MAD',
  'MDL',
  'MGA',
  'MKD',
  'MNT',
  'MOP',
  'MRU',
  'MUR',
  'MVR',
  'MWK',
  'MXN',
  'MYR',
  'MZN',
  'NAD',
  'NGN',
  'NIO',
  'NOK',
  'NPR',
  'NZD',
  'OMR',
  'PEN',
  'PGK',
  'PHP',
  'PKR',
  'PLN',
  'PYG',
  'RON',
];

const urls = currencies.map(
  (currency) => `https://en.tradingview.com/symbols/USD${currency}`
);

const fluctuations = [];

function convertData(dataString) {
  let dataDict = {};
  let dataList = dataString.split('%');

  labeledLoop: for (let item of dataList) {
    if (!item) {
      continue labeledLoop;
    }
    let dataString = item
      .replace('Today', '1D')
      .replace('Week', '1W')
      .replace('1 month', '1M')
      .replace('6 months', '6M')
      .replace('Year to date', 'YD')
      .replace('1 year', '1Y')
      .replace('5 years', '5Y')
      .replace('All time', 'AT')
      .replace('−', '-');

    const key = dataString.substr(0, 2).toString();

    if (dataString.length > 10) {
      return;
    }

    const value = parseFloat(dataString.substr(2)).toFixed(2);
    if (!value) return;
    if (key === '6M' || key === 'YD' || key === '5Y' || key === 'AT') {
      continue;
    }

    dataDict[key] = value;
  }
  return dataDict;
}

const crawlData = async (url, currency) => {
  // await sleep(500);
  let $;
  try {
    const options = {
      uri: url,
      timeout: 5000,
      transform: function (body) {
        return cheerio.load(body);
      },
    };
    // $ = await rp(options);

    // const axiosData = await axios.get(url, { timeout: 1000 });
    // $ = cheerio.load(axiosData.data);

    const browser = await puppeteer.launch({
      headless: true,
      devtools: false,
      // args: [
      //   '--no-sandbox',
      //   '--disable-setuid-sandbox',
      //   '--disable-dev-shm-usage',
      //   // '--single-process',
      //   // ' --no-zygote',
      //   '--aggressive-cache-discard',
      //   '--disable-cache',
      //   '--disable-application-cache',
      //   '--disable-offline-load-stale-cache',
      //   '--disable-gpu-shader-disk-cache',
      //   '--media-cache-size=0',
      //   '--disk-cache-size=0',
      //   '--disable-extensions',
      //   '--disable-component-extensions-with-background-pages',
      //   '--disable-default-apps',
      //   '--mute-audio',
      //   '--no-default-browser-check',
      //   '--autoplay-policy=user-gesture-required',
      //   '--disable-background-timer-throttling',
      //   '--disable-backgrounding-occluded-windows',
      //   '--disable-notifications',
      //   '--disable-background-networking',
      //   '--disable-breakpad',
      //   '--disable-component-update',
      //   '--disable-domain-reliability',
      //   '--disable-sync',
      //   '--disable-dev-profile',
      // ],
      defaultViewport: null,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: ['load'], timeout: 0 });
    //https://github.com/cheeriojs/cheerio

    let content = await page.content();

    $ = cheerio.load(content);

    const blockDiv = $('.content-J55TEsJE');

    const dataDict = convertData(blockDiv.text());

    if (dataDict) {
      console.log(currency);
      console.log(dataDict);
    }

    await page.close();
    await browser.close();
  } catch (error) {
    console.log(error);
  }
};

// crawlData();
Promise.all(
  currencies.map(async (currency) => {
    const url = `https://en.tradingview.com/symbols/USD${currency}`;

    const data = await crawlData(url, currency);
  })
);

const port = 5000;

app.listen(port, () => console.log(`Server is running on PORT ${port}`));
