import { ReactElement } from 'react';

import UserMethodEnum from '../Enums/UserMethodEnum';

export interface IReducerAction {
    method: UserMethodEnum,
    data: IUserContextAttributes;
}

export interface IUserContextProvider {
    children: ReactElement;
}

export interface IUserContextAttributes {
    email: string;
    email_verified: boolean;
    nickname: string;
    picture?: string;
    sub: string;
}

export interface IUserState {
    loggedIn: boolean;
    attributes: IUserContextAttributes;
}

export interface IState {
    user: IUserState;
}

export interface IUserAttributes {
    nickname: string | undefined;
}

export interface IUserDetails {
    username: string;
    password: string;
    passwordConfirm?: string;
    attributes: IUserAttributes;
    [key: string]: undefined | IUserAttributes | string;
}

export interface ISignIn {
    username: string;
    password: string;
}

export interface IErrors {
    password: boolean;
    passwordConfirm: boolean;
    nickname: boolean;
    email: boolean;
    [key: string]: boolean;
}

export interface IErrorResults {
    hasErrors: boolean;
    errors: IErrors;
}
