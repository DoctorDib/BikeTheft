import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../../templates/mainStyle';

export default makeStyles(() => ({
    ...mainStyle,

    colour: {
        height: '5px',
        border: '1px solid #C4C4C4',
        borderRadius: '10px',
        width: '100%',
        marginTop: '5px',
    },
}));
