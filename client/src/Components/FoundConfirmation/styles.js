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
        justifyContent: 'space-around',
        width: '100%',
        margin: '20px 0 0 0',
    },
}));
