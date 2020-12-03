import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../../templates/mainStyle';

export default makeStyles(() => ({
    ...mainStyle,

    input: {
        width: '100%',
        '& .MuiInputBase-root.MuiFilledInput-root': {
            margin: '5px',
        },
    },
}));
