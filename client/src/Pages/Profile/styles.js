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
}));
