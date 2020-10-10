import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

import styles from './styles';
import Logo from '../../static/img/Logo.png';
import { IClasses } from '../../Common/Interfaces/IClasses';

const LogoButton = withStyles({
    root: {
        padding: 0,

        '&:hover': {
            // you want this to be the same as the backgroundColor above
            backgroundColor: '#FFF',
        },
    },
})(Button);

const DesktopHeader: React.FC = () => {
    const classes: IClasses = styles();

    return (
        <section className={classes.main}>
            <section className={classes.headerContainer}>
                <div className={classes.logoContainer}>
                    <LogoButton disableRipple className={classes.menuButtons} href="/">
                        <img src={Logo} title="logo" alt="logo" className={classes.logo} />
                    </LogoButton>
                </div>
                <Typography variant="body1"> Lost My Wheels </Typography>
            </section>
        </section>
    );
};

export default DesktopHeader;
