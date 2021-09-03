const axios = require("axios");
const cheerio = require("cheerio");
const { downloadFromInfo } = require("ytdl-core");
const fs = require('fs');


const url = "https://www.scanboat.com/de/bootsmarkt/boote?SearchCriteria.BoatClassification=sail&SearchCriteria.BoatModelText=&SearchCriteria.LengthWidthUnitID=2&SearchCriteria.Searched=true&SearchCriteria.ExtendedSearch=False";

axios.get(url).then(urlResponse => {


    const $ = cheerio.load(urlResponse.data);
    const boatData = [];
    $('header.item__header').each( (index, element) => {
        const title = $(element).find('section.flex-1').text().trim();
        const price = $(element).find('section.flex-2').text().trim();
        const img = $(element).find('img.loaded').attr('href');
        boatData[index] = { title, price };
        console.log(boatData);
        const json = JSON.stringify(boatData);
        fs.writeFileSync('boatData.json', json, 'utf-8', boatData);
    });
});
    // $('div.a.section.img').each( (index, elements) => {
    //     const img = $(element).find('img.loading').attr('src');
    //     console.log(element);
    // });




// $('img').each( (_i, image) => {
//     const img = $('section.item__img > img.loaded').attr('href');
    // const baseUrl = 'https://www.scanboat.com/de/bootsmarkt/boote?SearchCriteria.BoatClassification=sail&SearchCriteria.BoatModelText=&SearchCriteria.LengthWidthUnitID=2&SearchCriteria.Searched=true&SearchCriteria.ExtendedSearch=False';
    // const Links = baseUrl + img;

    // downloadFromInfo()


// const getBoatData = async () => {
//     try {
//         return await axios.get('https://www.scanboat.com/de/bootsmarkt/boote?SearchCriteria.BoatClassification=sail&SearchCriteria.BoatModelText=&SearchCriteria.LengthWidthUnitID=2&SearchCriteria.Searched=true&SearchCriteria.ExtendedSearch=False')
//     } catch (error) {
//         console.log(error)
//     },
//     tranformRequest: [function (text, ('section[class="flex-1"] > h2'))]
// }






// import axios from "axios";
// import cheerio from "cheerio";

// axios.get("https://www.scanboat.com/de/bootsmarkt/boote?SearchCriteria.BoatClassification=sail&SearchCriteria.BoatModelText=&SearchCriteria.LengthWidthUnitID=2&SearchCriteria.Searched=true&SearchCriteria.ExtendedSearch=False")
//     .then((res) => {
//         const Data = [];
//         const $ = cheerio.load(res.data);

//         const boatData = $('header.item__header').each( (i, elem) => {
//             const title = $(elem).find('section.flex-1').text();
//             const price = $(elem).find('section.flex-2').text();
//             const img = $(elem).find('img.loaded').attr('src');
//             console.log(title);
//             Data[index] = { title };
//         })
//     });