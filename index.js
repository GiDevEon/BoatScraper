const axios = require("axios");
const cheerio = require("cheerio");
const { downloadFromInfo } = require("ytdl-core");
const fs = require('fs');


const scanSite = async (url) => {
    const pageMax = 2;
    const scanPromises = [];
    for (let index = 1; index <= pageMax; index++) {
        let url = "https://scanboat.com/de/bootsmarkt/boote?page=" + index + "&SearchCriteria.CurrencyID=2&SearchCriteria.LengthWidthUnitID=2&SearchCriteria.ExtendedSearch=False&SearchCriteria.Searched=True";
        scanPromises.push(axios.get(url))
    };
    const siteData = Promise.all(scanPromises).then(urlResponse => {
        const $ = cheerio.load(urlResponse);
        $('div.item').each( (index, element) => {
            con
            const resultTitle = $(element).find('section.flex-1').text().trim();
            const resultPrice = $(element).find('section.flex-2').text().trim();
            const resultImg = $(element).find('a > section > img').attr('src');
            siteData[index] = { resultTitle, resultPrice, resultImg };
        });
        return siteData;
    });
};

scanSite()