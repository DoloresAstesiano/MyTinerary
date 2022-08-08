const mongoose = require('mongoose') //llamamos al constructor que crea un modelo de pedido de datos

const activitySchema = new mongoose.Schema ({ //construimos el modelo de tabla
    imageActivity: {type:String, required:true},  
    activity: {type:String, required:true}   
})

const Activity = mongoose.model('activities', activitySchema) //defino el constructor del modelo con el nombre de coleccion y el nombre de la tabla del modelo
module.exports = Activity //exportamos el modelo

//ahora establecemos el controlador del modelo

