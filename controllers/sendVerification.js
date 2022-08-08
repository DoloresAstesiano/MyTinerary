const nodemailer = require('nodemailer') //Libreria que nos permite automatizar el envio de emails.
const { google } = require("googleapis") //nos permite usar gmail como medio de envio. 
const OAuth2 = google.auth.OAuth2 //importa de las googleapis un metodo de autorizacion.

const sendVerification = async (email, string) => { //depende del mail que ingresa el usuario y el uniqueString que se crea con crypto

    const myOAuth2Client = new OAuth2(// crea la configuracion con esos 3 parametros.
        process.env.GOOGLE_CLIENTID,
        process.env.GOOGLE_CLIENTSECRET,
        "https://developers.google.com/oauthplayground"
    )

    myOAuth2Client.setCredentials({refresh_token: process.env.GOOGLE_REFRESHTOKEN
    })

    const accessToken = myOAuth2Client.getAccessToken()

    const transporter = nodemailer.createTransport({ 
        //transporter es un metodo de nodemailer 
        service: "gmail",
        auth: {
            user: process.env.USER,
            type: "OAuth2", //aurizacion especifica de google
            clientId: process.env.GOOGLE_CLIENTID,
            clientSecret: process.env.GOOGLE_CLIENTSECRET,
            refreshToken: process.env.GOOGLE_REFRESHTOKEN,
            accessToken: accessToken
        },
        tls: {
            rejectUnauthorized: false //para evitar que bloquee el antivirus
        }
    })

    let mailOptions = {
        from: process.env.USER,
        to: email,
        subject: 'Verify Account',
        html: `
            <a href=http://localhost:4000/api/verify/${string}>CLICK!</a> 
            <h3>to confirm!</h3>`
            //controla del verificador que me controla la cuenta
    }

    await transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            // console.log(error)
        } else {
            console.log(`check ${email} to confirm your account`)
        }
    })
}

module.exports = sendVerification
