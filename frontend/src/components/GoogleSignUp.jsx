import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import usersActions from "../redux/actions/usersActions"


export default function GoogleSigUp({ selectCountry }) {
    const dispatch = useDispatch()

    async function handleCallbackResponse(response) {
        // console.log(response.credential);
        let userObjetc = jwt_decode(response.credential);
        // console.log(userObjetc);

        dispatch(usersActions.signUpUsers({
            nameUser: userObjetc.given_name,
            lastNameUser: userObjetc.family_name,
            photoUser: userObjetc.picture,
            email: userObjetc.email,
            password: userObjetc.sub,
            from: 'google',
            country: selectCountry
        }))

    }
    useEffect(() => {
        /* global google*/
        google.accounts.id.initialize({
            client_id: '845653394361-ro0jihh3m4148vtk9st898uhkood76f7.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });
        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: 'outline', size:"large", locale:"en"}
        )
    });
    return (
        <div>
            <div id='buttonDiv'></div>
        </div>
    )
}