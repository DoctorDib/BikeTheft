import React from 'react';

import { Avatar, Typography } from '@material-ui/core';

import PostTypeEnum from '../../Common/Enums/PostTypeEnums';

import { formatDate } from '../../Common/Helpers/helper';
import { IComment } from '../../Common/Interfaces/interfaces';
import { IClasses } from '../../Common/Interfaces/IClasses';

const UserImages = import.meta.env.SNOWPACK_PUBLIC_USERIMAGES;

export const FormatPostBackground = (styleID: number): string => {
    switch (styleID) {
        case PostTypeEnum.OWNER:
        case PostTypeEnum.USER:
            return 'white';
        case PostTypeEnum.INFO:
            return '#e3e3e3';
        default:
            return 'black';
    }
};

export const FormatAvatar = (comment: IComment, classes: IClasses, showAvatar:boolean):React.ReactElement => {
    const image = comment.type === 1
        ? `${UserImages}${comment.member_attributes.profile_image}`
        : 'I';
    const name = comment.type === 2
        ? 'Info'
        : `${comment.member_attributes.display_name}`;

    const avatarColour = comment.type === 2 ? '#ff8e15' : 'gray';

    return (
        <section className={classes.quotePostContainer}>
            <section className={classes.avatarContainer}>
                {showAvatar
                    ? (
                        <Avatar
                            alt="Remy Sharp"
                            src={image}
                            className={classes.profileImage}
                            style={{ backgroundColor: avatarColour }}
                        >
                            {image}
                        </Avatar>
                    )
                    : null}
                <section className={classes.avatarText}>
                    <Typography variant={showAvatar ? 'subtitle1' : 'subtitle2'}>{name}</Typography>
                    <Typography variant="caption">{formatDate(comment.date_added)}</Typography>
                </section>
            </section>
        </section>
    );
};
