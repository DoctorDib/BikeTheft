/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect } from 'react-router-dom';
import AppliedRoute from './Applied';

interface IPrivateRouteProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: any; // TODO better types
    authenticated: boolean;
    appProps: unknown;
    inverted: boolean;
    location: { pathname: string };
}

const PrivateRoute = (props: IPrivateRouteProps): React.ReactElement<IPrivateRouteProps> => {
    const {
        // TODO fix this later on
        // eslint-disable-next-line react/prop-types
        component: C,
        authenticated,
        appProps,
        inverted = false,
        location,
        ...extraProps
    } = props;

    const allow = inverted ? !authenticated : authenticated;

    return allow ? (
        <AppliedRoute component={C} {...extraProps} appProps={appProps} />
    ) : (
        // TODO fix this
        // eslint-disable-next-line react/prop-types
        <Redirect to={`/login?redirect=${encodeURIComponent(location.pathname)}`} />
    );
};

export default PrivateRoute;
