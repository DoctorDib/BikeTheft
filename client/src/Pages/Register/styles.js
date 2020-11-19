import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../templates/mainStyle';

export default makeStyles((theme) => ({
    ...mainStyle,

    mainContainer: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100vw',
        [theme.breakpoints.up('md')]: {
            width: '50vw',
            minWidth: '731px',
            position: 'fixed',
            right: '0',
        },
    },

    titleContainer: {
        width: '150px',
        margin: '0 auto 0 auto',
        position: 'relative',
        top: '20px',
        [theme.breakpoints.up('md')]: {
            width: '300px',
            top: '40px',
        }
    },

    leftImage: {
        height: '100vh',
        minWidth: '50vw',
    },

    backgroundImage: {
        // Matheo JBT
        // @matheo_jbt
        // https://unsplash.com/photos/_C9TnzF_YCw
        backgroundImage: 'url("https://images.unsplash.com/photo-1604177074789-274af1068b13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjczMTc0fQ&auto=format&fit=crop&w=2600&q=80")',
        backgroundSize: 'cover',
        height: '100vh',
        width: '100%',
    },

    backgroundOverlay: {
        backgroundColor: '#2424241a',
        position: 'absolute',
        top: 0,
        backgroundSize: 'cover',
        height: '100vh',
        width: '50vw',
        webkitBoxShadow: 'inset 0px 0px 136px 0px rgba(0,0,0,0.75)',
        mozBoxShadow: 'inset 0px 0px 136px 0px rgba(0,0,0,0.75)',
        boxShadow: 'inset 0px 0px 136px 0px rgba(0,0,0,0.75)',
    },
}));
