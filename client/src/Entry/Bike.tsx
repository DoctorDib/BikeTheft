import React from 'react';
import ReactDom from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import mainTheme from '../templates/mainStyle';
import Indexer from '../Pages/Bike';

function App() {
    return (
        <ThemeProvider theme={ mainTheme }>
            <Indexer />
        </ThemeProvider>
    );
}

ReactDom.render(<App />, document.getElementById('importContent'));
