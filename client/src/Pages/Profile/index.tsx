import React from 'react';
import { Typography } from '@material-ui/core';

import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';
import NavBarComponent from '../../Components/Header';
import FooterComponent from '../../Components/Footer';
import ProfileImage from '../../Components/ProfileImage';
import ProfileImageSize from '../../Components/ProfileImage/ProfileImageSizeEnum';
import DefaultUserImage from '../../static/img/DefaultUser.jpg';
import LabelledCounter from '../../Components/LabelledCounter';

interface IProfilePageProps {
}

// TODO for the page component:
// ! link to this page from all places that the profile should be reachable
// ! add all elements to page from mock image
// ! styling
// ! pull data for stats
// ! pull user image
// ! acc settings
// ! acc delete

// TODO these props should be used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ProfilePage(props: IProfilePageProps): React.ReactElement {
    const classes: IClasses = styles();

    // TODO load from acc data
    const username = 'Sexy boy 420';

    return (
        <section className={classes.body}>
            <section id="menu" className={classes.menu}>
                <NavBarComponent />
            </section>

            <section className={classes.profileContainer}>
                <div
                    className={classes.centerContent}
                    style={{
                        gridRow: '1 / 2',
                    }}
                >
                    <ProfileImage
                        size={ProfileImageSize.profilePageSize}
                        imageSrc={DefaultUserImage}
                        username={username}
                    />
                </div>
                <div
                    className={classes.centerContent}
                    style={{
                        gridRow: '2 / 3',
                    }}
                >
                    <Typography variant="h4">{username}</Typography>
                </div>

                <div style={{
                    gridRow: '3 / 4',
                }}
                >
                    <LabelledCounter />
                </div>
                <div style={{
                    gridRow: '3 / 4',
                }}
                >
                    <LabelledCounter />
                </div>
                <div style={{
                    gridRow: '3 / 4',
                }}
                >
                    <LabelledCounter />
                </div>
            </section>

            <section className={classes.mainContentGap}>
                <FooterComponent />
            </section>
        </section>
    );
}

ProfilePage.displayName = 'ProfilePage';
export default ProfilePage;
