import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import "../styles/details.css"
import { useDispatch, useSelector } from "react-redux"
import citiesActions from "../redux/actions/citiesActions"
import itinerariesActions from "../redux/actions/itinerariesActions"
import Itinerary from "../components/Itinerary"
import { Link as LinkRouter } from "react-router-dom"


export default function Detail() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [reload, setReload] = React.useState(false)  

    useEffect(() => {
        dispatch(citiesActions.getOneCity(id))
        // eslint-disable-next-line 
    }, [])

    useEffect(() => {
        dispatch(itinerariesActions.readItineraries(id))
        // eslint-disable-next-line
    }, [reload]) //valor de cambio empieza en false

    const city = useSelector((store) => store.citiesReducer.oneCity)
    const itinerary = useSelector((store) => store.itinerariesReducer.itineraries)
    // console.log(itinerary)

    return (
        <>
            <div style={{ backgroundImage: `url("${city.image}")`, backgroundSize: "cover", mb: 0, objectFit: "cover" }}>
                <div className="containerDetails">
                    <p className="txt_details" sx={{ display: { md: "mr: 2", } }} >Welcome to </p>
                    <p className="txt_name_city"><b>{city.city}</b></p>
                </div>
                <div >
                    {itinerary.length > 0 ? (itinerary.map(cardItinerary =>
                        <Itinerary eachItinerary={cardItinerary} reload={reload} setReload={setReload} id={id} key={cardItinerary._id} />
                    )) : <p className='notResults'>There are no results for the search</p>
                    }
                </div>
                <div className="container_button_itinerary">
                    <LinkRouter className="button_itinerary" to="/Cities">
                        Back to Cities
                    </LinkRouter>
                </div>
            </div>


        </>
    )
}

