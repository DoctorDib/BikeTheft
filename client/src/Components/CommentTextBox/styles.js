import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../templates/mainStyle';

export default makeStyles((theme) => ({
    ...mainStyle,

    textBox: {
        width: '100%',
        margin: '10px 0 10px',
    },

    postButtonControls: {
        display: 'flex',
        justifyContent: 'space-around',
        '& .MuiButtonBase-root': {
            width: '30vw',
        },
        [theme.breakpoints.up('md')]: {
            justifyContent: 'flex-end',
            '& .MuiButtonBase-root': {
                width: '10vw',
                marginLeft: '10px',
            },
        },
    },
}));
