import React from 'react';
import {
    IReducerAction,
    IState,
    IUserContextProvider,
} from '../../Common/Interfaces/users';
import UserMethodEnum from '../../Common/Enums/UserMethodEnum';

const initialState = {
    user: {
        loggedIn: false,
        attributes: {
            email: '',
            email_verified: false,
            nickname: '',
            sub: '',
        },
    },
};

const UserContext = React.createContext<{
    state: IState;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null,
});

const UserContextConsumer = UserContext.Consumer;

const reducer = (state: IState, action: IReducerAction) => {
    const newState: IState = state;

    switch (action.method) {
        case UserMethodEnum.UpdateUserAttributes:
            newState.user.attributes = action.data;
            break;
        case UserMethodEnum.LogIn:
            newState.user.attributes = action.data;
            newState.user.loggedIn = true;
            break;
        default:
            break;
    }

    return newState;
};

const UserContextProvider = (props: IUserContextProvider): React.ReactElement<IUserContextProvider> => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const { children } = props;

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            { children }
        </UserContext.Provider>
    );
};

export { UserContext, UserContextProvider, UserContextConsumer };
