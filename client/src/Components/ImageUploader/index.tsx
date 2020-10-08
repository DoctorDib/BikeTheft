import React, { useState } from 'react';

//import multer from 'multer';

import {
    Paper,
    Typography,
    IconButton,
    CardMedia
} from '@material-ui/core';

import { Add } from '@material-ui/icons';

import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

interface IImageUploaderProps {
    
}

/*var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../static/img')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })*/

const ImageUploader: React.FC<IImageUploaderProps> = (props: IImageUploaderProps) => {
    const classes: IClasses = styles();

    const [images, setImages] = useState<Array<string>>([]);

    const [value, setValue] = useState<string>('');

    const mapImages = images.map((image: string) => (
        <Paper className={classes.container}>
            <CardMedia component='img' image={`${image}`}/>
        </Paper>
    ));

    const handleChange = (event)  => {
        const image:string = event.target.value;

        setValue(image);

        saveImagesLocally(image);

        console.log(image);
        setImages([...images, image]);

        console.log(images);
    }

    const saveImagesLocally = (image: string) => {
        //multer({})
    }

    return (
        <section className={classes.mainContainer}>
            { mapImages }

            <label htmlFor="icon-button-file">
                <input accept='image/*' onChange={handleChange} className={classes.input} id="icon-button-file" type="file" />
                <IconButton aria-label="upload picture" component="span" style={{ padding: '0' }}>
                    <Paper className={classes.container}>
                        <Add color="primary" />
                    </Paper>
                </IconButton>
            </label>
        </section>
    );
};

export default ImageUploader;
