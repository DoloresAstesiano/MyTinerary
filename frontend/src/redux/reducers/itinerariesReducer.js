const initialState = {
    itineraries: []

}
const itinerariesReducer = (state = initialState, action) => {
    switch (action.type) { //Establece la condicion para cada caso
        case "READ_ITINERARIES":
            return {
                ...state,
                itineraries: action.payload
            }
        default:
            return state
    }
}
export default itinerariesReducer