import React from 'react';

import style from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

// Logo can be static
import Logo from '../../static/img/Logo-Main.png';

interface IMainLogoProps {
    homeOnClick?: boolean,
}

// TODO these props should be used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MainLogo = (props:IMainLogoProps):React.ReactElement<IMainLogoProps> => {
    const { homeOnClick } = props;
    const classes: IClasses = style();

    const onClick = ():void => {
        if (homeOnClick === null || !homeOnClick) { return; }
        window.location.href = '/';
    };

    return (
        <section className={classes.container} onClick={onClick}
        style={{cursor: homeOnClick ? 'pointer' : 'arrow'}}>
            <img 
                className={classes.logo} 
                src={Logo} alt="Main Logo" 
                
            />
        </section>
    );
};

export default MainLogo;
