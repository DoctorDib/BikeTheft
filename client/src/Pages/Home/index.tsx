import React from 'react';

import LogoComponent from '../../Components/MainLogo';
import FooterComponent from '../../Components/Footer';
import style from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

interface IHomeProps {
}

// TODO these props should be used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HomePage: React.FC<IHomeProps> = (props: IHomeProps) => {
    const classes: IClasses = style();

    return (
        <section className={classes.body}>
            <section className={classes.mainContentGap}>
                <LogoComponent />
            </section>

            <section className={classes.mainContentGap}>
                <FooterComponent className={classes.mainContentGap} />
            </section>
        </section>
    );
};

export default HomePage;
