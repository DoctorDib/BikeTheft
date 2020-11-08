import { makeStyles } from '@material-ui/core/styles';

import mainStyle from '../../templates/mainStyle';

export default makeStyles(() => ({
    ...mainStyle,

    profileContainer: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridGap: '1rem',
        justifyContent: 'center',
        marginTop: '2rem',
        flexDirection: 'column',
        alignItems: 'center',
    },

    centerContent: {
        gridColumnStart: '2',
        gridColumnEnd: '5',
        display: 'flex',
        justifyContent: 'center',
    },

    counterContainer: {
        marginTop: '3rem',
        gridColumn: '2 / 5',
        display: 'flex',
        justifyContent: 'space-evenly',
    },

    postsContainer: {
        gridRow: '4 / 5',
        gridColumn: '2 / 5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        outline: '3px solid black',
        height: '300px',
    },

    settingButtonsContainer: {
        gridColumn: '2 / 5',
        gridRow: '6 / 7',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    deleteButton: {
        color: 'white',
        background: 'repeating-linear-gradient(-55deg,#FF0000,#FF0000 10px,#990000 10px,#990000 20px)',
    },
}));
