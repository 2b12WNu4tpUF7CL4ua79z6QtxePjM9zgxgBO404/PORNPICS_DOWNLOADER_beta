const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the URL: ', (url) => {
  rl.close();

  axios.get(url).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const imgElements = $("li.thumbwook a");

    const imageUrls = new Set();

    imgElements.each((index, element) => {
      const imgUrl = $(element).attr('href');
      const imgName = imgUrl.split('/').pop();

      if (!imageUrls.has(imgUrl)) {
        imageUrls.add(imgUrl);

        axios({
          url: imgUrl,
          responseType: 'stream',
        }).then(response =>
          new Promise((resolve, reject) => {
            response.data
              .pipe(fs.createWriteStream(`./images/${imgName}`))
              .on('finish', () => resolve())
              .on('error', e => reject(e));
          })
        );
      }
    });
  });
});
