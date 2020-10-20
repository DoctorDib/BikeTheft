import React from 'react';
import { Typography } from '@material-ui/core';

import style from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

const AboutInfo: React.FC = () => {
    const classes: IClasses = style();

    return (
        <section className={classes.container}>
            <section>
                <Typography variant="h5"> Who are we? </Typography>
                <Typography variant="body1">
                    We are a group of 4 developers that have recently graduated with a bachelor&apos;s degree in
                    Software Engineering and Computer Science. Our main goal is to give the public a tool to freely
                    report their own vehicles as stolen or have free access to a large database of stolen vehicles. This
                    tool will mainly be aimed at those who find suspicious vehicles and want to check on our database if
                    it has been classed as stolen, then with ease contact the rightful owner.
                </Typography>
            </section>

            <section>
                <Typography variant="h5"> How do we make profit? </Typography>
                <Typography variant="body1">
                    Simple answer, we do not make any profit from this. This project is completely funded from the money
                    out of our own pockets as well as a few nice donations from you users while running additional ads
                    to help keep the servers on.
                </Typography>
            </section>

            <section>
                <Typography variant="h5"> Is my data secure? </Typography>
                <Typography variant="body1">
                    Yes, your data is securely stored on a database. We do not and never will think about selling your
                    data onto third party companies and you are free to request to either view or remove your data from
                    our database.
                </Typography>
            </section>

            <section>
                <Typography variant="h6"> Please see our policies: </Typography>
            </section>
        </section>
    );
};

export default AboutInfo;
