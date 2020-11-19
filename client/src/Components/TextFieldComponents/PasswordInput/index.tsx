import React, { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';

import { formatID } from '../helpers';
import DefaultTextInput from '../DefaultTextBox';
import { IUserDetails } from '../../../Common/Interfaces/users';
import { IClasses } from '../../../Common/Interfaces/IClasses';
import styles from './styles';
import PasswordSchema from '../../../Common/Utils/PasswordSchema';
import VerifiedChipComponent from './VerifiedChip';
import { isNullOrUndefinedOrEmpty } from '../../../Common/Utils/Types';

interface IPasswordInputProps {
    label:string,
    confirmation:(key:boolean) => void,
    hideChips?: boolean,
    customPlaceholder?:string,
    isConfirmation?:boolean,
}

interface IPasswordVerification {
    min: boolean,
    uppercase: boolean,
    lowercase: boolean,
    digits: boolean,
    symbols: boolean,
    [key:string]: boolean,
}

const DEFAULTCHECKS:IPasswordVerification = {
    min: false,
    uppercase: false,
    lowercase: false,
    digits: false,
    symbols: false,
};

const NumberPlateInput = (props:IPasswordInputProps):React.ReactElement<IPasswordInputProps> => {
    const { label, confirmation, hideChips, customPlaceholder, isConfirmation } = props;
    const { values } = useFormikContext<IUserDetails>();
    const classes: IClasses = styles();
    const id = formatID(label);

    const [checks, setChecks] = useState<IPasswordVerification>(DEFAULTCHECKS);

    const validate = ():void => {
        if (isNullOrUndefinedOrEmpty(values[id])) { return; }

        let complete = true;
        // Restarting
        const newChecks:IPasswordVerification = checks;

        const list:ReadonlyArray<string> = PasswordSchema.validate(values.password, { list: true });

        for (const key in checks) {
            if (list.includes(key)) { continue; }

            newChecks[key] = true;
            complete = false;
        }

        confirmation(complete);
        setChecks(newChecks);
    };

    useEffect(validate, [values[id]]);

    const mainChips:React.ReactElement = (
        <>
            <VerifiedChipComponent label="8 Chars" verified={checks.min} />
            <VerifiedChipComponent label="1 Num" verified={checks.digits} />
            <VerifiedChipComponent label="1 Symbol" verified={checks.symbols} />
            <VerifiedChipComponent label="Mixed cases" verified={checks.uppercase && checks.lowercase} />
        </>
    );

    const otherChips:React.ReactElement = (
        <VerifiedChipComponent
            label="Password Match"
            verified={values.passwordConfirm === values.password && values.passwordConfirm !== ''}
        />
    );

    return (
        <>
            <DefaultTextInput label={label} customPlaceholder={customPlaceholder} isRequired isPassword />
            <section
                className={classes.parentChipContainer}
                style={{ display: hideChips !== null && hideChips ? 'none' : 'flex' }}
            >
                { isConfirmation ? otherChips : mainChips }
            </section>
        </>
    );
};

export default NumberPlateInput;
