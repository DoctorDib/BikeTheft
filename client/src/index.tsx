import React from 'react';
import ReactDom from 'react-dom';
import Amplify from 'aws-amplify';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import Env from './Common/Utils/Env';
import mainTheme from './templates/theme';
import AppliedRoute from './Components/Routing/Applied';
import { UserContextProvider } from './Components/Routing/UserContext';

import HomePage from './Pages/Home';
import VehicleInfoPage from './Pages/VehicleInfo';
import VehicleUploadPage from './Pages/VehicleUpload';
import AboutPage from './Pages/About';
import ErrorPage from './Pages/Error';
import RegisterPage from './Pages/Register';

Amplify.configure({
    // OPTIONAL - if your API requires authentication
    // TODO ensure none of these secret keys end up on the client
    Auth: {
        mandatorySignIn: false,
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: Env.SNOWPACK_PUBLIC_IDENTITYPOOLID,
        // REQUIRED - Amazon Cognito Region
        region: Env.SNOWPACK_PUBLIC_REGION,
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: Env.SNOWPACK_PUBLIC_USERPOOLID,
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: Env.SNOWPACK_PUBLIC_CLIENTID,
    },
    API: {
        endpoints: [
            {
                name: 'base_endpoint',
                endpoint: Env.SNOWPACK_PUBLIC_APIENDPOINT,
                region: Env.SNOWPACK_PUBLIC_REGION,
            },
        ],
    },
    Storage: {
        AWSS3: {
            bucket: Env.SNOWPACK_PUBLIC_S3BUCKET,
            region: Env.SNOWPACK_PUBLIC_REGION,
            identityPoolId: Env.SNOWPACK_PUBLIC_IDENTITYPOOLID,
        },
    },
});

const App = (): React.ReactElement => (
    <UserContextProvider>
        <Router>
            <ThemeProvider theme={mainTheme}>
                <Switch>
                    <AppliedRoute appProps={{}} exact path="/" component={HomePage} />
                    <AppliedRoute appProps={{}} exact path="/register" component={RegisterPage} />
                    <AppliedRoute appProps={{}} path="/upload" component={VehicleUploadPage} />
                    <AppliedRoute appProps={{}} path="/post/:id" component={VehicleInfoPage} />
                    <AppliedRoute appProps={{}} path="/404" component={ErrorPage} />
                    <AppliedRoute appProps={{}} path="/about" component={AboutPage} />
                    <Redirect to="/404" />
                </Switch>
            </ThemeProvider>
        </Router>
    </UserContextProvider>
);

ReactDom.render(<App />, document.getElementById('importContent'));
