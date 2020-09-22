import React from 'react';
import styles from 'styles/Default/footerStyle';
import Typography from '@material-ui/core/Typography';
   
const CopyRight = () => {
    const classes = styles();

    return (<div className={classes.copyrightParent}>
        <Typography variant={"body2"} component={'p'} className={classes.copyrightSymbol} > © </Typography>
        <Typography variant={"body2"} component={'p'}>  Copyright (groupname) 2020 </Typography>
    </div>);
}

const Footer = () => {
    const classes = styles();

    return (
        <section style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} className={classes.footerParent}>
            <section>
                {CopyRight()}
            </section>
        </section>
    );
}

export default Footer;