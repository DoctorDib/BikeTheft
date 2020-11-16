import React, { useState } from 'react';
import {
    Paper,
    IconButton,
    InputBase,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';

import style from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';
import { defaultPopup } from '../../Common/Helpers/Defaults';
import { IPopup } from '../../Common/Interfaces/interfaces';
import { checkNumberPlate } from '../../Common/Helpers/DB_Helpers';
import { isEmpty } from '../../Common/Utils/Types';
import PopupComponent from '../Popup';

const SearchBar = (): React.ReactElement => {
    const classes: IClasses = style();

    const [searchValue, setSearchValue] = useState<string>('');
    const [openPopup, setOpenPopup] = useState<boolean>(false);
    const [popup, setPopup] = useState<IPopup>(defaultPopup);

    const onChange = (event:React.ChangeEvent<HTMLInputElement>):void => {
        const newValue = event.target.value;
        if (newValue === searchValue) { return; }
        setSearchValue(newValue);
    };

    const popupCallback = ():void => setOpenPopup(false);

    const search = (e:React.MouseEvent<HTMLInputElement>):void => {
        // https://stackoverflow.com/questions/39809943/react-preventing-form-submission
        // Prevents onSubmit redirect
        e.preventDefault();

        if (isEmpty(searchValue)) {
            setPopup({
                title: 'Empty search field',
                message: 'Please ensure that you have entered the number plate correctly and try again.',
            });
            setOpenPopup(true);
            return;
        }

        checkNumberPlate(searchValue)
            .then((response:number | boolean) => {
                if (typeof response === 'boolean') {
                    setPopup({
                        title: 'Number plate not found',
                        message: `"${searchValue}" has not been found in our database but this does not mean the vehicle has not been stolen. If you are suspicious then please contact your local police.`,
                    });
                    setOpenPopup(true);
                    return;
                }

                window.location.href = `/post/${response}`;
            }).catch((e) => {
                console.log(e);
                // setError(e);
            });
    };

    return (
        <Paper component="form" onSubmit={search} className={classes.mainContainer}>
            <InputBase
                className={classes.input}
                placeholder="Search Number Plate"
                value={searchValue}
                onChange={onChange}
            />
            <IconButton
                type="button"
                className={classes.iconButton}
                onClick={search}
            >
                <Search />
            </IconButton>

            <PopupComponent
                open={openPopup}
                popup={popup}
                confirmationCallback={popupCallback}
            />
        </Paper>
    );
};

export default SearchBar;
