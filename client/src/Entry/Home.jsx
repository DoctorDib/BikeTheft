import React from 'react';
import ReactDom from 'react-dom';
import mainTheme from 'templates/theme';

import { BrowserRouter as Router, Switch } from 'react-router-dom';
import AppliedRoute from 'Components/Routing/Applied';

import HomePage from 'Pages/Home';
import BikePage from 'Pages/Bike';

import { ThemeProvider } from '@material-ui/core/styles';

function App() {
    return (
        <Router>
            <ThemeProvider theme={ mainTheme }>
                <Switch>
                    <AppliedRoute appProps={{}} path={'/'} component={HomePage}/>
                    <AppliedRoute appProps={{}} path={'/bike'} component={BikePage}/>
                    <AppliedRoute appProps={{}} path={'*'} component={HomePage}/>
                </Switch>
            </ThemeProvider>
        </Router>
    );
}

ReactDom.render(<App />, document.getElementById('importContent'));
