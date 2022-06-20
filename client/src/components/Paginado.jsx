import React from 'react';
import '../css/Paginado.css';

export default function Paginado({ videogamesPerPage, allVideogames, paginado, currentPage, setCurrentPage}) {
    const pageNumbers = []
    
    for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
        pageNumbers.push(i)
    }
    
    function handlePrev() {
        setCurrentPage(currentPage - 1);
    }
    function handleNext() {
        setCurrentPage(currentPage + 1);
    }

    return (
        <nav>
            <ul className="pagi" >
                <ul>
                    <button className="butPaginado" disabled={currentPage === pageNumbers[0] 
                        ? true 
                        : false} onClick={(e) => handlePrev(e)} >Prev</button>

                    {pageNumbers && //si tiene algo 
                        pageNumbers.map(number => (
                        <button className="butPaginado" key={number} 
                        onClick={() => paginado(number)}>{number}</button>
                    ))}
                    <button className="butPaginado" disabled={currentPage === pageNumbers[pageNumbers.length - 1] 
                        ? true 
                        : false} onClick={(e) => handleNext(e)} >Next</button>
                </ul>
            </ul>
        </nav>
    )
}