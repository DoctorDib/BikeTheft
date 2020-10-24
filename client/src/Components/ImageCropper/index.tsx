import React, {
    useState, useCallback, useRef, useEffect,
} from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import {
    Dialog,
    Button,
} from '@material-ui/core';
import { defaultCropSettings } from '../../Common/Helpers/Defaults';
import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';
import { ICropSettings } from '../../Common/Interfaces/interfaces';
import { isNullOrUndefined } from '../../Common/Utils/Types';

// Increase pixel density for crop preview quality on retina screens.
const pixelRatio = window.devicePixelRatio || 1;

// We resize the canvas down when saving on retina devices otherwise the image
// will be double or triple the preview size.
const getResizedCanvas = (canvas: HTMLCanvasElement, newWidth: number, newHeight: number): HTMLCanvasElement => {
    const tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = newWidth;
    tmpCanvas.height = newHeight;

    const ctx = tmpCanvas.getContext('2d');

    if (!ctx) {
        return tmpCanvas;
    }

    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, newWidth, newHeight);

    return tmpCanvas;
};

interface IImageCropProps {
    open: boolean;
    handleClose: () => void;
    imageSrc: string;
    crop: ICropSettings;
    saveCroppedData: (x: string, y: ICropSettings) => void;
    setCrop: (x: ICropSettings) => void;
}

const ImageCropped = (props: IImageCropProps): React.Element<IImageCropProps> => {
    const classes: IClasses = styles();

    const imgRef = useRef<HTMLImageElement>();
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);

    const [completedCrop, setCompletedCrop] = useState<ICropSettings>(defaultCropSettings);

    const {
        open, handleClose, imageSrc, saveCroppedData, setCrop, crop,
    } = props;

    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    const generateDownload = () => {
        const previewCanvas = previewCanvasRef.current;

        if (!completedCrop || !previewCanvas) {
            return;
        }

        const canvas = getResizedCanvas(previewCanvas, completedCrop.width, completedCrop.height);

        if (!canvas) {
            return;
        }

        const dataURL = canvas.toDataURL('image/png');

        saveCroppedData(dataURL, completedCrop);
        handleClose();
    };

    useEffect(() => {
        const image = imgRef.current;
        const canvas = previewCanvasRef.current;

        if (!completedCrop || isNullOrUndefined(canvas) || isNullOrUndefined(image)) {
            return;
        }

        const scaleX = image.naturalWidth / image.width; // natural width
        const scaleY = image.naturalHeight / image.height; // natural height
        const ctx = canvas.getContext('2d');

        if (isNullOrUndefined(ctx)) {
            return;
        }

        canvas.width = completedCrop.width * pixelRatio;
        canvas.height = completedCrop.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            completedCrop.x * scaleX || 1,
            completedCrop.y * scaleY || 1,
            completedCrop.width * scaleX || 1,
            completedCrop.height * scaleY || 1,
            0,
            0,
            completedCrop.width || 1,
            completedCrop.height || 1,
        );
    }, [completedCrop]);

    return (
        <Dialog onClose={handleClose} aria-labelledby="image-cropper" open={open}>
            <section className={classes.imageHolder}>
                <ReactCrop
                    src={imageSrc}
                    onImageLoaded={onLoad}
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                />
                <section style={{ display: 'none' }}>
                    <canvas
                        ref={previewCanvasRef}
                        // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                        style={{ width: '100%' }}
                    />
                </section>
            </section>

            <section className={classes.buttonContainer}>
                <Button
                    variant="outlined"
                    disabled={!completedCrop?.width || !completedCrop?.height}
                    onClick={() => generateDownload()}
                    className={classes.button}
                >
                    Confirm
                </Button>
                <Button variant="outlined" onClick={handleClose} className={classes.button}>
                    Cancel
                </Button>
            </section>
        </Dialog>
    );
};

export default ImageCropped;
