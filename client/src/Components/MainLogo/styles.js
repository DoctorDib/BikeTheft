import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../templates/mainStyle';

export default makeStyles((theme) => ({
    ...mainStyle,

    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },

    logo: {
        pointerEvents: 'none',
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '25%',
        },
    },
}));
