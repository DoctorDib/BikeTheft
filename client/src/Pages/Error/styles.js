import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../templates/mainStyle';

export default makeStyles(() => ({
    ...mainStyle,

    errorContentContainer: {
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    },

    sorryText: {
        marginTop: '5vh',
        marginBottom: '4vh',
    },
}));
