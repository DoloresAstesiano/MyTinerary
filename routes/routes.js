const Router = require("express").Router(); // El método express Router() nos permite establecer diferentes endpoints para nuestra API, acordes a la funcionalidad de esta. 

//Cities ControllersROUTES
const citiesControllers = require("../controllers/citiesControllers")
const { getCities, getOneCity, addCity, modifyCity, removeCity } = citiesControllers

const passport = require("../config/passport")

Router.route("/cities")
    .get(getCities)
    .post(addCity)

Router.route("/cities/:id")
    .delete(removeCity)
    .put(modifyCity)
    .get(getOneCity)

//Itineraries ROUTES
const itinerariesControllers = require("../controllers/itinerariesControllers")
const { getItineraries, getOneItinerary, addItinerary, modifyItinerary, removeItinerary, readItineraries, likeDislike } = itinerariesControllers

Router.route("/itineraries")
    .get(getItineraries)
    .post(addItinerary)

Router.route("/itineraries/:id")
    .delete(removeItinerary)
    .put(modifyItinerary)
    .get(getOneItinerary)

Router.route("/itineraries/city/:id")
    .get(readItineraries)

//LIKES ROUTES
Router.route("/itineraries/like/:id") //la ruta ingresa por like y recibe un id
    .put(passport.authenticate("jwt", {session: false}), likeDislike) //mediante el metodo put ingresa por passport (por el suario) y depsues va aun controlador

// Users ROUTES
const usersControllers = require("../controllers/usersControllers")
const { signUpUsers, signInUser, verifyMail, verifytoken } = usersControllers
const validator = require("../config/validation")


Router.route("/signup")
    .post(validator, signUpUsers)

Router.route("/login")
    .post(signInUser)

Router.route("/verify/:string")
    .get(verifyMail)

Router.route("/verifytoken")
    .get(passport.authenticate('jwt', { session: false }), verifytoken)


    //Activities ROUTES
const activitiesControllers = require("../controllers/activitiesControllers")
const { getActivities, addActivity, removeActivity, modifyActivity, getOneActivity, getActivitiesByItineraryId} = activitiesControllers

Router.route("/activities")
    .get(getActivities)
    .post(addActivity);
    
Router.route("/activities/:id")
    .delete(removeActivity)    
    .put (modifyActivity)   
    .get(getOneActivity)

Router.route("/activitiesByItinerary/:id")
    .get(getActivitiesByItineraryId)

 //Comments ROUTES
 const commentsControllers = require('../controllers/commentsControllers')
 const {addComment,  modifyComment, removeComment}= commentsControllers

 Router.route('/itineraries/comment')
 .post(passport.authenticate('jwt',{ session: false }), addComment)
 
 
 Router.route('/itineraries/comment/:id')
 .post(passport.authenticate('jwt',{ session: false }), removeComment)
 .put(passport.authenticate('jwt',{ session: false }),  modifyComment)

module.exports = Router