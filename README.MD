# Image Scraper

This is a simple build project command-line application that scrapes images from a given https://www.pornpics.com when given a url.

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have installed Node.js and npm.

## Using Image Scraper

To use Image Scraper, follow these steps:

1. Run the script: `node mod.js`
2. When prompted, enter the URL you want to scrape images from.

The script will download the images and save them in a local directory.

## Example Usage

```bash
$ node mod.js
Enter the URL: https://www.pornpics.com/galleries/teen-pornstar-piper-perri-gets-pussy-ravaged-by-massive-black-dick-71148719/
```

## Note

Remember I have currently designed the code to match source code from the galleries url.

## Future Plans

This is just a start and I am planning on finding a way to build and automate the process but I will have analyst and research first. This code is just a concept and is a quick whip up.

## How I got the idea?

I was look at pornpic one night (NOT MASTURBATING) and I was saving the pictures by clicking on the image and manually saving them and looked at the source code for the site and noticed that nothing really changes when i visited a new album but the only that changes is the urls etc but the the stuff like class names and that etc remained the same. I figured I write code the look for the class name that had the hd image and obtain the url in the href value and match jpg extension and simply download it.

I could've use an exentension of some kind to do the work for me but simply put I enjoy building my project and also the second reason is I have mass downloading in mind for the future build. 

## Why use a CLI program theme for your projects?

I am simply suck at building front end code but building CLI programs just seems faster to me and rather easier. But I am still have to practice building front end applications or have build a front end ui for the code perhaps.

## License

This project uses the following license: MIT License.
