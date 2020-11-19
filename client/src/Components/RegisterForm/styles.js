import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../templates/mainStyle';

export default makeStyles((theme) => ({
    ...mainStyle,

    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            margin: '0 auto 0 auto',
        },
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
        width: '80%',
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
        margin: '0 auto 0 auto',
        display: 'flex',
        marginTop: '2em',
        width: '250px',
        flexDirection: 'column-reverse',
        justifyContent: 'center',
        '& button': {
            width: '100%',
        },

        [theme.breakpoints.up('md')]: {
            width: '50%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            '& button': {
                width: '120px',
            },
        }
    },

    divider: {
        height: '1px',
        width: '110%',
    },

    inputContainers: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
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

    fieldName: {
        color: '#4a4a4a',
        [theme.breakpoints.up('md')]: {
            width: '33%',
            paddingLeft: '10px',
        },
    },

    signInTextContainer: {
        width: '100%',
        textAlign: 'center',
    },

    fieldInputs: {
        [theme.breakpoints.up('md')]: {
            width: '66%',
        },
    },

    errorMessage: {
        color: 'red',
        position: 'absolute',
        bottom: 0,
    },
}));
