import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../templates/mainStyle';

export default makeStyles(() => ({
    ...mainStyle,

    root: {
        minWidth: 0,
        padding: 0,
    },

    footerParent: {
        paddingTop: '3vh',
        paddingBottom: '3vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    copyrightParent: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        alignContent: 'baseline',
    },

    copyrightSymbol: {
        left: '-15',
        position: 'absolute',
    },

    statusText: {
        fontWight: 'bold',
    },
}));
