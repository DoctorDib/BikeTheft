import React from 'react';
import { Route } from 'react-router-dom';

interface IAppliedRouteProps {
    component: any; // TODO these need interfaces
    appProps: any;
    path?: any;
}

export default function AppliedRoute(props: IAppliedRouteProps) {
    const { component: C, appProps, ...rest } = props;

    return (
        <Route {...rest} render={(routeProps) => <C {...routeProps} {...appProps} />} />
    );
}
