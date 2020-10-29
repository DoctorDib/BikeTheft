import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../templates/mainStyle';

export default makeStyles((theme) => ({
    ...mainStyle,

    postContainer: {
        padding: '5px 15px 5px',
    },

    message: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    confirmationImg: {
        maxHeight: '50%',
        width: '100%',
    },

    avatarContainer: {
        display: 'flex',
        flexDirection: 'row',
    },

    avatarText: {
        display: 'flex',
        alignItems: 'flex-start',
        marginLeft: '10px',
        flexDirection: 'column',
    },

    profileImage: {
        width: '55px',
        height: '55px',
    },

    deleteIcon: {
        margin: '10px 0 10px 10px',
        color: '#c60000',
        cursor: 'pointer',
    },

    '@keyframes replyIconClosed': {
        from: {
            transform: 'rotate(-90deg)',
        },
        to: {
            transform: 'rotate(90deg)',
        },
    },
    '@keyframes replyIconOpen': {
        from: {
            transform: 'rotate(180deg)',
        },
        to: {
            transform: 'rotate(0deg)',
        },
    },

    replyIcon: {
        margin: '10px 0 10px 10px',
        cursor: 'pointer',
        animationDuration: '0.5s',
        animationTimingFunction: 'alternate',
    },

    replyIconClosed: {
        animationName: '$replyIconClosed',
    },

    replyIconOpen: {
        animationName: '$replyIconOpen',
    },

    quoteCommentContainer: {
        backgroundColor: '#f7f7f7',
        borderLeft: `solid 6px ${theme.palette.primary.main}`,
        color: '#555',
        fontSize: '10px !important',
        margin: '15px 0 15px 2em',
        width: '100%',
    },

    quotePostContainer: {
        padding: '5px 15px 5px 15px',
        display: 'flex',
    },

    quoteButton: {
        textTransform: 'none',
        width: '100%',
        padding: 0,
    },

    quoteAttachment: {
        display: 'flex',
        marginLeft: '10px',
        alignContent: 'center',
        alignItems: 'center',
    },

    messageContents: {
        width: '100%',
    },

    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: '12px',
    },

    messageButtonContainer: {
        display: 'flex',
        flexDirection: 'column',
    },

    '@keyframes blinker': {
        '0%': {
            backgroundColor: 'white',
        },
        '25%': {
            backgroundColor: '#f1f1f1',
        },
        '50%': {
            backgroundColor: 'white',
        },
        '75%': {
            backgroundColor: '#f1f1f1',
        },
    },
    highlight: {
        animationName: '$blinker',
        animationDuration: '1s',
        animationTimingFunction: 'alternate',

        boxShadow: '0 0 3px 1px #2185c5',
        backgroundColor: '#f1f1f1',
    },

    commentImageContainer: {
        display: 'flex',
        flexDirection: 'row',
        margin: '5px 10px 10px 15px',
    },
}));
