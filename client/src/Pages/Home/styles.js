import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../templates/mainStyle';

export default makeStyles((theme) => ({
    ...mainStyle,

    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh',
        alignItems: 'center',
    },

    topContainer: {
        height: '100%',
        marginTop: '15vh',
    },

    reportButton: {
        width: '200px',
    },

    divider: {
        width: '100%',
        margin: '5vh 0 5vh 0',
        [theme.breakpoints.up('md')]: {
            width: '650px',
        },
    },

    logoContainer: {
        width: '250px',
        margin: '0 auto 0 auto',
        [theme.breakpoints.up('md')]: {
            width: '400px',
        },
    },

    clientLogosParent: {
        display: 'flex',
        justifyContent: 'center',
    },

    titleContainer: {
        width: '100%',
        marginBottom: '2vh',
    },

    mainContentGap: {
        marginTop: '10vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },

    slideContainer: {
        backgroundColor: '#f4f4f4',
        color: '#333',
    },
}));
