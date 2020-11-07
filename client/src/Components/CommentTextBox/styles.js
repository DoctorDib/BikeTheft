import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../templates/mainStyle';

export default makeStyles((theme) => ({
    ...mainStyle,

    textBox: {
        width: '100%',
        margin: '0 0 10px',
    },

    textBoxWithPreview: {
        width: '100%',
        margin: '0 0 10px',
        '& .MuiOutlinedInput-root': {
            borderRadius: '0 0 5px 5px',
        },
    },

    textBoxContainer: {
        position: 'relative',
    },

    postButtonControls: {
        display: 'flex',
        justifyContent: 'space-around',
        '& .MuiButtonBase-root': {
            width: '30vw',
        },
        [theme.breakpoints.up('md')]: {
            justifyContent: 'flex-end',
            '& .MuiButtonBase-root': {
                width: '10vw',
                marginLeft: '10px',
            },
        },
    },

    attachIconButton: {
        position: 'absolute',
        right: '5px',
        bottom: '15px',
    },

    previewImageContainer: {
        display: 'flex',
    },

    previewImage: {
        width: '100px',
        maxHeight: '90px',
        overflow: 'none',
        margin: '0 10px 0 0',
        borderRadius: '5px',
    },

    mainSection: {
        width: '100%',
        marginTop: '10px',
    },

    prevAndbutton: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#eee',
        padding: '10px',
        borderRadius: '5px 5px 0 0',
        borderTop: '1px #c4c4c4 solid',
        borderLeft: '1px #c4c4c4 solid',
        borderRight: '1px #c4c4c4 solid',
        justifyContent: 'space-between',
    },
}));
