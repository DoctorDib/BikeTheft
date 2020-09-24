import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

import styles from './styles';

const LOGO_IMAGE_SRC: string = '../../static/img/Logo.png';

const LogoButton = withStyles({
    root: {
        padding: 0,

        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "#FFF"
        }
    },
})(Button);

const DesktopHeader = () => {
    const classes: any = styles();

    return (
        <section style={{boxShadow: 'rgba(0, 0, 0, 0.23) 0px .25px 1px 0px', width: '100vw', display: 'flex', justifyContent: 'center'}} >
            <section className={classes.headerContainer}>
                <div className={classes.logoContainer}>
                    <LogoButton disableRipple={true} className={classes.menuButtons} href={'/'}>
                        <img src={LOGO_IMAGE_SRC} title='logo' alt="logo" className={classes.logo} />
                    </LogoButton>
                </div>
                <Typography variant={"body1"} > Bike Bounty </Typography>
            </section>
        </section>
    );
}

export default DesktopHeader;
