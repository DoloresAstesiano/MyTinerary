//Llamamos a dos contructores del paquete passport-jwt: STRATEGY y EXTRACTJWT y a nuestro MODELO

const passport = require("passport")
const jwtStrategy = require("passport-jwt").Strategy //estrategia
const extractJwt = require("passport-jwt").ExtractJwt //nos sirve para desincriptar token 

const User = require("../models/userModel") //importo mi modelo de usuario 

module.exports = passport.use(
    new jwtStrategy( //definimos una nueva estrategia
        {
            jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
            //extrae el token  del headers y compara su frima desciriptandola con nuestra SECRET_KEY
            secretOrKey: process.env.SECRET_KEY
        },
        async (jwt_payload, done) => {
            //console.log(jwt_payload)
            try {
                const user = await User.findOne({ _id: jwt_payload.id }) //busco si hay un usuario que tenga el id del json del userData
                if (user) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            }
            catch (error) {
                console.log(error)
                return done(error, false)
            }
        }
    ))