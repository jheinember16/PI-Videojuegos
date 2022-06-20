const initialState = {
    videogames: [],
    auxVideogames: [],
    genres: [],
    filteredGenres: [],
    detail: []
  }
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      //1. TRAE TODO LOS VIDEOJUEGOS
      case "GET_VIDEOGAMES":
        return {
          ...state, 
          videogames: action.payload,
          auxVideogames: action.payload,
          filteredGenres: action.payload,
        };
      //2. ORDER BY ALPHABETICALLY
      case "ORDER_BY_ALPHABETICALLY":
        // 2 sort uno ordena de mayor a menor y otro de menor a mayor
        let order =
          action.payload === "asc"
            ? state.videogames.sort(function (a, b) {
                if (a.name > b.name) return 1;
                if (b.name > a.name) return -1;
                return 0;
              })
            : state.videogames.sort(function (a, b) {
                if (a.name > b.name) return -1;
                if (b.name > a.name) return 1;
                return 0;
              });
        return {
          ...state,
          videogames: order,
        };
      //3. ORDER BY RATING
      case "SORT_BY_RATING":
        const ratingSorted =
          action.rating === "btw"
            ? state.videogames.sort(function (a, b) {
                if (a.rating > b.rating) {
                  return -1;
                }
                if (a.rating < b.rating) {
                  return 1;
                }
                return 0;
              })
            : state.videogames.sort(function (a, b) {
                if (a.rating > b.rating) {
                  return 1;
                }
                if (a.rating < b.rating) {
                  return -1;
                }
                return 0;
              });
        return {
          ...state,
          videogames: ratingSorted,
        };
      //4. ORDER BY API-DB
      case "FILTER_BY_ORIGIN":
        const videogamesOrigin = state.auxVideogames;
        let originFiltered = [];
        if (action.payload === "created") {
          originFiltered = videogamesOrigin.filter((x) => x.createdInDb);
        } else if (action.payload === "api") {
          originFiltered = videogamesOrigin.filter((x) => !x.createdInDb);
        } else {
          originFiltered = videogamesOrigin;
        }
        return {
          ...state,
          videogames: originFiltered,
        };
  
      //5. GET GENRES
      case "GET_GENRES":
        return {
          ...state,
          genres: action.payload,
        };
  
      //6. FILTRO POR TIPO DE GENERO
      case "ORDER_BY_GENRE":
        const allGenre = state.filteredGenres;
        const genreFiltered = allGenre.filter((el) =>
          el.genres.includes(action.payload)
        );
        return {
          ...state,
          videogames:
            action.payload === "All" ? state.filteredGenres : genreFiltered,
        };
  
      //6. BUSQUEDA POR NOMBRE
      case "GET_NAME_VIDEOGAMES":
        return {
          ...state,
          videogames: action.payload,
          //videogames porque es el arreglo que estoy renderizando
        };
  
      //9. GET DETAILS    
      case 'GET_DETAILS': 
        return {
            ...state,  
            detail: action.payload
      } 
      case "GET_DELETE":
        return{
          ...state,
          detail: []
        } 
  
      default:
        return state;
    } 
  }
   
  export default rootReducer;
  