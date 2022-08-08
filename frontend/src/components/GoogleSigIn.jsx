import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import usersActions from "../redux/actions/usersActions"
import { useNavigate } from "react-router-dom"


export default function GoogleSigUp() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handleCallbackResponse(response) {
        // console.log(response.credential);
        let userObjetc = jwt_decode(response.credential);
        // console.log(userObjetc);


        const res = await dispatch(usersActions.signInUser({
            photoUser: userObjetc.photoUser,
            email: userObjetc.email,
            password: userObjetc.sub,
            from: 'google'
        }))
        if (res.success) {
            navigate('/')
        }

    }
    useEffect(() => {
        /* global google*/
        google.accounts.id.initialize({
            client_id: '940101566163-7mf0s9lju08i0c6b9hh1ildt1nn93g8e.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });
        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: 'outline', size:"medium", locale: "en"}
        )
    });
    return (
        <div>
            <div id='buttonDiv'></div>
        </div>
    )
}