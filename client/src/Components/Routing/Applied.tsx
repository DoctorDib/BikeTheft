import React from 'react';
import { Route } from 'react-router-dom';

interface IAppliedRouteProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: any; // TODO better types
    appProps: unknown;
    exact?: boolean;
    path?: string;
}

const AppliedRoute: React.FC<IAppliedRouteProps> = (
    props: IAppliedRouteProps,
) => {
    const { component: C, appProps, ...rest } = props;

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Route
            {...rest}
            render={(routeProps) => <C {...routeProps} {...appProps} />}
        />
    );
};

export default AppliedRoute;
