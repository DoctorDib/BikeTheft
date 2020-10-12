import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../templates/mainStyle';

export default makeStyles((theme) => ({
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

    gridContainer: {
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.up('md')]: {
            width: '50vw',
        },
    },

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

    colour: {
        height: '5px',
        border: '1px solid #C4C4C4',
        borderRadius: '10px',
        width: '100%',
        marginTop: '5px',
    },

    inputContainers: {
        width: '75%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        margin: '1em 0 1em 0',
    },

    descriptionContainer: {
        width: '100%',
        padding: '0 12px 0 12px',
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

    chip: {
        margin: '5px',
        height: 'auto',
        padding: '5px',
        '& .MuiChip-label': {
            whiteSpace: 'normal',
        },
    },

    title: {
        margin: '2em 0 2em 0',
    },

    controlButtons: {
        display: 'flex',
        flexDireciton: 'row',
        marginTop: '2em',
        width: '50%',
        justifyContent: 'space-evenly',
        '& button': {
            width: '120px',
        },
    },
}));
