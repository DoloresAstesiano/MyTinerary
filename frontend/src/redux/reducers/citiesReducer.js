const initialState = {
    cities: [],
    oneCity: {},
    filter: []
}
const citiesReducer = (state = initialState, action) => {
    switch (action.type) { //Establece la condicion para cada caso

        case "GET_CITIES":
            return {
                ...state,
                cities: action.payload,
                filter: action.payload //se cargan todas la ciudades en filter 
            }
        default:
            return state

        case "GET_ONE_CITY":
            return {
                ...state,
                oneCity: action.payload
            };

        case "FILTER_CITIES":
            const cityFilter = state.cities.filter((cadaCiudad) =>
                cadaCiudad.city.toLowerCase().startsWith(action.payload.toLowerCase().trim()))
            return {
                ...state,
                filter: cityFilter
            }
    }

}
export default citiesReducer