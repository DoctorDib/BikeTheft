import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../templates/mainStyle';

export default makeStyles((theme) => ({
    ...mainStyle,

    mainContainer: {
        width: '90%',
        display: 'flex',

        [theme.breakpoints.up('md')]: {
            width: '500px',
        },
    },

    input: {
        width: '100%',
        paddingLeft: '20px',
    },

}));
