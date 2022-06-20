//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Genre } = require('./src/db.js');
const axios = require("axios");
const { API_KEY } = process.env;


function preCharge() {
  axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
  .then((response) => {
    let aux = response.data.results.map((ep) => {
      const obj = {
        id: ep.id,
        name: ep.name,
      }; 
      return obj;
    });
    // Crear episodios en la base de datos
    Genre.bulkCreate(aux);
  });
}

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  await preCharge()
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
