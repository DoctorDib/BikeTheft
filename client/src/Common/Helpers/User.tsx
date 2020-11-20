import React from 'react';
import { Auth } from 'aws-amplify';
import validator from 'validator';

import {
    IUserDetails,
    ISignIn,
    IErrors,
    IErrorResults,
} from '../Interfaces/users';
import { UserContext } from '../../Components/Routing/UserContext';
import UserMethodEnum from '../Enums/UserMethodEnum';

const verify = (user: IUserDetails):IErrorResults => {
    let hasErrors = false;
    const errors:IErrors = {
        password: user.password.length < 8,
        passwordConfirm: user.password !== user.passwordConfirm,
        nickname: user.attributes.nickname !== undefined
            ? user.attributes.nickname.length < 3
            : true,
        email: !validator.isEmail(user.username),
    };

    const errorKeysLength = Object.keys(errors).length;
    for (let index = 0; index < errorKeysLength; index++) {
        const key = Object.keys(errors)[index];
        if (errors[key]) { hasErrors = true; }
    }

    return { hasErrors, errors };
};

const useAuthentication = ():((user: IUserDetails | ISignIn) => Promise<unknown>)[] => {
    const { dispatch } = React.useContext(UserContext);

    const signUp = (user: IUserDetails):Promise<unknown | IErrors> => new Promise((resolve, reject) => {
        const { hasErrors, errors } = verify(user);

        if (hasErrors) return reject(errors);

        return Auth.signUp(user)
            .then((response) => resolve(response));
    });

    const signIn = (user: IUserDetails):Promise<unknown | IErrors> => new Promise((resolve, reject):void => {
        Auth.signIn(user.username, user.password)
            .then((response):void => {
                dispatch({
                    method: UserMethodEnum.LogIn,
                    data: response.attributes,
                });

                resolve(response);
            }).catch((e):void => {
                reject(e);
            });
    });

    return [signIn, signUp];
};

export default useAuthentication;
