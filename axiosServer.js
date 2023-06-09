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

const itemInfo = [
  {
    itemId: '3015403040',
    limit: 50,
    offset: 0,
    shopId: '40342563',
    type: 0,
  },
  {
    itemId: '3015403040',
    limit: 50,
    offset: 0,
    shopId: '40342563',
    type: 1,
  },
  {
    itemId: '3015403040',
    limit: 50,
    offset: 0,
    shopId: '40342563',
    type: 2,
  },
  {
    itemId: '3015403040',
    limit: 50,
    offset: 0,
    shopId: '40342563',
    type: 3,
  },
  {
    itemId: '3015403040',
    limit: 50,
    offset: 0,
    shopId: '40342563',
    type: 4,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 0,
    shopId: '448978223',
    type: 1,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 1,
    shopId: '448978223',
    type: 1,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 0,
    shopId: '448978223',
    type: 2,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 2,
    shopId: '448978223',
    type: 2,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 0,
    shopId: '448978223',
    type: 3,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 1,
    shopId: '448978223',
    type: 3,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 2,
    shopId: '448978223',
    type: 3,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 3,
    shopId: '448978223',
    type: 3,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 4,
    shopId: '448978223',
    type: 3,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 0,
    shopId: '448978223',
    type: 4,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 1,
    shopId: '448978223',
    type: 4,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 2,
    shopId: '448978223',
    type: 4,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 3,
    shopId: '448978223',
    type: 4,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 4,
    shopId: '448978223',
    type: 4,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 5,
    shopId: '448978223',
    type: 4,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 6,
    shopId: '448978223',
    type: 4,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 7,
    shopId: '448978223',
    type: 4,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 8,
    shopId: '448978223',
    type: 4,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 9,
    shopId: '448978223',
    type: 4,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 10,
    shopId: '448978223',
    type: 4,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 11,
    shopId: '448978223',
    type: 4,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 12,
    shopId: '448978223',
    type: 4,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 13,
    shopId: '448978223',
    type: 4,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 14,
    shopId: '448978223',
    type: 4,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 0,
    shopId: '448978223',
    type: 5,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 1,
    shopId: '448978223',
    type: 5,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 2,
    shopId: '448978223',
    type: 5,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 3,
    shopId: '448978223',
    type: 5,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 4,
    shopId: '448978223',
    type: 5,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 5,
    shopId: '448978223',
    type: 5,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 6,
    shopId: '448978223',
    type: 5,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 7,
    shopId: '448978223',
    type: 5,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 8,
    shopId: '448978223',
    type: 5,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 9,
    shopId: '448978223',
    type: 5,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 10,
    shopId: '448978223',
    type: 5,
  },
  {
    itemId: '11289182012',
    limit: 50,
    offset: 11,
    shopId: '448978223',
    type: 5,
  },
  {
    itemId: '18655290526',
    limit: 50,
    offset: 0,
    shopId: '180633733',
    type: 4,
  },
  {
    itemId: '18655290526',
    limit: 50,
    offset: 0,
    shopId: '180633733',
    type: 1,
  },
  {
    itemId: '18655290526',
    limit: 50,
    offset: 0,
    shopId: '180633733',
    type: 2,
  },
  {
    itemId: '18655290526',
    limit: 50,
    offset: 0,
    shopId: '180633733',
    type: 3,
  },
  {
    itemId: '18655290526',
    limit: 50,
    offset: 0,
    shopId: '180633733',
    type: 5,
  },
  {
    itemId: '7562984248',
    limit: 50,
    offset: 0,
    shopId: '233545991',
    type: 5,
  },
  {
    itemId: '7562984248',
    limit: 50,
    offset: 1,
    shopId: '233545991',
    type: 5,
  },
  {
    itemId: '7562984248',
    limit: 50,
    offset: 2,
    shopId: '233545991',
    type: 5,
  },
  {
    itemId: '7562984248',
    limit: 50,
    offset: 3,
    shopId: '233545991',
    type: 5,
  },
  {
    itemId: '7562984248',
    limit: 50,
    offset: 0,
    shopId: '233545991',
    type: 1,
  },
  {
    itemId: '7562984248',
    limit: 50,
    offset: 0,
    shopId: '233545991',
    type: 2,
  },
  {
    itemId: '7562984248',
    limit: 50,
    offset: 0,
    shopId: '233545991',
    type: 3,
  },
  {
    itemId: '7562984248',
    limit: 50,
    offset: 1,
    shopId: '233545991',
    type: 3,
  },
  {
    itemId: '7562984248',
    limit: 50,
    offset: 0,
    shopId: '233545991',
    type: 4,
  },
  {
    itemId: '7562984248',
    limit: 50,
    offset: 1,
    shopId: '233545991',
    type: 4,
  },
  {
    itemId: '7562984248',
    limit: 50,
    offset: 2,
    shopId: '233545991',
    type: 4,
  },
  {
    itemId: '7562984248',
    limit: 50,
    offset: 3,
    shopId: '233545991',
    type: 4,
  },
  {
    itemId: '7562984248',
    limit: 50,
    offset: 4,
    shopId: '233545991',
    type: 4,
  },
  {
    itemId: '7562984248',
    limit: 50,
    offset: 5,
    shopId: '233545991',
    type: 4,
  },
  {
    itemId: '21602882231',
    limit: 50,
    offset: 0,
    shopId: '82053562',
    type: 1,
  },
  {
    itemId: '21602882231',
    limit: 50,
    offset: 0,
    shopId: '82053562',
    type: 2,
  },
  {
    itemId: '21602882231',
    limit: 50,
    offset: 0,
    shopId: '82053562',
    type: 3,
  },
  {
    itemId: '21602882231',
    limit: 50,
    offset: 1,
    shopId: '82053562',
    type: 3,
  },
  {
    itemId: '21602882231',
    limit: 50,
    offset: 0,
    shopId: '82053562',
    type: 4,
  },
  {
    itemId: '21602882231',
    limit: 50,
    offset: 1,
    shopId: '82053562',
    type: 4,
  },
  {
    itemId: '21602882231',
    limit: 50,
    offset: 2,
    shopId: '82053562',
    type: 4,
  },
  {
    itemId: '21602882231',
    limit: 50,
    offset: 3,
    shopId: '82053562',
    type: 4,
  },
  {
    itemId: '21602882231',
    limit: 50,
    offset: 4,
    shopId: '82053562',
    type: 4,
  },
  {
    itemId: '21602882231',
    limit: 50,
    offset: 5,
    shopId: '82053562',
    type: 4,
  },
  {
    itemId: '21602882231',
    limit: 50,
    offset: 0,
    shopId: '82053562',
    type: 5,
  },
  {
    itemId: '21602882231',
    limit: 50,
    offset: 1,
    shopId: '82053562',
    type: 5,
  },
  {
    itemId: '21602882231',
    limit: 50,
    offset: 2,
    shopId: '82053562',
    type: 5,
  },
  {
    itemId: '21602882231',
    limit: 50,
    offset: 3,
    shopId: '82053562',
    type: 5,
  },
  {
    itemId: '21602882231',
    limit: 50,
    offset: 4,
    shopId: '82053562',
    type: 5,
  },
  {
    itemId: '21602882231',
    limit: 50,
    offset: 5,
    shopId: '82053562',
    type: 5,
  },
  {
    itemId: '21602882231',
    limit: 50,
    offset: 6,
    shopId: '82053562',
    type: 5,
  },
  {
    itemId: '21602882231',
    limit: 50,
    offset: 7,
    shopId: '82053562',
    type: 5,
  },
  {
    itemId: '21602882231',
    limit: 50,
    offset: 8,
    shopId: '82053562',
    type: 5,
  },
  {
    itemId: '21602882231',
    limit: 50,
    offset: 9,
    shopId: '82053562',
    type: 5,
  },
  {
    itemId: '10923992091',
    limit: 50,
    offset: 0,
    shopId: '407641325',
    type: 1,
  },
  {
    itemId: '10923992091',
    limit: 50,
    offset: 0,
    shopId: '407641325',
    type: 2,
  },
  {
    itemId: '10923992091',
    limit: 50,
    offset: 0,
    shopId: '407641325',
    type: 3,
  },
  {
    itemId: '10923992091',
    limit: 50,
    offset: 0,
    shopId: '407641325',
    type: 4,
  },
  {
    itemId: '10923992091',
    limit: 50,
    offset: 1,
    shopId: '407641325',
    type: 4,
  },
  {
    itemId: '10923992091',
    limit: 50,
    offset: 0,
    shopId: '407641325',
    type: 5,
  },
  {
    itemId: '10923992091',
    limit: 50,
    offset: 1,
    shopId: '407641325',
    type: 5,
  },
  {
    itemId: '10923992091',
    limit: 50,
    offset: 2,
    shopId: '407641325',
    type: 5,
  },
  {
    itemId: '10923992091',
    limit: 50,
    offset: 3,
    shopId: '407641325',
    type: 5,
  },
  {
    itemId: '10923992091',
    limit: 50,
    offset: 4,
    shopId: '407641325',
    type: 5,
  },
  {
    itemId: '10923992091',
    limit: 50,
    offset: 5,
    shopId: '407641325',
    type: 5,
  },
  {
    itemId: '10923992091',
    limit: 50,
    offset: 6,
    shopId: '407641325',
    type: 5,
  },
  {
    itemId: '10923992091',
    limit: 50,
    offset: 7,
    shopId: '407641325',
    type: 5,
  },
  {
    itemId: '10923992091',
    limit: 50,
    offset: 8,
    shopId: '407641325',
    type: 5,
  },
  {
    itemId: '18762867993',
    limit: 50,
    offset: 0,
    shopId: '687023655',
    type: 1,
  },
  {
    itemId: '18762867993',
    limit: 50,
    offset: 0,
    shopId: '687023655',
    type: 2,
  },
  {
    itemId: '18762867993',
    limit: 50,
    offset: 0,
    shopId: '687023655',
    type: 3,
  },
  {
    itemId: '18762867993',
    limit: 50,
    offset: 1,
    shopId: '687023655',
    type: 3,
  },
  {
    itemId: '18762867993',
    limit: 50,
    offset: 0,
    shopId: '687023655',
    type: 4,
  },
  {
    itemId: '18762867993',
    limit: 50,
    offset: 1,
    shopId: '687023655',
    type: 4,
  },
  {
    itemId: '18762867993',
    limit: 50,
    offset: 2,
    shopId: '687023655',
    type: 4,
  },
  {
    itemId: '18762867993',
    limit: 50,
    offset: 3,
    shopId: '687023655',
    type: 4,
  },
  {
    itemId: '18762867993',
    limit: 50,
    offset: 4,
    shopId: '687023655',
    type: 4,
  },
  {
    itemId: '18762867993',
    limit: 50,
    offset: 5,
    shopId: '687023655',
    type: 4,
  },
  {
    itemId: '18762867993',
    limit: 50,
    offset: 0,
    shopId: '687023655',
    type: 5,
  },
  {
    itemId: '18762867993',
    limit: 50,
    offset: 1,
    shopId: '687023655',
    type: 5,
  },
  {
    itemId: '18762867993',
    limit: 50,
    offset: 2,
    shopId: '687023655',
    type: 5,
  },
  {
    itemId: '18762867993',
    limit: 50,
    offset: 3,
    shopId: '687023655',
    type: 5,
  },
  {
    itemId: '18762867993',
    limit: 50,
    offset: 4,
    shopId: '687023655',
    type: 5,
  },
  {
    itemId: '18762867993',
    limit: 50,
    offset: 5,
    shopId: '687023655',
    type: 5,
  },
  {
    itemId: '18762867993',
    limit: 50,
    offset: 6,
    shopId: '687023655',
    type: 5,
  },
  {
    itemId: '18762867993',
    limit: 50,
    offset: 7,
    shopId: '687023655',
    type: 5,
  },
  {
    itemId: '18762867993',
    limit: 50,
    offset: 7,
    shopId: '687023655',
    type: 5,
  },
  {
    itemId: '5046043606',
    limit: 50,
    offset: 0,
    shopId: '125254308',
    type: 1,
  },
  {
    itemId: '5046043606',
    limit: 50,
    offset: 0,
    shopId: '125254308',
    type: 2,
  },
  {
    itemId: '5046043606',
    limit: 50,
    offset: 0,
    shopId: '125254308',
    type: 3,
  },
  {
    itemId: '5046043606',
    limit: 50,
    offset: 1,
    shopId: '125254308',
    type: 3,
  },
  {
    itemId: '5046043606',
    limit: 50,
    offset: 0,
    shopId: '125254308',
    type: 4,
  },
  {
    itemId: '5046043606',
    limit: 50,
    offset: 1,
    shopId: '125254308',
    type: 4,
  },
  {
    itemId: '5046043606',
    limit: 50,
    offset: 2,
    shopId: '125254308',
    type: 4,
  },
  {
    itemId: '5046043606',
    limit: 50,
    offset: 0,
    shopId: '125254308',
    type: 5,
  },
  {
    itemId: '5046043606',
    limit: 50,
    offset: 1,
    shopId: '125254308',
    type: 5,
  },
  {
    itemId: '5046043606',
    limit: 50,
    offset: 2,
    shopId: '125254308',
    type: 5,
  },
  {
    itemId: '5046043606',
    limit: 50,
    offset: 3,
    shopId: '125254308',
    type: 5,
  },
  {
    itemId: '5046043606',
    limit: 50,
    offset: 4,
    shopId: '125254308',
    type: 5,
  },
  {
    itemId: '5046043606',
    limit: 50,
    offset: 5,
    shopId: '125254308',
    type: 5,
  },
  {
    itemId: '5046043606',
    limit: 50,
    offset: 6,
    shopId: '125254308',
    type: 5,
  },
  {
    itemId: '5046043606',
    limit: 50,
    offset: 7,
    shopId: '125254308',
    type: 5,
  },
  {
    itemId: '5046043606',
    limit: 50,
    offset: 8,
    shopId: '125254308',
    type: 5,
  },
  {
    itemId: '5046043606',
    limit: 50,
    offset: 9,
    shopId: '125254308',
    type: 5,
  },
  {
    itemId: '5046043606',
    limit: 50,
    offset: 10,
    shopId: '125254308',
    type: 5,
  },
  {
    itemId: '5046043606',
    limit: 50,
    offset: 11,
    shopId: '125254308',
    type: 5,
  },
  {
    itemId: '5046043606',
    limit: 50,
    offset: 12,
    shopId: '125254308',
    type: 5,
  },
  {
    itemId: '5046043606',
    limit: 50,
    offset: 13,
    shopId: '125254308',
    type: 5,
  },
  {
    itemId: '5046043606',
    limit: 50,
    offset: 14,
    shopId: '125254308',
    type: 5,
  },
];

