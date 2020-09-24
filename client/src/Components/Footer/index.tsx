import React from 'react';
import Typography from '@material-ui/core/Typography';

import styles from './styles';

interface IFooterProps {
    className?: string;
}

const CopyRight = () => {
    const classes: any = styles();

    return (<div className={classes.copyrightParent}>
        <Typography variant={"body2"} component={'p'} className={classes.copyrightSymbol} > © </Typography>
        <Typography variant={"body2"} component={'p'}>  Copyright (groupname) 2020 </Typography>
    </div>);
}

const FooterComponent = (props: IFooterProps) => {
    const classes: any = styles();

    return (
        <section style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} className={classes.footerParent}>
            <section>
                {CopyRight()}
            </section>
        </section>
    );
}

export default FooterComponent;