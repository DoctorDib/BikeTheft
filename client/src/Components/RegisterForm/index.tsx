import React from 'react';

import {
    Formik,
    Form,
    Field,
} from 'formik';
import {
    Typography,
    Button,
    LinearProgress,
} from '@material-ui/core';
import validator from 'validator';
import PasswordValidator from 'password-validator';
import { TextField } from 'formik-material-ui';
import style from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';
import useAuthentication from '../../Common/Helpers/User';

interface Values {
    username: string,
    nickname: string,
    password: string,
    passwordConfirm: string,
}

const SCHEMA = new PasswordValidator()
    .is().min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .symbols()
    .has()
    .not()
    .spaces(); // Should not have spaces

const ModifiedTextfield = (props) => (
    <TextField
        {...props}
        InputLabelProps={{
            shrink: true,
        }}
    />
);

const Register = (): React.ReactElement => {
    const classes: IClasses = style();
    // signIn has been temporarily removed
    const [signUp] = useAuthentication();

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

                    if (!validator.isEmail(values.username)) {
                        errors.username = 'Invalid email address';
                    } else if (!SCHEMA.validate(values.password)) {
                        errors.password = 'Password requires between 8 to 100 characters with at least 1 lowercase and uppcase alphabet and 2 number and 1 special character';
                    } else if (values.password !== values.passwordConfirm) {
                        errors.password = 'Passwords do not match';
                        errors.passwordConfirm = 'Passwords do not match';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    alert(JSON.stringify(values, null, 2));
                    signUp(values).then((result) => {
                        setSubmitting(false);
                        console.log(result);
                        // todo add redirect to index / show confirmation here
                    }).catch((errors) => {
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
