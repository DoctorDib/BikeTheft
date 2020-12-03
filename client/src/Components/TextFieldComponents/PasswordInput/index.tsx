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
    useConfirmation?:boolean
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
    const { label, confirmation, hideChips, customPlaceholder, useConfirmation } = props;
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

        Object.keys(checks).forEach((key:string) => {
            if (list.includes(key)) {
                newChecks[key] = false;
                complete = false;
                return;
            }

            newChecks[key] = true;
        });

        const passwordConfirmation = values.passwordConfirm === values.password && !isNullOrUndefinedOrEmpty(values.passwordConfirm);

        confirmation(complete && useConfirmation ? passwordConfirmation : true);
        setChecks(newChecks);
    };

    // Linking both confirmations
    useEffect(validate, [values.password]);
    useEffect(validate, [values.passwordConfirm]);

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
            verified={values.passwordConfirm === values.password && !isNullOrUndefinedOrEmpty(values.passwordConfirm)}
        />
    );

    return (
        <>
            <DefaultTextInput label={label} customPlaceholder={customPlaceholder} isRequired isPassword />
            <section
                className={classes.parentChipContainer}
                style={{ display: hideChips !== null && hideChips ? 'none' : 'flex' }}
            >
                { mainChips }
            </section>

            { useConfirmation
                ? (
                    <section style={{ marginTop: '25px', width: '100%' }}>
                        <DefaultTextInput label="Password Confirm" customPlaceholder="Password Confirmation" isRequired isPassword />
                        <section
                            className={classes.parentChipContainer}
                            style={{ display: hideChips !== null && hideChips ? 'none' : 'flex' }}
                        >
                            { otherChips }
                        </section>
                    </section>
                )
                : null}
        </>
    );
};

export default NumberPlateInput;
