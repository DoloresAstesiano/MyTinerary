import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from "react-redux"
import itinerariesActions from "../redux/actions/itinerariesActions"
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import toast from 'react-hot-toast';
import Comments from '../components/Comments'


import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box'
import { CardActionArea } from '@mui/material';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Itinerary({ eachItinerary, reload, setReload }) {
    // console.log(eachItinerary)
    const [expanded, setExpanded] = React.useState(false);
    const dispatch = useDispatch()
    const user = useSelector(store => store.usersReducer.user)


    async function likesOrDislikes() {
        const res = await dispatch(itinerariesActions.likeDislike(eachItinerary._id))
        setReload(!reload) //me actualiza la llamada al readItineraries (controlador)
        console.log(res)
        if (res.data.success) {
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message)
        }
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    // console.log(eachItinerary)
    return (
        <div className='containerItinerary'>
            <Card className='containerCardItinerary'>
                <div className='container_avatar_txt'>
                    <div className='containerAvatarName'>
                        <Avatar className="avatarItinerary" src={eachItinerary.imageOfThePerson}>
                        </Avatar>
                        <b className='nameOfThePerson' >{eachItinerary.nameOfThePerson}</b>
                    </div>
                    <div className='containerTitleDescription'>
                        <h1 className='titleItinerary'>{eachItinerary.cityItineraryName}</h1>
                        <h4 className='descriptionItinerary'>{eachItinerary.description}</h4>
                    </div>
                </div>
                <div className='containerP_D_H_F_E' sx={{ ml: { md: '5rem' } }}>
                    <div className='containerPriceDuration'>
                        <h3 className='priceItinerary'>Price: {eachItinerary.price}</h3>
                        <h3>Duration: {eachItinerary.duration} Hs.</h3>
                    </div>
                    <CardActions className='containerTagsFavouriteIconExpanMore' disableSpacing>
                        <div className='hashtags'>
                            {eachItinerary.hashtags.map((hash, index) =>
                                <p className='tags' key={index}>{hash}</p>)}
                        </div>
                        <div>
                            {user ?
                                <IconButton onClick={likesOrDislikes} aria-label="add to favorites">
                                    {eachItinerary?.likes.includes(user.id) ?
                                        <FavoriteIcon style={{ color: "red" }} />
                                        :
                                        <FavoriteBorderIcon />}
                                    <Typography>{eachItinerary.likes.length}</Typography>
                                </IconButton>
                                :
                                <IconButton aria-label="add to favorites">
                                    <FavoriteBorderIcon />
                                    <Typography>{eachItinerary.likes.length} </Typography>
                                </IconButton>
                            }
                        </div>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                </div>
                <Collapse in={expanded} timeout="auto" unmountOnExit className='containerDropdownPader'>
                    <div className='containerDropdown'>
                        <div className='titleActivities'>
                            <p>ACTIVITIES</p>
                        </div>
                        <div className='containerActivitiesPather'>
                            {eachItinerary.activitiesId.length > 0 ?
                                eachItinerary.activitiesId.map(activity =>

                                    <Card className="containerCardCitiesMap" sx={{ width: 250, height: 300, m: 2 }} key={activity._id} style={{ backgroundImage: `url("${activity.imageActivity}")`, backgroundSize: "cover" }}>
                                        <CardActionArea className="cardCitiesMap" >
                                            <CardContent className='txt_citiesMap'>
                                                <Typography>
                                                    {activity.activity}
                                                </Typography>
                                            </CardContent>
                                            <CardActions className="container_button">
                                            </CardActions>
                                        </CardActionArea>
                                    </Card>
                                )
                                :
                                <p> not result</p>
                            }
                        </div>
                        <Comments eachItinerary={eachItinerary} reload={reload} setReload={setReload} />
                    </div>
                </Collapse>
            </Card>
        </div>
    );
}
