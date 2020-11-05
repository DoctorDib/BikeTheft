import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../../templates/mainStyle';

export default makeStyles((theme) => ({
    ...mainStyle,

    input: {
        width: '100%',
        '& .MuiInputBase-root.MuiFilledInput-root': {
            margin: '5px',
        },
    },

    featuresInput: {
        width: '100%',
        margin: '10px',
        [theme.breakpoints.up('md')]: {
            width: '75%',
        },
    },

    featureContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        backgroundColor: '#d9d9d9',
        padding: '10px',
        minHeight: '32px',
        borderRadius: '15px',
    },

    inputContainers: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        margin: '1em 0 1em 0',
        width: '100%',
        position: 'relative',
    },

    fieldSection: {
        width: '100%',
        padding: '10px',
        margin: '10px 0 10px 0',
        display: 'flex',
        flexDirection: 'column',

        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
        },
    },

    errorMessage: {
        color: 'red',
        position: 'absolute',
        bottom: 0,
    }
}));
