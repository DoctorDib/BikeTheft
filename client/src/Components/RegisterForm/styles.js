import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../templates/mainStyle';

export default makeStyles(() => ({
    ...mainStyle,

    container: {
        '& section': {
            margin: '20px 0 20px 0',
        },
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        }
}));
