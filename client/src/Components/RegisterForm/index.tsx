/* eslint-disable @typescript-eslint/no-namespace */
import React, { useEffect, useState } from 'react';
import {
    Typography,
    Grid,
    Button,
    Divider,
} from '@material-ui/core';
import { useFormik, FormikProvider } from 'formik';
import classNames from 'classnames';
import validator from 'validator';

import {
    defaultUserDetails,
} from '../../Common/Defaults/users';
import { IClasses } from '../../Common/Interfaces/IClasses';
import styles from './styles';
import DefaultTextInputComponent from '../TextFieldComponents/DefaultTextBox';
import PasswordInputComponent from '../TextFieldComponents/PasswordInput';
import useAuthentication from '../../Common/Helpers/User';
import { IUserDetails } from '../../Common/Interfaces/users';
import { isNullOrUndefinedOrEmpty } from '../../Common/Utils/Types';

interface IRegisterFormProps {}

const GRIDSPACING = 6;

const RegisterForm = ():React.ReactElement<IRegisterFormProps> => {
    const classes: IClasses = styles();

    // signIn has been temporarily removed
    const [signUp] = useAuthentication();

    const [isPasswordComplete, setIsPasswordComplete] = useState<boolean>(false);
    const [isPassConfirmComplete, setIsPassConfirmComplete] = useState<boolean>(false);
    const [disableSignin, setSigninDisable] = useState<boolean>(true);

    const onSubmit = ():void => {
        alert(JSON.stringify(formik.values, null, 2));
        signUp(formik.values)
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
        const isPasswordConfirmEmpty = isNullOrUndefinedOrEmpty(formik.values.passwordConfirm);

        if (isEmailEmpty || isPasswordEmpty || isPasswordConfirmEmpty) {
            setSigninDisable(true);
            return;
        }

        if (!validator.isEmail(formik.values.username)) { setSigninDisable(true); }

        setSigninDisable(false);
    };

    const goBack = ():void => window.history.back();

    const formik = useFormik({
        initialValues: defaultUserDetails,
        onSubmit,
    });

    useEffect(():void => { validate(); }, [formik.values]);

    return (
        <section className={classes.mainContainer}>
            <FormikProvider value={formik}>
                <section className={classes.mainContainer}>
                    <Grid container spacing={3} className={classes.gridContainer}>
                        {/* IDENTIFICATION */}
                        <section className={classes.fieldSection}>
                            <section className={classNames(classes.hideOnMobileOnly, classes.fieldName)}>
                                <Typography variant="h6"> User Information </Typography>
                            </section>
                            <Grid container spacing={GRIDSPACING} className={classes.fieldInputs}>
                                <Grid item xs={12} lg={6} className={classes.inputContainers}>
                                    <DefaultTextInputComponent label="Nickname" />
                                </Grid>

                                <Grid item xs={12} className={classes.inputContainers}>
                                    <DefaultTextInputComponent label="Username" customPlaceholder="Email" isRequired />
                                </Grid>
                            </Grid>
                        </section>

                        <Divider className={classNames(classes.hideOnMobileOnly, classes.divider)} />
                        {/* PASSWORD SECTION */}
                        <section className={classes.fieldSection}>
                            <section className={classNames(classes.hideOnMobileOnly, classes.fieldName)}>
                                <Typography variant="h6"> Password </Typography>
                            </section>
                            <Grid container spacing={GRIDSPACING} className={classes.fieldInputs}>
                                <Grid item xs={12} className={classes.inputContainers}>
                                    <PasswordInputComponent label="Password" confirmation={setIsPasswordComplete} />
                                </Grid>
                                <Grid item xs={12} className={classes.inputContainers}>
                                    <PasswordInputComponent label="Password Confirm" customPlaceholder="Password Confirmation" isConfirmation confirmation={setIsPassConfirmComplete} />
                                </Grid>
                            </Grid>
                        </section>

                        <Divider className={classNames(classes.hideOnMobileOnly, classes.divider)} />

                        <section className={classes.fieldSection} style={{ flexDirection: 'column', justifyContent: 'center' }}>
                            <section className={classes.signInTextContainer}>
                                <Typography variant="subtitle2">
                                    Already have an account?
                                    <a href="/signin"> Sign in </a>
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
                                    disabled={disableSignin && !isPasswordComplete && !isPassConfirmComplete}
                                >
                                    Sign up
                                </Button>
                            </section>
                        </section>
                    </Grid>
                </section>
            </FormikProvider>
        </section>
    );
};

export default RegisterForm;
