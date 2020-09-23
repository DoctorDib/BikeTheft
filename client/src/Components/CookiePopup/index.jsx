import React, { useState } from 'react';

import Desktop from './Desktop';
import Mobile from './Mobile';

import style from './styles';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

import { useCookie } from "@use-hook/use-cookie";


const Index = () => {
    const classes = style();

    const [cookies, setCookie] = useCookie('CookiePrompt');

    const initial = cookies == undefined || cookies.valid;

    const [cookieState, setState] = useState(initial);

    const saveCookie = () => {
        setState(false);
        setCookie("CookiePrompt", {valid: true});
    }

    return (

        <Drawer anchor={"top"} open={cookieState} >
            <section style={{padding: 10}}>
                <section className={classes.hideOnMobileOnly}>
                    <Desktop clickTrigger={() => {saveCookie()}}/>
                </section>

                <section className={classes.showOnMobileOnly}>
                    <Mobile />
                </section>
            </section>

        </Drawer>
    );
}

export default Index;
