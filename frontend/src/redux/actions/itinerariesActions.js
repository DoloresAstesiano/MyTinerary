import axios from "axios";

const itinerariesActions = {

    readItineraries: (id) => {
        return async (dispatch, getState) => {
            const res = await axios.get(`http://localhost:4000/api/itineraries/city/${id}`)
            dispatch({ type: "READ_ITINERARIES", payload: res.data.response })
        }
    },
    likeDislike: (id) => {
        const token = localStorage.getItem('token') //buscar si hay token porque entra por passport
        return async () => {
            try {
                let response = await axios.put(`http://localhost:4000/api/itineraries/like/${id}`, {}, 
                {headers: {
                    Authorization: "Bearer "+token
                    }
                })
                console.log(response)
                return response //no lo almacena en el reducer si no que rentorno una respuesta la funcion. Lo que retorno al front es el response
                //de toda la consulta a action me retorna el response
            }catch (error) {
                console.log(error)
            }
        }
    },
}

export default itinerariesActions