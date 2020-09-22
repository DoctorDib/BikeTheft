import { makeStyles } from '@material-ui/core/styles';
import mainStyle from 'styles/mainStyle';

export default makeStyles (theme => ({
    ...mainStyle,

    errorContentContainer: {
        width: '50%', display: 'flex', justifyContent: 'center', flexDirection: 'column'
    },

    sorryText: {
        marginTop: '5vh', marginBottom: '4vh'
    }
}));