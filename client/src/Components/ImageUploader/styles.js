import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../templates/mainStyle';

export default makeStyles(() => ({
    ...mainStyle,

    mainContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#4f4f4f',
        width: '100%',
        borderRadius: '10px',
    },

    container: {
        width: '100px',
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        margin: '12px',
        overflow: 'hidden',
    },

    input: {
        display: 'none',
    },

    icon: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'black',
        transition: 'opacity .15s ease-in-out',
        color: 'white'
    }
}));
