import React from 'react';
import { Link } from 'react-router-dom'
import "../css/LandingPage.css"


export default function LandingPage() {
     return (
          <div >
               <h1 className="bienvenidos">App VIDEOGAMES </h1>
               <Link to='/home'>
                    <button className="button">GO!</button>
               </Link>
          </div>
     )
}