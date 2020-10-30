import React from 'react';
import Avatar from '@material-ui/core/Avatar';

import ProfileImageSize from './ProfileImageSizeEnum';

interface IProfileImageProps {
    imageSrc?: string;
    size: ProfileImageSize | string; // Using css size values
    altText?: string;
    username: string; // Used as fallback, can be firstname instead
}

function ProfileImage(props: IProfileImageProps): React.ReactElement {
    const {
        imageSrc, // TODO get from username?
        size,
        altText,
        username,
    } = props;

    return (
        <Avatar
            style={{
                height: size,
                width: size,
            }}
            alt={altText !== undefined ? altText : username}
            src={imageSrc}
        >
            {/* if image doesn't exist then we use letter avatar instead by passing first letter of username */}
            {username.length > 0 ? username[0] : '?'}
        </Avatar>
    );
}

export default ProfileImage;
