import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDeleteDetail, getDetail } from "../redux/actions";
import { Link } from "react-router-dom";
//import "../css/Details.css";

export default function Details() {
  const dispatch = useDispatch();
  const { id } = useParams();
  let MyDetail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(id))
      return function(){
      dispatch(getDeleteDetail())  
      }
  }, [id, dispatch])

  return (
    <div>
      <div>
        <h1 className="textsDetail">Detalles del Videojuego:</h1>

        <h1 className="texts">{MyDetail.name}</h1>

        <div className="divimg">
          <img className="detailImg" src={MyDetail.image} alt="Img not found" />
        </div>

        <div className="ddshResumen">
          <h3 className="texts">Descripcion: </h3>
          <p className="description">
            {MyDetail.description?.replace(/<[^>]*>/g, "")}
          </p>
        </div>


        <div className="ddsh">
          <h2 className="texts">Rating: ⭐</h2>
          <h2 className="dishesanddiets">{MyDetail.rating} </h2>
        </div>

        <div className="ddsh">
          <h2 className="texts">Fecha De Lanzamiento: </h2>
          <h2 className="dishesanddiets">{MyDetail.released}</h2>
        </div>

        <div className="ddsh">
          <h2 className="texts">Tipos De Genero: </h2>
          {MyDetail.genres
            ? MyDetail.genres.map((x) => {
                return (
                  <h2 className="dishesanddiets" key={x}>
                    {x}
                  </h2>
                );
              })
            : MyDetail.genres?.map((x) => {
                return (
                  <h2 className="dishesanddiets" key={x.name}>
                    {x.name}
                  </h2>
                );
              })}
        </div>

        <div className="ddsh">
          <h2 className="texts">Tipos De Plataforma:</h2>
          <br />
          {MyDetail.platforms
            ? MyDetail.platforms.map((e) => {
                return (
                  <h2 className="dishesanddiets" key={e}>
                    {e}
                  </h2>
                );
              })
            : MyDetail.platforms?.map((e) => {
                return (
                  <h2 className="dishesanddiets" key={e.name}>
                    {e.name}
                  </h2>
                );
              })}
        </div>

        <Link to="/home">
          <button className="backButton">Volver</button>
        </Link>
      </div>
    </div>
  );
}
