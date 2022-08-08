const mongoose = require("mongoose")

const itinerarySchema = new mongoose.Schema({
        cityItineraryName: { type: String, required: true },
        nameOfThePerson: { type: String, required: true },
        imageOfThePerson: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: String, required: true },
        duration: { type: String, required: true },
        hashtags: { type: Array, required: true },
        likes: { type: Array, required: true },
        cityId: { type: mongoose.Types.ObjectId, ref: "cities" }, //relaciono la colección con un elemento de otra coleccion
        activitiesId: [{ type: mongoose.Types.ObjectId, ref: "activities"}], //ref relaciona la coleccion
        comments: [{comment: {type: String}, userId: {type:mongoose.Types.ObjectId, ref:'users'}}] //propiedad de tipo array que va a alojar un objeto con dos propiedades

})
const Itinerary = mongoose.model("itineraries", itinerarySchema) //defino el constructor del modelo con el nombre de coleccion y el nombre de la tabla del modelo

module.exports = Itinerary   //exportamos el modelo

//ahora establecemos el controlador del modelo