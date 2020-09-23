import { makeStyles } from '@material-ui/core/styles';
import mainStyle from 'styles/mainStyle';

export default makeStyles (theme => ({
    ...mainStyle,

    container: {
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignContent: 'center', 
        alignItems: 'center', 
        width: '100%'
    },

    topSection: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
    },

    imageContainer: {
        backgroundColor: 'black',
        width: '100%',
    },

    image: {
        width: '100%',
        maxHeight: '50vh'
    },

    owner: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },



}));