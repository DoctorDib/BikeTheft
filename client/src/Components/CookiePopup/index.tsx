import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { useCookie } from '@use-hook/use-cookie';

import Desktop from './Desktop';
import Mobile from './Mobile';
import style from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

const Index: React.FC = () => {
    const classes: IClasses = style();

    const [cookies, setCookie] = useCookie('CookiePrompt');

    const initial = cookies === undefined || cookies.valid;

    const [cookieState, setState] = useState(initial);

    const saveCookie = () => {
        setState(false);
        setCookie('CookiePrompt', { valid: true });
    };

    return (
        <Drawer anchor="top" open={cookieState}>
            <section style={{ padding: 10 }}>
                <section className={classes.hideOnMobileOnly}>
                    <Desktop
                        clickTrigger={() => {
                            saveCookie();
                        }}
                    />
                </section>

                <section className={classes.showOnMobileOnly}>
                    <Mobile />
                </section>
            </section>
        </Drawer>
    );
};

export default Index;
