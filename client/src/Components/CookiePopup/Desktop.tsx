/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import style from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

export interface ICookiePopupProps {
    clickTrigger?: () => void;
}

const CookiePopup = (props: ICookiePopupProps): React.ReactElement<ICookiePopupProps> => {
    const { clickTrigger } = props;
    const classes: IClasses = style();

    return (
        <section
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
            }}
        >
            <section
                className={classes.mainContentContainer}
                style={{
                    display: 'flex',
                    backgroundColor: 'white',
                    alignContent: 'center',
                    alignItems: 'center',
                }}
            >
                <section style={{ width: '75%' }}>
                    <Typography>
                        This website uses cookies. By navigating around this site you consent to cookies being stored on
                        your machine;
                        <Typography component="a" href="/PrivacyPolicy">
                            Click here for more information
                        </Typography>
                        .
                    </Typography>

                    <Typography>
                        Please read our
                        <Typography component="a" href="/TermsAndConditions">
                            Terms and Conditions
                        </Typography>
                    </Typography>
                </section>

                <section
                    style={{
                        width: '25%',
                        display: 'flex',
                        alignItems: 'center',
                        alignContent: 'center',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button onClick={clickTrigger} style={{ fontWeight: 650, color: '#26844F' }} color="primary">
                        Accept
                    </Button>
                </section>
            </section>
        </section>
    );
};

export default CookiePopup;
