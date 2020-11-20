/* eslint-disable @typescript-eslint/no-namespace */
import React, { useEffect, useState } from 'react';
import {
    Typography,
    Button,
    Divider,
} from '@material-ui/core';
import { useFormik, FormikProvider } from 'formik';
import classNames from 'classnames';
import validator from 'validator';

import { ISignIn } from '../../Common/Interfaces/users';
import { IClasses } from '../../Common/Interfaces/IClasses';
import styles from './styles';
import DefaultTextInputComponent from '../TextFieldComponents/DefaultTextBox';
import PasswordInputComponent from '../TextFieldComponents/PasswordInput';
import useAuthentication from '../../Common/Helpers/User';
import { isNullOrUndefinedOrEmpty } from '../../Common/Utils/Types';

interface ISignInFormProps {}

const DEFAULTSIGNIN:ISignIn = {
    username: '',
    password: '',
};

const SignInForm = ():React.ReactElement<ISignInFormProps> => {
    const classes: IClasses = styles();

    const [signIn] = useAuthentication();

    const [isPasswordComplete, setIsPasswordComplete] = useState<boolean>(false);
    const [disableSignin, setSigninDisable] = useState<boolean>(true);

    const onSubmit = ():void => {
        alert(JSON.stringify(formik.values, null, 2));
        signIn(formik.values)
            .then((result):void => {
                formik.setSubmitting(false);
                console.log(result);
                // todo add redirect to index / show confirmation here
            }).catch((errors):void => {
                console.error(errors);
            });
    };

    const validate = ():void => {
        setSigninDisable(false);

        const isEmailEmpty = isNullOrUndefinedOrEmpty(formik.values.username);
        const isPasswordEmpty = isNullOrUndefinedOrEmpty(formik.values.password);

        if (isEmailEmpty || isPasswordEmpty) { setSigninDisable(true); }
        if (!validator.isEmail(formik.values.username)) { setSigninDisable(true); }
    };

    const goBack = ():void => window.history.back();

    const formik = useFormik({
        initialValues: DEFAULTSIGNIN,
        onSubmit,
    });

    useEffect(():void => { validate(); }, [formik.values]);

    return (
        <section className={classes.mainContainer}>
            <FormikProvider value={formik}>
                <section className={classes.mainContainer}>
                    
                    <section className={classes.fieldSection}>
                        <div className={classes.inputContainers}>
                            <DefaultTextInputComponent label="Username" customPlaceholder="Email" isRequired />
                        </div>

                        <div className={classes.inputContainers}>
                            <PasswordInputComponent label="Password" confirmation={setIsPasswordComplete} hideChips />
                        </div>
                    </section>

                    <Divider className={classNames(classes.hideOnMobileOnly, classes.divider)} />

                    <section className={classes.fieldSection} style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <section className={classes.signUpTextContainer}>
                            <Typography variant="subtitle2">
                                Don't have an account?
                                <a href="/register"> Sign up </a>
                            </Typography>
                        </section>
                        <section className={classes.controlButtons}>
                            <Button
                                color="primary"
                                onClick={goBack}
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={formik.submitForm}
                                disabled={disableSignin || !isPasswordComplete}
                            >
                                Sign in
                            </Button>
                        </section>
                    </section>
                    
                </section>
            </FormikProvider>
        </section>
    );
};

export default SignInForm;
