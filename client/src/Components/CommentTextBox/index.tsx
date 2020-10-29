import React, { useState } from 'react';
import {
    TextField,
    Button,
    IconButton,
    Dialog,
    Collapse,
    CardMedia,
} from '@material-ui/core';

import { AddAPhoto, Edit } from '@material-ui/icons';

import ImageUploaderComponent from '../ImageUploader';

import { IImageSettings } from '../../Common/Interfaces/interfaces';
import { IClasses } from '../../Common/Interfaces/IClasses';
import style from './styles';

const ROWS = 4;
const MAXROWS = 10;
const MAXIMAGES = 4;

interface ICommentTextBoxProps {
    textValue: string,
    setTextValue: (x: string) => void;
    images: Array<IImageSettings>;
    setImages: (x: Array<IImageSettings>) => void
    inputError: boolean;
    setInputError: (x: boolean) => void;
    isMainTextBox: boolean;
    onClickPost: ()=>void;
}

const TextCommentComponent: React.FC<ICommentTextBoxProps> = (props: ICommentTextBoxProps) => {
    const classes: IClasses = style();

    const {
        textValue,
        setTextValue,
        images,
        setImages,
        inputError,
        setInputError,
        isMainTextBox,
        onClickPost,
    } = props;

    const [openImageUploader, setOpenImageUploader] = useState<boolean>(false);
    const [isExpanded, toggleExpand] = useState<boolean>(false);
    const [tempImages, setTempImages] = useState<Array<IImageSettings>>([]);
    const [previewImages, setPreviewImages] = useState<Array<React.ReactElement>>();

    const onClearClick = (): void => {
        setInputError(false);
        setTempImages([]);
        setImages([]);
        setTextValue('');
    };

    const onPostSubmit = (): void => {
        if (textValue === '') {
            setInputError(true);
            return;
        }

        onClickPost();
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setTextValue(event.target.value);

        if (inputError) { setInputError(false); }
    };

    const onClick = () => setOpenImageUploader(true);
    const onClose = () => setOpenImageUploader(false);

    const mapPreviewImages = () => tempImages.map((image:IImageSettings) => (
        <CardMedia className={classes.previewImage} component="img" src={image.data64} />
    ));

    const onClickAttach = () => {
        setOpenImageUploader(false);
        toggleExpand(tempImages.length > 0);
        setImages([...tempImages]);
        setPreviewImages(mapPreviewImages());
    };

    const onClickCancel = () => {
        setOpenImageUploader(false);
        setTempImages(images);
    };

    return (
        <section className={classes.mainSection}>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <section className={classes.prevAndbutton}>
                    <section className={classes.previewImageContainer}>
                        { previewImages }
                    </section>
                    <IconButton style={{ height: '100%' }} onClick={onClick}>
                        <Edit />
                    </IconButton>
                </section>
            </Collapse>

            <section className={classes.textBoxContainer}>
                <TextField
                    className={isExpanded ? classes.textBoxWithPreview : classes.textBox}
                    multiline
                    rows={isMainTextBox ? ROWS : ROWS / 2}
                    rowsMax={isMainTextBox ? MAXROWS : MAXROWS / 2}
                    value={textValue}
                    onChange={onChange}
                    variant="outlined"
                    error={inputError}
                />

                <IconButton
                    className={classes.attachIconButton}
                    onClick={onClick}
                >
                    <AddAPhoto />
                </IconButton>
            </section>

            <section className={classes.postButtonControls}>
                <Button variant="contained" color="primary" onClick={onClearClick}>
                    Clear
                </Button>

                <Button variant="contained" color="primary" onClick={onPostSubmit}>
                    Post
                </Button>
            </section>

            <Dialog
                open={openImageUploader}
                onClose={onClose}
            >
                <ImageUploaderComponent
                    images={tempImages}
                    setImages={setTempImages}
                    maxImages={MAXIMAGES}
                    canMakeDefault={false}
                />
                <Button onClick={onClickCancel}> Cancel </Button>
                <Button onClick={onClickAttach}> Attach </Button>
            </Dialog>
        </section>
    );
};

export default TextCommentComponent;
