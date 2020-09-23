import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import style from 'styles/Bike/detailsStyle';

import { Typography } from '@material-ui/core';

// TODO - Remove when we have an operation database
import data from 'tmp_bike_data.json';

const Main = props => {
    const classes = style();

    const owner = data.owner;
    const bike = data.bike;

    // temp
    const title = title_id => {
        if (title_id == 1) {
            return "Mr.";
        }
    };

    const first_name = firstname => {
        return firstname[0].toUpperCase() + ".";
    };

    const status = status_id => {
        switch(status_id){
            case 1: return ["Stolen", "red"];
            case 2: return ["Pending collection", "orange"];
            case 3: return ["Found and collected", "green"];
        }
    };

    const format_key = key => {
        let returnKey = key.split('_');
        
        for(let i=0; i<returnKey.length; i++) {
            returnKey[i] = returnKey[i].charAt(0).toUpperCase()+ returnKey[i].substring(1)
        }

        return returnKey.join(' ');
    }

    const layoutGrid = Object.keys(bike.grid).map(key => {
        return (
            <Grid container>
                <Grid item xs={6}>
                    <Typography>{format_key(key)}</Typography>
                </Grid>
                <Grid item xs={6}>
                    
                    <Typography> {bike.grid[key] == "" ? "N/A" : bike.grid[key]} </Typography>
                </Grid>
            </Grid>
        )
    });

    const Damages = bike.damages.map(damage => {
        
        return (
            <ListItem>
                <ListItemText primary={damage} />
            </ListItem>
        )
    });

    const stat = status(bike.status);
    
    return (
        <section className={classes.container}> 
            
            <section className={classes.topSection}>
                <section className={classes.imageContainer}> 
                    {/*temp*/}
                    <img className={classes.image} src={require('img/bikes/' + bike.picture)} />
                </section>

                <section className={classes.owner}>
                    <Typography variant="h6"> {title(owner.title)} {first_name(owner.first_name)} {owner.last_name} </Typography>
                    <Typography variant="caption"> {bike.datetime_reported} </Typography>
                    <Typography variant="h5" style={{color: stat[1]}} className={classes.statusText}> {stat[0]} </Typography> 
                </section>

                
                <section>
                    <Typography className={classes.titles}>Information</Typography>
                    {layoutGrid}    
                </section>
                
                <section>
                    <Typography className={classes.titles}>Additional damages</Typography>
                    <List dense={true}>
                        {Damages}
                    </List>
                </section>

                <section>
                    <Typography className={classes.titles}>Additional description</Typography>
                    <Typography>{bike.other_description}</Typography>
                </section>
            </section>

        </section>
    );
}

export default Main;