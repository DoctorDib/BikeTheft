import { makeStyles } from '@material-ui/core/styles';
import mainStyle from 'styles/mainStyle';

export default makeStyles (theme => ({
    ...mainStyle,

    root: {
        minWidth: 0,
        padding: 0,
    },

    footerParent: {
        paddingTop: '3vh',
        paddingBottom: '3vh',
        width: '100vw', 
        display: 'flex',
    },

    copyrightParent: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        alignContent: 'baseline'
    },

    copyrightSymbol: {
        left: '-15',
        position: 'absolute'
    }
}));