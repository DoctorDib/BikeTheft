import { makeStyles } from '@material-ui/core/styles';
import mainStyle from 'templates/mainStyle';

export default makeStyles(theme => ({
    ...mainStyle,

    logo: {
        height: '50px'
    },

    logoContainer: {
        padding: '10px',
        paddingLeft: 0
    },

    menuLogoContainer: {
        width: '50%',
        display: 'flex',
    },

    headerContainer: {
        display: 'flex',
        alignItems: 'center'
    }
}));
