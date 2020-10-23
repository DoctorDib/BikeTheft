import React from 'react';

import { TextField, Button } from '@material-ui/core';

import { IClasses } from '../../Common/Interfaces/IClasses';
import style from './styles';

interface ICommentTextBoxProps {
    textValue: string,
    setTextValue: (x:string) => void;
    inputError: boolean;
    setInputError: (x:boolean) => void;
    isMainTextBox: boolean;
    onClickPost: ()=>void;
}

const TextCommentComponent: React.FC<ICommentTextBoxProps> = (props: ICommentTextBoxProps) => {
    const classes: IClasses = style();

    const { textValue, setTextValue, inputError, setInputError, isMainTextBox, onClickPost } = props;

    const onClearClick = (): void => {
        setInputError(false);
        setTextValue('');
    }

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
    
    return (
        <section style={{width: '100%'}}>
            <TextField
                className={classes.textBox}
                multiline
                rows={isMainTextBox ? 4 : 2}
                rowsMax={isMainTextBox ? 10 : 8}
                value={textValue}
                onChange={onChange}
                variant="outlined"
                error={inputError}
            />

            <section className={classes.postButtonControls}>
                <Button variant="contained" color="primary" onClick={onClearClick}>
                    Clear
                </Button>

                <Button variant="contained" color="primary" onClick={onPostSubmit}>
                    Post
                </Button>
            </section>

            {/*<ConfirmationComponent
                enumMessage={confirmationMessage}
                open={confirmation}
                callback={confirmationCallback}
            />*/}
        </section>
    )
};

export default TextCommentComponent;
