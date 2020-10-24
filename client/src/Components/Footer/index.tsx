import React from 'react';
import Typography from '@material-ui/core/Typography';

import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

interface IFooterProps {
}

const FooterComponent = (props: IFooterProps): React.ReactElement<IFooterProps> => {
    const classes: IClasses = styles();

    return (
        <section
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            className={classes.footerParent}
        >
            <section>
                <div className={classes.copyrightParent}>
                    <Typography variant="body2" component="p" className={classes.copyrightSymbol}>
                        ©
                    </Typography>
                    <Typography variant="body2" component="p">
                        Copyright Lost My Wheels 2020
                    </Typography>
                </div>
            </section>
        </section>
    );
};

export default FooterComponent;
