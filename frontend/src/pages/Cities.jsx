import React, { useState, useEffect } from "react";
import "../styles/cities.css";
import CitiesMap from "../components/CitiesMap";
import Response from "../components/Response";
import { useDispatch, useSelector } from "react-redux";
import citiesActions from "../redux/actions/citiesActions";



function CardsCities() {

  const [inputValue, setInputValue] = useState("")//el estado lo iniciamos en cero y luego lo actualizamos con el setImputValue
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(citiesActions.filterCities(inputValue))
    // eslint-disable-next-line
  }, [inputValue])

  const cityFilter = useSelector((store) => store.citiesReducer.filter)
  return (
    <div className="containerCitiesPage">
      <div className="search_container">
        <input className="inputCity" onKeyUp={(e) => { setInputValue(e.target.value) }} type="text" title="Search" placeholder="Search by City"></input>
      </div>
      <div className="containerCards">
        {cityFilter.length > 0 ? <CitiesMap cardsFilter={cityFilter} className="cards" /> : <Response />};
      </div>
    </div>
  );
}

export default CardsCities
