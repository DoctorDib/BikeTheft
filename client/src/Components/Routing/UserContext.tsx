import React, {ReactElement} from 'react';

const initialState = {
    user: {
        loggedIn: false,
        attributes: {
            email: '',
            email_verified: false,
            nickname: '',
            sub: '',
        }
    }
};

export const enum Method {
    UpdateUserAttributes,
    LogIn,
}

interface IReducerAction {
    method: Method,
    data: unknown;
}

interface IUserAttributes {
    email: string;
    email_verified: boolean;
    nickname: string;
    picture?: string;
    sub: string;
}

interface IUserState {
    loggedIn: boolean;
    attributes?: IUserAttributes;
}

interface IState {
    user: IUserState;
}

const UserContext = React.createContext<{
    state: IState;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null,
});
const UserContextConsumer = UserContext.Consumer;

const reducer = (state: IState, action: IReducerAction) => {
    switch(action.method) {
        case Method.UpdateUserAttributes:
            // @ts-ignore
            state.user.attributes = action.data;
            break;
        case Method.LogIn:
            // @ts-ignore
            state.user.attributes = action.data;
            state.user.loggedIn = true;
            break;
    }

    return state;
}

interface IUserContextProvider {
    children: ReactElement;
}

const UserContextProvider = (props: IUserContextProvider): React.Element<IUserContextProvider> => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider, UserContextConsumer };
