import React from 'react';
import { Redirect } from 'react-router-dom';
import AppliedRoute from './Applied';

interface IPrivateRouteProps {
    component: any; // TODO better types
    authenticated: any;
    appProps: any;
    inverted: boolean;
    location: any;
}

export default function PrivateRoute(props: IPrivateRouteProps) {
    const { component: C, authenticated, appProps, inverted = false, ...extraProps } = props;

    const allow = inverted ? !authenticated : authenticated;

    return (
        allow 
            ? <AppliedRoute component={C} {...extraProps} appProps={appProps} /> 
            : <Redirect to={'/login?redirect=' + encodeURIComponent(props.location.pathname)} />
    );
};
