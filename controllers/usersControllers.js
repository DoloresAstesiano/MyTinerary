const User = require('../models/userModel')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const sendVerification = require('./sendVerification')
const jwt = require('jsonwebtoken') //jsonwebtoken es una libreria



const usersControllers = {

    signUpUsers: async (req, res) => {
        
        let { nameUser, lastNameUser, photoUser, email, country, password, from } = req.body.userData
        // console.log("REQ.BODY.USERDATA")
        // console.log(req.body.userData)
        try {
            const userExist = await User.findOne({ email })
            const verification = false //por default es falso
            const uniqueString = crypto.randomBytes(15).toString('hex')//utilizo los metodo de cryto. "SI EXISTE EL USUARIO"
            if (userExist) { //si el usuario que se esta tratando de registrar ya existe o no exite
                //si el usuario existe, significa que al menos tiene un registro
                if (userExist.from.indexOf(from) !== -1) {
                    // para verificar si el usuario se encuentra registrado con el medio por el cual intenta utilizamos el INDEXOF, 
                    //el cual busca el valor que nosotros le indiquemos (from) en los diferentes indices de un arrayy si lo encuentra nos devuelve el valor de un indice 
                    //y si no lo encuentra nos devuelve el valor de -1
                    res.json({
                        success: false,
                        from: "signup",
                        message: "You have already made your sign up in this way, please make your Sign in" //ya realizo el signup de esta forma 
                    })
                } else { // si es -1 significa que el usuario NO SE REGISTRO DE ESTA FORMA ()
                    const passwordhashed = bcryptjs.hashSync(password, 10)
                    userExist.from.push(from)
                    userExist.password.push(passwordhashed)
                    sendVerification.verification = true
                    await userExist.save()
                    res.json({
                        success: true,
                        from: "signup",
                        message: "We add " + from + " to your media to perform the Sign in"
                    })
                }
            } else { //Si no existe el usuario
                const passwordhashed = bcryptjs.hashSync(password, 10) //Realizamos el encriptado de la contraseña con el metodo hashSync que tiene dos parametros password ( loque queremos encriptar) y la cantidad de caracteres
                const newUser = await new User({
                    //Los datos de la contraseña encriptada y del from los almacenamos en un Array para poder incorporar tantos medios de signUp como queramos, sin tener que modificar nuestro controlador por cada medio
                    nameUser: nameUser,
                    lastNameUser: lastNameUser,
                    photoUser: photoUser,
                    email: email,
                    country: country,
                    verification: verification,
                    uniqueString: uniqueString, //para verificar el email
                    password: [passwordhashed], 
                    verifyEmail: false,
                    from: [from]

                })
                //RED SOCIAL
                if (from !== "form-Signup") { 
                    // si el destino es distinto del SigUp es porque se registro por una red social
                    newUser.verification = true //No es necesario que valide datos 
                    await newUser.save() //cuando guardo aparece en mongo DB
                    res.json({
                        success: true,
                        from: "signup",
                        message: "Congratulations your user has been created with " + from
                    })
                } else {
                    //RESPUESTA SI SE RESGISTRO POR EL FORM - VALIDAR EL EMAIL
                    await newUser.save() //guarde el usuario y ya trae el uniqueString
                    await sendVerification(email, uniqueString)
                    res.json({
                        success: true,
                        from: "signup",
                        message: "we send you an email to validate it, please check your email box to complete your Sign up"
                    })
                }
            }
        } catch (error) {
            console.log(error)
            res.json({ success: false, message: "Something went wrong, please try again in a few minutes" })
        }
    },


    signInUser: async (req, res) => {
        const { email, password, from } = req.body.logedUser
        try {
            const userExist = await User.findOne({ email }) //si el usurio exite 
            if (!userExist) {//usuario no esta  registrado
                res.json({ success: false, message: "Your user has not been registered, please SignUp" })
            } else {// si el usuario esta logueado
                if (from !== "form-Signup") {// logueado red social
                    //para verificar la contraseña recorremos el array de password alojadas en la base de datos correspondiente al usuario 
                    //mediante FILTER y lugo mediante el metodo compareSync de bcryptjs verificamos si el password que se envio al controlador desde
                    //el sigIn (frontend), que se encuentra en el req.body coincide con el desencriptado.
                    //Si el resultado de este filtro  en su longitud es mayor que 0 representa que la misma fue encontrada  y que seu resultado es true.
                    
                    let passwordMatches = userExist.password.filter(pass => bcryptjs.compareSync(password, pass)) //desencripta y compara

                    if (passwordMatches.length > 0) {
                        const userData = {
                            id: userExist._id,
                            nameUser: userExist.nameUser,
                            lastNameUser: userExist.lastNameUser,
                            email: userExist.email,
                            from: from,
                            photoUser: userExist.photoUser //foto que viene de la base de datos (linea 90)
                        }
                        const token = jwt.sign({ ...userData }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 })//Creo el token | se guarda dentro de la const token : userData es el header y secret_key
                        await userExist.save()
                        res.json({
                            success: true,
                            from: from,
                            response: { token, userData },
                            message: "Welcome back " + " " + userData.nameUser + userData.lastNameUser
                        })
                    } else {
                        res.json({
                            success: false,
                            from: from,
                            message: "You have not registered with " + " " + from + " " + "if you want to enter with this method you must do the signup with" + from
                        })
                    }
                } else { //formulario
                    let passwordMatches = userExist.password.filter(pass => bcryptjs.compareSync(password, pass))
                    if (passwordMatches.length > 0) {
                        const userData = {
                            id: userExist._id,
                            nameUser: userExist.nameUser,
                            lastNameUser: userExist.lastNameUser,
                            email: userExist.email,
                            from: from,
                            photoUser: userExist.photoUser
                        }
                        const token = jwt.sign({ ...userData }, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 })
                        await userExist.save()
                        res.json({
                            success: true,
                            from: from,
                            response: { token, userData },
                            message: "Welcome Back " + userData.nameUser + userData.lastNameUser,

                        })
                    } else {
                        res.json({
                            success: false,
                            from: from,
                            message: "Username or Password don't match",
                        })
                    }
                }
            }
        } catch (error) {

            res.json({ success: false, message: "Something went wrong try again in a few minutes",})
        }
    },

    verifyMail: async (req, res) => {
        const { string } = req.params
        // console.log(req.params)
        const user = await User.findOne({ uniqueString: string })
        //console.log(user)
        if (user) {
            user.verification = true
            await user.save()
            res.redirect("http://localhost:3000/")
        }
        else {
            res.json({
                success: false,
                message: 'email has not been confirmed yet!'
            })
        }
    },

    verifytoken: (req, res) => {

        if (req.user) {
            res.json({
                success: true,
                response: {
                    id: req.user.id,
                    nameUser: req.user.nameUser,
                    lastNameUser: req.user.lastNameUser,
                    email: req.user.email,
                    photoUser: req.user.photoUser,
                    from: 'token'
                },
                message: "welcome back " + req.user.nameUser
            })
        } else {
            res.json({
                success: false,
                message: 'please Login again'
            })
        }
    }
}
module.exports = usersControllers;
