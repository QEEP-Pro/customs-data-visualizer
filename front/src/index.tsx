import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import App from './App'

ReactDOM.render(
    <BrowserRouter>
        <MuiThemeProvider>
            <App />
        </MuiThemeProvider>
    </BrowserRouter>,
    document.getElementById('root') as HTMLElement
);
