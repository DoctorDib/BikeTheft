import React from 'react';
import ReactDom from 'react-dom';
import mainTheme from 'templates/theme';

import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import AppliedRoute from 'Components/Routing/Applied';

import HomePage from 'Pages/Home';
import BikePage from 'Pages/Bike';
import ErrorPage from 'Pages/Error';

import { ThemeProvider } from '@material-ui/core/styles';

function App() {
    return (
        <Router>
            <ThemeProvider theme={ mainTheme }>
                <Switch>
                    <AppliedRoute appProps={{}} exact path={'/'} component={HomePage}/>
                    <AppliedRoute appProps={{}} path={'/bike/:id'} component={BikePage}/>
                    <AppliedRoute appProps={{}} path={'/404'} component={ErrorPage}/>

                    <Redirect to="/404" />
                </Switch>
            </ThemeProvider>
        </Router>
    );
}

ReactDom.render(<App />, document.getElementById('importContent'));
