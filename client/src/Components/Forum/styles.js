import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../templates/mainStyle';

export default makeStyles(() => ({
    ...mainStyle,

    textBox: {
        width: '100%',
    },

    message: {
        width: '100%',
        padding: '5px',
        margin: '20px 0 20px 0',
    },

    messageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
}));