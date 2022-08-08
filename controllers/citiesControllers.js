const City = require('../models/city')

const citiesControllers = {
    getCities: async (req, res) => {
        let cities
        let error = null
        try {
            cities = await City.find()
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { cities },
            success: error ? false : true,
            error: error
        })
    },
    getOneCity: async (req, res) => {
        const id = req.params.id
        let city
        let error = null
        try {
            city = await City.findOne({ _id: id })
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : { city },
            success: error ? false : true,
            error: error
        })
    },

    addCity: async (req, res) => {
        const { city, country, description, image } = req.body.data
        let newCity
        let error = null
        try {
            newCity = await new City({
                city: city,
                country: country,
                description: description,
                image: image
            }).save()
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : newCity,
            success: error ? false : true,
            error: error
        })
    },
    modifyCity: async (req, res) => {
        const id = req.params.id
        const city = req.body.data
        let citydb
        let error = null
        try {
            citydb = await City.findOneAndUpdate({ _id: id }, city, { new: true })
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : citydb,
            success: error ? false : true,
            error: error
        })
    },
    removeCity: async (req, res) => {
        const id = req.params.id
        let city
        let error = null
        try {
            city = await City.findOneAndDelete({ _id: id })
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : city,
            success: error ? false : true,
            error: error
        })
    }
}

module.exports = citiesControllers;
