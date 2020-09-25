import { makeStyles } from '@material-ui/core/styles';
import { black } from 'material-ui/styles/colors';
import mainStyle from 'templates/mainStyle';

export default makeStyles (theme => ({
    ...mainStyle,

    container: {

        ["& section"] : {
            margin: '20px 0 20px 0'
        }
    }
}));
