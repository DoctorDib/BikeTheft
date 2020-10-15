import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import mainTheme from '../templates/theme';
import AppliedRoute from '../Components/Routing/Applied';

import HomePage from '../Pages/Home';

const App: React.FC = () => (
    <Router>
        <ThemeProvider theme={mainTheme}>
            <Switch>
                <AppliedRoute
                    appProps={{}}
                    exact
                    path="/"
                    component={HomePage}
                />
            </Switch>
        </ThemeProvider>
    </Router>
);

ReactDom.render(
    <React.StrictMode>
        {' '}
        <App />{' '}
    </React.StrictMode>,
    document.getElementById('importContent'),
);
