import React from 'react';
import ReactDom from 'react-dom';
import mainTheme from 'templates/mainStyle';
import Indexer from 'Pages/Bike';

import { ThemeProvider } from '@material-ui/core/styles';


function App() {
    return (
        <ThemeProvider theme={ mainTheme }>
            <Indexer />
        </ThemeProvider>
    );
}

ReactDom.render(<App />, document.getElementById('importContent'));
