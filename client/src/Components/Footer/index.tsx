import React from 'react';
import Typography from '@material-ui/core/Typography';

import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

interface IFooterProps {
    className?: string;
}

const Copyright = () => {
    const classes: IClasses = styles();

    return (
        <div className={classes.copyrightParent}>
            <Typography variant="body2" component="p" className={classes.copyrightSymbol}>
                ©
            </Typography>
            <Typography variant="body2" component="p">
                Copyright (groupname) 2020
            </Typography>
        </div>
    );
};

// TODO these props should be used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FooterComponent: React.FC<IFooterProps> = (props: IFooterProps) => {
    const classes = styles();

    return (
        <section
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            className={classes.footerParent}
        >
            <section>{Copyright()}</section>
        </section>
    );
};

export default FooterComponent;
