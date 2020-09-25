import React from 'react';
import { Route } from 'react-router-dom';

interface IAppliedRouteProps {
    component: any; // TODO these need interfaces
    appProps: any;
    exact?: any;
    path?: any;
}

const AppliedRoute: React.FC<IAppliedRouteProps> = (props: IAppliedRouteProps) => {
    const { component: C, appProps, ...rest } = props;

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Route {...rest} render={(routeProps) => <C {...routeProps} {...appProps} />} />
    );
};

export default AppliedRoute;
