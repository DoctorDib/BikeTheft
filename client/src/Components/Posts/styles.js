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
    },

    textBox: {
        width: '100%',
        maxWidth: '75%',
        padding: '10px 12px 10px',
    },

    message: {
        margin: '20px 0 20px 0',
    },

    messageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        [theme.breakpoints.up('md')]: {
            maxWidth: '50%',
        },
    },

    confirmationImg: {
        maxHeight: '50%',
        width: '100%',
    },

    avatarContainer: {
        display: 'flex',
        flexDirection: 'row',
    },

    avatarText: {
        display: 'flex',
        alignItems: 'flex-start',
        marginLeft: '10px',
        flexDirection: 'column',
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

    postContainer: {
        padding: '15px',
    },

    profileImage: {
        width: '55px',
        height: '55px',
    },
}));
