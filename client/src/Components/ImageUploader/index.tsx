import React, { useState } from 'react';

import { Paper, IconButton, CardMedia } from '@material-ui/core';

import { Add } from '@material-ui/icons';

import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

interface IImageUploaderProps {}

const ImageUploader: React.FC<IImageUploaderProps> = () => {
    const classes: IClasses = styles();

    const [images, setImages] = useState<Array<string>>([]);

    const mapImages = images.map((image: string) => (
        <Paper key={image} className={classes.container}>
            <CardMedia component="img" image={`${image}`} />
        </Paper>
    ));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const image: string = event.target.value;

        console.log(image);
        setImages([...images, image]);

        console.log(images);
    };

    return (
        <section className={classes.mainContainer}>
            {mapImages}

            <label htmlFor="icon-button-file">
                <input
                    accept="image/*"
                    onChange={handleChange}
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                />
                <IconButton
                    aria-label="upload picture"
                    component="span"
                    style={{ padding: '0' }}
                >
                    <Paper className={classes.container}>
                        <Add color="primary" />
                    </Paper>
                </IconButton>
            </label>
        </section>
    );
};

export default ImageUploader;
