import React from 'react';

import style from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

// TODO - Will need to change to S3 Bucket link when set up
import Logo from '../../static/img/Logo-Main.png';

interface IMainLogoProps {
}

// TODO these props should be used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MainLogo: React.FC<IMainLogoProps> = () => {
    const classes: IClasses = style();

    return (
        <section className={classes.container}>
            <img className={classes.logo} src={Logo} alt="Main Logo" />
        </section>
    );
};

export default MainLogo;
