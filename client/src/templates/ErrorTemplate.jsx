import React from 'react';
import ReactDom from 'react-dom';
import mainTheme from '../styles/theme';
import Indexer from './content/errorIndex';

import { ThemeProvider } from '@material-ui/core/styles';

const App = () => {
    return (
        <ThemeProvider theme={ mainTheme }>
            <Indexer />
        </ThemeProvider>
    );
}

ReactDom.render(<App />, document.getElementById('importContent'));