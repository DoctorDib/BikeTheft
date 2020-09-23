import React from 'react';
import ReactDom from 'react-dom';
import mainTheme from 'templates/theme';
import Indexer from 'Pages/Error';

import { ThemeProvider } from '@material-ui/core/styles';

const App = () => {
    return (
        <ThemeProvider theme={ mainTheme }>
            <Indexer />
        </ThemeProvider>
    );
}

ReactDom.render(<App />, document.getElementById('importContent'));
