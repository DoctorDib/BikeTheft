import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../templates/mainStyle';

export default makeStyles((theme) => ({
    ...mainStyle,

    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
    },

    messageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '65%',
        },
    },

    textBoxContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            maxWidth: '75%',
        },
    },

    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '15px',
    },

    waitingText: {
        color: 'red',
        display: 'flex',
        justifyContent: 'center',
    },

    infoButton: {
        width: '35%',
    },

    layoutComment: {
        margin: '25px 0 0 0',
    },
}));
