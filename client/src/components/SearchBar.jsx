import React from 'react'
import { useState } from 'react'
import { useDispatch } from "react-redux"
// importo mi action que me ayuda 
// a traerme las videojegos por nombre
import '../css/SearchBar.css';
import { getNameVideogames } from '../redux/actions';

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(e) {
        setName(e.target.value)              
    }

    function handleSubmit(e) {
        e.preventDefault()        
        if (!name) {
            return alert("Debes ingresar un nombre...")
        }else{
            dispatch(getNameVideogames(name))
            setName("")
            document.getElementById("search").value= ""
        }
    }

   
    return (
        <div className="divSearch">
            <input id="search" className="inputt" type='text'
                placeholder="Buscar videojuego..."
                value={name} onChange={(e) => handleInputChange(e)}
            />
            <button className="btnn"
                type='submit'
                onClick={(e) => handleSubmit(e)}>Buscar 🔎
            </button>
        </div>
    )
}