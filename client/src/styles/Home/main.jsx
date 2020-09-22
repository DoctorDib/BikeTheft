import { makeStyles } from '@material-ui/core/styles';
import mainStyle from 'styles/mainStyle';

export default makeStyles (theme => ({
    ...mainStyle,

    clientLogosParent: {
        display: 'flex', 
        justifyContent: 'center'
    },

    titleContainer: {
        width: '100%',
        marginBottom: '2vh'
    }
}));