import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../templates/mainStyle';

export default makeStyles(() => ({
    ...mainStyle,

    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    container: {
        width: '100px',
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        margin: '12px',
    },

    input: {
        width: '100%',
        '& .MuiInputBase-root.MuiFilledInput-root': {
            margin: '5px',
        },
    },

    colour: {
        height: '5px',
        border: '1px solid black',
        width: '100%',
    },

    inputContainers: {
        width: '75%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: '1em',
    },

    description: {
        height: '20px',
    },

    featureContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: '5px',
        flexWrap: 'wrap',
    },

    chip: {
        width: '100%',
        height: '100%',
        margin: '5px',
        padding: '5px',
        '& .MuiChip-label': {
            whiteSpace: 'normal',
        },
    },
}));
