const Itinerary = require('../models/itineraryModel')

const itinerariesControllers = {
    getItineraries: async (req, res) => {
        let itineraries
        let error = null
        try {
            itineraries = await Itinerary.find().populate("cityId")
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { itineraries },
            success: error ? false : true,
            error: error
        })
    },
    getOneItinerary: async (req, res) => {
        const id = req.params.id
        let itinerary
        let error = null
        try {
            city = await Itinerary.findOne({ _id: id })
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : { itinerary },
            success: error ? false : true,
            error: error
        })
    },
    
    addItinerary: async (req, res) => {
        const { cityItineraryName, nameOfThePerson, imageOfThePerson, description, price, duration, hashtags, likes, cityId} = req.body.data
        let newItinerary
        let error = null
        try {
            newItinerary = await new Itinerary({
                cityItineraryName: cityItineraryName,
                nameOfThePerson: nameOfThePerson,
                imageOfThePerson: imageOfThePerson,
                description: description,
                price: price,
                duration: duration,
                hashtags: hashtags,
                likes:likes,
                cityId:cityId
            }).save()
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : newItinerary,
            success: error ? false : true,
            error: error
        })
    },
    modifyItinerary: async (req, res) => {
        const id = req.params.id
        const itinerary = req.body.data
        let itinerarydb
        let error = null
        try {
            itinerarydb = await Itinerary.findOneAndUpdate({ _id: id }, itinerary, { new: true })
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : itinerarydb,
            success: error ? false : true,
            error: error
        })
    },
    removeItinerary: async (req, res) => {
        const id = req.params.id
        let itinerary
        let error = null
        try {
            itinerary = await Itinerary.findOneAndDelete({ _id: id })
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : itinerary,
            success: error ? false : true,
            error: error
        })
    },
    readItineraries: async (req,res)=>{
        const id= req.params.id
        let itineraries
        let error= null
        try{
            itineraries= await Itinerary.find({cityId: id}).populate("activitiesId").populate("comments.userId", { nameUser: 1, lastNameUser: 1, photoUser: 1 })
            console.log(itineraries)
        }catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : (itineraries),
            success: error ? false : true,
            error: error      
    })
}, 

likeDislike: async (req, res) => {
    const id = req.params.id //va a recibir, desde la accion de lugares, un parametro que va a ser el id (del lugar que nosotros queresmos agregar o sacar el like)
    const user = req.user.id //LLEGA POR RESPUESTA DE PASSPORT -//dato del usuario que nosotros requerimos. El dato lo sacamos una vez que pasa por passport, establecimos como devolucion que nos devuelva el dato del usuario.
    console.log(user)

    await Itinerary.findOne({ _id: id }) 
    //va los itinerarios y busca un itinerario especifico por id y ahi en donde entra en juego el parametro - 
    //desde el front le voy a pasar a la ruta y va a entrar en el controlador el id del itinerario al que se le esta haciendo like.

        .then((eachItinerary) => { //si y el itinerario
         
            if (eachItinerary.likes.includes(user)) {
                Itinerary.findOneAndUpdate({ _id: id }, { $pull: { likes: user } }, { new: true })//findOneAndUpdate: busca uno para actualizar - 
                //pull va a extraer el id del usuario del array de likes - new true: actualizado el cambio me trae
                    .then((response) => res.json({ success: true, response: response.likes, message: "Sorry you don't like it" }))
                    .catch((error) => console.log(error))
            } else {
                Itinerary.findOneAndUpdate({ _id: id }, { $push: { likes: user } }, { new: true })//PUSH AGREGA
                    .then((response) => res.json({ success: true, response: response.likes,  message: "Thanks for your like" }))
                    .catch((error) => console.log(error))
            }
        })
        .catch((error) => res.json({ success: false, response: error }))
},
//toma una definicion en relacion a lo que encuentra en la base de datos en el itinerario, busca la propiedad like y si el usuario esta incluido en ese array.
}
module.exports = itinerariesControllers;
