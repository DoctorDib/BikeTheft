import React from 'react';
import { Auth } from 'aws-amplify';
import { UserContext, Method } from '../../Components/Routing/UserContext';

interface IUserAttributes {
    nickname: string;
}

interface IUserDetails {
    username: string;
    password: string;
    passwordConfirm?: string;
    attributes?: IUserAttributes;
}

interface IErrors {
    password: boolean;
    passwordConfirm: boolean;
    nickname: boolean;
    email: boolean;
    [key: string]: boolean;
}

interface IErrorResults {
    hasErrors: boolean;
    errors: IErrors;
}

const verify = (user: IUserDetails):IErrorResults => {
    let hasErrors = false;
    const errors:IErrors = {
        password: user.password.length < 8,
        passwordConfirm: user.password !== user.passwordConfirm,
        // @ts-ignore
        nickname: user.attributes?.nickname.length < 3,
        email: !user.username.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/),
    };

    for(const attribute in errors) {
        if(!errors.hasOwnProperty(attribute)) continue;

        if(errors[attribute]) {
            hasErrors = true;
        }
    }

    return {
        hasErrors,
        errors,
    };
}

const useAuthentication = ():((user: IUserDetails) => Promise<unknown>)[] => {
    const { state, dispatch } = React.useContext(UserContext);

    const signUp = (user: IUserDetails):Promise<unknown | IErrors> => new Promise((resolve, reject) => {
        const { hasErrors, errors } = verify(user);

        if(hasErrors) return reject(errors);

        Auth.signUp(user).then((response) => {
            resolve(response);
        });
    });

    const signIn = (user: IUserDetails):Promise<unknown> => new Promise((resolve, reject) => {
        Auth.signIn(user.username, user.password).then(response => {
            dispatch({
                method: Method.LogIn,
                data: response.attributes,
            });

            resolve(true);
        }).catch(e => {
            reject({
                code: e.code,
            });
        })
    })

    return [signIn, signUp];
}

export default useAuthentication;
