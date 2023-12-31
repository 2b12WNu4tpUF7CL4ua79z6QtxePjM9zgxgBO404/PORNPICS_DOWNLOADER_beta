const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');

const fsPromises = fs.promises;

function createDirectoryIfNotExists(directoryPath) {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
    }
}


async function getAlbumUrls(mainUrl) {
    const response = await axios.get(mainUrl);
    const html = response.data;
    const $ = cheerio.load(html);
    const linkElements = $("a.rel-link");

    const urls = [];
    linkElements.each((index, element) => {
        const url = $(element).attr('href');
        urls.push(url);
    });

    return urls;
}

async function readUrlsFromFile(filename) {
    const data = await fsPromises.readFile(filename, 'utf8');
    return data.split('\n').filter(line => line.trim() !== '');
}

async function downloadImages(url, imgName) {
    try {
        const response = await axios({
            url: url,
            responseType: 'stream',
        });

        await new Promise((resolve, reject) => {
            createDirectoryIfNotExists('./images');
            response.data
                .pipe(fs.createWriteStream(`./images/${imgName}`))
                .on('finish', () => resolve())
                .on('error', e => reject(e));
        });
    } catch (error) {
        console.error(`Error downloading image: ${imgName}`, error);
    }
}


// potential fix has been put inplace to prevent server overload.
// i set to download each picture 1 at a time and wait time of 20 seconds



async function processUrls(mainUrls) {
    for (const mainUrl of mainUrls) {
        try {
            const urls = await getAlbumUrls(mainUrl);

            for (const url of urls) {
                try {
                    const response = await axios.get(url);
                    const html = response.data;
                    const $ = cheerio.load(html);
                    const imgElements = $("li.thumbwook a");

                    const imageUrls = new Set();

                    for (const element of imgElements) {
                        const imgUrl = $(element).attr('href');
                        const imgName = imgUrl.split('/').pop();

                        if (!imageUrls.has(imgUrl)) {
                            imageUrls.add(imgUrl);
                            await downloadImages(imgUrl, imgName);
                            await new Promise(resolve => setTimeout(resolve, 20000)); // Wait for 20 seconds
                        }
                    }
                } catch (error) {
                    console.error(`Error processing URL: ${url}`, error);
                }
            }
        } catch (error) {
            console.error(`Error getting album URLs from: ${mainUrl}`, error);
        }
    }
}

readUrlsFromFile('urls.txt')
    .then(mainUrls => processUrls(mainUrls))
    .catch(error => {
        console.error('Error reading URLs from file:', error);
    });
