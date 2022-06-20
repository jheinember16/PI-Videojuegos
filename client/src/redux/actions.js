import axios from 'axios'

export function getVideogames() {
    return async function (dispatch) {
        try{
        return axios.get("http://localhost:3001/videogames")
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