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
        margin: '10px 0 10px',
    },

    message: {
        margin: '20px 0 20px 0',
    },

    messageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '50%',
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

    postButtonControls: {
        display: 'flex',
        justifyContent: 'space-around',
        '& .MuiButtonBase-root': {
            width: '30vw',
        },
        [theme.breakpoints.up('md')]: {
            justifyContent: 'flex-end',
            '& .MuiButtonBase-root': {
                width: '10vw',
                marginLeft: '10px',
            },
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
