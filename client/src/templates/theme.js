import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

// const pxToRem = (value) => `${value / 16}rem`;

const breakpoints = createBreakpoints({});
export default createMuiTheme({
    palette: {
        // https://color.adobe.com/Salmon-on-Ice-color-theme-2291686
        type: 'light',
        primary: {
            light: '#7ECEFD',
            main: '#2185C5',
        },
        secondary: {
            light: '#FFF6E5',
            main: '#3E454C',
        },
    },
    typography: {
        fontFamily: '"Lato", sans-serif',
        useNextVariants: true,
        fontSize: 16,
    },
    text: {
        primary: 'black',
        secondary: 'white',
        subtitle: '#2185C5',
        link: '#FF7F66',
    },
    input: {
        backgroundColor: 'black',
        border: '1px solid #ced4da',
    },
    breakpoints,
});
