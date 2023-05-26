const express = require('express');
const cors = require('cors');
const request = require('request');
const cheerio = require('cheerio');
const rp = require('request-promise');
const axios = require('axios');
const Excel = require('exceljs');
const path = require('path');

require('dotenv').config();

const workbook = new Excel.Workbook();
const worksheet = workbook.addWorksheet('data');

const dataColumns = [{ key: 'content', header: 'Content' }];

worksheet.columns = dataColumns;

const app = express();

app.use(express.json());

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const convertData = (rawData) => {
  const convertedData = {
    '1D': rawData[0].toFixed(2),
    '1W': rawData[1].toFixed(2),
    '1M': rawData[2].toFixed(2),
    '1Y': rawData[3].toFixed(2),
  };
  return convertedData;
};

const crawlData = async () => {
  const url = `https://shopee.vn/api/v2/item/get_ratings?exclude_filter=0&filter=0&filter_size=0&flag=1&fold_filter=0&itemid=3015403040&limit=30&offset=0&relevant_reviews=false&request_source=1&shopid=40342563&tag_filter=&type=0&variation_filters=`;

  const data = await axios.get(url);

  data.data.data.ratings.map(async (rating) => {
    if (rating.comment.split('\n')[4]) {
      worksheet.addRow({ content: rating.comment.split('\n')[4] });
    } else if (rating.comment.split('\n')[3]) {
      worksheet.addRow({ content: rating.comment.split('\n')[3] });
    } else if (rating.comment.split('\n')[2]) {
      worksheet.addRow({ content: rating.comment.split('\n')[2] });
    } else if (rating.comment.split('\n')[1]) {
      worksheet.addRow({ content: rating.comment.split('\n')[1] });
    } else if (rating.comment.split('\n')[0]) {
      worksheet.addRow({ content: rating.comment.split('\n')[0] });
    }
  });
};

const writeToExcel = async () => {
  await crawlData();
  const exportPath = path.resolve(__dirname, 'countries.xlsx');

  await workbook.xlsx.writeFile(exportPath);
};

const port = 5001;

writeToExcel();

app.listen(port, () => console.log(`Server is running on PORT ${port}`));
