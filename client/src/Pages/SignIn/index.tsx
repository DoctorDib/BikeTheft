import React from 'react';
import { Paper } from '@material-ui/core';
import classNames from 'classnames';

import MainLogoContainer from '../../Components/MainLogo';
import SignInComponent from '../../Components/SignInForm';
import FooterComponent from '../../Components/Footer';
import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

interface ISignInProps {
}

const RegisterPage = (): React.ReactElement<ISignInProps> => {
    const classes: IClasses = styles();

    return (
        <section style={{ display: 'flex' }}>
            <section className={classNames(classes.hideOnMobileOnly, classes.image)}>
                <div className={classes.backgroundImage} />
                <div className={classes.backgroundOverlay} />
            </section>

            <Paper elevation={1} className={classes.mainContainer}>
                <section className={classes.titleContainer}>
                    <MainLogoContainer homeOnClick />
                </section>

                <SignInComponent />

                <FooterComponent />
            </Paper>
        </section>
    );
};

export default RegisterPage;
