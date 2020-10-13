import React from 'react';
import ReactDom from 'react-dom';
import Amplify from 'aws-amplify';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import mainTheme from '../templates/theme';
import AppliedRoute from '../Components/Routing/Applied';

import HomePage from '../Pages/Home';
import VehicleInfoPage from '../Pages/VehicleInfo';
import VehicleUploadPage from '../Pages/VehicleUpload';
import AboutPage from '../Pages/About';
import ErrorPage from '../Pages/Error';

Amplify.configure({
    // OPTIONAL - if your API requires authentication
    // TODO ensure none of these secret keys end up on the client
    Auth: {
        mandatorySignIn: true,
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: process.env.IDENTITYPOOLID,
        // REQUIRED - Amazon Cognito Region
        region: process.env.REGION,
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: process.env.USERPOOLID,
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: process.env.CLIENTID,
    },
    API: {
        endpoints: [
            {
                name: 'base_endpoint',
                endpoint: process.env.APIENDPOINT,
                region: process.env.REGION,
            },
        ],
    },
});

const App: React.FC = () => (
    <Router>
        <ThemeProvider theme={mainTheme}>
            <Switch>
                <AppliedRoute appProps={{}} exact path="/" component={HomePage} />
                <AppliedRoute appProps={{}} path="/post/upload" component={VehicleUploadPage} />
                <AppliedRoute appProps={{}} path="/post/:id" component={VehicleInfoPage} />
                <AppliedRoute appProps={{}} path="/404" component={ErrorPage} />
                <AppliedRoute appProps={{}} path="/about" component={AboutPage} />
                <Redirect to="/404" />
            </Switch>
        </ThemeProvider>
    </Router>
);

ReactDom.render(<App />, document.getElementById('importContent'));
