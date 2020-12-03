import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../../templates/mainStyle';

export default makeStyles(() => ({
    ...mainStyle,

    parentChipContainer: {
        display: 'flex',
        width: '100%',
    },
}));
