import './App.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';


function App() {
    const [data, setData] = useState([]);
    const [likedData, setLikedData] = useState([]);
    const [mode, setMode] = useState(0);
    const actions = [
        { icon: <ModeNightIcon />, name: 'Dark Mode', click: () => modeHandler(1)},
        { icon: <WbSunnyIcon />, name: 'Light Mode', click: () => modeHandler(0)},
    ];
    useEffect(() => {
        loadData();
        console.log(likedData);
    }, []);

    const likeHandler = (show) => {
        setLikedData([...likedData, show]);
    }

    const modeHandler = (data) => {
        setMode(data);
    }

    const deleteHandler = (show) => {
        console.log(show);
        setLikedData(likedData.filter((e) => (e !== show)));
        console.log(likedData);
    }
    const loadData = async () => {
        const result = await axios.get("https://api.tvmaze.com/shows/1/episodes");
        setData(result.data.slice(0, 15));
    }
    return (
        <><Grid sx={{ backgroundColor: mode ? '#404040' : ''}} container >
                <Grid item xs={6} sx={{ backgroundColor: mode ? '#404040' : ''}}>
                    <div className={"section1" + mode ? "dark" : "light"}>
                        <h2 style={{color: mode ? '#bfbfbf' : ''}}>Shows</h2>
                        <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper', margin: '0 auto', backgroundColor: mode ? '#b3b3b3' : ''}} >
                            {data.map((show) => (
                                <><ListItem key={show.id.toString()} alignItems="flex-start" className={"item" + mode ? "dark" : "light"}>
                                    <ListItemAvatar key={show.id.toString()} >
                                        <IconButton >
                                            <FavoriteIcon fontSize="large" onClick={() => likeHandler(show)} color="error"></FavoriteIcon>
                                        </IconButton>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={show.name}
                                        secondary={<React.Fragment>
                                            {"Average Rating:" + show.rating.average}
                                        </React.Fragment>} />
                                </ListItem>
                                    <Divider variant="inset" component="li" />
                                </>
                            ))}

                        </List>
                    </div>
                </Grid>
                <Grid item xs={6} sx={{ backgroundColor: mode ? '#404040' : ''}}>
                    <div className={"section2" + mode ? "dark" : "light"}>
                        <h2 style={{color: mode ? '#bfbfbf' : ''}}>Liked Shows</h2>
                        {likedData.length > 0 && 
                        <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper', margin: '0 auto', backgroundColor: mode ? '#b3b3b3' : ''}} >
                            {likedData.filter(function (elem, pos) {
                                return likedData.indexOf(elem) == pos;
                            }).map((show) => (
                                <><ListItem alignItems="flex-start">
                                    <ListItemAvatar >
                                        <IconButton >
                                            <DeleteIcon fontSize="large" onClick={() => deleteHandler(show)} color="warning"></DeleteIcon>
                                        </IconButton>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={show.name}
                                        secondary={<React.Fragment>
                                            {"Average Rating:" + show.rating.average}
                                        </React.Fragment>} />
                                </ListItem>
                                    <Divider variant="inset" component="li" />
                                </>
                            ))}
                        </List>
                        }   
                        {likedData.length <= 0 && 
                        <h3 style={{color: mode ? '#bfbfbf' : ''}}>No Liked Shows</h3>
                        }
                    </div>
                </Grid>
            </Grid><Box >
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon color="inherit" />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        onClick={action.click}
                        tooltipTitle={action.name} />
                ))}
            </SpeedDial>
        </Box></>
    );
}

export default App;
