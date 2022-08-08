import axios from 'axios';


const commentsActions = {
   
    addComment: (comment) => {

        const token = localStorage.getItem('token') //VERIFICA SI HAY ALGUN USUARIO
        return async (dispatch, getState) => {

            if (comment.comment !== "") { //Si el comentario no esta vacío, es importante para que no se carguen comentarios vacios.
                //si el objeto comment dentro de su propiedad comment va a estar vacio, va a llamar al back: va a ir a la ruta, le va a pasar por body el objeto
                //y va a pasar po cabecera el token 
                const res = await axios.post(`http://localhost:4000/api/itineraries/comment`, { comment }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                dispatch({ //dispatch con la respuesta (el mensaje) para poder alterar el snackbar o el alert
                    type: 'MESSAGE',
                    payload: {
                        view: true,
                        message: res.data.message,
                        success: res.data.success
                    }
                })
                return res
            }
            else {
                dispatch({
                    type: 'MESSAGE',
                    payload: {
                        view: true,
                        message: "Enter a comment to save it",
                        success: false
                    }
                })
            }
        }

    },
    modifyComment: (id, comment) => {

        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const res = await axios.put(`http://localhost:4000/api/itineraries/comment/${id}`, { comment }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: 'MESSAGE',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })

            return res
        }
    },
    removeComment: (id) => {

        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const res = await axios.post(`http://localhost:4000/api/itineraries/comment/${id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: 'MESSAGE',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })
            return res
        }
    },

}

export default commentsActions;