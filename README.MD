# Pornpics Scraper

This project is a Node.js script designed to scrape and download high-definition images from https://www.pornpics.com/. It uses Puppeteer to fully load web pages, including dynamically loaded content, and then extracts and downloads images matching specified patterns.

## Features

- Uses Puppeteer to load web pages completely, mimicking user scrolling (trying).
- Rotates user agents to mimic different browsers and devices (this prevents detection and blocking by websites).
- Extracts and downloads images matching the URL pattern `https://cdni.pornpics.com/1280/` (this is where the hd image is).
- Ignores thumbnails and other unwanted images (example of thumbnail URL `https://cdni.pornpics.com/460/7/725/86693883/86693883_015_dba7.jpg`).
- Includes retry logic and logging.

## Requirements

- Node.js (I am currently using v20.16.0)
- npm (Node Package Manager)

2. **Install the dependencies:**

    ```sh
    npm install axios cheerio puppeteer winston
    ```

## Configuration

Create a `config.json` file in the project directory with the following structure:

```json
{
    "mainPageUrls": [
      "https://www.pornpics.com/pornstars/paris-white/"
    ]
  }
```

## Example Images

![image](https://raw.githubusercontent.com/2b12WNu4tpUF7CL4ua79z6QtxePjM9zgxgBO404/PORNPICS_DOWNLOADER_beta/main/readme_images/Pornpics%20downloader%20screenshot.jpg)


![image2](https://raw.githubusercontent.com/2b12WNu4tpUF7CL4ua79z6QtxePjM9zgxgBO404/PORNPICS_DOWNLOADER_beta/fc34d38493276015ab52c1f2d6648c1183c1ad37/readme_images/pornpics%20image%20downloading%20in%20progress.jpeg)

