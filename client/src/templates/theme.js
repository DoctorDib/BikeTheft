import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

// const pxToRem = (value) => `${value / 16}rem`;

const breakpoints = createBreakpoints({});
export default createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            light: '#000000',
            main: '#000000',
        },
        secondary: {
            light: '#ffffff',
            main: '#ffffff',
        },
    },
    typography: {
        fontFamily: '"Lato", sans-serif',
        useNextVariants: true,
        fontSize: 16,
    },
    text: {
        primary: '#ffffff',
        secondary: '#00000',
        subtitle: '#26844F',
    },
    input: {
        backgroundColor: 'black',
        border: '1px solid #ced4da',
    },
    breakpoints,
});
