import React from 'react';
import ReactDom from 'react-dom';
import Amplify from 'aws-amplify';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import mainTheme from '../templates/theme';
import AppliedRoute from '../Components/Routing/Applied';
import * as constants from '../../../secrets/constants';

import HomePage from '../Pages/Home';
import VehiclePage from '../Pages/Vehicle';
import AboutPage from '../Pages/About';
import ErrorPage from '../Pages/Error';

Amplify.configure({
    // OPTIONAL - if your API requires authentication
    Auth: {
        mandatorySignIn: true,
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: constants.IDENTITYPOOLID,
        // REQUIRED - Amazon Cognito Region
        region: constants.REGION,
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: constants.USERPOOLID,
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: constants.CLIENTID,
    },
    API: {
        endpoints: [
            {
                name: 'base_endpoint',
                endpoint: constants.APIENDPOINT,
                region: constants.REGION,
            },
        ],
    },
});

const App: React.FC = () => (
    <Router>
        <ThemeProvider theme={mainTheme}>
            <Switch>
                <AppliedRoute appProps={{}} exact path="/" component={HomePage} />
                <AppliedRoute appProps={{}} path="/post/:id" component={VehiclePage} />
                <AppliedRoute appProps={{}} path="/404" component={ErrorPage} />
                <AppliedRoute appProps={{}} path="/about" component={AboutPage} />
                <Redirect to="/404" />
            </Switch>
        </ThemeProvider>
    </Router>
);

ReactDom.render(<App />, document.getElementById('importContent'));
