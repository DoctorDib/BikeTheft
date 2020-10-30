import theme from './theme';

export default {
    '@global': {
        '.MuiInputBase-root': {
            backgroundColor: 'white',
        },
    },

    hideOnMobile: {
        display: 'block',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },

    hideOnMobileXLarge: {
        display: 'block',
        [theme.breakpoints.down('lg')]: {
            display: 'none',
        },
    },

    hideOnMobileOnly: {
        display: 'block',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },

    showOnMobileOnly: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
    },

    showOnMobileXLarge: {
        display: 'none',
        [theme.breakpoints.down('lg')]: {
            display: 'block',
        },
    },

    showOnMobile: {
        display: 'none',
        [theme.breakpoints.down('md')]: {
            display: 'block',
        },
    },

    unselectable: {
        webkitTouchCallout: 'none',
        webkitUserSelect: 'none',
        khtmlUserSelect: 'none',
        mozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
        userDrag: 'none',
        webkitUserDrag: 'none',
    },

    mainContentContainer: {
        width: '75vw',
        alignItems: 'baseline',
        display: 'flex',
        justifyContent: 'center',
    },

    mainContentGap: {
        marginTop: '5vh',
        width: '100%',
    },

    body: {
        margin: 0,
        width: '75vw',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            padding: '0 20px 0 20px',
            backgroundColor: '#fbfbfb',
            webkitBoxShadow: '0 0 3px 0 rgb(200,200,200)',
            mozBoxShadow: '0 0 3px 0 rgb(200,200,200)',
            boxShadow: '0 0 3px 0 rgb(200,200,200)',
        },
        minHeight: '90vh',
    },

    header: {
        overflow: 'hidden',
        maxHeight: '45vh',
        [theme.breakpoints.down('lg')]: {
            maxHeight: '300',
        },
    },

    mainHeaderTitle: {
        position: 'absolute',
        left: 0,
        top: '5vh',
        zIndex: 1,
    },

    headerHome: {
        maxHeight: '75vh',
        [theme.breakpoints.down('lg')]: {
            maxHeight: '350',
        },
    },

    content: {
        width: '90%',
        backgroundColor: '#eaeaea',
        paddingLeft: '5em',
        paddingRight: '5em',
        color: '#1b1b1b',
    },

    spaceLeft: {
        marginLeft: '1rem',
    },

    spaceRight: {
        marginRight: '1rem',
    },

    spaceItemsEvenly: {
        justifyContent: 'space-between',
    },
};
