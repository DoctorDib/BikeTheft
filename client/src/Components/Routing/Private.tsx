/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect } from 'react-router-dom';
import AppliedRoute from './Applied';

interface IPrivateRouteProps {
    component: any; // TODO better types to fix below todos
    authenticated: any;
    appProps: any;
    inverted: boolean;
    location: any;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = (props: IPrivateRouteProps) => {
    const {
        // TODO fix this later on
        // eslint-disable-next-line react/prop-types
        component: C, authenticated, appProps, inverted = false, location, ...extraProps
    } = props;

    const allow = inverted ? !authenticated : authenticated;

    return (
        allow
            ? <AppliedRoute component={C} {...extraProps} appProps={appProps} />
            // TODO fix this
            // eslint-disable-next-line react/prop-types
            : <Redirect to={`/login?redirect=${encodeURIComponent(location.pathname)}`} />
    );
};

export default PrivateRoute;
