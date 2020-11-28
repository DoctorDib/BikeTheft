import { makeStyles } from '@material-ui/core/styles';
import mainStyle from '../../templates/mainStyle';

export default makeStyles((theme) => ({
    ...mainStyle,

    main: {
        '& .image-gallery-thumbnails-wrapper': {
            backgroundColor: '#f2f2f2',
        },

        '& .image-gallery-thumbnail .image-gallery-thumbnail-image': {
            height: '80px',
            width: 'auto',
        },

        '& .image-gallery-thumbnail': {
            width: 'auto',
        },

        '& .image-gallery-slide img': {
            height: '45vh',
        },

        [theme.breakpoints.up('md')]: {
            '& .image-gallery-slide img': {
                height: '40vh',
            },
            '& .image-gallery-thumbnail .image-gallery-thumbnail-image': {
                height: '100px',
            },
        },
    },
}));
