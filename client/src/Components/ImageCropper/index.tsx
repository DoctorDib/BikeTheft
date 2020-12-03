import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Dialog, Button } from '@material-ui/core';
import React, {
    useState,
    useCallback,
    useRef,
    useEffect,
} from 'react';

import styles from './styles';
import { defaultCropSettings } from '../../Common/Helpers/Defaults';
import { IClasses } from '../../Common/Interfaces/IClasses';
import { isNullOrUndefined } from '../../Common/Utils/Types';
import { IImageSettings } from '../../Common/Interfaces/interfaces';

// Increase pixel density for crop preview quality on retina screens.
const PIXEL_RATIO = window.devicePixelRatio || 1;

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
    image: IImageSettings;
    handleClose: (newImage:IImageSettings|null) => void;
}

const ImageCropped = (props: IImageCropProps): React.ReactElement<IImageCropProps> => {
    const {
        open,
        image,
        handleClose,
    } = props;

    const classes: IClasses = styles();

    const imgRef = useRef<HTMLImageElement>();
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);

    const [crop, setCrop] = useState<ReactCrop.Crop>(defaultCropSettings);
    const [completedCrop, setCompletedCrop] = useState<ReactCrop.Crop>(defaultCropSettings);

    const generateDownload = () => {
        const previewCanvas = previewCanvasRef.current;

        if (!completedCrop || !previewCanvas) {
            return;
        }

        const canvas = getResizedCanvas(previewCanvas, completedCrop.width ?? 1, completedCrop.height ?? 1);

        if (!canvas) {
            return;
        }

        const dataURL = canvas.toDataURL('image/png');
        const newImage = image;

        newImage.data64 = dataURL;
        newImage.crop.crop_info = completedCrop;

        setCrop(defaultCropSettings);
        handleClose(newImage);
    };

    const onLoad = useCallback((img):void => {
        imgRef.current = img;
    }, []);

    useEffect(():void => {
        setCrop(image.crop.crop_info ?? defaultCropSettings);
    }, [image]);

    useEffect(():void => {
        const img = imgRef.current;
        const canvas = previewCanvasRef.current;

        if (!completedCrop || isNullOrUndefined(canvas) || isNullOrUndefined(img)) {
            return;
        }

        const scaleX = img.naturalWidth / img.width; // natural width
        const scaleY = img.naturalHeight / img.height; // natural height
        const ctx = canvas.getContext('2d');

        if (isNullOrUndefined(ctx)) {
            return;
        }

        canvas.width = (completedCrop.width ?? 1) * PIXEL_RATIO;
        canvas.height = (completedCrop.height ?? 1) * PIXEL_RATIO;

        ctx.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            img,
            (completedCrop.x ?? 1) * scaleX || 1,
            (completedCrop.y ?? 1) * scaleY || 1,
            (completedCrop.width ?? 1) * scaleX || 1,
            (completedCrop.height ?? 1) * scaleY || 1,
            0,
            0,
            completedCrop.width || 1,
            completedCrop.height || 1,
        );
    }, [completedCrop]);

    const generateClick = ():void => generateDownload();
    const onChange = (c:ReactCrop.Crop):void => setCrop(c);
    const onComplete = (c:ReactCrop.Crop):void => setCompletedCrop(c);
    const closeWithoutCropping = ():void => handleClose(null);

    return (
        <Dialog onClose={closeWithoutCropping} aria-labelledby="image-cropper" open={open}>
            <section className={classes.imageHolder}>
                <ReactCrop
                    src={image === undefined ? '' : image.crop.original}
                    onImageLoaded={onLoad}
                    crop={crop}
                    onChange={onChange}
                    onComplete={onComplete}
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
                    onClick={generateClick}
                    className={classes.button}
                >
                    Confirm
                </Button>
                <Button
                    variant="outlined"
                    onClick={closeWithoutCropping}
                    className={classes.button}
                >
                    Cancel
                </Button>
            </section>
        </Dialog>
    );
};

export default ImageCropped;
