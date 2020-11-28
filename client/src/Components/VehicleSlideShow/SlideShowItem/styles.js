import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../../templates/mainStyle';

export default makeStyles(() => ({
    ...mainStyle,

    mainContainer: {
        background: 'gray',
        width: '100%',
    },

    thumbnailContainer: {
        height: '250px',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        margin: '0 auto 0 auto',
        backgroundClip: 'border-box',
    },

    image: {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
    },

    overlay: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: '#008CBA',
        overflow: 'hidden',
        width: '100%',
        height: '0',
        transition: '.5s ease',
        display: 'flex',
        justifyContent: 'center',
    },

    hover: {
        height: '100%',
        backgroundColor: 'pink',
    },

    text: {
        color: 'white',
        fontSize: '20px',
        margin: '20px',
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    statusContainer: {
        display: 'flex',
        alignItems: 'center',
    },

    statusIndicator: {
        width: '10px',
        height: '10px',
        backgroundColor: '#860808',
        borderRadius: '10px',
        margin: '10px',
    },
}));