const formatComment = (comment) => {
  return comment.replace(/\s+/g, ' ').trim();
};

const crawlData = async () => {
  const ratings = [];

  await Promise.all(
    itemInfo.map(async (item, index) => {
      const url = `
    https://shopee.vn/api/v2/item/get_ratings?exclude_filter=0&filter=0&filter_size=0&flag=1&fold_filter=0&itemid=${item.itemId}&limit=${item.limit}&offset=${item.offset}&relevant_reviews=false&request_source=1&shopid=${item.shopId}&tag_filter=&type=${item.type}&variation_filters=`;

      const response = await axios.get(url);
      ratings.push(...response.data.data.ratings);
    })
  );

  return ratings;
};

const renderColumnData = (comment) => {
  return {
    content: formatComment(comment),
  };
};

const addDataToWorkSheet = async () => {
  const ratings = await crawlData();

  ratings.forEach((rating, index) => {
    if (rating.comment.split('\n')[4]) {
      worksheet.addRow(renderColumnData(rating.comment.split('\n')[4]));
    } else if (rating.comment.split('\n')[3]) {
      worksheet.addRow(renderColumnData(rating.comment.split('\n')[3]));
    } else if (rating.comment.split('\n')[2]) {
      worksheet.addRow(renderColumnData(rating.comment.split('\n')[2]));
    } else if (rating.comment.split('\n')[1]) {
      worksheet.addRow(renderColumnData(rating.comment.split('\n')[1]));
    } else if (rating.comment.split('\n')[0]) {
      worksheet.addRow(renderColumnData(rating.comment.split('\n')[0]));
    }
  });
};

const writeToExcel = async () => {
  await addDataToWorkSheet();

  const exportPath = path.resolve(__dirname, 'data-crawl.xlsx');

  await workbook.xlsx.writeFile(exportPath);
};

const port = 5001;

writeToExcel();

app.listen(port, () => console.log(`Server is running on PORT ${port}`));
