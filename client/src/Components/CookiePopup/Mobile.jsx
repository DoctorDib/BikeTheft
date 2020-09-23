import React from 'react';

import Button from '@material-ui/core/Button';

import style from './styles';
import { Typography } from '@material-ui/core';

const CookiePopup = props => {
    const classes = style();

    return (

        <section style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
            <section className={classes.mainContentContainer} style={{display: 'flex', backgroundColor: 'white', alignContent: 'center', alignItems: 'center'}}>

                <section style={{width: '100%'}}>
                    <Typography>
                        This website uses cookies. By navigating around this site you consent to cookies being stored on your machine; <Typography component={"a"} href={'/PrivacyPolicy'}> Click here for more information </Typography>.
                    </Typography>

                    <Typography>
                        Please read our <Typography component={"a"} href={'/TermsAndConditions'}> Terms and Conditions </Typography>
                    </Typography>
                </section>
            </section>

            <section style={{width: '25%', display:'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center', paddingTop: '1em'}}>
                <Button onClick={props.clickTrigger} style={{fontWeight: 650, color: '#26844F'}}> Accept </Button>
            </section>

        </section>
    );
}

export default CookiePopup;
