import React from 'react';
import { Redirect } from 'react-router-dom';
import AppliedRoute from './Applied';

export default function PrivateRoute({ component: C, authenticated, appProps, inverted = false, ...props }) {
    const allow = inverted ? !authenticated : authenticated;

    return (
        allow ? <AppliedRoute component={C} {...props} appProps={appProps} /> : <Redirect to={'/login?redirect=' + encodeURIComponent(props.location.pathname)} />
    );
};
