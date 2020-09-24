import React from 'react';
import ReactDom from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import mainTheme from '../templates/theme';
import Indexer from '../Pages/Home';

function App() {
    return (
        <ThemeProvider theme={ mainTheme }>
            <Indexer />
        </ThemeProvider>
    );
}

ReactDom.render(<App />, document.getElementById('importContent'));
