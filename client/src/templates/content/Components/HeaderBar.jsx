import React from 'react';
import Button from '@material-ui/core/Button';
import styles from 'styles/Default/headerBarStyle';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import Logo from '../../../img/Logo.png';

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
    const classes = styles();

    return (
        <section style={{boxShadow: 'rgba(0, 0, 0, 0.23) 0px .25px 1px 0px', width: '100vw', display: 'flex', justifyContent: 'center'}} >
            <section className={classes.headerContainer}>
                <div className={classes.logoContainer}>
                    <LogoButton disableRipple={true} className={classes.menuButtons} href={'/'}> 
                        <img src={Logo} title='logo' alt="logo" className={classes.logo} /> 
                    </LogoButton>
                </div>
                <Typography variant={"body1"} > Bike Theft </Typography>
            </section>
        </section>
    );
}

export default DesktopHeader;