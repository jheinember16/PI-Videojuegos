const { Router } = require("express");
const router = Router();
const { getTotalInfo} = require("../controllers/videogameController");


router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    //buscamos name por query
    const videogamesTotal = await getTotalInfo();
    //llamo a la funcion que me trae todo
    if (name) {
      const videogamesName = await videogamesTotal.filter((x) =>
        // x.name nombre del videojuego
        x.name.toLowerCase().includes(name.toLowerCase())
      );
      videogamesName.length
        ? res.status(200).send(videogamesName)
        : res
            .status(404)
            .send("No se encuentra el videojuego, revisa el nombre ingresado");
    } else {
      res.status(200).send(videogamesTotal);
    }
  } catch (e) {
    return res
      .status(404)
      .send("The videojuego no existe, por favor revisa el nombre ingresado");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const gameId = await getTotalInfo();
  if (id) {
    let gameById = gameId.filter((x) => x.id == id);
    gameId.length
      ? res.status(200).json(gameById)
      : res.status(400).json("No se encuentra el videojuego");
  }
});

router.post("/create", async (req, res) => {
 // recibir los datos y separarlos
  try {
    const { name,
            description,
            released,
            rating,
            image,
            platforms,
            createdInDb,
            genres 
          } = req.body;

//     validacion los datos
    if (!name || !description || !platforms)
      res.status(400).json({ msg: "Faltan datos" });

    const videogameCreated = await Videogame.create({
      name,
      description,
      released,
      rating,
      image,
      platforms,
      createdInDb,
    });

    const genreDb = await Genre.findAll({
      where: { name : genres}
    });

    videogameCreated.addGenre(genreDb);
    res.send(videogameCreated);
 
  } catch (e) {
    console.log(e);
  }
  // agregar los episodios de ese personaje
  // responder que se creo (validar si se quiere)
});

        
module.exports = router;
