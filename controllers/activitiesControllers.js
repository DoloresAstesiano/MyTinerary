const Activity = require('../models/activityModel')

const activitiesControllers = {
    getActivities: async (req, res) => {
        let activities
        let error = null
        try {
            activities = await Activity.find()
        }catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : { activities },
            success: error ? false : true,
            error: error
        })
    },
    getOneActivity: async (req, res) => {
        const id = req.params.id
        let activity
        let error = null
        try {
            city = await Activity.findOne({ _id: id })
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : { activity },
            success: error ? false : true,
            error: error
        })
    },
    
    addActivity: async (req, res) => {
        const { itineraryId,  imageActivity, activity, description} = req.body.data
        let newActivity
        let error = null
        try {
            newActivity = await new Activity ({
                itineraryId: itineraryId,
                imageActivity: imageActivity,
                activity: activity,
                description: description
            }).save()
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : newActivity,
            success: error ? false : true,
            error: error
        })
    },
    modifyActivity: async (req, res) => {
        const id = req.params.id
        const activity = req.body.data
        let activitydb
        let error = null
        try {
            activitydb = await Activity.findOneAndUpdate({ _id: id }, activity, { new: true })
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : activitydb,
            success: error ? false : true,
            error: error
        })
    },
    removeActivity: async (req, res) => {
        const id = req.params.id
        let activity
        let error = null
        try {
            activity = await Activity.findOneAndDelete({ _id: id })
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : activity,
            success: error ? false : true,
            error: error
        })
    },
    getActivitiesByItineraryId: async (req,res)=>{
        const id= req.params.id
        let activities
        let error= null
        try{
            activities= await Activity.find({itineraryId: id})
        }catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : (activities),
            success: error ? false : true,
            error: error
    })
}
}
module.exports = activitiesControllers;