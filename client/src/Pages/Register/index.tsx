import React from 'react';
import { Paper } from '@material-ui/core';
import classNames from 'classnames';

import MainLogoContainer from '../../Components/MainLogo';
import RegisterComponent from '../../Components/RegisterForm';
import FooterComponent from '../../Components/Footer';
import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

interface IRegisterProps {
}

const RegisterPage = (): React.ReactElement<IRegisterProps> => {
    const classes: IClasses = styles();

    return (
        <section style={{display: 'flex'}}>
            <section className={classNames(classes.hideOnMobileOnly, classes.leftImage)}>
                <div className={classes.backgroundImage} />
                <div className={classes.backgroundOverlay} />
            </section>

            <Paper elevation={1} className={classes.mainContainer}>
                <section className={classes.titleContainer}>
                    <MainLogoContainer homeOnClick />
                </section>

                <RegisterComponent />

                <FooterComponent />
            </Paper>
        </section>
    );
};

export default RegisterPage;
