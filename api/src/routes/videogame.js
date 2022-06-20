const { Router } = require("express");
const router = Router();
const { Videogame, Genre } = require("../db.js");


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

    // validacion los datos
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
