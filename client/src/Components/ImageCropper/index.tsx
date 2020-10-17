import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import { Dialog, Button } from '@material-ui/core';

import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

// Increase pixel density for crop preview quality on retina screens.
const pixelRatio = window.devicePixelRatio || 1;

// We resize the canvas down when saving on retina devices otherwise the image
// will be double or triple the preview size.
const getResizedCanvas = (canvas, newWidth, newHeight)  => {
    const tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = newWidth;
    tmpCanvas.height = newHeight;

    const ctx = tmpCanvas.getContext("2d");
    ctx.drawImage(
        canvas,
        0,
        0,
        canvas.width,
        canvas.height,
        0,
        0,
        newWidth,
        newHeight
    );

    return tmpCanvas;
}

const generateDownload = (previewCanvas, crop) => {
    if (!crop || !previewCanvas) { return; }

    console.log("=======");
    console.log(previewCanvas);
    console.log(crop);

    const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);

    var dataURL = canvas.toDataURL("image/png");
    console.log(dataURL)

}

const ImageCropped = (props) => {
    const classes: IClasses = styles();

    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({ unit: "%", width: 1, height: 1, x: 50, y: 50 });
    const [completedCrop, setCompletedCrop] = useState(null);

    const { open, handleClose, imageSrc } = props;

    const onLoad = useCallback((img) => { imgRef.current = img; }, []);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) { return; }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext("2d");

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    }, [completedCrop]);

    return (
        <Dialog onClose={handleClose} aria-labelledby="image-cropper" open={open}>
            <section className={classes.imageHolder}>
                <section className={classes.container}>
                    <ReactCrop
                        src={imageSrc}
                        onImageLoaded={onLoad}
                        crop={crop}
                        onChange={(c) => setCrop(c)}
                        onComplete={(c) => setCompletedCrop(c)}
                    />
                </section>

                <section className={classes.container}>
                    <canvas
                        ref={previewCanvasRef}
                        // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                        style={{width:'100%'}}
                    />
                </section>
            </section>

            <section className={classes.buttonContainer}>
                <Button
                    variant="outlined"
                    disabled={!completedCrop?.width || !completedCrop?.height}
                    onClick={() => generateDownload(previewCanvasRef.current, completedCrop)}
                    className={classes.button}
                > Confirm </Button>
                <Button
                    variant="outlined"
                    onClick={handleClose}
                    className={classes.button}
                > Cancel </Button>
            </section>
        </Dialog>
    );
}

export default ImageCropped;