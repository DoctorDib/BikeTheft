import React from 'react';

import { Avatar, Typography } from '@material-ui/core';

import PostTypeEnum from '../../Common/Enums/PostTypeEnums';

import { IComment } from '../../Common/Interfaces/interfaces';
import { IClasses } from '../../Common/Interfaces/IClasses';

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

export const FormatAvatar = (comment: IComment, classes: IClasses): any => {
    const image =
        comment.type === 1
            ? `../static/media/${comment.member_attributes.profile_image}`
            : 'I';
    const name =
        comment.type === 2
            ? 'Info'
            : `${comment.member_attributes.display_name}`;
    const avatarColour = comment.type === 2 ? '#ff8e15' : 'gray';

    return (
        <section className={classes.postContainer}>
            <section className={classes.avatarContainer}>
                <Avatar
                    alt="Remy Sharp"
                    src={image}
                    className={classes.profileImage}
                    style={{ backgroundColor: avatarColour }}
                >
                    {image}
                </Avatar>
                <section className={classes.avatarText}>
                    <Typography variant="subtitle1">{name}</Typography>
                    <Typography variant="caption">
                        {comment.date_added}
                    </Typography>
                </section>
            </section>
        </section>
    );
};
