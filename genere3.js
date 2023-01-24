const cheerio = require("cheerio");
const axios = require("axios");
const readline = require("readline");
const fs = require("fs");
//const sharp = require("sharp");

const data_producto = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('Inserta la URL: ', (answer) => {
    const url = answer;
      getGenre(url);
      console.log(`>>> Trabajo LISTO!`);
    rl.close(); 
  });

async function getGenre(url){
    try{

        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const descripcion = $("#data-info-libro > div > div > div.descripcionBreve.margin-top-20 > div").text();
        const Autor = $("#metadata-autor > a").text();
        const Editorial = $("#metadata-editorial > a").text();
        const link = $('#producto > div.row.product-info > div.col-xs-12.col-md-3 > div > div > div > div > div > div.row.center-xs > div > div > div > img').attr('data-src');
        data_producto.push({descripcion, Autor, Editorial});

        console.log(data_producto);

    await axios({

    method: 'GET',
    url: link,
    responseType: 'stream'
    
}).then(response => {
    response.data
    //.pipe(sharp().resize({ width: 700, height: 700 }))
    .pipe(fs.createWriteStream('imagen.jpg'));
});

    }

    catch(error){
        console.error(error);
    }

  }
