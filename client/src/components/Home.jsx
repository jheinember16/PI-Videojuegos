//import "../css/Home.css"
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  orderByAlfabetically,sortGamesByRating,filterVideogamesByOrigin,orderByGenero,getVideogames, getGenres,
} from "../redux/actions";
import Paginado from "../components/Paginado";
import SearchBar from "../components/SearchBar"
import Card from "../components/Card";
import Loading from "../components/Loading";

export default function Home() {
  const dispatch = useDispatch();

  const allVideogames = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.genres);

  const [orden, setOrden] = useState(""); // eslint-disable-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage, setVideogamesPerPage] = useState(15); // eslint-disable-line no-unused-vars
  const indexOfLastCharacter = currentPage * videogamesPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - videogamesPerPage;
  const currentVideogames = allVideogames.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]);

  function handleSort(e) {
    dispatch(orderByAlfabetically(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleSortRating(e) {
    dispatch(sortGamesByRating(e.target.value));
    setOrden(`Ordered ${e.target.value}`);
  }

  function handleFilterByOrigin(e) {
    dispatch(filterVideogamesByOrigin(e.target.value));
  }

  function handleFilterGenre(e) {
    dispatch(orderByGenero(e.target.value));
  }

  function handleClick(e) {
    dispatch(getVideogames());
  }

  if (!allVideogames.length) {
    return <Loading />;
  } else {
    return (
      <div>
        <ul className="contenedor">
          <button className="btzVolver" onClick={e => { handleClick(e) }}>RECARGAR</button>
          <br />
          <Link className="btzCrearVideojuego" to="/videogame">
            CREAR VIDEOJUEGO
          </Link>
          <br />
          <br />
          <div>
            <select className="but" onChange={(x) => handleSort(x)}>
              <option> Order Alfabetico </option>
              <option value="asc">A-Z </option>
              <option value="desc">Z-A </option>
            </select>

            <select className="but" onChange={(e) => handleSortRating(e)}>
              <option>sorted by rating</option>
              <option value="btw"> Best to Worse ⭐</option>
              <option value="wtb"> Worse to Best ⭐</option>
            </select>

            <select className="but" onChange={(e) => handleFilterByOrigin(e)}>
              <option value="none">Created By: </option>
              <option value="All">All </option>
              <option value="created">Created </option>
              <option value="api">API </option>
            </select>

            <select className="but" onChange={(x) => handleFilterGenre(x)}>
              <option value="none">Tipos de Genero</option>
              <option value="All">All </option>
              {allGenres.map((el) => {
                return (
                  <option key={el.id} name={el.name}>
                    {el.name}
                  </option>
                );
              })}
            </select>

            
            
          </div>
        </ul>

        <br />

        <SearchBar />
        <br />

        <Paginado
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          paginado={paginado}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <ul className="CardGrid">
          {
            currentVideogames.map((vg) => {
              return(
                <Link key={vg.id} to={`/details/${vg.id}`}style={{ textDecoration: "none" }}>
                  <Card
                    name={vg.name}
                    image={vg.image}
                    rating={vg.rating}
                    genres={ vg.genres.join(" - ")}
                  />
                </Link>
              )
            })}
        </ul>
      </div>
    );
  }
}
