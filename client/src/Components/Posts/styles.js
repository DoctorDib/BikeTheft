import { makeStyles } from '@material-ui/core/styles';
import { Rowing } from '@material-ui/icons';
import mainStyle from '../../templates/mainStyle';

export default makeStyles(() => ({
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
    },

    message: {
        margin: '20px 0 20px 0',
    },

    messageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
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
        marginTop: '15px'
    }, 

    infoButton: {
        width: '35%'
    },

    postContainer: {
        padding: '15px',
    },

    profileImage: {
        width: '55px',
        height: '55px',
    }
}));
