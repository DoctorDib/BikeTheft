import React from 'react';
import {
    Button,
    ButtonGroup,
    Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';
import NavBarComponent from '../../Components/Header';
import FooterComponent from '../../Components/Footer';
import ProfileImage from '../../Components/ProfileImage';
import ProfileImageSize from '../../Components/ProfileImage/ProfileImageSizeEnum';
import DefaultUserImage from '../../static/img/DefaultUser.jpg';
import LabelledCounter from '../../Components/LabelledCounter';

// TODO for the page component:
// ! pull user data

function ProfilePage(): React.ReactElement {
    const classes: IClasses = styles();

    // TODO load acc data & values for LabelledCounters
    const username = 'Sexy boy 420';

    const onSettingsClick = (): void => {
        // TODO once settings page exists link to it here like so
        // history.push('/settings');
    };

    const onDeleteClick = (): void => {
        // TODO once delete functionality in place, show 'ARE YOU SURE?' prompt
        // and then allow user to delete acc
    };

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

                <div className={classes.counterContainer}>
                    <LabelledCounter
                        title="Vehicles Found"
                        value={0}
                    />
                    <LabelledCounter
                        title="Comments Made"
                        value={0}
                    />
                    <LabelledCounter
                        title="Praises Given"
                        value={0}
                    />
                </div>

                <div className={classes.postsContainer}>
                    User Posts to be listed here
                </div>

                <div className={classes.settingButtonsContainer}>
                    <ButtonGroup>
                        <Button onClick={onSettingsClick}>Account Settings</Button>
                        <Button
                            className={classes.deleteButton}
                            endIcon={<DeleteIcon />}
                            onClick={onDeleteClick}
                        >
                            Delete Account
                        </Button>
                    </ButtonGroup>
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
