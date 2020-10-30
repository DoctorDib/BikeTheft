import React from 'react';

import style from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

// Logo can be static
import Logo from '../../static/img/Logo-Main.png';

interface IMainLogoProps {}

// TODO these props should be used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MainLogo = ():React.ReactElement<IMainLogoProps> => {
    const classes: IClasses = style();

    return (
        <section className={classes.container}>
            <img className={classes.logo} src={Logo} alt="Main Logo" />
        </section>
    );
};

export default MainLogo;
