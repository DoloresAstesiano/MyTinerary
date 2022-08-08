const joi = require("joi")// JOI (libreria + power de validacion de datos de backend) se implementa entre la ruta y el controlador 
//No se va a  ejecvutar el conrolador hasta pasar por el validador.
//permite devolver al usuario mensajes sobre la validación de los datos. - Las respuestas recibidas seran un array.
const validator = (req, res, next) => {
    //es una funcion que se va a ejecutar durante el ciclo de vida de nuestra req, en este caso un poco antes, de ejecutar nuestro controlador 
    const schema = joi.object({  //jou.objetc el cual contiiene en su interior cada uno de los valores a verificar.
        //req = datos que nos envian nuestras acciones.
        nameUser: joi.string()
            .max(20)
            .min(3)
            .trim()
            .pattern(new RegExp('[a-zA-Z]'))
            .required()
            .messages({
                'string.min': 'name: min 3 characters',
                'string.max': 'name: max 20 characters'
            }),
        lastNameUser: joi.string()
            .min(3)
            .max(20)
            .trim()
            .pattern(new RegExp('[a-zA-Z]'))
            .required()
            .messages({
                'string.min': '"last name": min 3 characters',
                'string.max': '"last name": max 20 characters'
            }),
        photoUser: joi.string()
            .trim()
            .required(),
        country: joi.string()
            .trim()
            .required(),
        email: joi.string()
            .email({ minDomainSegments: 2 })
            .required()
            .messages({
                "string.email": '"mail:" incorrect format'
            }),
        password: joi.string()
            .min(8)
            .max(30)
            .pattern(new RegExp(`[a-zA-Z0-9]`))
            .required()
            .messages({
                "string.min": '"password": min 8 characters',
                "string.max": '"password": max 30 characters'
            }),
        from: joi.string()
            .required()
    })
    const validation = schema.validate(req.body.userData, { abortEarly: false }) //abortEarly inca que campos falta completar, si completaste uno pero los otros no te avisa cuales faltan y asi sucesivamente hasta que se complete bien todo el formulario.
    //abortEarly: false  que de una respuesta una vez qe haya verificado todos los campos 
    // console.log(validation)
    if (validation.error) {
        //res = respuesta que se enviará en caso de que alguna validación no cumpla con los parámetros de validación.
        return res.json({
            success: false,
            from: "validation",
            message: validation.error.details,
            test: validation
        }) //preguntar que es test

    }
    next() // Una vez que lo campos se hayan completado correctamente, se llama a  accion NEXT
    // y por consiguiente se ejecuta el CONTROLADOR
}
module.exports = validator




