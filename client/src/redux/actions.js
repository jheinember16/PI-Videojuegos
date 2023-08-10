import axios from 'axios'

export function getVideogames() {
    return async function (dispatch) {
        try{
        return axios.get("/videogames")
        .then((json) =>{
            return dispatch({
                type: 'GET_VIDEOGAMES',
                payload: json.data
            })
        })
        }catch(e){
            console.log(e)
        }
    }
}
export function orderByAlfabetically(payload) {
    return {
        type: 'ORDER_BY_ALPHABETICALLY',
        payload
    }
}
export function sortGamesByRating(rating) {
    return {
        type: 'SORT_BY_RATING',
        rating
    }
}
export function filterVideogamesByOrigin(payload) {
    return {
        type: "FILTER_BY_ORIGIN",
        payload,
    };
}
export function getGenres() {
    return async function (dispatch) {
        var json = await axios.get("/genres");
        return dispatch({
            type: "GET_GENRES",
            payload: json.data
        });
    }
}

export function orderByGenero(payload) {
    return {
        type: 'ORDER_BY_GENRE',
        payload
    }
}

export function getNameVideogames(name) {
    return async function (dispatch) {
        var json = await axios.get("/videogames?name=" + name);
        return dispatch({
            type: 'GET_NAME_VIDEOGAMES',
            payload: json.data
        })
    }
}

export function postVideogame(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.post("/videogame", payload);
            return json;
        } catch (error) {
            console.log(error)
        }
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get("/videogames/" + id);
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getDeleteDetail(){
    return {
        type: "GET_DELETE"
    }
}









