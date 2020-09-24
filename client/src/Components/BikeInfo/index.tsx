import React from 'react';
import { 
    Typography,
    Grid,
    List,
    ListItem,
    ListItemText
} from '@material-ui/core';

import style from './styles';

// TODO - Remove when we have an operation database
import data from '../../tmp_bike_data.json';

// TODO move these interfaces to common place if needed
interface IGrid {
    number_plate: string;
    vin: string;
    make: string;
    model: string;
    primary_colour: string;
    secondary_colour: string;
}

interface IBike {
    status: number;
    datetime_reported: string;
    damages: ReadonlyArray<string>;
    picture: string
    other_description: string;
    grid: IGrid;
}

interface IOwner {
    user_id: number;
    title: number;
    first_name: string;
    last_name: string;
    email: string;
    contact_no: string;
} // TODO consistent naming

interface IBikeInfoProps {

}

const Main = (props: IBikeInfoProps) => {
    const classes: any = style();

    const owner: IOwner = data.owner;
    const bike: IBike = data.bike;

    // temp
    const title = (title_id: number): string | undefined => {
        if (title_id == 1) {
            return "Mr.";
        }
    };

    const first_name = (firstName: string): string => {
        return firstName[0].toUpperCase() + ".";
    };

    const status = (status_id: number): ReadonlyArray<string> => {
        switch(status_id){
            case 1: return ["Stolen", "red"];
            case 2: return ["Pending collection", "orange"];
            case 3: return ["Found and collected", "green"];
            default: return [""];
        }
    };

    const format_key = (key: string): string => {
        let returnKey = key.split('_');

        for(let i=0; i<returnKey.length; i++) {
            returnKey[i] = returnKey[i].charAt(0).toUpperCase()+ returnKey[i].substring(1)
        }

        return returnKey.join(' ');
    }

    const layoutGrid = Object.entries(bike.grid).map((_, index: number) => {
        const thisKey: string = Object.keys(bike.grid)[index];
        return (
            <Grid container>
                <Grid item xs={6}>
                    <Typography>{format_key(thisKey)}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography> {thisKey == "" ? "N/A" : thisKey} </Typography>
                </Grid>
            </Grid>
        )
    });

    const Damages = bike.damages.map((damage: string) => {
        return (
            <ListItem>
                <ListItemText primary={damage} />
            </ListItem>
        )
    });

    const stat: ReadonlyArray<string> = status(bike.status);

    return (
        <section className={classes.container}>

            <section className={classes.topSection}>
                <section className={classes.imageContainer}>
                    {/*temp*/}
                    <img className={classes.image} src={require('static/img/bikes/' + bike.picture)} />
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
