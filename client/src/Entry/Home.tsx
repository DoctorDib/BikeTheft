import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import mainTheme from '../templates/theme';

import AppliedRoute from '../Components/Routing/Applied';

import HomePage from '../Pages/Home';
import BikePage from '../Pages/Bike';
import AboutPage from '../Pages/About';
import ErrorPage from '../Pages/Error';

function App() {
    return (
        <Router>
            <ThemeProvider theme={mainTheme}>
                <Switch>
                    <AppliedRoute appProps={{}} exact path="/" component={HomePage} />
                    <AppliedRoute appProps={{}} path="/bike/:id" component={BikePage} />
                    <AppliedRoute appProps={{}} path="/404" component={ErrorPage} />
                    <AppliedRoute appProps={{}} path="/about" component={AboutPage} />
                    <Redirect to="/404" />
                </Switch>
            </ThemeProvider>
        </Router>
    );
}

ReactDom.render(<App />, document.getElementById('importContent'));
