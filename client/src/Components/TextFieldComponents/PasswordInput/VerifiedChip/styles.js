import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../../../templates/mainStyle';

export default makeStyles(() => ({
    ...mainStyle,

    checker: {
        borderRadius: '10px',
        border: '1px solid white',
        width: '10px',
        height: '10px',
        marginRight: '5px',
    },

    chipContainer: {
        color: '#2d2d2d',
        display: 'flex',
        backgroundColor: '#eee',
        borderRadius: '8px',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '10px 10px 0 0',
        padding: '0 5px 0 5px',
        whiteSpace: 'nowrap',
        '& .MuiTypography-caption': {
            fontSize: '0.757rem',
        },
    },
}));
