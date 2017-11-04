import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Main from './Main'


const App = () => (
    <MuiThemeProvider>
        <Main />
    </MuiThemeProvider>
);

export default App
