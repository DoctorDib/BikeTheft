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
            width: '450px',
            height: '600px',
            position: 'fixed',
            right: 0,
            left: 0,
            top: 0,
            bottom: 0,
            margin: 'auto',
        },
    },

    titleContainer: {
        width: '250px',
        margin: '0 auto 0 auto',
        position: 'relative',
        top: '20px',
        [theme.breakpoints.up('md')]: {
            width: '300px',
            top: '20px',
        },
    },

    image: {
        backgroundColor: 'black',
    },

    backgroundImage: {
        // Matheo JBT
        // @matheo_jbt
        // https://unsplash.com/photos/_C9TnzF_YCw
        backgroundImage: 'url("https://wallpapercave.com/wp/wp3935832.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        filter: 'blur(4px)',
    },

    backgroundOverlay: {
        backgroundColor: '#2424241a',
        position: 'absolute',
        top: 0,
        backgroundSize: 'cover',
        height: '100vh',
        width: '100vw',
        webkitBoxShadow: 'inset 0px 0px 136px 0px rgba(0,0,0,0.75)',
        mozBoxShadow: 'inset 0px 0px 136px 0px rgba(0,0,0,0.75)',
        boxShadow: 'inset 0px 0px 136px 0px rgba(0,0,0,0.75)',
    },
}));
