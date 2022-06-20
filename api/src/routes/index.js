const { Router } = require('express');
const videogamesRoute = require('./videogames');
const videogameRoute = require('./videogame');
//const genresRoute = require('./genres');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use('/videogames',videogamesRoute);
router.use('/videogame', videogameRoute);

module.exports = router;