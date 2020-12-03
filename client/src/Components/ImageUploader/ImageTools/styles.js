import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../../templates/mainStyle';

export default makeStyles(() => ({
    ...mainStyle,

    mainContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#ececec',
        width: '100%',
        borderRadius: '5px',
        boxShadow: '#777 0px 0px 2px',
        marginBottom: '10px',
    },

    container: {
        width: '200px',
        height: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        margin: '12px',
        overflow: 'hidden',
        position: 'relative',
    },

    imageCounter: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        bottom: '20px',
    },

    input: {
        display: 'none',
    },

    icon: {
        borderRadius: '100%',
        backgroundColor: 'white',
        padding: '2px',
        '&:hover': {
            backgroundColor: '#dfdfdf',
        },
    },

    cropButton: {
        height: '100%',
        width: '100%',
    },

    smallIconButton: {
        padding: '0',
        margin: '2px',
        backgroundColor: 'white',
    },

    iconButtonContainer: {
        zIndex: '1',
        top: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
    },

    speedDialContainer: {
        height: '100%',
        position: 'absolute',
        width: '100%',
        transform: 'translateZ(0px)',
        flexGrow: 1,
        '& button': {
            height: '35px',
            width: '35px',
        },
    },

    speedDial: {
        position: 'absolute',
        height: '100%',
        right: 0,
        top: 0,
        '& .MuiSpeedDial-actions': {
            margin: 0,
            padding: 0,
        },
        '& .MuiSpeedDial-fab': {
            width: '40px',
            height: '40px',
        },
    },

    smallIcon: {
        height: '25px',
        width: '25px',
    },
}));
