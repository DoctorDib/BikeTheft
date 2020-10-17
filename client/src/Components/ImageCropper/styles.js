import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../templates/mainStyle';

export default makeStyles(() => ({
    ...mainStyle,

    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    button: {
        margin: '5px',
        width: '50%',
    },

    imageHolder: {
        display: 'flex',
        flexDirection: 'row',
        width:'100%',
    },

    container: {
        width: '45%',
        margin: '10px',
    },
}));
