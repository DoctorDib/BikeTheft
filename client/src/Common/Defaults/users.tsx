import {
    IUserDetails,
    IUserAttributes,
} from '../Interfaces/users';

export const defaultUserAttributes:IUserAttributes = {
    nickname: '',
};

export const defaultUserDetails:IUserDetails = {
    username: '',
    password: '',
    passwordConfirm: '',
    attributes: defaultUserAttributes,
};