import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../templates/mainStyle';

export default makeStyles(() => ({
    ...mainStyle,

    mainContainer: {
        marginRight: '20px',
        maxWidth: '100%',
    },

    dialog: {
        '& .MuiPaper-root': {
            maxWidth: '100vw',
        },

        '& .MuiSvgIcon-root': {
            height: '1.5em',
            width: '1.5em',
        },
    },

    closeButton: {
        position: 'fixed',
        top: 0,
        right: 0,
        color: 'black',
    },

    smallImageContainer: {
        width: '75px',
        height: '75px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: '5px',
        padding: 0,
    },

    smallImage: {
        verticalAlign: 'middle',
        width: '100%',
        borderRadius: '5px',
        '&:hover': {
            cursor: 'pointer',
        },
    },

    bigImageContainer: {
        width: '75vw',
        height: '100%',
        maxHeight: '85vh',
    },
    bigImage: {
        borderRadius: '5px',
        width: '100%',
    },
}));
