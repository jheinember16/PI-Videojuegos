import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getGenres, postVideogame,getVideogames } from "../redux/actions";
//import "../css/VideogameCreate.css";

export default function VideogameCreate() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres)
  const videogames = useSelector((state) => state.videogames)
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    image: "",
    genres: [],
  });


  useEffect(() => {
    dispatch(getGenres())
    dispatch(getVideogames())
  }, [dispatch]);

  function handleSelect(e) {
    if(input.genres.includes(e.target.value)){
        alert("No pueden haber generos repetidos")
    }else{   
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      })
    }
  }  

  function handleDelete(g) {
    setInput({
      ...input,
      genres: input.genres.filter((genre) => genre !== g),
    });
  }
  
  function handleSelectPlatform(e) {
    if(input.platforms.includes(e.target.value)){
      alert("No pueden haber plataformas repetidas")
      }else{
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      })
      } }
  function handleDeleteP(p) {
    setInput({
      ...input,
      platforms: input.platforms.filter((plat) => plat !== p),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (input.name.trim() === "") {
      return alert("Debe ingresar un nombre");
    } else if (
      videogames.find(
        (e) => e.name.toLowerCase().trim() === input.name.toLowerCase().trim()
      )
    ) {
      return alert(`El nombre ${input.name} ya existe`);
    } else if (input.description.trim() === "") {
      return alert("Descripción requerida");
    } else if (input.released.trim() === "") {
      return alert("Fecha de lanzamiento requerida");
    } else if (input.released < "1951-05-03") {
      return alert("Fecha no puede ser menor a 03/05/1951");
    } else if (input.genres.length === 0) {
      return alert("Coloca uno o más Generos");
    } else if (input.platforms.length === 0) {
      return alert("Coloca una o más Plataformas");
    } else{
      dispatch(postVideogame(input));
      alert("Videojuego Creado !!");
      setInput({
        name: "",
        description: "",
        released: "",
        rating: "",
        platforms: [],
        image: "",
        genres: [],
      });
      navigate("/home");
    }
  }

  function validate(input) {
    let errors = {};

    const urlPatternValidation = (URL) => {
      const regex = new RegExp(/(https?:\/\/.*\.(?:png|jpg|svg))/);
      return regex.test(URL);
    };

    if (!input.name) {
      errors.name = "Se requiere un nombre";
      /* eslint-disable */
    } else if (!/^[a-zA-Z\t\h]+|(^$)/.test(input.name)) {
      errors.name = "Ingrese solo letras";
    }

    if (!input.description) {
      errors.description = "Descripcion es requerida";
    } else if (!/^[a-zA-Z\t\h]+|(^$)/.test(input.description)) {
      errors.description = "Ingrese solo letras";
    }

    if (
      (!urlPatternValidation(input.image) && input.image !== "") || !input.image)
      errors.image = "Imagen es requerida";

    if (
      !/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(input.released))
      errors.released = "La fecha es invalida";

    if (!input.rating) {
      errors.rating = "Rating es requerido";
    }
    return errors;
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    //seteame mi estado errores  con validate
    //con el estado input con e.target.name en el e.target value
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  
  return (
    <div className="">
      <Link to="/home">
        <button className="bRegresar">Volver</button>
      </Link>

      <div className="activityCardContainer">
        <div className="activityCard">
          <form onSubmit={handleSubmit}>
            <span className="titleCreateActivity"> Crea Un Videojuego!!</span>
            <div className="inputActivities">
              <input
                name="name"
                value={input.name}
                onChange={handleChange}
                placeholder="Nombre Videojuego..."
                type="text"
                className="i"
              />
              {errors.name && <p className="e">{errors.name}</p>}
            </div>

            <div className="inputActivities">
              <input
                name="description"
                value={input.description}
                onChange={handleChange}
                placeholder="Description videojuego..."
                type="text"
                className="i"
              />
              {errors.description && <p className="e">{errors.description}</p>}
            </div>

            <div className="inputActivities">
              <input
                name="image"
                value={input.image}
                onChange={(e) => handleChange(e)}
                className="i"
                type="text"
                placeholder="URL image..."
              />
              {errors.image && <p className="e"> {errors.image}</p>}
            </div>

            <div className="inputActivities">
              <label className="labelX"> Released: </label>
              <input
                name="released"
                value={input.released}
                onChange={(e) => handleChange(e)}
                className="i"
                type="date"
              />
              {errors.released && <p className="e"> {errors.released}</p>}
            </div>

            <div className="inputActivities">
              <label className="labelX"> Rating: </label>
              <input
                className="i"
                type="number"
                name="rating"
                step="0.01"
                min="1"
                max="5"
                value={input.rating}
                onChange={(e) => handleChange(e)}
              />
              {errors.rating && <p className="e"> {errors.rating}</p>}
            </div>

            <div>
              <label>Select Genres...</label>
              <select className="inputSelect" onChange={(e) => handleSelect(e)}>
                {genres.map((x) => (
                  <option key={x.id} value={x.name}>
                    {x.name}
                  </option>
                ))}
              </select>
              {input.genres.map((x) => (
                <div key={x}>
                  <button onClick={() => handleDelete(x)}>x</button>
                  <p>{x}</p>
                </div>
              ))}
            </div>

            <div>
              <label>Select Platforms...</label>
              <select
                className="inputSelect"
                onChange={(e) => handleSelectPlatform(e)}
              >
                <option value="PC" name="PC">
                  PC
                </option>
                <option value="iOS" name="PC">
                  iOS
                </option>
                <option value="Linux" name="PC">
                  Linux
                </option>
                <option value="Android" name="PC">
                  Android
                </option>
                <option value="Play Station 5" name="Play Station 5">
                  Play Station 5
                </option>
                <option value="Xbox Series X" name="Xbox Series X">
                  Xbox Series X
                </option>
                <option value="Nintendo Switch" name="Nintendo Switch">
                  Nintendo Switch
                </option>
                <option value="Play Station 4" name="Play Station 4">
                  Play Station 4
                </option>
                <option value="Xbox One" name="Xbox One">
                  Xbox One
                </option>
                <option value="Nintendo Wii U" name="Nintendo Wii U">
                  Nintendo Wii U
                </option>
                <option value="Play Station 3" name="Play Station 3">
                  Play Station 3
                </option>
                <option value="Xbox 360" name="Xbox 360">
                  Xbox 360
                </option>
                <option value="Nintendo Wii" name="Nintendo Wii">
                  Nintendo Wii
                </option>
              </select>
              {input.platforms.map((plat) => (
                <div key={plat}>
                  <button onClick={() => handleDeleteP(plat)}>x</button>
                  <p>{plat}</p>
                </div>
              ))}
            </div>

            <button className="btnActivity" type="submit">
              Crear Videojuego 🎮</button>
          </form>
        </div>
      </div>
    </div>
  );
}
