import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';

import NavBarComponent from '../../Components/Header';
import FooterComponent from '../../Components/Footer';
import RegisterComponent from '../../Components/RegisterForm';

import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

interface IRegisterProps {
}

const RegisterPage = (): React.ReactElement<IRegisterProps> => {
    const classes: IClasses = styles();


    return (
        <section className={classes.body}>
            <section id="menu" className={classes.menu}>
                <NavBarComponent />
            </section>

            <section style={{ width: '100%' }}>
                <RegisterComponent />
            </section>

            <section className={classes.mainContentGap}>
                <Divider variant="middle" />
            </section>

            <section className={classes.mainContentGap}>
                <FooterComponent />
            </section>
        </section>
    );
};

export default RegisterPage;
