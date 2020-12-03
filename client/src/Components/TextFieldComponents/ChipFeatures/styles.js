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
        backgroundColor: '#ececec',
        padding: '10px',
        minHeight: '32px',
        borderRadius: '5px',
    },

    chip: {
        margin: '5px',
        height: 'auto',
        padding: '5px',
        backgroundColor: '#376B9F',
        borderRadius: '10px',
        '& .MuiChip-label': {
            whiteSpace: 'normal',
        },
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
}));
