import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import NavBarComponent from '../../Components/Header';
import FooterComponent from '../../Components/Footer';

import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

interface IErrorPageProps {}

const ErrorPage = ():React.ReactElement<IErrorPageProps> => {
    const classes: IClasses = styles();

    const GoBack = () => window.history.back();

    return (
        <section className={classes.body}>
            <section id="menu" className={classes.menu}>
                <NavBarComponent />
            </section>

            <section
                className={classes.mainContentContainer}
                style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    marginTop: '4vh',
                }}
            >
                <section style={{ width: '100%' }}>
                    <Typography variant="h3" style={{ fontWeight: 650 }}>
                        Error 404
                    </Typography>
                </section>

                <section className={classes.errorContentContainer}>
                    <section className={classes.sorryText}>
                        <Typography variant="h4" style={{ fontWeight: 650 }}>
                            Sorry!
                        </Typography>
                    </section>

                    <section
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '5vh',
                        }}
                    >
                        <Button
                            color="primary"
                            style={{ color: '#26844F' }}
                            className={classes.menuButtons}
                            onClick={GoBack}
                        >
                            Go Back
                        </Button>
                        <Button color="primary" style={{ color: '#26844F' }} className={classes.menuButtons} href="/">
                            Go to the Home Page
                        </Button>
                    </section>
                </section>
            </section>

            <section className={classes.mainContentGap}>
                <FooterComponent />
            </section>
        </section>
    );
};

export default ErrorPage;
