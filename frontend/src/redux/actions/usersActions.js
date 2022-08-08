import axios from 'axios'

const usersActions = {
    signUpUsers: (userData) => {
        return async (dispatch, getState) => {

            const res = await axios.post(`http://localhost:4000/api/signup`, { userData })
            // console.log(res)
            dispatch({
                type: 'MESSAGE',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })
            return (res.data)
        }
    },

    signInUser: (logedUser) => {
        //console.log(login)
        return async (dispatch, getState) => {
            const res = await axios.post('http://localhost:4000/api/login', { logedUser })
            // console.log(res)
            if (res.data.success) {
                localStorage.setItem('token', res.data.response.token)
                dispatch({ type: 'USER', payload: res.data.response.userData})
            } else {
                dispatch({
                    type: 'MESSAGE',
                    payload: {
                        view: true,
                        message: res.data.message,
                        success: res.data.success
                    }
                })
            }
            return (res.data)
        }
    },

    verifytoken: (token) => {
        return async (dispatch, getState) => {
            //console.log(token)
            await axios.get(`http://localhost:4000/api/verifytoken`, {
                headers: { 'Authorization': 'Bearer ' + token }//enviamo informacion mediante headers
            })//La ruta va por cabecera - 'Beare'=método que nos permite autorizar gestiones de usuario.
                //console.log(user)
                .then(user => {
                    if (user.data.success) {
                        dispatch({
                            type: 'USER',
                            payload: user.data.response
                        })
                        dispatch({
                            type: 'MESSAGE',
                            payload: {
                                view: true,
                                message: user.data.message,
                                success: user.data.success
                            }
                        })
                    } else { localStorage.removeItem('token') }
                }
                ).catch(error => {
                    if (error.response.status === 401)
                        dispatch({
                            type: 'MESSAGE',
                            payload: {
                                view: true,
                                message: 'Please login again',
                                success: false
                            }
                        })
                    localStorage.removeItem('token')
                })
        }
    },

    signOut: () => {
        return (dispatch, getState) => {

            localStorage.removeItem('token')
            dispatch({
                type: 'USER',
                payload: null
            })
        }
    },
}
export default usersActions