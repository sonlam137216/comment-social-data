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

const dataColumns = [ { key: 'stt', header: 'STT' }, { key: 'content', header: 'Content' }];

worksheet.columns = dataColumns;

const app = express();

app.use(express.json());

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const itemInfo = [
  {
    itemId: '3015403040',
    limit: 30,
    offset: 0,
    shopId: '40342563',
    type: 0
  },
  {
    itemId: '11289182012',
    limit: 30,
    offset: 0,
    shopId: '448978223',
    type: 1
  }
]

const formatComment = (comment) => {
  return comment.replace(/\s+/g, ' ').trim()
}


const crawlData = async () => {
  const ratings = []

  await Promise.all(itemInfo.map(async (item, index) => {
    const url = `
    https://shopee.vn/api/v2/item/get_ratings?exclude_filter=0&filter=0&filter_size=0&flag=1&fold_filter=0&itemid=${item.itemId}&limit=${item.limit}&offset=${item.offset}&relevant_reviews=false&request_source=1&shopid=${item.shopId}&tag_filter=&type=${item.type}&variation_filters=`

    const response = await axios.get(url);
    ratings.push(...response.data.data.ratings);
  }))

  return ratings
};

const renderColumnData = (index, comment) => {
  return {
    stt: index,
    content: formatComment(comment)
  }
}

const addDataToWorkSheet = async () => {
  const ratings = await crawlData()

  ratings.forEach((rating, index) => {
    if (rating.comment.split('\n')[4]) {
      worksheet.addRow(renderColumnData(index, rating.comment.split('\n')[4]));
    } else if (rating.comment.split('\n')[3]) {
      worksheet.addRow(renderColumnData(index, rating.comment.split('\n')[3]));
    } else if (rating.comment.split('\n')[2]) {
      worksheet.addRow(renderColumnData(index, rating.comment.split('\n')[2]));
    } else if (rating.comment.split('\n')[1]) {
      worksheet.addRow(renderColumnData(index, rating.comment.split('\n')[1]));
    } else if (rating.comment.split('\n')[0]) {
      worksheet.addRow(renderColumnData(index, rating.comment.split('\n')[0]));
    }
  });
}

const writeToExcel = async () => {
  await addDataToWorkSheet()

  const exportPath = path.resolve(__dirname, 'countries.xlsx');

  await workbook.xlsx.writeFile(exportPath);
};

const port = 5001;

writeToExcel();

app.listen(port, () => console.log(`Server is running on PORT ${port}`));
