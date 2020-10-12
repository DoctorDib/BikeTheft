import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import styles from './styles';

import Slide from '@material-ui/core/Slide';

// TODO - Will need to change to S3 Bucket link when set up
import Logo from '../../static/img/Logo-Header.png';
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

    const [scrolled,setScrolled] = React.useState(false);
    const handleScroll = () => setScrolled(window.scrollY>100);

    useEffect(() => {
        window.addEventListener('scroll',handleScroll)
    });

    const MainComponent = () => (
        <section className={classes.main}>
            <section className={classes.headerContainer}>
                <div className={classes.logoContainer}>
                    <LogoButton disableRipple className={classes.menuButtons} href="/">
                        <img src={Logo} title="logo" alt="logo" className={classes.logo} />
                    </LogoButton>
                </div>
            </section>
        </section>
    );

    const ScrolledComponent = () => (
        <Slide direction="down" in={true} mountOnEnter unmountOnExit>
            <section className={classes.fixedMain}>
                {MainComponent()}
            </section>
        </Slide>
    );

    return !scrolled ?  MainComponent() : ScrolledComponent();
};

export default DesktopHeader;
