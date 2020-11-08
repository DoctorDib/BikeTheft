import React, {
    useEffect,
    useRef,
    useState,
} from 'react';
import { useHistory } from 'react-router';
import {
    Button,
    Menu,
    MenuItem,
    Slide,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import {
    AccountCircle,
    ExitToApp,
} from '@material-ui/icons';

import styles from './styles';

import { IClasses } from '../../Common/Interfaces/IClasses';
import ProfileImageSize from '../ProfileImage/ProfileImageSizeEnum';
import ProfileImage from '../ProfileImage';
// TODO - Will need to change to S3 Bucket links when set up
import Logo from '../../static/img/Logo-Header.png';
import DefaultUserImage from '../../static/img/DefaultUser.jpg';
import { isNullOrUndefined } from '../../Common/Utils/Types';

const LogoButton = withStyles({
    root: {
        padding: 0,

        '&:hover': {
            // you want this to be the same as the backgroundColor above
            backgroundColor: '#FFF',
        },
    },
})(Button);

const DesktopHeader = (): React.ReactElement => {
    const classes: IClasses = styles();

    const [scrolled, setScrolled] = useState<boolean>(false);
    const [profileContextOpen, setProfileContextOpen] = useState<boolean>(false);

    const profileImageRef: React.RefObject<HTMLDivElement> | null | undefined = useRef(null);
    const profilePopperRef: React.RefObject<HTMLDivElement> | null | undefined = useRef(null);

    const history = useHistory();

    const onScroll = (): void => {
        setScrolled(window.scrollY > 100);
        setProfileContextOpen(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const onProfileClick = (): void => {
        setProfileContextOpen(!profileContextOpen);
        if (!isNullOrUndefined(profilePopperRef.current)) {
            profilePopperRef.current.focus();
        }
    };

    const onProfileFocusLost = (): void => {
        setProfileContextOpen(false);
    };

    const onClickToProfile = (): void => {
        setProfileContextOpen(false);
        history.push('/profile');
    };

    const onClickToLogout = (): void => {
        setProfileContextOpen(false);
        // TODO sign out here
    };

    const onClickToLogin = (): void => {
        // TODO put sign in here
    };

    // TODO load in real user image & username
    const username: string | undefined = 'B';

    const MainComponent = () => (
        <>
            <section className={classes.main}>
                <div className={classes.widthContainer}>
                    <div aria-label="Anti-profile image" style={{ width: ProfileImageSize.navbarSize }} />
                    <section className={classes.headerContainer}>
                        <div className={classes.logoContainer}>
                            <LogoButton disableRipple className={classes.menuButtons} href="/">
                                <img src={Logo} title="logo" alt="logo" className={classes.logo} />
                            </LogoButton>
                        </div>
                    </section>
                    <div
                        className={classes.profileImageContainer}
                        onClick={username !== undefined ? onProfileClick : onClickToLogin}
                        role="button"
                        tabIndex={0}
                        onKeyDown={username !== undefined ? onProfileClick : onClickToLogin}
                        ref={profileImageRef}
                    >
                        { username !== undefined ? (
                            <ProfileImage
                                size={ProfileImageSize.navbarSize}
                                imageSrc={DefaultUserImage}
                                username={username}
                            />
                        ) : 'Sign In' }
                    </div>
                </div>
            </section>

            {/* // TODO make this its own component at the behest of james */}
            <Menu
                anchorEl={profileImageRef.current}
                keepMounted
                open={profileContextOpen}
                onClose={onProfileFocusLost}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                style={{
                    top: !isNullOrUndefined(profileImageRef.current) ? `${profileImageRef.current.getBoundingClientRect().bottom - 2}px` : '0',
                }}
                disableScrollLock
            >
                <MenuItem onClick={onClickToProfile} className={classes.spaceItemsEvenly}>
                    Profile
                    <AccountCircle className={classes.spaceLeft} />
                </MenuItem>
                <MenuItem onClick={onClickToLogout} className={classes.spaceItemsEvenly}>
                    Logout
                    <ExitToApp className={classes.spaceLeft} />
                </MenuItem>
            </Menu>
        </>
    );

    const ScrolledComponent = () => (
        <Slide direction="down" in mountOnEnter unmountOnExit>
            <section className={classes.fixedMain}>
                { MainComponent() }
            </section>
        </Slide>
    );

    return scrolled ? ScrolledComponent() : MainComponent();
};

export default DesktopHeader;
