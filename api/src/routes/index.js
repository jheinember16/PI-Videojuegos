const router = require('express').Router();

const videogamesRoute = require('./videogames');
const videogameRoute = require('./videogame');
const genresRoute = require('./genres');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

router.use('/videogames', videogamesRoute);
router.use('/videogame', videogameRoute);
router.use('/genres', genresRoute);

module.exports = router;

