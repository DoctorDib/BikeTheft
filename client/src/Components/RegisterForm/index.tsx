import React from 'react';

import style from './styles';

import { Formik, Form, Field } from 'formik';
import { Typography, Button, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { IClasses } from '../../Common/Interfaces/IClasses';
import useAuthentication from '../../Common/Helpers/User';

interface Values {
    username: string,
    nickname: string,
    password: string,
    passwordConfirm: string,
}

const ModifiedTextfield = (props) => (
    <TextField
        {...props}
        InputLabelProps={{
            shrink: true,
        }}
    />
)

const Register = (): React.ReactElement => {
    const classes: IClasses = style();
    const [signIn, signUp] = useAuthentication();

    return (
        <section className={classes.container}>

            <Typography variant="h5" gutterBottom> Register </Typography>
            <Formik
                initialValues={{
                    username: '',
                    attributes: {
                        nickname: '',
                    },
                    password: '',
                    passwordConfirm: '',
                }}
                validate={(values) => {
                    const errors: Partial<Values> = {};

                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)) {
                        errors.username = 'Invalid email address';
                    } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%* #=+\(\)\^?&])[A-Za-z\d$@$!%* #=+\(\)\^?&]{8,}/i.test(values.password)) {
                        errors.password = 'Password requires at least 8 digits with 1 alphabet, 1 number and 1 special character'
                    } else if (values.password !== values.passwordConfirm) {
                        errors.password = 'Passwords do not match'
                        errors.passwordConfirm = "Passwords do not match"
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    alert(JSON.stringify(values, null, 2));
                    signUp(values).then((result) => {
                        setSubmitting(false);
                        console.log(result)
                        // todo add redirect to index / show confirmation here
                    }).catch(errors => {
                        console.error(errors);
                    });
                }}

            >
                {({ submitForm, isSubmitting }) => (
                    <Form className={classes.form}>
                        <Field
                            component={ModifiedTextfield}
                            name="attributes.nickname"
                            type="text"
                            label="Nickname"
                            placeholder="Your nickname.."
                        />
                        <br />
                        <Field
                            component={ModifiedTextfield}
                            name="username"
                            type="email"
                            label="Username"
                            placeholder="Your email address.."
                            required
                        />
                        <br />
                        <Field
                            component={ModifiedTextfield}
                            type="password"
                            label="Password"
                            name="password"
                            placeholder="Your password.."
                            required
                        />
                        <br />
                        <Field
                            component={ModifiedTextfield}
                            type="password"
                            label="Password Confirmation"
                            name="passwordConfirm"
                            placeholder="Your password again.."
                            required

                        />
                        <br />
                        {isSubmitting && <LinearProgress />}
                        <br />
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={submitForm}
                        >
                            Register
          </Button>
                    </Form>
                )}
            </Formik>
        </section>
    );
};

export default Register;
