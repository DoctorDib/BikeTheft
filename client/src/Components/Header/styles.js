import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../templates/mainStyle';

export default makeStyles(() => ({
    ...mainStyle,

    logo: {
        height: '50px',
    },

    main: {
        boxShadow: 'rgba(0, 0, 0, 0.23) 0px .25px 1px 0px',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'white',
    },

    fixedMain: {
        position: 'fixed',
        left: 0,
        zIndex: '10',
    },

    logoContainer: {
        padding: '10px',
        paddingLeft: 0,
    },

    menuLogoContainer: {
        width: '50%',
        display: 'flex',
    },

    headerContainer: {
        display: 'flex',
        alignItems: 'center',
    },
}));
