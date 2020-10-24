import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../templates/mainStyle';

export default makeStyles((theme) => ({
    ...mainStyle,

    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: '1em',
    },

    imageContainer: {
        width: '100vw',
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
    },

    topSection: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
        width: '100vw',
        [theme.breakpoints.up('md')]: {
            width: '100%',
            flexDirection: 'row',
        },
    },

    rightSide: {
        margin: '20px',
        width: 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',

        '& section:not(:first-child)': {
            marginTop: '20px',
        },

        [theme.breakpoints.up('md')]: {
            width: '75%',
            margin: '0 20px 0 20px',
        },
    },

    dialogTitle: {
        backgroundColor: '#eaeaea',
    },

    dialogContent: {
        display: 'flex',
        justifyContent: 'center',
    },

    gridStyle: {
        backgroundColor: '',
        width: '80%',
        margin: '0 auto 0 auto',
        textAlign: 'center',
        '& .MuiGrid-container': {
            overflow: 'auto',
            wordWrap: 'break-word',
        },
        '& .MuiGrid-root.MuiGrid-container:nth-child(even)': {
            backgroundColor: '#e1e1e1',
        },
        '& .MuiGrid-root.MuiGrid-container:nth-child(odd)': {
            backgroundColor: '#f2f2f2',
        },
        '& .MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-6:nth-child(even)': {
            textAlign: 'end',
            paddingRight: '15px',
        },
        '& .MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-6:nth-child(odd)': {
            textAlign: 'initial',
            paddingLeft: '15px',
        },
        '& .MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-6': {
            padding: '5px',
        },
    },

    descriptionContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        '& section': {
            padding: '20px',
        },

        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            '& section': {
                maxWidth: '50%',
                margin: '0 auto 0 auto',
            },
        },
    },

    statusText: {
        display: 'flex',
        justifyContent: 'center',
    },

    owner: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            justifyContent: 'center',
        },
    },

    titles: {
        fontWeight: '600',
    },

    profileImageContainer: {
        display: 'flex',
        justifyContent: 'center',
        height: '60px',
        width: '60px',
    },

    profileImage: {
        height: '100%',
        width: '100%',
    },

    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
    },
}));
