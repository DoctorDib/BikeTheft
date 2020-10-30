import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../templates/mainStyle';

export default makeStyles(() => ({
    ...mainStyle,

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    paper: {
        padding: '20px',
    },

    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        margin: '20px 0 0 0',
        '& .MuiButton-root': {
            margin: '0 5px 0 5px',
        },
    },

    infomationBox: {
        margin: '5px 5px 15px 5px',
    },
}));
