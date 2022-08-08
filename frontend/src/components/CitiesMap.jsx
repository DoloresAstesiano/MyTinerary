import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { Link as LinkRouter } from "react-router-dom";
import "../styles/cities.css"

export default function cardsCities({ cardsFilter }) {
  return (
    cardsFilter.map(eachCity => {
      return (
        <Card className="containerCardCitiesMap" sx={{ width: 250, height: 300, m: 2 }} key={eachCity._id} style={{ backgroundImage: `url("${eachCity.image}")`, backgroundSize: "cover" }}>
          <CardActionArea className="cardCitiesMap" >
            <CardContent className='txt_citiesMap'>
              <Typography>
                {eachCity.city}
              </Typography>
              <Typography>
                {eachCity.country}
              </Typography>
            </CardContent>
            <CardActions className="container_button">
              <LinkRouter className="button_card" to={`/CitiesMap/${eachCity._id}`}>
                View More
              </LinkRouter>
            </CardActions>
          </CardActionArea>
        </Card>
      )
    })
  );
}
